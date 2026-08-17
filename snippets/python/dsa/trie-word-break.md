---
lang: python
topic: dsa
tier: 3
tags: [trie, dp, word-break]
note: Walk the trie from each start index; the DP marks which cut points are reachable.
---
def word_break(s, words):
    root = {}
    for w in words:
        node = root
        for ch in w:
            node = node.setdefault(ch, {})
        node["$"] = True

    reachable = [True] + [False] * len(s)
    for i in range(len(s)):
        if not reachable[i]:
            continue
        node = root
        for j in range(i, len(s)):
            node = node.get(s[j])
            if node is None:
                break
            if "$" in node:
                reachable[j + 1] = True
    return reachable[-1]

print(word_break("applepenapple", ["apple", "pen"]), word_break("catsandog", ["cats", "dog", "sand"]))
