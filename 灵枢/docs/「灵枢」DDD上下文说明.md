# 「灵枢」DDD上下文说明

**版本**：V1.0  
**适用范围**：灵枢产品方向（后台智能中枢）

---

## 1. 上下文总览

```
ontology-factory        # 本体论工厂
knowledge-ingestion     # 知识熔炉/接入加工
knowledge-graph         # 动态知识图谱
agent-factory           # 智能体工厂
governance              # 进化与治理中心
open-platform           # 开放平台/API网关
knowledge-production    # 知识生产与协同
```

---

## 2. 各上下文职责与边界

### 2.1 ontology-factory（本体论工厂）

- **职责**：本体建模、语义映射、版本与冲突仲裁。  
- **聚合**：OntologyModel、MappingRule、OntologyVersion。  
- **领域事件**：OntologyPublished、MappingUpdated。  
- **对外接口**：本体管理API、语义映射API。  
- **依赖**：governance 进行审计与权限控制。

### 2.2 knowledge-ingestion（知识熔炉）

- **职责**：多源接入、加工流水线、质量网关。  
- **聚合**：DataSource、Pipeline、QualityRule。  
- **领域事件**：IngestionStarted、QualityRejected。  
- **对外接口**：接入配置API、流水线编排API。  
- **依赖**：ontology-factory 提供语义标准。

### 2.3 knowledge-graph（动态知识图谱）

- **职责**：图谱存储、查询、推理与快照。  
- **聚合**：GraphNode、GraphEdge、Snapshot。  
- **领域事件**：GraphUpdated、SnapshotCreated。  
- **对外接口**：图谱查询API、推理API。  
- **依赖**：knowledge-ingestion 提供入库数据。

### 2.4 agent-factory（智能体工厂）

- **职责**：智能体蓝图、运行与监控、技能管理。  
- **聚合**：AgentBlueprint、AgentRun、SkillModule。  
- **领域事件**：AgentDeployed、AgentRunCompleted。  
- **对外接口**：智能体编排API、运行监控API。  
- **依赖**：knowledge-graph 提供检索与推理能力。

### 2.5 governance（进化与治理中心）

- **职责**：审计、权限、合规、演化提案。  
- **聚合**：AuditTrail、Policy、EvolutionProposal。  
- **领域事件**：PolicyApplied、ProposalApproved。  
- **对外接口**：审计API、权限API、演化提案API。  
- **依赖**：全域服务输出审计与指标。

### 2.6 open-platform（开放平台）

- **职责**：统一API网关、事件订阅、计量。  
- **聚合**：ApiClient、Subscription、QuotaRule。  
- **领域事件**：ApiSubscribed、QuotaExceeded。  
- **对外接口**：开放API网关、Webhook管理API。  
- **依赖**：governance 进行安全与合规。

### 2.7 knowledge-production（知识生产与协同）

- **职责**：知识任务、协作编辑、评审与激励。  
- **聚合**：KnowledgeTask、ReviewFlow、ContributionScore。  
- **领域事件**：TaskAssigned、ReviewApproved。  
- **对外接口**：任务看板API、评审API。  
- **依赖**：knowledge-ingestion 与 knowledge-graph。
