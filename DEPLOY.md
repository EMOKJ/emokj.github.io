# EMO视界 - GitHub Pages 部署指南

## 快速部署步骤

### 1. 创建GitHub仓库

1. 登录GitHub
2. 点击 "New repository"
3. 仓库名称建议使用：`emo-vision-site` 或 `your-username.github.io`
4. 选择 "Public"
5. 点击 "Create repository"

### 2. 上传文件

#### 方法一：使用Git命令行

```bash
# 进入项目目录
cd /home/yuze31070/emo-vision-site

# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: EMO视界官方网站"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/your-username/emo-vision-site.git

# 推送到GitHub
git push -u origin main
```

#### 方法二：使用GitHub网页上传

1. 进入你的GitHub仓库
2. 点击 "Add file" → "Upload files"
3. 拖拽上传所有文件和文件夹
4. 点击 "Commit changes"

### 3. 启用GitHub Pages

1. 进入仓库设置：点击 "Settings"
2. 左侧菜单找到 "Pages"
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "main"
5. Folder 选择 "/ (root)"
6. 点击 "Save"

### 4. 访问网站

等待几分钟后，你的网站将在以下地址上线：

- 如果仓库名是 `your-username.github.io`：
  `https://your-username.github.io/`

- 如果仓库名是其他名称（如 `emo-vision-site`）：
  `https://your-username.github.io/emo-vision-site/`

## 自定义网站

### 修改下载链接

打开 `index.html`，找到下载按钮，将 `href="#"` 替换为实际的APK下载链接：

```html
<a href="https://your-download-link.com/app.apk" class="btn btn-primary">
    <i class="fas fa-download"></i>
    下载TV版
</a>
```

### 添加真实截图

1. 将截图放入 `images/` 目录
2. 在 `index.html` 中替换截图占位符：

```html
<div class="screenshot-frame">
    <img src="images/screenshot1.jpg" alt="主界面" style="width: 100%; border-radius: 10px;">
</div>
```

### 修改联系方式

在联系区域修改链接：

```html
<a href="https://github.com/your-username/emo-vision" class="contact-item">
    <i class="fab fa-github"></i>
    <span>GitHub</span>
</a>
```

## 常见问题

### Q: 网站无法访问？
A: 确保GitHub Pages已启用，等待几分钟后刷新。

### Q: 如何使用自定义域名？
A: 在仓库根目录创建 `CNAME` 文件，内容为你的域名。

### Q: 如何更新网站？
A: 直接推送到GitHub仓库，GitHub Pages会自动更新。

## 技术支持

如有问题，请提交Issue到GitHub仓库。