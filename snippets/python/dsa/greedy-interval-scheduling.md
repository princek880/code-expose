---
lang: python
topic: dsa
tier: 2
tags: [greedy, intervals, exchange-argument]
note: Sort by end time: the earliest finisher always leaves the most room for the rest.
---
def max_non_overlapping(intervals):
    count, last = 0, float("-inf")
    for start, end in sorted(intervals, key=lambda iv: iv[1]):
        if start >= last:
            count += 1
            last = end
    return count

def min_rooms(intervals):
    starts = sorted(s for s, _ in intervals)
    ends = sorted(e for _, e in intervals)
    rooms = best = j = 0
    for s in starts:
        while ends[j] <= s:
            rooms -= 1
            j += 1
        rooms += 1
        best = max(best, rooms)
    return best

ivs = [(1, 3), (2, 5), (4, 7), (6, 8)]
print(max_non_overlapping(ivs), min_rooms(ivs))
