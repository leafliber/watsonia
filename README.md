# Wanvisa - 现代化创意作品集

一个基于 Astro 框架构建的单页应用，具有炫酷动画效果和响应式设计。

## ✨ 特性

- 🚀 **高性能**: 使用 Astro 框架，实现极致的加载速度
- 🎨 **精美设计**: 渐变色彩和玻璃态效果
- 💫 **炫酷动画**: 使用 Framer Motion 实现流畅动画
- 📱 **响应式设计**: 完美适配各种设备尺寸
- 🎯 **模块化**: 内容与页面结构完全分离
- 🌈 **现代化**: 使用最新的 Web 技术栈

## 🛠️ 技术栈

- [Astro](https://astro.build/) - 静态站点生成器
- [React](https://react.dev/) - 交互组件
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Framer Motion](https://www.framer.com/motion/) - 动画库
- [TypeScript](https://www.typescriptlang.org/) - 类型安全

## 📦 安装

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 📝 自定义内容

所有页面内容都在 `src/data/content.json` 文件中配置，你可以轻松修改：

- Hero 区块的标题和描述
- Info 区块的介绍和特性
- Skills 技能列表
- Links 社交链接
- Footer 页脚信息

## 🎨 组件说明

### Hero
首屏欢迎区块，包含动画标题和炫酷背景效果

### Info
关于我区块，展示个人介绍和核心特性

### Skills
技能展示，使用跑马灯效果展示技术栈

### Links
快速链接区块，展示社交媒体链接

### Footer
页脚区块，包含版权信息和返回顶部按钮

## 🎯 项目结构

```
wanvisa/
├── src/
│   ├── components/      # 组件目录
│   │   ├── Hero.astro
│   │   ├── Info.astro
│   │   ├── Skills.astro
│   │   ├── Links.astro
│   │   ├── Footer.astro
│   │   ├── AnimatedCard.tsx
│   │   ├── AnimatedCursor.tsx
│   │   └── ParticleBackground.tsx
│   ├── data/           # 数据目录
│   │   └── content.json
│   ├── layouts/        # 布局目录
│   │   └── Layout.astro
│   ├── pages/          # 页面目录
│   │   └── index.astro
│   └── styles/         # 样式目录
│       └── global.css
├── public/             # 静态资源
├── astro.config.mjs    # Astro 配置
├── tailwind.config.mjs # Tailwind 配置
├── tsconfig.json       # TypeScript 配置
└── package.json        # 项目配置
```

## 🌟 灵感来源

设计灵感来自 [React Bits](https://www.reactbits.dev/)，一个提供精美 React 组件的开源库。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

用 ❤️ 和 Astro 构建
