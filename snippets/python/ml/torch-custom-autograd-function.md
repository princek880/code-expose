---
lang: python
topic: ml
tier: 4
tags: [pytorch, autograd, custom-function]
note: save_for_backward stores what backward needs; the return count must match forward's inputs.
---
import torch

class ClampGrad(torch.autograd.Function):
    @staticmethod
    def forward(ctx, x, limit):
        ctx.save_for_backward(x)
        ctx.limit = limit
        return x.clamp(min=0)

    @staticmethod
    def backward(ctx, grad_out):
        (x,) = ctx.saved_tensors
        grad = grad_out * (x > 0).to(grad_out.dtype)
        return grad.clamp(-ctx.limit, ctx.limit), None

x = torch.tensor([-1.0, 0.5, 3.0], requires_grad=True)
out = ClampGrad.apply(x, 0.4)
out.backward(torch.tensor([1.0, 10.0, -10.0]))
print(out.detach(), x.grad)
