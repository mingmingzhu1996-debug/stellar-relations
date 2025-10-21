# 星际关系 | Stellar Relations

🌌 AI占星应用 - Web演示版本

## 项目介绍

星际关系是一个创新的AI占星应用，将Sintra的"24小时在线AI员工"模式与占星玄学结合，通过多个AI占星师角色帮助女性用户解决人际关系困惑。

**核心特点：**
- 🎨 深空占星美学 - 沉浸式星空背景 + 毛玻璃效果
- 🤖 AI主动对话 - 打破传统功能感，AI主动引导
- ✨ 打字动画 - 逐字显示，真实感AI回复
- 🌟 纯Web技术 - 无需构建工具，双击即可运行

## 快速开始

### 1. 打开应用

**方法一：直接打开**
- 双击 `index.html` 文件
- 在浏览器中打开即可

**方法二：本地服务器**（推荐，避免某些浏览器限制）
```bash
# Python 3
python3 -m http.server 8000

# 或使用 Node.js
npx http-server -p 8000

# 然后访问 http://localhost:8000
```

### 2. 体验功能

1. **3个AI占星师** - 页面顶部可切换Luna（恋爱）、Atlas（职场）、Ceres（家庭）
2. **Luna引导流程** - Luna会主动对话，引导你输入出生信息
3. **AI切换体验** - 点击不同AI，体验不同人设的对话风格
4. **AI对话** - 与AI聊天，体验打字动画和智能回复
5. **星空背景** - 欣赏流畅的Canvas星空动画
6. **星空关系图谱** - 点击右上角🌌按钮，查看人际关系可视化
7. **合盘分析** - 点击右上角💕按钮，分析双人星座配对
8. **会员升级** - 输入"升级"、"深度分析"等关键词，体验AI引导付费流程
9. **对话记忆** - 刷新页面，对话历史自动恢复

## 项目结构

```
stellar-relations/
├── index.html              # 首页（Luna引导流程 + 3个AI切换）
├── starmap.html            # 星空关系图谱页面
├── synastry.html           # 合盘分析页面
├── css/
│   ├── variables.css       # 设计系统变量
│   ├── common.css          # 公共样式
│   └── animations.css      # 动画样式
├── js/
│   ├── components/
│   │   ├── starfield.js    # 星空背景引擎
│   │   ├── ai-chat.js      # AI对话组件（含LocalStorage）
│   │   └── relationship-graph.js  # 关系图谱Canvas组件
│   ├── data/
│   │   └── ai-personas.js  # AI人设数据（含会员升级对话）
│   └── utils/
│       ├── storage.js      # LocalStorage管理器
│       └── synastry-analyzer.js  # 合盘分析算法
├── DEPLOYMENT.md           # 部署文档
└── README.md               # 本文档
```

## 技术栈

- HTML5 (Canvas API)
- CSS3 (变量、Grid、Flexbox、backdrop-filter、动画)
- JavaScript ES6+ (模块化、异步、DOM操作)

**无任何第三方库依赖！**

## 核心功能

### 已实现 ✅

- [x] 星空背景动画（1000颗星 + 闪烁效果）
- [x] Luna对话式引导流程
- [x] AI打字动画（逐字显示）
- [x] 毛玻璃效果卡片
- [x] 响应式设计（移动端适配）
- [x] AI智能回复（关键词匹配）
- [x] **3个AI横向切换界面** - Luna/Atlas/Ceres实时切换
- [x] **多AI对话系统** - 支持3个AI角色独立对话
- [x] **LocalStorage对话记忆** - 刷新页面保留对话历史
- [x] **星空关系图谱** - Canvas可视化人际关系网络
- [x] **合盘分析页面** - 双人星座配对分析
- [x] **会员升级AI对话流程** - 3个AI通过对话引导付费

### 计划中 📋

- [ ] 真实占星API集成
- [ ] 会员支付集成（Stripe）
- [ ] 更多AI人设（扩展到12个）
- [ ] 星盘可视化（完整轮盘图）

## 设计规范

基于 `DESIGN_SPEC.md` 实现：

**色彩系统：**
- 主色：星夜紫 `#6B4FE0`
- 背景：深空蓝黑渐变 `#1A1B3D` → `#2D1B4E`
- AI角色色：Luna粉 `#FF6B9D`、Atlas蓝 `#4E9FFF`、Ceres绿 `#00D4AA`

**字体系统：**
- 中文：PingFang SC（苹方）
- 英文：SF Pro Display
- 字号：11px - 28px

**间距系统：**
- 基于8px网格
- 4px、8px、12px、16px、24px、32px、48px

## 浏览器兼容性

- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

**注意：** `backdrop-filter` 需要现代浏览器支持

## 性能优化

- ✅ Canvas使用 `requestAnimationFrame`
- ✅ 设备像素比适配（Retina显示屏）
- ✅ 移动端减少星星数量（性能优化）
- ✅ CSS动画使用GPU加速（`transform3d`）

## 开发者说明

### 修改AI回复

编辑 `js/data/ai-personas.js` 文件，修改 `AI_PERSONAS` 对象中的关键词和回复。

### 调整星空效果

编辑 `js/components/starfield.js` 文件，修改配置参数：
```javascript
starCount: 1000,    // 星星数量
minSize: 0.5,       // 最小大小
maxSize: 2.5,       // 最大大小
```

### 自定义样式

编辑 `css/variables.css` 文件，修改CSS变量。

## 截图

（待补充）

## 许可证

本项目仅用于演示目的。

## 联系方式

如有问题或建议，请联系开发团队。

---

**Made with 💫 by AI Team**
