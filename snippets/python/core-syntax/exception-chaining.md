---
lang: python
topic: core-syntax
tier: 3
tags: [exceptions, raise-from]
note: raise ... from sets __cause__; a bare raise inside except sets __context__ instead.
---
class ConfigError(Exception):
    pass

def load(raw):
    try:
        return int(raw["timeout"])
    except KeyError as exc:
        raise ConfigError("timeout missing") from exc
    except ValueError:
        raise ConfigError("timeout not an int") from None

try:
    load({})
except ConfigError as e:
    print(type(e.__cause__).__name__)
