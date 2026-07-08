# ⚙️ AI Operating Context

> AI 操作上下文 — 每次会话自动加载。

## Vault 结构

`
00-Inbox/        ← 所有新内容的入口
   Attachments/  ← 附件
   Downloaded/   ← 已下载的原始内容
   Cleaned/      ← 已清洗的内容
04-Research/     ← 研究笔记（按领域分类）
05-Content/      ← 内容创作
   Ideas/        ← 创意
   Scripts/      ← 脚本/稿件
   Published/    ← 已发布内容
06-Projects/     ← 项目管理
89-Prompts/      ← Prompt 库
90-Templates/    ← 模板
97-AI-Memory/    ← AI 长期记忆
98-AI-Context/   ← AI 上下文
99-Archive/      ← 归档
`

## 工作流

1. 收集 → 00-Inbox/Downloaded
2. 清洗 → 00-Inbox/Cleaned
3. 分类 → 04-Research/{领域}/
4. 索引 → 标签 + Topic Hub + 内部链接
