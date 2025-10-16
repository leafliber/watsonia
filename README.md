# Watsonia - 现代化创意作品集

一个基于 Astro 框架构建的个人主页，具有炫酷动画效果和响应式设计，支持一键部署到 Cloudflare。

## ✨ 特性

- 🚀 **高性能**: 使用 Astro 5 框架，实现极致的加载速度
- 🎨 **精美设计**: 渐变色彩和玻璃态效果
- 💫 **炫酷动画**: 使用 Framer Motion 实现流畅动画
- 📱 **响应式设计**: 完美适配各种设备尺寸
- 🎯 **模块化**: 内容与页面结构完全分离
- 🌈 **现代化**: 使用最新的 Web 技术栈
- 🎨 **图标库**: 集成 Iconify，支持 150,000+ 图标
- ☁️ **边缘部署**: 支持部署到 Cloudflare Workers
- 🖱️ **自定义光标**: 动态交互光标效果

## 🛠️ 技术栈

- [Astro 5](https://astro.build/) - 现代化 Web 框架
- [React 18](https://react.dev/) - 交互组件
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Framer Motion](https://www.framer.com/motion/) - React 动画库
- [Iconify](https://iconify.design/) - 统一的图标框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Cloudflare Workers](https://workers.cloudflare.com/) - 边缘计算平台

## 📦 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 🚀 部署到 Cloudflare

### 使用 Wrangler CLI 部署

```bash
# 登录 Cloudflare
npx wrangler login

# 本地预览（模拟 Cloudflare 环境）
npm run preview

# 构建并本地测试
npm run cf:dev

# 部署到 Cloudflare Workers
npm run cf:deploy
```

### 通过 Cloudflare Dashboard 部署

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 Workers & Pages
3. 连接你的 Git 仓库
4. 设置构建命令：`npm run build`
5. 设置输出目录：`dist`
6. 点击部署

### 环境要求

- Node.js 18 或更高版本
- 已安装 Wrangler CLI（`npm install -g wrangler`）
- Cloudflare 账号

## 📝 自定义内容

所有页面内容都在 `src/data/content.json` 文件中配置，你可以轻松修改：

### 站点信息
- 网站标题、描述和语言

### Hero 区块
- 标题和打字机效果文本
- 副标题和描述

### Info 区块  
- 个人介绍
- 功能特性（支持 Iconify 图标）

### Skills 区块
- 技能列表（跑马灯展示）

### Links 区块
- 社交媒体链接（支持 Iconify 图标）
  - GitHub、哔哩哔哩、LinkedIn、Email 等

### Footer 区块
- 版权信息和备案号

### 图标使用

项目集成了 [Iconify](https://icones.js.org/)，支持 150,000+ 图标：

```json
{
  "icon": "fa6-brands:github",     // GitHub
  "icon": "fa6-brands:bilibili",   // 哔哩哔哩
  "icon": "mdi:robot-outline",     // 机器人
  "icon": "ic:baseline-email"      // Email
}
```

查看 `ICONIFY_GUIDE.md` 获取更多图标使用说明。

## 🎨 组件说明

### Astro 组件

- **Hero.astro** - 首屏欢迎区块，包含打字机动画和背景效果
- **InfoAnimated.astro** - 关于我区块，展示个人介绍和核心特性
- **Skills.astro** - 技能展示，使用跑马灯效果展示技术栈
- **Links.astro** - 快速链接区块，展示社交媒体链接
- **Navbar.astro** - 导航栏，支持平滑滚动和移动端菜单
- **Footer.astro** - 页脚区块，包含版权信息和返回顶部按钮

### React 组件

- **AnimatedCard.tsx** - 带动画的卡片组件，用于展示功能特性
- **AnimatedCursor.tsx** - 自定义光标效果，跟随鼠标移动
- **ParticleBackground.tsx** - 粒子背景动画，包含大型光球和小粒子
- **Typewriter.tsx** - 打字机效果组件，支持多文本循环

## 🎯 项目结构

```
wanvisa/
├── src/
│   ├── components/          # 组件目录
│   │   ├── Hero.astro
│   │   ├── InfoAnimated.astro
│   │   ├── Skills.astro
│   │   ├── Links.astro
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── AnimatedCard.tsx      # 动画卡片
│   │   ├── AnimatedCursor.tsx    # 自定义光标
│   │   ├── ParticleBackground.tsx # 粒子背景
│   │   └── Typewriter.tsx        # 打字机效果
│   ├── data/                # 数据目录
│   │   └── content.json     # 内容配置文件
│   ├── layouts/             # 布局目录
│   │   └── Layout.astro
│   ├── pages/               # 页面目录
│   │   └── index.astro
│   └── styles/              # 样式目录
│       └── global.css       # 全局样式和动画
├── public/                  # 静态资源
│   └── favicon.svg
├── astro.config.mjs         # Astro 配置
├── wrangler.toml            # Cloudflare Workers 配置
├── tailwind.config.mjs      # Tailwind 配置
├── tsconfig.json            # TypeScript 配置
├── package.json             # 项目配置
├── README.md                # 项目说明
├── ICONIFY_GUIDE.md         # 图标使用指南
└── OPTIMIZATION_SUMMARY.md  # 优化总结
```

## 🔧 配置说明

### Astro 配置 (`astro.config.mjs`)
- React 集成用于交互组件
- Tailwind CSS 集成（禁用基础样式）
- Cloudflare 适配器（可选，用于部署）

### Wrangler 配置 (`wrangler.toml`)
- 配置 Cloudflare Workers 部署
- 静态资源托管配置
- 兼容性标志和环境变量

### 样式配置
- 全局样式和动画定义在 `src/styles/global.css`
- 自定义光标效果（隐藏默认光标）
- 玻璃态效果和渐变动画
- 自定义滚动条样式

## 🎯 性能优化

项目已进行以下优化：

- ✅ 删除冗余组件和代码
- ✅ 合并背景动画组件
- ✅ 优化事件监听器（使用 passive）
- ✅ 统一动画定义到 CSS
- ✅ 优化光标组件（减少 23.2% 体积）
- ✅ 预连接外部资源（Iconify API）
- ✅ 使用 requestAnimationFrame 优化动画
- ✅ 代码分割和按需加载

查看 `OPTIMIZATION_SUMMARY.md` 获取详细优化说明。

## 📚 文档

- `README.md` - 项目说明（本文件）
- `ICONIFY_GUIDE.md` - 图标库使用指南
- `OPTIMIZATION_SUMMARY.md` - 性能优化总结

## 🌟 灵感来源

设计灵感来自现代 Web 设计趋势，融合了玻璃态设计和流畅动画效果。

## 📄 许可证

Apache License 2.0

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 🐛 问题反馈

如果遇到问题，请在 [GitHub Issues](https://github.com/leafliber/watsonia/issues) 提交。

---

用 ❤️ 和 Astro 构建 | 部署在 Cloudflare Workers
