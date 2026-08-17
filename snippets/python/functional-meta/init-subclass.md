---
lang: python
topic: functional-meta
tier: 3
tags: [init-subclass, hooks]
note: __init_subclass__ gives you a metaclass's registration hook without writing a metaclass.
---
class Handler:
    registry = {}

    def __init_subclass__(cls, route=None, **kwargs):
        super().__init_subclass__(**kwargs)
        if route:
            Handler.registry[route] = cls

    def handle(self):
        return type(self).__name__

class Home(Handler, route="/"):
    pass

class About(Handler, route="/about"):
    pass

print(sorted(Handler.registry), Handler.registry["/about"]().handle())
