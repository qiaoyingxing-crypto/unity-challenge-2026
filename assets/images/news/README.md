# 新闻图片说明

## 新闻图片列表

请在此目录下放置以下新闻图片文件：

### 1. news-1.jpg
- **用途**：第二届Unity中国开发挑战赛正式启动
- **尺寸建议**：800x600 或 16:9 比例
- **内容建议**：赛事启动仪式照片、宣传海报等

### 2. news-2.jpg
- **用途**：多家媒体关注Unity开发挑战赛
- **尺寸建议**：800x600 或 16:9 比例
- **内容建议**：媒体报道截图、采访照片等

### 3. news-3.jpg
- **用途**：首届挑战赛颁奖典礼圆满落幕
- **尺寸建议**：800x600 或 16:9 比例
- **内容建议**：颁奖典礼现场照片、获奖作品展示等

## 图片要求

- **格式**：JPG 或 PNG
- **分辨率**：建议 1920x1080 或更高
- **文件大小**：建议控制在 500KB 以内
- **命名格式**：news-[数字].jpg

## 临时占位符说明

如果还没有准备新闻图片，可以：

1. 使用 showcase 目录下的游戏截图作为临时图片
2. 使用在线占位图服务，如：
   - https://placehold.co/800x600/333/FFF?text=News+1
   - https://via.placeholder.com/800x600

## 示例代码

如果需要添加更多新闻条目，请按照以下格式添加到 index.html：

```html
<div class="news-banner-slide">
    <div class="news-banner-bg">
        <img src="assets/images/news/news-4.jpg" alt="新闻标题" class="news-banner-img">
    </div>
    <div class="news-banner-content">
        <div class="news-meta">
            <span class="news-tag">新闻标签</span>
            <span class="news-date">2026-MM-DD</span>
        </div>
        <h3>新闻标题</h3>
        <p>新闻描述</p>
        <a href="#" class="news-link">阅读更多 →</a>
    </div>
</div>
```

同时需要在 HTML 中添加对应的导航点：
```html
<button class="news-banner-dot" data-index="3"></button>
```