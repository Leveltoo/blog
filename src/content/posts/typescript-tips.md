---
title: "TypeScript 进阶技巧"
description: "提升 TypeScript 编程效率的实用技巧。"
date: "2024-03-10"
tags: ["TypeScript", "前端"]
slug: "typescript-tips"
---

# TypeScript 进阶技巧

TypeScript 是 JavaScript 的超集，为代码添加了类型系统。本文分享一些实用的进阶技巧。

## 1. 类型推断

TypeScript 的类型推断非常强大，很多时候不需要显式声明类型：

```typescript
// TypeScript 会自动推断为 number[]
const numbers = [1, 2, 3];

// 推断为 { name: string; age: number }
const person = { name: "Alice", age: 25 };
```

## 2. 泛型

泛型让函数和类可以适用于多种类型：

```typescript
function identity<T>(arg: T): T {
  return arg;
}

// 使用
const num = identity<number>(42);
const str = identity<string>("hello");
```

## 3. 类型守卫

使用类型守卫可以缩小类型范围：

```typescript
function processValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript 知道这里是 string
    return value.toUpperCase();
  } else {
    // TypeScript 知道这里是 number
    return value.toFixed(2);
  }
}
```

## 4. 工具类型

TypeScript 提供了许多内置的工具类型：

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// 可选属性
type PartialUser = Partial<User>;

// 只读
type ReadonlyUser = Readonly<User>;

// 挑选属性
type UserPreview = Pick<User, "id" | "name">;

// 排除属性
type UserWithoutEmail = Omit<User, "email">;
```

## 5. 条件类型

根据条件选择类型：

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false
```

## 总结

掌握这些技巧可以让你的 TypeScript 代码更加优雅和类型安全。
