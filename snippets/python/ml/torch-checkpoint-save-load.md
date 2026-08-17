---
lang: python
topic: ml
tier: 2
tags: [pytorch, checkpoint, state-dict]
note: Save state_dicts, not modules: a pickled module breaks the moment the class definition moves.
---
import io
import torch
import torch.nn as nn

model = nn.Sequential(nn.Linear(4, 8), nn.ReLU(), nn.Linear(8, 2))
opt = torch.optim.Adam(model.parameters(), lr=1e-3)

buffer = io.BytesIO()
torch.save({"epoch": 7, "model": model.state_dict(), "opt": opt.state_dict()}, buffer)

buffer.seek(0)
ckpt = torch.load(buffer, weights_only=True)
restored = nn.Sequential(nn.Linear(4, 8), nn.ReLU(), nn.Linear(8, 2))
restored.load_state_dict(ckpt["model"])
print(ckpt["epoch"], sorted(ckpt)[:2])
print(torch.allclose(model[0].weight, restored[0].weight))
