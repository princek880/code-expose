---
lang: python
topic: ml
tier: 3
tags: [pytorch, layernorm, normalization]
note: LayerNorm normalises across features per sample, so batch size never enters the statistics.
---
import torch
import torch.nn as nn

class LayerNorm(nn.Module):
    def __init__(self, dim, eps=1e-5):
        super().__init__()
        self.gamma = nn.Parameter(torch.ones(dim))
        self.beta = nn.Parameter(torch.zeros(dim))
        self.eps = eps

    def forward(self, x):
        mean = x.mean(dim=-1, keepdim=True)
        var = x.var(dim=-1, keepdim=True, unbiased=False)
        return self.gamma * (x - mean) / torch.sqrt(var + self.eps) + self.beta

x = torch.randn(4, 6)
mine, ref = LayerNorm(6)(x), nn.LayerNorm(6)(x)
print(torch.allclose(mine, ref, atol=1e-5), mine.mean(dim=-1).abs().max() < 1e-5)
