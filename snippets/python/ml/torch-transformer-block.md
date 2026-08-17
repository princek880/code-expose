---
lang: python
topic: ml
tier: 4
tags: [pytorch, transformer, residual]
note: Pre-norm residual blocks train deeper than post-norm because the skip path stays unscaled.
---
import torch
import torch.nn as nn

class Block(nn.Module):
    def __init__(self, d_model, heads, mult=4, p=0.1):
        super().__init__()
        self.n1, self.n2 = nn.LayerNorm(d_model), nn.LayerNorm(d_model)
        self.attn = nn.MultiheadAttention(d_model, heads, dropout=p, batch_first=True)
        self.ff = nn.Sequential(
            nn.Linear(d_model, mult * d_model),
            nn.GELU(),
            nn.Linear(mult * d_model, d_model),
            nn.Dropout(p),
        )

    def forward(self, x, mask=None):
        h = self.n1(x)
        x = x + self.attn(h, h, h, attn_mask=mask, need_weights=False)[0]
        return x + self.ff(self.n2(x))

x = torch.randn(2, 7, 64)
mask = torch.triu(torch.ones(7, 7, dtype=torch.bool), diagonal=1)
print(Block(64, 8)(x, mask).shape)
