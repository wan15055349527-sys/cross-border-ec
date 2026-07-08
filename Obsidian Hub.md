---
created: 2026-07-08
tags: [topic, obsidian, tools]
topic: obsidian
---

# Obsidian Hub

> Obsidian — 知识管理 & 个人笔记系统。

## 核心概念

- Vault 路径: `C:\Users\yourh\Documents\跨境电商`
- 基于 Markdown 的本地知识库
- 支持插件扩展、图谱视图、内部链接

## 目录结构

```
00-Inbox/         收集收件箱
04-Research/      研究笔记
05-Content/       内容创作
06-Projects/      项目管理
89-Prompts/       Prompt 库
90-Templates/     模板
97-AI-Memory/     AI 记忆
98-AI-Context/    AI 上下文
99-Archive/       归档
```

## 配置

- [[.obsidian/app.json]] → 应用配置
- 插件: `community-plugins.json`

## 相关笔记

```dataview
LIST
FROM "04-Research"
WHERE contains(tags, "topic/obsidian")
SORT created DESC
```

## 关联主题

- [[Workflow Hub]]
- [[GitHub Hub]]
