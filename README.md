# English Sentence Lab（英语拆句）

一个手机优先的英语句子学习 PWA。第一版不需要账号、服务器或数据库，所有学习数据保存在浏览器 LocalStorage。

## 功能

- 每日 10 条高频真实英语句子
- 场景筛选与难度筛选，筛选后显示该分类全部句子
- 点击整句朗读，点击单词朗读和查词
- 单词卡片：音标、词性、中文意思、句中含义、搭配、例句
- 收藏句子与收藏单词
- 本地“AI语法拆解”和“问AI”解释引擎
- 表达实验室：中文转英文建议、英文纠错、语法拆解、朗读
- AI 翻译/纠错接入：前端填写安全代理地址，优先走 AI，失败时本地规则兜底
- 五阶段句子掌握系统
- 间隔重复复习调度
- 七天验证和长期掌握状态预留
- 深色/浅色模式
- PWA manifest、Service Worker 和离线缓存

## 目录结构

```text
english-sentence-lab/
  index.html
  styles.css
  data.js
  app.js
  manifest.webmanifest
  sw.js
  ai-proxy/
    cloudflare-worker.js
    README.md
  icons/
    icon.svg
```

## 运行

直接打开 `index.html` 可以浏览大部分功能。若要测试 PWA、离线缓存和添加到桌面，建议在项目目录启动本地静态服务：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080
```

手机测试时，让手机和电脑在同一 Wi-Fi 下，访问电脑局域网 IP 对应的地址。

## iPhone 添加到桌面

用 Safari 打开页面，点击分享按钮，选择“添加到主屏幕”。

## 后续扩展接口

`app.js` 中的 `translateChinese()` 和 `correctEnglish()` 已支持 AI 代理接口；`ai-proxy/cloudflare-worker.js` 是 Cloudflare Worker 模板。不要把 OpenAI API Key 写入前端网页。

- AI 口语陪练
- 语音识别
- AI 纠错
- Shadowing 跟读
- ChatGPT 对话模式
- 自定义导入句库
- 英语阅读模式
