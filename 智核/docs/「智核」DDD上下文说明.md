# 「智核」DDD上下文说明

**版本**：V1.0  
**适用范围**：智核产品方向（前台智能工作台）

---

## 1. 上下文总览

```
workbench       # 主工作台/智能交互中枢
knowledge-base  # 智能知识库
context-panel   # 情境知识面板
team-space      # 团队空间与项目协作
agent-market    # 智能体市场与应用
collaboration   # 协作与审阅工作流
settings        # 个人中心与管理后台
```

---

## 2. 各上下文职责与边界

### 2.1 workbench（主工作台）

- **职责**：对话会话、任务编排、搜索聚合与摘要。  
- **聚合**：Conversation、TaskPlan、SearchSession。  
- **领域事件**：ConversationCreated、TaskDispatched。  
- **对外接口**：对话API、搜索API。  
- **依赖**：调用灵枢的问答与任务编排能力。

### 2.2 knowledge-base（智能知识库）

- **职责**：知识创作、版本、发布与图谱视图适配。  
- **聚合**：Document、VersionSet、PublishState。  
- **领域事件**：DocumentPublished、VersionCreated。  
- **对外接口**：文档管理API、版本API。  
- **依赖**：调用灵枢进行入库与关联。

### 2.3 context-panel（情境知识面板）

- **职责**：上下文识别、面板渲染、快捷操作。  
- **聚合**：ContextSignal、PanelView、QuickAction。  
- **领域事件**：ContextDetected、PanelRendered。  
- **对外接口**：面板渲染API、上下文适配API。  
- **依赖**：无影嵌入能力与灵枢检索服务。

### 2.4 team-space（团队空间）

- **职责**：空间组织、知识沉淀、团队协作入口。  
- **聚合**：TeamSpace、SpaceMember、SpaceAsset。  
- **领域事件**：SpaceCreated、AssetLinked。  
- **对外接口**：空间管理API、成员管理API。  
- **依赖**：knowledge-base 与 collaboration 协同。

### 2.5 agent-market（智能体市场）

- **职责**：智能体发现、订阅、配置与反馈。  
- **聚合**：AgentCatalog、Subscription、AgentConfig。  
- **领域事件**：AgentSubscribed、AgentRated。  
- **对外接口**：订阅API、配置API。  
- **依赖**：灵枢智能体工厂与无影嵌入能力。

### 2.6 collaboration（协作与审阅）

- **职责**：评审流程、评论与发布控制。  
- **聚合**：ReviewFlow、CommentThread、ApprovalState。  
- **领域事件**：ReviewRequested、ReviewApproved。  
- **对外接口**：评审API、评论API。  
- **依赖**：knowledge-base 作为内容载体。

### 2.7 settings（个人中心与管理后台）

- **职责**：个人偏好、权限与团队管理。  
- **聚合**：UserPreference、PermissionSet、TeamPolicy。  
- **领域事件**：PreferenceUpdated、PermissionGranted。  
- **对外接口**：用户设置API、权限管理API。  
- **依赖**：security-gateway（无影）进行鉴权。

