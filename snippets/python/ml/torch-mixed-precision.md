---
lang: python
topic: ml
tier: 4
tags: [pytorch, amp, gradient-scaler]
note: The scaler multiplies the loss so fp16 gradients do not underflow, then unscales before step.
---
import torch
import torch.nn as nn

device = "cuda" if torch.cuda.is_available() else "cpu"
model = nn.Linear(8, 1).to(device)
opt = torch.optim.SGD(model.parameters(), lr=1e-2)
scaler = torch.amp.GradScaler(device, enabled=(device == "cuda"))

X = torch.randn(32, 8, device=device)
y = torch.randn(32, 1, device=device)
for _ in range(3):
    opt.zero_grad(set_to_none=True)
    with torch.amp.autocast(device, enabled=(device == "cuda")):
        loss = ((model(X) - y) ** 2).mean()
    scaler.scale(loss).backward()
    scaler.unscale_(opt)
    torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    scaler.step(opt)
    scaler.update()
print(round(loss.item(), 4) >= 0.0, scaler.is_enabled() == (device == "cuda"))
