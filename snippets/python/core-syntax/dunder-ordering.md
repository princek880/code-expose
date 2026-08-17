---
lang: python
topic: core-syntax
tier: 3
tags: [dunder, ordering, total-ordering]
note: total_ordering fills in the other three comparisons from __eq__ and __lt__.
---
from functools import total_ordering

@total_ordering
class Card:
    order = "23456789TJQKA"

    def __init__(self, rank):
        self.rank = rank

    def __eq__(self, other):
        return self.rank == other.rank

    def __lt__(self, other):
        return self.order.index(self.rank) < self.order.index(other.rank)

hand = [Card(r) for r in "K3A9"]
print([c.rank for c in sorted(hand)], Card("A") >= Card("K"))
