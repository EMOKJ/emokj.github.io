#!/bin/bash

# EMO视界 - GitHub Pages 部署脚本

echo "=========================================="
echo "  EMO视界 - GitHub Pages 部署脚本"
echo "=========================================="
echo ""

# 检查是否在正确的目录
if [ ! -f "index.html" ]; then
    echo "错误：请在项目根目录运行此脚本"
    exit 1
fi

# 检查git是否安装
if ! command -v git &> /dev/null; then
    echo "错误：未安装git，请先安装git"
    exit 1
fi

echo "请选择部署方式："
echo "1. 初始化新仓库并推送"
echo "2. 更新现有仓库"
echo "3. 退出"
echo ""
read -p "请输入选项 (1-3): " choice

case $choice in
    1)
        echo ""
        read -p "请输入GitHub仓库URL (例如: https://github.com/username/repo.git): " repo_url
        echo ""
        echo "正在初始化Git仓库..."
        git init
        git add .
        git commit -m "Initial commit: EMO视界官方网站"
        git remote add origin "$repo_url"
        git branch -M main
        git push -u origin main
        echo ""
        echo "✓ 推送完成！"
        echo ""
        echo "接下来请在GitHub仓库设置中启用GitHub Pages："
        echo "1. 进入仓库设置 (Settings)"
        echo "2. 找到 Pages 选项"
        echo "3. Source 选择 'Deploy from a branch'"
        echo "4. Branch 选择 'main'"
        echo "5. 点击 Save"
        ;;
    2)
        echo ""
        echo "正在更新仓库..."
        git add .
        read -p "请输入提交信息: " commit_message
        git commit -m "$commit_message"
        git push
        echo ""
        echo "✓ 更新完成！"
        ;;
    3)
        echo "退出部署脚本"
        exit 0
        ;;
    *)
        echo "无效选项"
        exit 1
        ;;
esac

echo ""
echo "=========================================="
echo "  部署脚本执行完成"
echo "=========================================="