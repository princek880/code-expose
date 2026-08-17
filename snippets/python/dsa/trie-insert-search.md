---
lang: python
topic: dsa
tier: 2
tags: [trie, prefix]
note: A nested dict is a trie; the sentinel key is what separates "word" from "prefix".
---
END = "$"

def insert(root, word):
    node = root
    for ch in word:
        node = node.setdefault(ch, {})
    node[END] = True

def find(root, word):
    node = root
    for ch in word:
        if ch not in node:
            return None
        node = node[ch]
    return node

root = {}
for w in ("car", "cart", "cat", "dog"):
    insert(root, w)
print(find(root, "car") is not None, END in find(root, "car"))
print(END in (find(root, "ca") or {}), sorted(find(root, "ca")))
