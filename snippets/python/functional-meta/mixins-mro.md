---
lang: python
topic: functional-meta
tier: 4
tags: [mixin, mro, super]
note: super() follows the MRO, not the base class, which is what makes cooperative mixins work.
---
class Base:
    def run(self):
        return ["base"]

class Logged:
    def run(self):
        return ["logged"] + super().run()

class Timed:
    def run(self):
        return ["timed"] + super().run()

class Job(Logged, Timed, Base):
    def run(self):
        return ["job"] + super().run()

print(Job().run())
print([c.__name__ for c in Job.__mro__])
print(Job.__mro__.index(Timed) < Job.__mro__.index(Base))
