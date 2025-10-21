# 星际关系 - 部署指导文档

## 📋 部署方案概览

**平台：** Vercel
**类型：** 静态网站托管
**费用：** 免费
**部署时间：** 约3分钟

---

## 🚀 快速部署（3步上线）

### 方法一：Vercel CLI 部署（推荐）

#### 第1步：安装Vercel CLI

```bash
# 使用npm安装
npm install -g vercel

# 或使用yarn
yarn global add vercel
```

#### 第2步：登录Vercel

```bash
vercel login
```

根据提示选择登录方式（GitHub/GitLab/Bitbucket/Email）

#### 第3步：部署项目

```bash
# 进入项目目录
cd /Users/ming/ai\ 员工/stellar-relations

# 执行部署
vercel

# 首次部署会提示：
# ? Set up and deploy "~/stellar-relations"? [Y/n] y
# ? Which scope do you want to deploy to? (选择你的账号)
# ? Link to existing project? [y/N] n
# ? What's your project's name? stellar-relations
# ? In which directory is your code located? ./
```

部署完成后，Vercel会提供：
- **预览链接**（临时）：https://stellar-relations-xxx.vercel.app
- **生产链接**（永久）：https://stellar-relations.vercel.app

---

### 方法二：Vercel网页端部署

#### 第1步：访问Vercel

打开 [vercel.com](https://vercel.com) 并登录（使用GitHub账号最方便）

#### 第2步：导入项目

1. 点击 "Add New..." → "Project"
2. 选择 "Import Git Repository" 或 "Deploy from Directory"

**如果使用Git：**
- 将项目推送到GitHub
- 在Vercel中选择该仓库
- 点击 "Import"

**如果直接上传：**
- 点击 "Browse" 选择项目文件夹
- 或拖拽 `stellar-relations` 文件夹到浏览器

#### 第3步：配置项目

```
Framework Preset: Other (或选择 "Static")
Root Directory: ./
Build Command: (留空)
Output Directory: ./
Install Command: (留空)
```

#### 第4步：部署

点击 "Deploy" 按钮，等待约30秒部署完成！

---

## 🔧 配置说明

### vercel.json 配置文件

已为你创建 `vercel.json` 配置文件，包含：

**安全头部：**
- `X-Content-Type-Options: nosniff` - 防止MIME类型嗅探
- `X-Frame-Options: DENY` - 防止点击劫持
- `X-XSS-Protection` - XSS防护
- `Referrer-Policy` - 引用策略

**缓存优化：**
- CSS/JS文件缓存1年（文件名不变时使用缓存）
- HTML文件不缓存（确保更新及时生效）

---

## 🌐 自定义域名（可选）

### 步骤1：在Vercel添加域名

1. 进入项目 Settings → Domains
2. 输入你的域名（如 `stellar-relations.com`）
3. 点击 "Add"

### 步骤2：配置DNS

在你的域名注册商（阿里云/腾讯云/GoDaddy等）添加DNS记录：

```
类型: CNAME
名称: www (或 @)
值: cname.vercel-dns.com
```

或使用A记录：
```
类型: A
名称: @
值: 76.76.21.21
```

等待DNS生效（通常5-30分钟），Vercel会自动配置HTTPS证书！

---

## 📊 部署后验证

### 检查清单

- [ ] 访问部署链接，页面正常显示
- [ ] 星空背景动画正常运行
- [ ] Luna的打字动画正常显示
- [ ] 输入框可以正常输入和发送消息
- [ ] AI回复功能正常
- [ ] 移动端访问正常（用手机浏览器测试）
- [ ] HTTPS证书正常（浏览器地址栏显示锁图标）

### 测试用例

1. **首次访问**
   - 打开部署链接
   - 应该看到Luna的欢迎消息逐字显示

2. **对话功能**
   - 输入 "我想了解爱情运势"
   - 应该收到Luna的占星回复

3. **移动端适配**
   - 用手机访问
   - 界面应该自动适配屏幕尺寸

---

## 🔄 更新部署

### 方法1：使用Vercel CLI

```bash
# 进入项目目录
cd /Users/ming/ai\ 员工/stellar-relations

# 修改代码后，重新部署
vercel --prod
```

### 方法2：Git自动部署（推荐）

如果使用Git仓库：

```bash
# 提交更改
git add .
git commit -m "更新功能"
git push origin main

# Vercel会自动检测到推送并重新部署！
```

### 方法3：网页端重新部署

1. 登录 vercel.com
2. 进入项目
3. 点击 "Deployments"
4. 点击最新部署右侧的 "..." → "Redeploy"

---

## 🐛 常见问题

### Q1: 部署后页面是空白的？

**可能原因：**
- 检查浏览器控制台是否有JavaScript错误
- 确认所有文件路径正确（相对路径）

**解决方案：**
```bash
# 本地测试
cd /Users/ming/ai\ 员工/stellar-relations
python3 -m http.server 8000
# 访问 http://localhost:8000 确认本地正常
```

### Q2: 星空背景不显示？

**检查：**
- `js/components/starfield.js` 文件是否存在
- 浏览器是否支持Canvas API
- 检查控制台是否有 "StarField is not defined" 错误

### Q3: CSS样式没有生效？

**检查：**
- `css/variables.css`、`css/common.css` 路径是否正确
- 查看Network面板，CSS文件是否成功加载（200状态）

### Q4: 移动端显示异常？

**确认：**
- `<meta name="viewport">` 标签是否存在
- CSS中的响应式断点是否正确

---

## 📈 性能监控

### Vercel Analytics（可选）

1. 进入项目 Settings → Analytics
2. 启用 "Web Analytics"
3. 可以查看：
   - 页面访问量
   - 加载速度
   - Core Web Vitals指标

### 浏览器开发者工具

使用Chrome DevTools检查性能：
```
F12 → Lighthouse → Generate report
```

关注指标：
- **LCP**（Largest Contentful Paint）< 2.5s
- **FID**（First Input Delay）< 100ms
- **CLS**（Cumulative Layout Shift）< 0.1

---

## 🔐 安全建议

### 当前已配置

✅ HTTPS自动启用
✅ 安全响应头（XSS、点击劫持防护）
✅ CORS默认限制

### 未来升级建议

如果需要添加后端功能（AI API调用等）：

1. **使用环境变量存储API密钥**
   ```bash
   # 在Vercel项目设置中添加
   Settings → Environment Variables
   ```

2. **使用Vercel Serverless Functions**
   ```javascript
   // api/chat.js
   export default function handler(req, res) {
     // 调用AI API
     res.json({ message: "..." });
   }
   ```

3. **添加速率限制**
   - 防止滥用API

---

## 📞 技术支持

### Vercel官方文档
- [Vercel文档](https://vercel.com/docs)
- [部署静态网站](https://vercel.com/docs/concepts/get-started/deploy)

### 本项目相关
- 查看 `README.md` 了解项目结构
- 查看 `DESIGN_SPEC.md` 了解设计规范

---

## 🎉 部署完成检查表

部署成功后，请确认：

- [ ] 获得了生产环境URL（如 `https://stellar-relations.vercel.app`）
- [ ] 访问URL，应用正常运行
- [ ] 星空动画流畅，打字效果正常
- [ ] 移动端访问体验良好
- [ ] HTTPS证书有效
- [ ] （可选）绑定了自定义域名

---

**🎊 恭喜！你的星际关系应用已经成功部署上线！**

现在你可以：
1. 分享链接给朋友测试
2. 继续开发新功能（本地开发 → 推送 → 自动部署）
3. 监控访问数据和性能指标

需要帮助？随时联系开发团队！✨
