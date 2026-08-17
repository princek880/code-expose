---
lang: python
topic: core-syntax
tier: 4
tags: [generator, coroutine, send]
note: send resumes the generator and becomes the value of the yield expression.
---
def accumulator(start=0):
    total = start
    while True:
        received = yield total
        if received is None:
            break
        total += received

gen = accumulator(10)
print(next(gen))
print(gen.send(5), gen.send(7))
gen.close()
