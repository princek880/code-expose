---
lang: python
topic: ml
tier: 2
tags: [pytorch, device, cuda]
note: Pick the device once and move both model and batch; a mixed-device op is a hard error.
---
import torch
import torch.nn as nn

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = nn.Linear(4, 2).to(device)
x = torch.randn(8, 4, device=device)

out = model(x)
print(out.device.type == device.type, out.shape)
cpu_copy = out.detach().cpu().numpy()
print(cpu_copy.shape, next(model.parameters()).device.type)
