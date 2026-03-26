# EMO视界 - 项目概览

## 项目简介

EMO视界是一个完全免费的TV影视软件官方网站，使用GitHub Pages进行部署。

## 文件结构

```
emo-vision-site/
├── index.html          # 主页面 (284行)
├── css/
│   └── style.css      # 样式文件 (772行)
├── js/
│   └── script.js      # JavaScript文件 (195行)
├── images/            # 图片资源目录
├── README.md          # 项目说明
├── DEPLOY.md          # 部署指南
├── deploy.sh          # 部署脚本
└── test.html          # 测试页面
```

## 功能特点

### 页面结构
- 导航栏：固定顶部，响应式设计
- 英雄区域：展示软件名称和核心卖点
- 功能特性：6个核心功能卡片
- 截图展示：3个界面截图占位符
- 下载区域：TV版和手机版下载
- 关于区域：软件介绍和统计信息
- 联系方式：GitHub、Telegram、邮箱
- 页脚：版权信息

### 设计特点
- 现代化深色主题
- 渐变色彩效果
- 响应式布局
- 平滑滚动动画
- 悬停交互效果

### 技术实现
- HTML5语义化标签
- CSS3动画和渐变
- JavaScript交互功能
- Font Awesome图标
- Google Fonts字体

## 快速开始

### 本地预览
```bash
cd /home/yuze31070/emo-vision-site
# 直接打开index.html文件
```

### 部署到GitHub Pages
```bash
./deploy.sh
```

## 自定义指南

1. 修改下载链接：编辑index.html中的下载按钮
2. 添加真实截图：将截图放入images目录
3. 修改联系方式：更新联系区域的链接
4. 更改颜色主题：修改style.css中的CSS变量

## 许可证

© 2024 EMO视界. All rights reserved.
