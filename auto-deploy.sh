#!/bin/bash

# 🚀 星际关系 - GitHub + Vercel 部署命令
# ==========================================

echo "🌟 星际关系 - 自动部署脚本"
echo "=========================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 步骤1：检查Git状态
echo -e "${BLUE}📋 步骤1/4: 检查Git仓库状态${NC}"
cd /Users/ming/ai\ 员工/stellar-relations
git status
echo ""

# 步骤2：提示创建GitHub仓库
echo -e "${YELLOW}📋 步骤2/4: 在GitHub创建仓库${NC}"
echo ""
echo "请按照以下步骤操作："
echo ""
echo "1. 打开浏览器访问: https://github.com/new"
echo ""
echo "2. 填写以下信息："
echo "   Repository name: stellar-relations"
echo "   Description: 🌌 星际关系 - AI占星应用 | 基于Sintra模式的多AI对话系统"
echo "   选择: ☑️ Public"
echo "   不要勾选: ❌ Add a README file"
echo ""
echo "3. 点击 'Create repository'"
echo ""
read -p "已创建GitHub仓库？按Enter继续..."
echo ""

# 步骤3：获取GitHub用户名
echo -e "${BLUE}📋 步骤3/4: 配置远程仓库${NC}"
echo ""
read -p "请输入你的GitHub用户名: " GITHUB_USERNAME
echo ""

if [ -z "$GITHUB_USERNAME" ]; then
    echo -e "${RED}❌ 错误: 用户名不能为空${NC}"
    exit 1
fi

# 检查是否已存在远程仓库
if git remote | grep -q "origin"; then
    echo "检测到已存在的远程仓库，正在移除..."
    git remote remove origin
fi

# 添加远程仓库
echo "正在添加远程仓库..."
git remote add origin https://github.com/${GITHUB_USERNAME}/stellar-relations.git
echo -e "${GREEN}✅ 远程仓库已配置${NC}"
echo ""

# 步骤4：推送到GitHub
echo -e "${BLUE}📋 步骤4/4: 推送代码到GitHub${NC}"
echo ""
echo "正在推送代码..."
git branch -M main

# 推送并捕获输出
if git push -u origin main; then
    echo ""
    echo -e "${GREEN}=========================================="
    echo "🎉 代码已成功推送到GitHub！"
    echo "==========================================${NC}"
    echo ""
    echo -e "${GREEN}✅ GitHub仓库地址:${NC}"
    echo "   https://github.com/${GITHUB_USERNAME}/stellar-relations"
    echo ""
    echo -e "${YELLOW}📋 接下来的步骤:${NC}"
    echo ""
    echo "1️⃣  访问 Vercel: https://vercel.com"
    echo ""
    echo "2️⃣  登录（使用GitHub账号）"
    echo ""
    echo "3️⃣  点击 'Add New...' → 'Project'"
    echo ""
    echo "4️⃣  选择 'stellar-relations' 仓库"
    echo ""
    echo "5️⃣  点击 'Import' → 'Deploy'"
    echo ""
    echo "6️⃣  等待30-60秒，部署完成！"
    echo ""
    echo -e "${GREEN}🌐 预期的部署URL:${NC}"
    echo "   https://stellar-relations.vercel.app"
    echo ""
    echo -e "${BLUE}=========================================="
    echo "📦 项目统计:"
    echo "   - 22个文件"
    echo "   - 5579行代码"
    echo "   - 3个核心页面"
    echo "   - 6个JavaScript模块"
    echo "==========================================${NC}"
    echo ""
    echo -e "${GREEN}🎊 恭喜！准备工作已完成！${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}❌ 推送失败！${NC}"
    echo ""
    echo "可能的原因："
    echo "1. GitHub用户名输入错误"
    echo "2. 需要配置GitHub认证"
    echo ""
    echo "解决方案："
    echo ""
    echo "📝 使用Personal Access Token:"
    echo "   1. 访问: https://github.com/settings/tokens"
    echo "   2. 点击 'Generate new token (classic)'"
    echo "   3. 勾选 'repo' 权限"
    echo "   4. 生成token"
    echo "   5. 重新执行推送，使用token作为密码"
    echo ""
    echo "或"
    echo ""
    echo "🔑 配置SSH密钥:"
    echo "   1. ssh-keygen -t ed25519 -C \"your_email@example.com\""
    echo "   2. 访问: https://github.com/settings/keys"
    echo "   3. 添加 ~/.ssh/id_ed25519.pub 内容"
    echo "   4. 修改远程地址:"
    echo "      git remote set-url origin git@github.com:${GITHUB_USERNAME}/stellar-relations.git"
    echo "   5. 重新推送: git push -u origin main"
    echo ""
fi
