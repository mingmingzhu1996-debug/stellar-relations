#!/bin/bash

echo "🚀 星际关系 - Vercel部署脚本"
echo "================================"
echo ""

# 进入项目目录
cd /Users/ming/ai\ 员工/stellar-relations

echo "📁 当前目录: $(pwd)"
echo ""

echo "📋 项目文件检查:"
ls -la | grep -E '(index.html|vercel.json|css|js)'
echo ""

echo "🔑 Vercel部署步骤："
echo ""
echo "请按照以下步骤操作："
echo ""
echo "1️⃣ 打开终端，进入项目目录："
echo "   cd /Users/ming/ai\ 员工/stellar-relations"
echo ""
echo "2️⃣ 登录Vercel（首次需要）："
echo "   npx vercel login"
echo ""
echo "3️⃣ 部署到生产环境："
echo "   npx vercel --prod"
echo ""
echo "4️⃣ 按提示操作："
echo "   - Set up and deploy? [Y/n] → 输入 Y"
echo "   - Which scope? → 选择你的账号"
echo "   - Link to existing project? [y/N] → 输入 N"
echo "   - What's your project's name? → stellar-relations"
echo "   - In which directory is your code located? → ./"
echo ""
echo "⏳ 部署大约需要2-3分钟"
echo ""
echo "✅ 部署完成后，你会获得："
echo "   - Preview URL: https://stellar-relations-xxx.vercel.app"
echo "   - Production URL: https://stellar-relations.vercel.app"
echo ""
echo "================================"
echo ""

# 显示Vercel配置
echo "📝 Vercel配置 (vercel.json):"
cat vercel.json
echo ""

echo "💡 提示："
echo "   - 如果你还没有Vercel账号，请先访问 https://vercel.com 注册"
echo "   - 建议使用GitHub账号登录，方便后续自动部署"
echo ""
