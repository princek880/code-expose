---
lang: python
topic: ml
tier: 3
tags: [pytorch, positional-encoding, buffer]
note: register_buffer moves with .to(device) but is not a parameter, so no gradient is tracked.
---
import math
import torch
import torch.nn as nn

class SinusoidalPE(nn.Module):
    def __init__(self, d_model, max_len=512):
        super().__init__()
        pe = torch.zeros(max_len, d_model)
        pos = torch.arange(max_len).unsqueeze(1).float()
        div = torch.exp(torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model))
        pe[:, 0::2] = torch.sin(pos * div)
        pe[:, 1::2] = torch.cos(pos * div)
        self.register_buffer("pe", pe.unsqueeze(0))

    def forward(self, x):
        return x + self.pe[:, :x.size(1)]

pe = SinusoidalPE(16)
print(pe(torch.zeros(1, 4, 16)).shape, len(list(pe.parameters())), pe.pe.requires_grad)
