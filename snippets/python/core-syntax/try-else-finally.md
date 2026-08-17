---
lang: python
topic: core-syntax
tier: 2
tags: [exceptions, control-flow]
note: else runs only when no exception fired, which keeps the try body minimal.
---
def parse_port(raw):
    try:
        port = int(raw)
    except (TypeError, ValueError):
        return None
    else:
        return port if 0 < port < 65536 else None
    finally:
        pass

print(parse_port("8080"), parse_port("x"), parse_port("99999"))
