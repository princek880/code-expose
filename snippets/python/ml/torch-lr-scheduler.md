---
lang: python
topic: ml
tier: 3
tags: [pytorch, scheduler, warmup]
note: Step the scheduler once per epoch, after the optimizer, or the first LR is silently skipped.
---
import torch
import torch.nn as nn

model = nn.Linear(4, 1)
opt = torch.optim.SGD(model.parameters(), lr=0.1)
warmup = torch.optim.lr_scheduler.LinearLR(opt, start_factor=0.1, total_iters=5)
cosine = torch.optim.lr_scheduler.CosineAnnealingLR(opt, T_max=15)
sched = torch.optim.lr_scheduler.SequentialLR(opt, [warmup, cosine], milestones=[5])

lrs = []
for epoch in range(20):
    opt.zero_grad()
    model(torch.randn(8, 4)).sum().backward()
    opt.step()
    lrs.append(round(opt.param_groups[0]["lr"], 5))
    sched.step()
print(lrs[:3], lrs[5], lrs[-1] < lrs[5])
