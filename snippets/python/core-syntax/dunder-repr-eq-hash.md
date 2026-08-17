---
lang: python
topic: core-syntax
tier: 2
tags: [dunder, hash, eq]
note: Define __hash__ whenever you define __eq__, or the type stops working in sets.
---
class Version:
    def __init__(self, major, minor):
        self.major, self.minor = major, minor

    def __repr__(self):
        return f"Version({self.major}, {self.minor})"

    def __eq__(self, other):
        return (self.major, self.minor) == (other.major, other.minor)

    def __hash__(self):
        return hash((self.major, self.minor))

print({Version(1, 0), Version(1, 0)}, Version(1, 2) == Version(1, 2))
