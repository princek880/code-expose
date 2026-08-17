---
lang: python
topic: functional-meta
tier: 4
tags: [metaclass, type, registry]
note: A metaclass runs at class creation, so it is the hook for registration and validation.
---
class Registry(type):
    plugins = {}

    def __new__(mcls, name, bases, ns, **kwargs):
        cls = super().__new__(mcls, name, bases, ns)
        if bases:
            Registry.plugins[ns.get("key", name.lower())] = cls
        return cls

class Plugin(metaclass=Registry):
    pass

class JsonPlugin(Plugin):
    key = "json"

class CsvPlugin(Plugin):
    key = "csv"

print(sorted(Registry.plugins), type(Plugin), isinstance(JsonPlugin, Registry))
