---
lang: python
topic: ml
tier: 4
tags: [pytorch, attention, transformer]
note: Scaling by sqrt(head_dim) keeps the logits from saturating softmax as the dimension grows.
---
import torch
import torch.nn as nn
import torch.nn.functional as F

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, heads):
        super().__init__()
        self.h, self.dk = heads, d_model // heads
        self.qkv = nn.Linear(d_model, 3 * d_model, bias=False)
        self.proj = nn.Linear(d_model, d_model)

    def forward(self, x, mask=None):
        B, T, C = x.shape
        q, k, v = self.qkv(x).split(C, dim=2)
        q, k, v = (t.view(B, T, self.h, self.dk).transpose(1, 2) for t in (q, k, v))
        att = q @ k.transpose(-2, -1) / self.dk ** 0.5
        if mask is not None:
            att = att.masked_fill(mask, float("-inf"))
        out = F.softmax(att, dim=-1) @ v
        return self.proj(out.transpose(1, 2).contiguous().view(B, T, C))

x = torch.randn(2, 5, 32)
causal = torch.triu(torch.ones(5, 5, dtype=torch.bool), diagonal=1)
print(MultiHeadAttention(32, 4)(x, causal).shape)
