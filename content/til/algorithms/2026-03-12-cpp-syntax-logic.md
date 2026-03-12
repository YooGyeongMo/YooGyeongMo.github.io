---
title: "헷갈리기 쉬운 C++ 문법 / 로직 정리"
date: "2026-03-12"
tags: ["C++", "STL", "정렬", "포인터"]
---

## 헷갈리기 쉬운 C++ 문법 / 로직 정리

알고리즘 문제를 풀면서 자주 헷갈리는 C++ 문법과 로직을 정리합니다.

### 1. 배열 정렬

```cpp
#include <algorithm>
#include <vector>

vector<int> v = {3, 1, 4, 1, 5};
sort(v.begin(), v.end()); // 오름차순
sort(v.begin(), v.end(), greater<int>()); // 내림차순
```

### 2. 포인터와 참조

```cpp
int a = 10;
int* ptr = &a;  // 포인터: 주소를 저장
int& ref = a;   // 참조: 별칭

*ptr = 20; // a == 20
ref = 30;  // a == 30
```

### 3. STL 컨테이너 순회

```cpp
// range-based for
for (auto& elem : v) {
    cout << elem << " ";
}

// iterator
for (auto it = v.begin(); it != v.end(); ++it) {
    cout << *it << " ";
}
```
