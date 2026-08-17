---
lang: python
topic: ml
tier: 3
tags: [pytorch, autograd, grad]
note: backward accumulates into .grad; retain_graph keeps the tape alive for a second backward pass.
---
import torch

x = torch.tensor([2.0, 3.0], requires_grad=True)
y = (x ** 3).sum() + x.prod()
y.backward(retain_graph=True)
print(x.grad)

x.grad.zero_()
g = torch.autograd.grad(y, x, create_graph=True)[0]
h = torch.autograd.grad(g.sum(), x)[0]
print(g.detach(), h)

with torch.no_grad():
    z = x * 2
print(z.requires_grad, x.detach().requires_grad)
