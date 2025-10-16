# Watsonia 快速入门指南

## 🚀 快速开始

项目已经成功创建！现在开发服务器正在运行。

### 访问网站

在浏览器中打开：**http://localhost:4321/**

## 📝 自定义内容

### 1. 编辑页面内容

打开 `src/data/content.json` 文件，你可以修改：

```json
{
  "hero": {
    "title": "你的标题",
    "subtitle": "你的副标题",
    "description": "你的描述"
  },
  "info": {
    "title": "关于我",
    "content": "个人介绍...",
    "features": [...]
  },
  "skills": [...],
  "links": {...},
  "footer": {...}
}
```

### 2. 修改颜色主题

在 `tailwind.config.mjs` 中自定义颜色：

```javascript
theme: {
  extend: {
    // 修改这里的颜色值
    colors: {
      primary: '#9333ea',  // 紫色
      secondary: '#3b82f6', // 蓝色
      accent: '#ec4899',    // 粉色
    }
  }
}
```

### 3. 添加更多动画

所有动画都在 `tailwind.config.mjs` 的 `keyframes` 部分定义。

## 🎨 组件说明

### Hero 组件
- 位置：`src/components/Hero.astro`
- 功能：首屏展示区，包含渐变文字和浮动背景元素

### InfoAnimated 组件
- 位置：`src/components/InfoAnimated.astro`
- 功能：使用 React 动画卡片展示特性

### Skills 组件
- 位置：`src/components/Skills.astro`
- 功能：跑马灯效果展示技能

### Links 组件
- 位置：`src/components/Links.astro`
- 功能：社交媒体链接

### AnimatedCursor (React)
- 位置：`src/components/AnimatedCursor.tsx`
- 功能：自定义鼠标光标效果

### ParticleBackground (React)
- 位置：`src/components/ParticleBackground.tsx`
- 功能：浮动粒子背景

## 🛠️ 常用命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 类型检查
npm run astro check
```

## 🎯 项目特点

✅ **单页应用** - 所有内容在一个页面上滚动展示
✅ **内容分离** - 所有文字内容在 JSON 文件中配置
✅ **居中显示** - 所有内容区域自动居中对齐
✅ **响应式设计** - 完美适配手机、平板、桌面
✅ **炫酷动画** - 使用 Framer Motion 和 CSS 动画
✅ **玻璃态效果** - 现代化的半透明玻璃质感
✅ **渐变色彩** - 紫色、粉色、蓝色主题

## 📱 响应式断点

- 手机：< 768px
- 平板：768px - 1024px
- 桌面：> 1024px

## 🎨 设计灵感

设计参考了 [React Bits](https://www.reactbits.dev/)，采用：
- 深色背景渐变
- 玻璃态卡片
- 流畅的悬停动画
- 粒子背景效果
- 自定义光标

## 📦 技术栈

- **Astro 4.15** - 现代化静态站点生成器
- **React 18** - 用于交互组件
- **Tailwind CSS 3.4** - 实用优先的 CSS 框架
- **Framer Motion 11** - 专业级动画库
- **TypeScript 5** - 类型安全

## 🔧 进阶配置

### 添加新的页面区块

1. 在 `src/components/` 创建新组件
2. 在 `src/data/content.json` 添加对应数据
3. 在 `src/pages/index.astro` 导入并使用

### 修改动画效果

在组件中使用 Tailwind 的动画类：
- `animate-fade-in`
- `animate-slide-up`
- `animate-slide-down`
- `animate-float`
- `animate-glow`

## 🌟 下一步

1. 修改 `src/data/content.json` 中的内容
2. 替换社交媒体链接
3. 自定义颜色主题
4. 添加你的项目或作品展示
5. 部署到 Vercel、Netlify 或其他平台

## 🚀 部署

项目可以部署到任何静态托管平台：

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [GitHub Pages](https://pages.github.com/)

只需运行 `npm run build`，然后上传 `dist/` 文件夹即可。

---

祝你使用愉快！🎉
