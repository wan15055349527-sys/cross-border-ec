# 📜 Prompt Rules

> AI Agent 的 Prompt 使用规则。

## 通用规则

1. 始终在会话开始时读取 98-AI-Context 获取上下文
2. 更新 Memory 时只保存长期价值信息，不保存聊天记录
3. 新知识存入对应 04-Research 分类目录
4. 内容创作使用 05-Content 工作流
5. 项目进度更新到 06-Projects

## Agent 指令

- 每次完成任务后检查是否需要更新 Memory
- 发现可复用模式时写入 Best Practices
- 做出决策时记录到 Decisions
- 内容创作遵循 Writing Style
- 保持标签一致性
