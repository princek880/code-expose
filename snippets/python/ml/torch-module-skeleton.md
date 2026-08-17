---
lang: python
topic: ml
tier: 2
tags: [pytorch, nn-module]
note: Register submodules as attributes and parameters follow automatically into .parameters().
---
import torch
import torch.nn as nn

class MLP(nn.Module):
    def __init__(self, d_in, hidden, d_out, p=0.1):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(d_in, hidden),
            nn.GELU(),
            nn.Dropout(p),
            nn.Linear(hidden, d_out),
        )

    def forward(self, x):
        return self.net(x)

model = MLP(8, 32, 2)
print(sum(p.numel() for p in model.parameters()))
print(model(torch.randn(4, 8)).shape, model.training)
