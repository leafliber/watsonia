# Watsonia

[![Astro v5](https://img.shields.io/badge/Astro-v5-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![React v18](https://img.shields.io/badge/React-v18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS v3](https://img.shields.io/badge/Tailwind_CSS-v3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion v11](https://img.shields.io/badge/Framer_Motion-v11-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![TypeScript v5](https://img.shields.io/badge/TypeScript-v5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Iconify React v6](https://img.shields.io/badge/Iconify_React-v6-2E74F3)](https://iconify.design/)
[![Wrangler v4](https://img.shields.io/badge/Cloudflare_Wrangler-v4-F38020?logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/workers/wrangler/)

[演示站](https://airo.cc) ｜ [仓库地址](https://github.com/leafliber/watsonia)

## ✨ 特色

- 🚀 基于 Astro 5 的静态站点，开箱就快
- 🎨 玻璃态与渐变视觉，贴近现代 UI
- 💫 React 动画配合 Framer Motion，流畅自然
- �️ 自定义动态光标（`AnimatedCursor`）与粒子背景
- ⌨️ 可配置的打字机效果（`Typewriter`）：支持 loopOnce、无初始停顿、速度可调
- 🧩 内容完全外置在 `content.json`，改文案不碰组件
- ☁️ 一键部署到 Cloudflare Workers（`wrangler.jsonc` 已配置）

## 🛠️ 技术栈

- [Astro](https://astro.build/) · [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) · [Framer Motion](https://www.framer.com/motion/)
- [Iconify](https://iconify.design/) · [TypeScript](https://www.typescriptlang.org/)
- [Cloudflare Workers](https://workers.cloudflare.com/)

## 📦 快速开始

前置要求：Node.js 18+，npm。

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# Cloudflare 预览（首次需 wrangler 登录）
npm run preview
```

## 🚀 部署到 Cloudflare

项目内置 `wrangler.jsonc`，会将 `dist` 作为静态资源目录进行托管。

```bash
# 登录 Cloudflare（首次）
npx wrangler login

# 本地模拟 Workers 环境（构建 + 预览）
npm run cf:dev

# 发布到 Cloudflare Workers
npm run cf:deploy
```

也可以在 Cloudflare Dashboard 连接 Git 仓库，构建命令用 `npm run build`，输出目录为 `dist`。

同时可以参考官方文档：[Deploy an Astro site](https://docs.astro.build/en/guides/deploy/)

## 📝 改内容

所有文案都在 `src/data/content.json`：

- `site`：标题/描述/语言
- `navbar`：品牌名与导航项
- `hero`：标题（打字机多文本）、副标题、描述
- `info`：关于我与功能特性（支持 Iconify 图标）
- `skills`：技能列表（跑马灯）
- `links`：社交链接（Iconify 图标名）
- `footer`：备案与署名

Iconify 图标直接填名称即可，例如：`fa6-brands:github`、`mdi:robot-outline`、`ic:baseline-email`。

## 🎨 组件清单

Astro 组件：`Hero.astro`、`InfoAnimated.astro`、`Skills.astro`、`Links.astro`、`Navbar.astro`、`Footer.astro`

React 组件：

- `AnimatedCard.tsx`：卡片悬停动画与进场效果
- `AnimatedCursor.tsx`：自定义光标
- `ParticleBackground.tsx`：粒子背景
- `Typewriter.tsx`：打字机动画（支持 loopOnce、可调速、停顿控制）

## 📁 项目结构

```
wanvisa/
├── src/
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── InfoAnimated.astro
│   │   ├── Skills.astro
│   │   ├── Links.astro
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── AnimatedCard.tsx
│   │   ├── AnimatedCursor.tsx
│   │   ├── ParticleBackground.tsx
│   │   └── Typewriter.tsx
│   ├── data/
│   │   └── content.json
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── wrangler.jsonc
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

## 🔧 配置说明

### Astro（`astro.config.mjs`）

- 集成 React 与 Tailwind（关闭基础样式）
- Cloudflare 适配器默认注释，当前走静态构建 + Workers 托管 `dist`

### Wrangler（`wrangler.jsonc`）

- `assets.directory` 指向 `./dist`，搭配 `npm run build` 即可部署

### 样式

- 全局样式在 `src/styles/global.css`
- 包含自定义光标、玻璃态、渐变与滚动条样式

## 🧪 小贴士：Typewriter 用法

`Typewriter` 支持这些常用参数：

- `words: string[]` 多段文本
- `typingSpeed?: number` 打字速度（ms/字符）
- `deletingSpeed?: number` 删除速度（ms/字符）
- `pauseDuration?: number` 单词结尾停顿
- `deletePauseDuration?: number` 删除后停顿
- `loopOnce?: boolean` 只循环一遍后停在首个词

示例（见 `Hero.astro`）：

```tsx
<Typewriter
  words={["Hi, 我是 Leafiber", "欢迎来到我的主页"]}
  typingSpeed={100}
  deletingSpeed={50}
  pauseDuration={2000}
  deletePauseDuration={500}
  loopOnce={true}
/>
```

## 📄 许可证

Apache License 2.0

## 🤝 参与贡献

欢迎提交 Issue 和 PR！

1) Fork 仓库  2) 创建分支  3) 提交更改  4) 发起 PR

## 🐛 反馈

有问题请提 [Issues](https://github.com/leafliber/watsonia/issues)。

—— 用 ❤️ 和 Astro 打造，部署在 Cloudflare Workers
