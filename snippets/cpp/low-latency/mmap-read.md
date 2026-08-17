---
lang: cpp
topic: low-latency
tier: 4
tags: [mmap, zero-copy, posix]
note: mmap maps the file into the address space directly, so reading never copies through a buffer.
---
#include <fcntl.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <unistd.h>
#include <string_view>

struct MappedFile {
    void* data{nullptr};
    std::size_t size{0};
    int fd{-1};

    static MappedFile open(const char* path) {
        MappedFile m;
        m.fd = ::open(path, O_RDONLY);
        if (m.fd < 0) return m;
        struct stat st{};
        if (fstat(m.fd, &st) != 0) return m;
        m.size = static_cast<std::size_t>(st.st_size);
        if (m.size > 0) {
            m.data = mmap(nullptr, m.size, PROT_READ, MAP_PRIVATE, m.fd, 0);
        }
        return m;
    }

    std::string_view view() const {
        return {static_cast<const char*>(data), size};
    }

    ~MappedFile() {
        if (data && data != MAP_FAILED) munmap(data, size);
        if (fd >= 0) close(fd);
    }
};

int demo() {
    MappedFile f = MappedFile::open("/etc/hostname");
    return static_cast<int>(f.fd >= 0);
}
