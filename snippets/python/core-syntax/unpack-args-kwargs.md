---
lang: python
topic: core-syntax
tier: 2
tags: [args, kwargs, unpacking]
note: Bare * ends positional parameters; everything after it is keyword-only.
---
def render(template, *rows, sep="|", **opts):
    body = sep.join(str(r) for r in rows)
    return template.format(body=body, **opts)

args = ("a", "b", "c")
kw = {"title": "t", "width": 4}
print(render("{title}:{body}:{width}", *args, sep=",", **kw))
