---
title: "React Hooks 完全指南"
description: "深入理解 React Hooks 的工作原理和最佳实践。"
date: "2024-02-20"
tags: ["React", "前端", "JavaScript"]
slug: "react-hooks-guide"
---

# React Hooks 完全指南

React Hooks 是 React 16.8 引入的新特性，它让我们在函数组件中使用状态和其他 React 特性。

## 为什么要使用 Hooks？

### 1. 更简洁的代码

使用 Hooks 之前，我们需要写类组件：

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

使用 Hooks 后：

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### 2. 逻辑复用更简单

自定义 Hooks 让我们可以轻松复用状态逻辑：

```jsx
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}
```

## 常用 Hooks

### useState

管理组件状态：

```jsx
const [state, setState] = useState(initialValue);
```

### useEffect

处理副作用：

```jsx
useEffect(() => {
  // 副作用代码
  return () => {
    // 清理函数
  };
}, [dependencies]);
```

### useContext

访问 React Context：

```jsx
const value = useContext(MyContext);
```

## 最佳实践

1. **只在最顶层调用 Hooks**，不要在循环、条件或嵌套函数中调用
2. **只在 React 函数中调用 Hooks**
3. **使用 ESLint 插件** `eslint-plugin-react-hooks` 来自动检查规则

## 总结

Hooks 彻底改变了我们编写 React 组件的方式，让代码更加简洁、可复用。
