# AI Proxy

GitHub Pages 是纯前端，不能安全保存 OpenAI API Key。请用 Cloudflare Worker、Vercel Function 或其他后端代理。

## Cloudflare Worker

1. 创建一个 Cloudflare Worker。
2. 把 `cloudflare-worker.js` 的内容粘进去。
3. 在 Worker 环境变量里添加：

```text
OPENAI_API_KEY=你的 OpenAI API Key
OPENAI_MODEL=gpt-5.4-mini
```

4. 部署后复制 Worker URL，例如：

```text
https://english-sentence-lab-ai.yourname.workers.dev
```

5. 打开网页 App → 表达 → AI 接口地址，填入这个 URL 并保存。

网页会优先调用 AI；如果接口为空或失败，会自动使用本地备用规则。
