# 星际关系 | Stellar Relations

🌌 AI占星应用 - 快速部署指南

---

## 🚀 3步快速部署到Vercel

### 步骤1：安装Vercel CLI

```bash
npm install -g vercel
```

### 步骤2：登录并部署

```bash
cd /Users/ming/ai\ 员工/stellar-relations
vercel login
vercel
```

### 步骤3：访问你的应用

部署完成后，Vercel会提供链接：
```
✅ Production: https://stellar-relations.vercel.app
```

---

## 📁 项目部署文件

本项目已包含完整的部署配置：

```
stellar-relations/
├── vercel.json          # Vercel部署配置
├── .gitignore           # Git忽略文件
├── DEPLOYMENT.md        # 详细部署文档
├── index.html           # 应用入口
├── css/                 # 样式文件
├── js/                  # JavaScript文件
└── README.md            # 项目说明
```

---

## 📖 详细文档

完整的部署指导请查看：**[DEPLOYMENT.md](./DEPLOYMENT.md)**

包含：
- 详细部署步骤（CLI + 网页端）
- 自定义域名配置
- 性能监控设置
- 常见问题解决
- 安全最佳实践

---

## ✅ 部署检查清单

- [ ] 安装Vercel CLI
- [ ] 执行 `vercel` 命令部署
- [ ] 访问生产链接测试
- [ ] 测试星空动画
- [ ] 测试AI对话功能
- [ ] 移动端访问测试
- [ ] （可选）绑定自定义域名

---

## 🔄 更新部署

修改代码后重新部署：

```bash
vercel --prod
```

或使用Git自动部署：

```bash
git add .
git commit -m "更新功能"
git push origin main
# Vercel自动检测并重新部署
```

---

## 🎯 下一步

应用已上线！你可以：

1. **分享给用户测试** - 获取真实反馈
2. **继续开发功能** - 添加3个AI切换、星图等
3. **监控数据** - 使用Vercel Analytics查看访问量

---

**需要帮助？** 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取详细指导！

---

Made with 💫 by AI Team
