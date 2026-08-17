---
lang: cpp
topic: templates-meta
tier: 3
tags: [tag-dispatch, overload-resolution]
note: Tag dispatch pushes the branch into overload resolution, so no runtime if survives to the binary.
---
#include <iterator>

template <typename It>
void advance_impl(It& it, int n, std::random_access_iterator_tag) {
    it += n;
}

template <typename It>
void advance_impl(It& it, int n, std::input_iterator_tag) {
    while (n-- > 0) ++it;
}

template <typename It>
void my_advance(It& it, int n) {
    advance_impl(it, n, typename std::iterator_traits<It>::iterator_category{});
}

#include <list>
#include <vector>

int demo() {
    std::vector<int> v{1, 2, 3, 4, 5};
    std::list<int> l{1, 2, 3, 4, 5};
    auto vit = v.begin();
    auto lit = l.begin();
    my_advance(vit, 3);
    my_advance(lit, 2);
    return *vit + *lit;
}
