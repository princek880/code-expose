---
lang: python
topic: ml
tier: 2
tags: [pytorch, eval, no-grad]
note: model.eval() changes dropout and batchnorm; no_grad only stops building the graph. Do both.
---
import torch
import torch.nn as nn

torch.manual_seed(0)
model = nn.Sequential(nn.Linear(4, 8), nn.Dropout(0.5), nn.Linear(8, 3))
X = torch.randn(32, 4)

model.train()
a, b = model(X), model(X)
model.eval()
with torch.no_grad():
    c, d = model(X), model(X)
print(torch.allclose(a, b), torch.allclose(c, d), c.requires_grad)
print(model(X).argmax(dim=1).shape)
