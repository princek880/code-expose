---
lang: python
topic: ml
tier: 2
tags: [pytorch, dataset, dataloader]
note: A Dataset needs only __len__ and __getitem__; the DataLoader supplies batching and shuffling.
---
import torch
from torch.utils.data import Dataset, DataLoader

class Windows(Dataset):
    def __init__(self, series, width):
        self.series, self.width = series, width

    def __len__(self):
        return len(self.series) - self.width

    def __getitem__(self, i):
        x = self.series[i:i + self.width]
        y = self.series[i + self.width]
        return x.clone(), y.clone()

data = torch.arange(100, dtype=torch.float32)
loader = DataLoader(Windows(data, 8), batch_size=16, shuffle=True, drop_last=True)
xb, yb = next(iter(loader))
print(xb.shape, yb.shape, len(loader))
