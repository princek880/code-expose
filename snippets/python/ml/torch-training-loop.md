---
lang: python
topic: ml
tier: 2
tags: [pytorch, training-loop, zero-grad]
note: zero_grad, backward, step, in that order: gradients accumulate until you clear them.
---
import torch
import torch.nn as nn

torch.manual_seed(0)
model = nn.Sequential(nn.Linear(4, 16), nn.ReLU(), nn.Linear(16, 1))
opt = torch.optim.AdamW(model.parameters(), lr=1e-2, weight_decay=1e-4)
loss_fn = nn.MSELoss()

X = torch.randn(256, 4)
y = (X @ torch.tensor([1.0, -2.0, 0.5, 3.0])).unsqueeze(1)

for epoch in range(50):
    opt.zero_grad(set_to_none=True)
    loss = loss_fn(model(X), y)
    loss.backward()
    opt.step()
print(round(loss.item(), 4))
