---
lang: python
topic: data
tier: 2
tags: [cleaning, strings, unicode]
note: Normalise unicode before comparing: two visually identical strings can differ byte for byte.
---
import unicodedata
import pandas as pd

s = pd.Series([" Ann-Marie ", "BOB  smith", "café", "  ", None])
cleaned = (
    s.str.normalize("NFC")
     .str.strip()
     .str.replace(r"\s+", " ", regex=True)
     .str.casefold()
     .replace("", None)
)
print(cleaned.tolist())
print(cleaned.str.len().tolist(), cleaned.isna().sum())
print(unicodedata.normalize("NFC", "café") == "café")
