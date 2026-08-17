---
lang: python
topic: ml
tier: 3
tags: [pytorch, gradient-clipping, stability]
note: Clip after backward and before step; clipping by global norm rescales all gradients together.
---
import torch
import torch.nn as nn

torch.manual_seed(0)
model = nn.Sequential(nn.Linear(4, 64), nn.Tanh(), nn.Linear(64, 1))
opt = torch.optim.SGD(model.parameters(), lr=1.0)

X, y = torch.randn(16, 4) * 100, torch.randn(16, 1) * 100
loss = ((model(X) - y) ** 2).mean()
loss.backward()

before = torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
after = torch.sqrt(sum((p.grad ** 2).sum() for p in model.parameters()))
opt.step()
print(before > 1.0, round(after.item(), 4) <= 1.0001)
