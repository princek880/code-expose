---
lang: python
topic: core-syntax
tier: 2
tags: [argparse, cli]
note: Keep parser construction in its own function so tests can build it without sys.argv.
---
import argparse

def build_parser():
    p = argparse.ArgumentParser(prog="ctype", description="drill code")
    p.add_argument("path", type=str)
    p.add_argument("-n", "--count", type=int, default=10)
    p.add_argument("--tier", choices=("1", "2", "3", "4"), action="append")
    p.add_argument("-v", "--verbose", action="store_true")
    return p

if __name__ == "__main__":
    args = build_parser().parse_args(["x.md", "-n", "3", "--tier", "2", "-v"])
    print(args.path, args.count, args.tier, args.verbose)
