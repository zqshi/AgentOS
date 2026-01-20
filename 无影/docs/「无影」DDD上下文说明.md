# 「无影」DDD上下文说明

**版本**：V1.0  
**适用范围**：无影产品方向（中台集成赋能）

---

## 1. 上下文总览

```
connector-factory   # 连接器工厂
embedding-sdk       # 嵌入式赋能套件
workflow-trigger    # 智能工作流触发器
security-gateway    # 安全与治理网关
integration-audit   # 集成审计中心
developer-ecosystem # 开发与生态中心
```

---

## 2. 各上下文职责与边界

### 2.1 connector-factory（连接器工厂）

- **职责**：连接器模板、配置、同步策略与状态管理。  
- **聚合**：Connector、ConnectionConfig、SyncPolicy。  
- **领域事件**：ConnectorConfigured、SyncJobStarted、SyncJobFailed。  
- **对外接口**：连接器配置API、状态查询API。  
- **依赖**：security-gateway 进行鉴权与配额校验。

### 2.2 embedding-sdk（嵌入式赋能套件）

- **职责**：前端SDK/组件版本、嵌入配置与运行兼容性。  
- **聚合**：EmbedApp、WidgetConfig、SdkRelease。  
- **领域事件**：SdkReleased、WidgetBound。  
- **对外接口**：SDK下载、组件配置API。  
- **依赖**：security-gateway 提供鉴权与签名。

### 2.3 workflow-trigger（智能工作流触发器）

- **职责**：事件监听、规则匹配、调用灵枢能力的编排。  
- **聚合**：EventRule、WorkflowPlan、TriggerJob。  
- **领域事件**：RuleMatched、WorkflowTriggered。  
- **对外接口**：规则配置API、触发执行API。  
- **依赖**：connector-factory 提供事件源，security-gateway 控制访问。

### 2.4 security-gateway（安全与治理网关）

- **职责**：鉴权、脱敏、配额、策略。  
- **聚合**：ApiClient、Policy、QuotaRule。  
- **领域事件**：AccessGranted、AccessDenied、QuotaExceeded。  
- **对外接口**：鉴权接口、策略管理API。  
- **依赖**：integration-audit 记录审计。

### 2.5 integration-audit（集成审计中心）

- **职责**：链路日志、审计查询、告警。  
- **聚合**：AuditLog、AlertRule、AlertEvent。  
- **领域事件**：AuditLogged、AlertTriggered。  
- **对外接口**：审计查询API、告警配置API。  
- **依赖**：security-gateway 输出审计数据。

### 2.6 developer-ecosystem（开发与生态中心）

- **职责**：连接器SDK、模板、上架与生态管理。  
- **聚合**：ConnectorPackage、MarketplaceItem、ReviewRecord。  
- **领域事件**：PackagePublished、ReviewApproved。  
- **对外接口**：SDK下载、上架审核API。  
- **依赖**：security-gateway 统一权限控制。

