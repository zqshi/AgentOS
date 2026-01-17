// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化图表
    initCharts();
    
    // 初始化导航切换
    initNavigation();

    // 初始化本体论工厂二级导航
    initOntologyTabs();

    // 初始化知识熔炉二级导航
    initKnowledgeTabs();
    
    // 初始化时间范围下拉菜单
    initTimeRangeDropdown();
    
    // 初始化背景动画
    initBackgroundAnimation();
    
    // 初始化通知系统
    initNotificationSystem();
    
    // 初始化按钮事件
    initButtonEvents();

    // 初始化本体论工厂交互
    initOntologyInteractions();

    // 初始化知识熔炉
    initKnowledgeModule();

    // 初始化动态知识图谱
    initGraphModule();
    
    // 初始化智能体工作台
    initAgentWorkbench();
    
    // 初始化智能体工厂
    initAgentFactory();
    
    // 初始化智能体工厂按钮事件
    addAgentFactoryButtonEvents();
});

// 初始化图表
function initCharts() {
    // 知识增长趋势图表
    const growthCtx = document.getElementById('knowledgeGrowthChart').getContext('2d');
    new Chart(growthCtx, {
        type: 'line',
        data: {
            labels: ['7/1', '7/2', '7/3', '7/4', '7/5', '7/6', '7/7', '7/8', '7/9', '7/10', '7/11', '7/12', '7/13', '7/14'],
            datasets: [{
                label: '知识节点',
                data: [125400, 126800, 128200, 129500, 131000, 132400, 133800, 135200, 136700, 138100, 139500, 141000, 142500, 144000],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.1
            }, {
                label: '关系数',
                data: [285000, 288000, 291000, 294000, 297000, 300000, 303000, 306000, 309000, 312000, 315000, 318000, 321000, 324000],
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 6
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return (value / 1000) + 'K';
                        }
                    }
                }
            }
        }
    });
    
    // 数据来源分布图表
    const sourceCtx = document.getElementById('dataSourceChart').getContext('2d');
    new Chart(sourceCtx, {
        type: 'doughnut',
        data: {
            labels: ['CRM系统', 'ERP系统', 'Excel文件', 'API接口', '其他'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#3b82f6',
                    '#8b5cf6',
                    '#10b981',
                    '#f59e0b',
                    '#6b7280'
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 6,
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });

    const processingCtx = document.getElementById('dataProcessingChart');
    if (processingCtx) {
        new Chart(processingCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                datasets: [{
                    label: '处理量(万)',
                    data: [120, 132, 125, 142, 150, 138, 160],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.15)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                }
            }
        });
    }

    const knowledgeQualityCtx = document.getElementById('knowledgeQualityChart');
    if (knowledgeQualityCtx) {
        new Chart(knowledgeQualityCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['通过', '降级', '拦截'],
                datasets: [{
                    data: [86, 10, 4],
                    backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            boxWidth: 6,
                            padding: 12
                        }
                    }
                },
                cutout: '65%'
            }
        });
    }
}

function setActiveKnowledgeMenu(targetId) {
    const tabs = document.querySelectorAll('.knowledge-menu-item');
    if (!tabs.length) {
        return;
    }

    tabs.forEach(tab => {
        const isActive = tab.getAttribute('data-target') === targetId;
        tab.classList.toggle('active', isActive);
        if (isActive) {
            tab.classList.add('bg-secondary', 'text-white');
            tab.classList.remove('bg-gray-100', 'text-gray-700');
        } else {
            tab.classList.remove('bg-secondary', 'text-white');
            tab.classList.add('bg-gray-100', 'text-gray-700');
        }
    });
}

// 初始化本体论工厂导航
function initOntologyTabs() {
    const tabs = document.querySelectorAll('.ontology-menu-item');
    const contents = document.querySelectorAll('.ontology-content');

    if (!tabs.length || !contents.length) {
        return;
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');

            tabs.forEach(btn => {
                btn.classList.remove('active', 'bg-primary', 'text-white');
                btn.classList.add('bg-gray-100', 'text-gray-700');
            });

            contents.forEach(panel => {
                panel.classList.add('hidden');
            });

            this.classList.add('active', 'bg-primary', 'text-white');
            this.classList.remove('bg-gray-100', 'text-gray-700');

            const target = document.getElementById(targetId);
            if (target) {
                target.classList.remove('hidden');
                target.classList.add('fade-in');
            }

            const label = this.textContent.trim() || this.getAttribute('data-label') || '模块';
            showNotification(`已切换到 ${label}`, 'success');

        });
    });
}

function initKnowledgeTabs() {
    const knowledgeSection = document.getElementById('knowledge');
    const tabs = document.querySelectorAll('.knowledge-menu-item');
    const pages = knowledgeSection ? knowledgeSection.querySelectorAll('.knowledge-page') : [];
    if (!tabs.length || !pages.length) {
        return;
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');
            if (!targetId) {
                return;
            }

            pages.forEach(page => page.classList.add('hidden'));

            const target = document.getElementById(targetId);
            if (target) {
                target.classList.remove('hidden');
                target.classList.add('fade-in');
            }

            setActiveKnowledgeMenu(targetId);

            const subNavItems = document.querySelectorAll('.nav-subitem');
            subNavItems.forEach(nav => {
                nav.classList.toggle('active', nav.getAttribute('data-knowledge-target') === targetId);
            });

            const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');
            if (breadcrumbItems.length > 1) {
                breadcrumbItems[1].textContent = tab.textContent.trim();
            }

            showNotification('已切换到 ' + tab.textContent.trim(), 'success');
        });
    });
}

// 初始化本体论工厂交互
function initOntologyInteractions() {
    const compareButton = document.getElementById('versionCompareButton');
    const versionDiffPanel = document.getElementById('versionDiffPanel');
    const annotationButton = document.getElementById('annotationModeButton');
    const modelerCanvas = document.getElementById('modelerCanvas');
    const ruleTemplateButton = document.getElementById('ruleTemplateButton');
    const heatmap = document.getElementById('mappingHeatmap');
    const mappingDomainLabel = document.getElementById('mappingDomainLabel');
    const impactListButton = document.getElementById('impactListButton');
    const impactListPanel = document.getElementById('impactListPanel');
    const dynamicRelations = document.getElementById('modelerDynamicRelations');
    let annotationActive = false;
    let annotationSelection = [];
    let dragState = null;
    let dragMoved = false;
    let labelDragState = null;
    let nodeDragState = null;
    let selectedItem = null;
    let activeTab = 'base';
    let panActive = false;
    let panState = null;
    let zoomScale = 1;
    const historyStack = [];
    const redoStack = [];

    const propertiesPanel = document.getElementById('propertiesPanel');
    const propertiesTabs = document.getElementById('propertiesTabs');
    const modelerWorkspace = document.getElementById('modelerWorkspace');
    const entityList = document.getElementById('entityList');
    const toolboxItems = document.querySelectorAll('[data-tool]');
    const templateItems = document.querySelectorAll('.draggable-template');
    const toolMoveButton = document.getElementById('toolMoveButton');
    const zoomInButton = document.getElementById('zoomInButton');
    const zoomOutButton = document.getElementById('zoomOutButton');
    const fitViewButton = document.getElementById('fitViewButton');
    const autoLayoutButton = document.getElementById('autoLayoutButton');
    const relationTypeSelect = document.getElementById('relationTypeSelect');
    const modelerMoreButton = document.getElementById('modelerMoreButton');
    const modelerMoreMenu = document.getElementById('modelerMoreMenu');
    const toggleModelerInsights = document.getElementById('toggleModelerInsights');
    const modelerInsightsPanel = document.getElementById('modelerInsightsPanel');
    const nodeCreateModal = document.getElementById('nodeCreateModal');
    const nodeCreateOverlay = document.getElementById('nodeCreateOverlay');
    const closeNodeCreateModal = document.getElementById('closeNodeCreateModal');
    const cancelNodeCreate = document.getElementById('cancelNodeCreate');
    const confirmNodeCreate = document.getElementById('confirmNodeCreate');
    const nodeTypeSelect = document.getElementById('nodeTypeSelect');
    const nodeNameInput = document.getElementById('nodeNameInput');
    const nodeDomainInput = document.getElementById('nodeDomainInput');
    const nodeAttributesInput = document.getElementById('nodeAttributesInput');
    const nodeDomainField = document.getElementById('nodeDomainField');
    const nodeAttributesField = document.getElementById('nodeAttributesField');
    const saveModelerButton = document.getElementById('saveModelerButton');
    const undoModelerButton = document.getElementById('undoModelerButton');
    const redoModelerButton = document.getElementById('redoModelerButton');
    const createSnapshotButton = document.getElementById('createSnapshotButton');
    const versionSnapshotList = document.getElementById('versionSnapshotList');
    const domainItems = document.querySelectorAll('.domain-item');
    const domainToggles = document.querySelectorAll('.domain-toggle');
    const modelerDomainPath = document.getElementById('modelerDomainPath');
    const modelerRelations = modelerWorkspace ? modelerWorkspace.querySelectorAll('.diff-target') : [];
    const dynamicRelationsLayer = document.getElementById('modelerDynamicRelations');
    const auditTrailList = document.getElementById('auditTrailList');
    const openMergeQueueButton = document.getElementById('openMergeQueueButton');
    const mergeQueueModal = document.getElementById('mergeQueueModal');
    const mergeQueueOverlay = document.getElementById('mergeQueueOverlay');
    const closeMergeQueueModal = document.getElementById('closeMergeQueueModal');
    const cancelMergeQueue = document.getElementById('cancelMergeQueue');
    const executeMergeButton = document.getElementById('executeMergeButton');

    if (compareButton && modelerWorkspace) {
        let compareActive = false;
        compareButton.addEventListener('click', () => {
            compareActive = !compareActive;
            const diffTargets = modelerWorkspace.querySelectorAll('[data-diff]');
            diffTargets.forEach(target => {
                target.classList.toggle('diff-active', compareActive);
            });
            showNotification(compareActive ? '已开启版本差异高亮' : '已关闭版本差异高亮', 'info');
        });
    }

    const ontologyData = {
        entities: {
            customer: {
                name: '客户',
                domain: '客户域',
                id: 'customer',
                status: '主干',
                description: '与企业发生业务往来的法人或个人主体。',
                attributes: [
                    { name: '客户ID', type: 'String', required: true, unique: true },
                    { name: '客户名称', type: 'String', required: true },
                    { name: '客户类型', type: 'Enum', required: false },
                    { name: '创建时间', type: 'Date', required: false }
                ],
                rules: [
                    '当 [合同.金额] > 1000000 时需 [法务总监] 审批',
                    '[项目.结束日期] 必须晚于 [项目.开始日期]'
                ],
                constraints: [
                    { name: '客户ID 正则', value: '^C[0-9]{3}$' },
                    { name: '客户类型枚举', value: '个人 / 法人 / 政府' }
                ],
                inheritance: []
            },
            contract: {
                name: '合同',
                domain: '合同域',
                id: 'contract',
                status: '主干',
                description: '与客户签署的法律合同实体。',
                attributes: [
                    { name: '合同编号', type: 'String', required: true, unique: true },
                    { name: '合同金额', type: 'Number', required: true },
                    { name: '签署日期', type: 'Date', required: false },
                    { name: '状态', type: 'Enum', required: false }
                ],
                rules: ['当 [合同.金额] > 500000 时需 [财务主管] 审批'],
                constraints: [{ name: '金额范围', value: '>= 0' }],
                inheritance: []
            },
            contact: {
                name: '服务联系人',
                domain: '客户域',
                id: 'contact',
                status: '分支',
                description: '客户方的服务沟通联系人。',
                attributes: [
                    { name: '联系人ID', type: 'String', required: true },
                    { name: '姓名', type: 'String', required: true },
                    { name: '角色', type: 'Enum', required: false }
                ],
                rules: [],
                constraints: [],
                inheritance: ['客户']
            }
        },
        relations: {}
    };

    const mappingRules = [];
    const ontologies = [
        {
            name: '客户360视图',
            domain: '客户关系管理',
            concepts: 156,
            relations: 8,
            version: 'V2.1',
            status: '活跃'
        },
        {
            name: '产品数据模型',
            domain: '产品管理',
            concepts: 203,
            relations: 12,
            version: 'V1.7',
            status: '活跃'
        },
        {
            name: '供应链网络',
            domain: '供应链管理',
            concepts: 89,
            relations: 6,
            version: 'V0.9',
            status: '开发中'
        }
    ];

    const cardinalityOptions = ['1:1', '1:N', 'N:M', '0..1'];

    function getEntityNodes() {
        return Array.from(document.querySelectorAll('.entity-node'));
    }

    function getRelationPreset() {
        const value = relationTypeSelect ? relationTypeSelect.value : 'relation';
        if (value === 'inherit') {
            return { semantics: '继承', cardinality: '1:1' };
        }
        if (value === 'part') {
            return { semantics: '组成', cardinality: '1:N' };
        }
        if (value === 'belong') {
            return { semantics: '隶属', cardinality: 'N:M' };
        }
        return { semantics: '关联', cardinality: '1:N' };
    }

    function getNodePosition(node) {
        const left = parseFloat(node.style.left || '0');
        const top = parseFloat(node.style.top || '0');
        return { left, top };
    }

    function serializeState() {
        const nodes = {};
        getEntityNodes().forEach(node => {
            nodes[node.getAttribute('data-id')] = getNodePosition(node);
        });
        const relations = [];
        if (dynamicRelations) {
            dynamicRelations.querySelectorAll('text[data-relation-id]').forEach(label => {
                const relationId = label.getAttribute('data-relation-id');
                const relation = ontologyData.relations[relationId];
                if (!relation) {
                    return;
                }
                relations.push({
                    id: relationId,
                    from: relation.from,
                    to: relation.to,
                    semantics: relation.semantics,
                    cardinality: relation.cardinality,
                    offsetX: Number(label.getAttribute('data-offset-x') || 0),
                    offsetY: Number(label.getAttribute('data-offset-y') || 0)
                });
            });
        }
        return {
            ontologyData: JSON.parse(JSON.stringify(ontologyData)),
            mappingRules: JSON.parse(JSON.stringify(mappingRules)),
            ontologies: JSON.parse(JSON.stringify(ontologies)),
            nodes,
            relations,
            zoomScale
        };
    }

    function restoreState(state) {
        if (!state) {
            return;
        }
        ontologyData.entities = state.ontologyData.entities || {};
        ontologyData.relations = state.ontologyData.relations || {};
        mappingRules.length = 0;
        (state.mappingRules || []).forEach(rule => mappingRules.push(rule));
        ontologies.length = 0;
        (state.ontologies || []).forEach(item => ontologies.push(item));

        if (modelerWorkspace) {
            modelerWorkspace.querySelectorAll('.entity-node').forEach(node => node.remove());
            Object.values(ontologyData.entities).forEach(entity => {
                const position = state.nodes && state.nodes[entity.id] ? state.nodes[entity.id] : getCanvasCenterPosition();
                createEntityNode(entity, position);
            });
        }

        if (dynamicRelations) {
            const defs = dynamicRelations.querySelector('defs');
            dynamicRelations.innerHTML = '';
            if (defs) {
                dynamicRelations.appendChild(defs.cloneNode(true));
            }
            (state.relations || []).forEach(rel => {
                const fromNode = document.querySelector(`.entity-node[data-id="${rel.from}"]`);
                const toNode = document.querySelector(`.entity-node[data-id="${rel.to}"]`);
                if (!fromNode || !toNode) {
                    return;
                }
                const relationId = rel.id;
                const from = getNodeAnchor(fromNode, toNode, modelerCanvas);
                const to = getNodeAnchor(toNode, fromNode, modelerCanvas);
                const midX = (from.x + to.x) / 2;
                const midY = (from.y + to.y) / 2 - 12;

                const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                line.setAttribute('d', `M${from.x} ${from.y} C${from.x + 60} ${from.y}, ${to.x - 60} ${to.y}, ${to.x} ${to.y}`);
                line.setAttribute('stroke', '#3b82f6');
                line.setAttribute('stroke-width', '2');
                line.setAttribute('fill', 'none');
                line.setAttribute('marker-end', 'url(#dynamicArrowhead)');
                line.setAttribute('data-relation-id', relationId);
                line.setAttribute('data-from', rel.from);
                line.setAttribute('data-to', rel.to);
                line.setAttribute('pointer-events', 'none');

                const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                label.setAttribute('x', midX + rel.offsetX);
                label.setAttribute('y', midY + rel.offsetY);
                label.setAttribute('text-anchor', 'middle');
                label.setAttribute('fill', '#6b7280');
                label.setAttribute('font-size', '12');
                label.setAttribute('data-relation-id', relationId);
                label.setAttribute('data-role', 'cardinality');
                label.setAttribute('data-cardinality', rel.cardinality);
                label.setAttribute('data-semantics', rel.semantics);
                label.setAttribute('data-offset-x', String(rel.offsetX));
                label.setAttribute('data-offset-y', String(rel.offsetY));
                label.setAttribute('class', 'cursor-pointer');
                label.textContent = `${rel.semantics} (${rel.cardinality})`;

                dynamicRelations.appendChild(line);
                dynamicRelations.appendChild(label);
                ontologyData.relations[relationId] = {
                    id: relationId,
                    from: rel.from,
                    to: rel.to,
                    semantics: rel.semantics,
                    cardinality: rel.cardinality
                };
            });
        }

        applyZoom(state.zoomScale || 1);
        renderEntityList();
        renderMappingRules();
        renderOntologyTable();
        updateOntologyMetrics();
        getEntityNodes().forEach(bindEntityNodeEvents);
        const first = getEntityNodes()[0];
        if (first) {
            setSelectedItem({ type: 'entity', id: first.getAttribute('data-id') });
        }
        updateAllRelations();
    }

    function pushHistory() {
        historyStack.push(serializeState());
        redoStack.length = 0;
    }

    function undoHistory() {
        if (historyStack.length <= 1) {
            showNotification('没有可撤销的操作', 'warning');
            return;
        }
        const current = historyStack.pop();
        redoStack.push(current);
        restoreState(historyStack[historyStack.length - 1]);
        showNotification('已撤销', 'info');
    }

    function redoHistory() {
        if (!redoStack.length) {
            showNotification('没有可重做的操作', 'warning');
            return;
        }
        const next = redoStack.pop();
        historyStack.push(next);
        restoreState(next);
        showNotification('已重做', 'info');
    }

    if (compareButton && versionDiffPanel) {
        compareButton.addEventListener('click', function() {
            const isActive = versionDiffPanel.classList.toggle('ring-2');
            versionDiffPanel.classList.toggle('ring-primary', isActive);
            versionDiffPanel.querySelectorAll('.version-diff-item').forEach(item => {
                item.classList.toggle('shadow-md', isActive);
            });
            document.querySelectorAll('[data-diff]').forEach(target => {
                target.classList.toggle('diff-active', isActive);
            });
            showNotification(isActive ? '已高亮版本对比结果' : '已取消版本对比高亮', 'info');
        });
    }

    if (annotationButton && modelerCanvas) {
        annotationButton.addEventListener('click', function() {
            const isActive = modelerCanvas.classList.toggle('ring-2');
            modelerCanvas.classList.toggle('ring-secondary', isActive);
            modelerCanvas.classList.toggle('ring-offset-2', isActive);
            this.classList.toggle('bg-secondary');
            this.classList.toggle('text-white');
            modelerCanvas.classList.toggle('annotation-active', isActive);
            annotationActive = isActive;
            annotationSelection = [];
            getEntityNodes().forEach(node => node.classList.remove('annotation-selected'));
            showNotification(isActive ? '已进入标注模式' : '已退出标注模式', 'success');
        });
    }

    if (propertiesTabs) {
        propertiesTabs.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function() {
                propertiesTabs.querySelectorAll('button').forEach(tab => {
                    tab.classList.remove('bg-primary-light', 'text-primary');
                    tab.classList.add('bg-gray-100', 'text-gray-600');
                });
                this.classList.add('bg-primary-light', 'text-primary');
                this.classList.remove('bg-gray-100', 'text-gray-600');
                activeTab = this.getAttribute('data-tab');
                renderPropertiesPanel();
            });
        });
    }

    function getNodeCenter(node, canvas) {
        const nodeRect = node.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        return {
            x: nodeRect.left - canvasRect.left + nodeRect.width / 2,
            y: nodeRect.top - canvasRect.top + nodeRect.height / 2
        };
    }

    function getNodeAnchor(node, target, canvas) {
        const nodeRect = node.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        const cx = nodeRect.left - canvasRect.left + nodeRect.width / 2;
        const cy = nodeRect.top - canvasRect.top + nodeRect.height / 2;
        const tx = targetRect.left - canvasRect.left + targetRect.width / 2;
        const ty = targetRect.top - canvasRect.top + targetRect.height / 2;
        const dx = tx - cx;
        const dy = ty - cy;
        const halfW = nodeRect.width / 2;
        const halfH = nodeRect.height / 2;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        if (absDx / halfW > absDy / halfH) {
            return {
                x: cx + (dx > 0 ? halfW : -halfW),
                y: cy + dy * (halfW / absDx)
            };
        }
        return {
            x: cx + dx * (halfH / absDy),
            y: cy + (dy > 0 ? halfH : -halfH)
        };
    }

    function updateRelationPath(relationId) {
        if (!dynamicRelations || !modelerCanvas) {
            return;
        }
        const line = dynamicRelations.querySelector(`path[data-relation-id="${relationId}"]`);
        const label = dynamicRelations.querySelector(`text[data-relation-id="${relationId}"]`);
        if (!line || !label) {
            return;
        }
        const fromId = line.getAttribute('data-from');
        const toId = line.getAttribute('data-to');
        const fromNode = document.querySelector(`.entity-node[data-id="${fromId}"]`);
        const toNode = document.querySelector(`.entity-node[data-id="${toId}"]`);
        if (!fromNode || !toNode) {
            return;
        }
        const from = getNodeAnchor(fromNode, toNode, modelerCanvas);
        const to = getNodeAnchor(toNode, fromNode, modelerCanvas);
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2 - 12;
        const offsetX = Number(label.getAttribute('data-offset-x') || 0);
        const offsetY = Number(label.getAttribute('data-offset-y') || 0);

        line.setAttribute('d', `M${from.x} ${from.y} C${from.x + 60} ${from.y}, ${to.x - 60} ${to.y}, ${to.x} ${to.y}`);
        label.setAttribute('x', midX + offsetX);
        label.setAttribute('y', midY + offsetY);
    }

    function updateAllRelations() {
        if (!dynamicRelations) {
            return;
        }
        dynamicRelations.querySelectorAll('path[data-relation-id]').forEach(path => {
            const relationId = path.getAttribute('data-relation-id');
            updateRelationPath(relationId);
        });
    }

    function renderPropertiesPanel() {
        if (!propertiesPanel || !selectedItem) {
            return;
        }
        if (selectedItem.type === 'entity') {
            const entity = ontologyData.entities[selectedItem.id];
            if (!entity) {
                return;
            }
            if (activeTab === 'base') {
                propertiesPanel.innerHTML = `
                    <div class="bg-gray-50 p-3 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <h4 class="font-medium text-gray-900">${entity.name}</h4>
                                <p class="text-xs text-gray-500">${entity.domain}</p>
                            </div>
                            <span class="px-2 py-1 text-xs font-medium bg-success-light text-success rounded-full">${entity.status}</span>
                        </div>
                    </div>
                    <div class="space-y-2 text-sm">
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">名称</label>
                            <input type="text" data-field="name" value="${entity.name}" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">唯一标识</label>
                            <input type="text" data-field="id" value="${entity.id}" readonly class="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 text-gray-500">
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">描述</label>
                            <textarea data-field="description" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent" rows="3">${entity.description}</textarea>
                        </div>
                    </div>
                `;
            }
            if (activeTab === 'attributes') {
                propertiesPanel.innerHTML = `
                    <div class="space-y-2">
                        ${entity.attributes.map(attr => `
                            <div class="bg-white border border-gray-200 rounded-lg p-3 text-sm">
                                <div class="flex items-center justify-between">
                                    <span class="font-medium text-gray-700">${attr.name}</span>
                                    <span class="text-xs text-gray-500">${attr.type}</span>
                                </div>
                                <div class="text-xs text-gray-500 mt-2">
                                    ${attr.required ? '必填' : '可选'}${attr.unique ? ' · 唯一' : ''}
                                </div>
                            </div>
                        `).join('')}
                        <button id="addAttributeButton" class="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded text-sm">
                            <i class="fa fa-plus mr-1"></i> 添加属性
                        </button>
                    </div>
                `;
            }
            if (activeTab === 'rules') {
                propertiesPanel.innerHTML = `
                    <div class="bg-white border border-gray-200 rounded-lg p-3">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm font-medium text-gray-700">业务规则</span>
                            <button id="addRuleButton" class="text-xs text-primary">新增规则</button>
                        </div>
                        <div class="space-y-2 text-xs text-gray-600">
                            ${entity.rules.length ? entity.rules.map(rule => `<div class="p-2 bg-gray-50 rounded">${rule}</div>`).join('') : '<div class="text-gray-400">暂无规则</div>'}
                        </div>
                    </div>
                    <div class="bg-white border border-gray-200 rounded-lg p-3">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm font-medium text-gray-700">高级约束</span>
                            <button id="addConstraintButton" class="text-xs text-primary">添加约束</button>
                        </div>
                        <div class="space-y-2 text-xs text-gray-600">
                            ${entity.constraints.length ? entity.constraints.map(constraint => `
                                <div class="flex items-center justify-between">
                                    <span>${constraint.name}</span>
                                    <span class="text-gray-400">${constraint.value}</span>
                                </div>
                            `).join('') : '<div class="text-gray-400">暂无约束</div>'}
                        </div>
                    </div>
                `;
            }
            if (activeTab === 'inheritance') {
                propertiesPanel.innerHTML = `
                    <div class="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-600">
                        <div class="flex items-center justify-between mb-2">
                            <span class="font-medium text-gray-700">继承关系</span>
                            <button id="addInheritanceButton" class="text-xs text-primary">新增继承</button>
                        </div>
                        ${entity.inheritance.length ? entity.inheritance.map(parent => `<div class="p-2 bg-gray-50 rounded mb-2">${parent}</div>`).join('') : '<div class="text-gray-400">暂无继承关系</div>'}
                    </div>
                `;
            }
        }

        if (selectedItem.type === 'relation') {
            const relation = ontologyData.relations[selectedItem.id];
            if (!relation) {
                return;
            }
            propertiesPanel.innerHTML = `
                <div class="bg-gray-50 p-3 rounded-lg">
                    <div class="flex items-center justify-between">
                        <div>
                            <h4 class="font-medium text-gray-900">${relation.semantics}</h4>
                            <p class="text-xs text-gray-500">${relation.from} → ${relation.to}</p>
                        </div>
                        <span class="px-2 py-1 text-xs font-medium bg-secondary-light text-secondary rounded-full">关系</span>
                    </div>
                </div>
                <div class="space-y-2 text-sm">
                    <div>
                        <label class="block text-xs text-gray-500 mb-1">关系语义</label>
                        <input type="text" id="relationSemanticsInput" value="${relation.semantics}" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent">
                    </div>
                    <div>
                        <label class="block text-xs text-gray-500 mb-1">基数</label>
                        <select id="relationCardinalitySelect" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent">
                            ${cardinalityOptions.map(option => `<option ${option === relation.cardinality ? 'selected' : ''}>${option}</option>`).join('')}
                        </select>
                    </div>
                </div>
            `;
        }
        bindPropertiesPanelEvents();
    }

    function setSelectedItem(item) {
        selectedItem = item;
        renderPropertiesPanel();
    }

    function renderEntityList() {
        if (!entityList) {
            return;
        }
        const entities = Object.values(ontologyData.entities);
        entityList.innerHTML = entities.map(entity => `
            <div class="flex items-center p-2 text-sm hover:bg-gray-50 cursor-pointer entity-item" data-id="${entity.id}">
                <i class="fa fa-cube text-primary mr-2"></i>
                <span>${entity.name}</span>
            </div>
        `).join('');
        entityList.querySelectorAll('.entity-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = item.getAttribute('data-id');
                const node = document.querySelector(`.entity-node[data-id="${id}"]`);
                if (node) {
                    node.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                    setSelectedItem({ type: 'entity', id });
                }
            });
        });
    }

    function createEntityNode(entity, position) {
        if (!modelerWorkspace) {
            return null;
        }
        const node = document.createElement('div');
        node.className = 'absolute w-52 bg-white border-2 border-primary rounded-lg shadow-sm cursor-move entity-node relative';
        node.dataset.id = entity.id;
        node.style.left = `${position.left}px`;
        node.style.top = `${position.top}px`;
        node.innerHTML = `
            <span class="relation-handle" data-handle="out"></span>
            <div class="p-3 border-b border-gray-200 bg-primary-light">
                <div class="flex items-center justify-between">
                    <h4 class="font-medium text-gray-900">${entity.name}</h4>
                    <div class="flex items-center space-x-1 text-xs text-gray-500">
                        <span>ID: ${entity.id}</span>
                    </div>
                </div>
            </div>
            <div class="p-3">
                <div class="space-y-1 text-sm">
                    ${entity.attributes.slice(0, 4).map(attr => `
                        <div class="flex items-center">
                            <span class="text-primary mr-2">•</span>
                            <span class="text-gray-600">${attr.name} (${attr.type})</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        modelerWorkspace.appendChild(node);
        bindEntityNodeEvents(node);
        updateAllRelations();
        return node;
    }

    function createPackageNode(name, position) {
        if (!modelerWorkspace) {
            return null;
        }
        const node = document.createElement('div');
        node.className = 'absolute w-64 h-40 border-2 border-dashed border-gray-300 rounded-lg bg-white/70 text-gray-600 text-sm';
        node.style.left = `${position.left}px`;
        node.style.top = `${position.top}px`;
        node.innerHTML = `
            <div class="px-3 py-2 border-b border-gray-200 text-xs text-gray-500">子域</div>
            <div class="p-3 font-medium text-gray-700">${name}</div>
        `;
        modelerWorkspace.appendChild(node);
        node.addEventListener('mousedown', (event) => {
            if (annotationActive) {
                return;
            }
            const rect = node.getBoundingClientRect();
            const canvasRect = modelerCanvas.getBoundingClientRect();
            nodeDragState = {
                node,
                startX: event.clientX,
                startY: event.clientY,
                originLeft: rect.left - canvasRect.left,
                originTop: rect.top - canvasRect.top
            };
        });
        return node;
    }

    function getCanvasCenterPosition() {
        if (!modelerCanvas) {
            return { left: 120, top: 120 };
        }
        const left = modelerCanvas.scrollLeft + modelerCanvas.clientWidth / 2 - 120;
        const top = modelerCanvas.scrollTop + modelerCanvas.clientHeight / 2 - 80;
        return { left: Math.max(left, 20), top: Math.max(top, 20) };
    }

    function createEntityTemplate(templateKey) {
        const templates = {
            customer: {
                name: '新客户',
                domain: '客户域',
                attributes: [
                    { name: '客户ID', type: 'String', required: true },
                    { name: '客户名称', type: 'String', required: true },
                    { name: '客户类型', type: 'Enum', required: false }
                ]
            },
            product: {
                name: '新产品',
                domain: '产品域',
                attributes: [
                    { name: '产品ID', type: 'String', required: true },
                    { name: '产品名称', type: 'String', required: true },
                    { name: '价格', type: 'Number', required: false }
                ]
            },
            contract: {
                name: '新合同',
                domain: '合同域',
                attributes: [
                    { name: '合同编号', type: 'String', required: true },
                    { name: '合同金额', type: 'Number', required: true },
                    { name: '签署日期', type: 'Date', required: false }
                ]
            }
        };
        const template = templates[templateKey] || templates.customer;
        const id = `entity-${Date.now().toString(36).slice(-5)}`;
        return {
            id,
            name: template.name,
            domain: template.domain,
            status: '主干',
            description: '',
            attributes: template.attributes,
            rules: [],
            constraints: [],
            inheritance: []
        };
    }

    function addEntityFromTemplate(templateKey) {
        const entity = createEntityTemplate(templateKey);
        ontologyData.entities[entity.id] = entity;
        const node = createEntityNode(entity, getCanvasCenterPosition());
        renderEntityList();
            if (node) {
                setSelectedItem({ type: 'entity', id: entity.id });
                pushHistory();
            }
    }

    function openNodeModal(type) {
        if (!nodeCreateModal) {
            return;
        }
        if (nodeTypeSelect) {
            nodeTypeSelect.value = type;
        }
        if (nodeNameInput) {
            nodeNameInput.value = '';
        }
        if (nodeDomainInput) {
            nodeDomainInput.value = '';
        }
        if (nodeAttributesInput) {
            nodeAttributesInput.value = '';
        }
        if (nodeDomainField && nodeAttributesField) {
            const isEntity = type === 'entity';
            nodeDomainField.classList.toggle('hidden', !isEntity);
            nodeAttributesField.classList.toggle('hidden', !isEntity);
        }
        nodeCreateModal.classList.remove('hidden');
    }

    function closeNodeModal() {
        if (nodeCreateModal) {
            nodeCreateModal.classList.add('hidden');
        }
    }

    if (nodeTypeSelect && nodeDomainField && nodeAttributesField) {
        nodeTypeSelect.addEventListener('change', () => {
            const isEntity = nodeTypeSelect.value === 'entity';
            nodeDomainField.classList.toggle('hidden', !isEntity);
            nodeAttributesField.classList.toggle('hidden', !isEntity);
        });
    }

    if (closeNodeCreateModal) {
        closeNodeCreateModal.addEventListener('click', closeNodeModal);
    }
    if (cancelNodeCreate) {
        cancelNodeCreate.addEventListener('click', closeNodeModal);
    }
    if (nodeCreateOverlay) {
        nodeCreateOverlay.addEventListener('click', closeNodeModal);
    }
    if (confirmNodeCreate) {
        confirmNodeCreate.addEventListener('click', () => {
            const type = nodeTypeSelect ? nodeTypeSelect.value : 'entity';
            const name = nodeNameInput ? nodeNameInput.value.trim() : '';
            if (!name) {
                showNotification('请填写节点名称', 'warning');
                return;
            }
            if (type === 'package') {
                createPackageNode(name, getCanvasCenterPosition());
                closeNodeModal();
                showNotification('子域已创建', 'success');
                pushHistory();
                return;
            }
            const domain = nodeDomainInput ? nodeDomainInput.value.trim() : '自定义域';
            const attributesInput = nodeAttributesInput ? nodeAttributesInput.value.trim() : '';
            const attrs = attributesInput
                ? attributesInput.split(',').map(item => item.trim()).filter(Boolean)
                : ['ID', '名称'];
            const entity = {
                id: `entity-${Date.now().toString(36).slice(-5)}`,
                name,
                domain,
                status: '主干',
                description: '',
                attributes: attrs.map(attr => ({ name: attr, type: 'String', required: false })),
                rules: [],
                constraints: [],
                inheritance: []
            };
            ontologyData.entities[entity.id] = entity;
            createEntityNode(entity, getCanvasCenterPosition());
            renderEntityList();
            setSelectedItem({ type: 'entity', id: entity.id });
            closeNodeModal();
            showNotification('实体已创建', 'success');
            pushHistory();
        });
    }

    if (toolboxItems.length) {
        toolboxItems.forEach(item => {
            item.addEventListener('click', () => {
                const tool = item.getAttribute('data-tool');
                if (tool === 'entity') {
                    openNodeModal('entity');
                }
                if (tool === 'relationship') {
                    if (annotationButton) {
                        annotationButton.click();
                    }
                }
                if (tool === 'package') {
                    openNodeModal('package');
                }
            });
        });
    }

    if (templateItems.length) {
        templateItems.forEach(item => {
            item.addEventListener('click', () => {
                const template = item.getAttribute('data-template');
                addEntityFromTemplate(template);
                showNotification('模板实体已创建', 'success');
                pushHistory();
            });
        });
    }

    function applyZoom(scale) {
        zoomScale = Math.min(Math.max(scale, 0.5), 1.8);
        if (modelerWorkspace) {
            modelerWorkspace.style.transform = `scale(${zoomScale})`;
            modelerWorkspace.style.transformOrigin = '0 0';
        }
        updateAllRelations();
    }

    if (zoomInButton) {
        zoomInButton.addEventListener('click', () => {
            applyZoom(zoomScale + 0.1);
        });
    }
    if (zoomOutButton) {
        zoomOutButton.addEventListener('click', () => {
            applyZoom(zoomScale - 0.1);
        });
    }
    if (fitViewButton) {
        fitViewButton.addEventListener('click', () => {
            applyZoom(1);
            if (modelerCanvas) {
                modelerCanvas.scrollLeft = 0;
                modelerCanvas.scrollTop = 0;
            }
        });
    }

    if (toolMoveButton && modelerCanvas) {
        toolMoveButton.addEventListener('click', () => {
            panActive = !panActive;
            toolMoveButton.classList.toggle('bg-primary-light', panActive);
            toolMoveButton.classList.toggle('text-primary', panActive);
        });
        modelerCanvas.addEventListener('mousedown', (event) => {
            if (!panActive) {
                return;
            }
            if (event.target.closest('.entity-node')) {
                return;
            }
            panState = {
                startX: event.clientX,
                startY: event.clientY,
                scrollLeft: modelerCanvas.scrollLeft,
                scrollTop: modelerCanvas.scrollTop
            };
        });
        document.addEventListener('mousemove', (event) => {
            if (!panActive || !panState) {
                return;
            }
            const dx = event.clientX - panState.startX;
            const dy = event.clientY - panState.startY;
            modelerCanvas.scrollLeft = panState.scrollLeft - dx;
            modelerCanvas.scrollTop = panState.scrollTop - dy;
        });
        document.addEventListener('mouseup', () => {
            panState = null;
        });
    }

    if (autoLayoutButton) {
        autoLayoutButton.addEventListener('click', () => {
            const nodes = getEntityNodes();
            const gapX = 260;
            const gapY = 200;
            const startLeft = 80;
            const startTop = 80;
            nodes.forEach((node, index) => {
                const row = Math.floor(index / 3);
                const col = index % 3;
                node.style.left = `${startLeft + col * gapX}px`;
                node.style.top = `${startTop + row * gapY}px`;
            });
            updateAllRelations();
            pushHistory();
        });
    }

    if (modelerCanvas) {
        modelerCanvas.addEventListener('dblclick', (event) => {
            if (annotationActive) {
                return;
            }
            const canvasRect = modelerCanvas.getBoundingClientRect();
            const left = event.clientX - canvasRect.left + modelerCanvas.scrollLeft - 100;
            const top = event.clientY - canvasRect.top + modelerCanvas.scrollTop - 60;
            const entity = createEntityTemplate('customer');
            entity.name = '新实体';
            entity.domain = '自定义域';
            ontologyData.entities[entity.id] = entity;
            createEntityNode(entity, { left: Math.max(left, 20), top: Math.max(top, 20) });
            renderEntityList();
            setSelectedItem({ type: 'entity', id: entity.id });
            pushHistory();
        });
    }

    function bindPropertiesPanelEvents() {
        if (!propertiesPanel || !selectedItem) {
            return;
        }
        if (selectedItem.type === 'entity') {
            const entity = ontologyData.entities[selectedItem.id];
            if (!entity) {
                return;
            }
            const nameInput = propertiesPanel.querySelector('input[data-field="name"]');
            const descInput = propertiesPanel.querySelector('textarea[data-field="description"]');
            if (nameInput) {
                nameInput.addEventListener('input', () => {
                    entity.name = nameInput.value.trim() || entity.name;
                    const node = document.querySelector(`.entity-node[data-id="${entity.id}"] h4`);
                    if (node) {
                        node.textContent = entity.name;
                    }
                    if (entityList) {
                        const listItem = entityList.querySelector(`.entity-item[data-id="${entity.id}"] span`);
                        if (listItem) {
                            listItem.textContent = entity.name;
                        }
                    }
                    pushHistory();
                });
            }
            if (descInput) {
                descInput.addEventListener('input', () => {
                    entity.description = descInput.value.trim();
                    pushHistory();
                });
            }
            const addAttributeButton = propertiesPanel.querySelector('#addAttributeButton');
            if (addAttributeButton) {
                addAttributeButton.addEventListener('click', () => {
                    entity.attributes.push({ name: '新属性', type: 'String', required: false });
                    renderPropertiesPanel();
                    pushHistory();
                });
            }
            const addRuleButton = propertiesPanel.querySelector('#addRuleButton');
            if (addRuleButton) {
                addRuleButton.addEventListener('click', () => {
                    entity.rules.push('请输入新规则');
                    renderPropertiesPanel();
                    pushHistory();
                });
            }
            const addConstraintButton = propertiesPanel.querySelector('#addConstraintButton');
            if (addConstraintButton) {
                addConstraintButton.addEventListener('click', () => {
                    entity.constraints.push({ name: '新约束', value: '待定义' });
                    renderPropertiesPanel();
                    pushHistory();
                });
            }
            const addInheritanceButton = propertiesPanel.querySelector('#addInheritanceButton');
            if (addInheritanceButton) {
                addInheritanceButton.addEventListener('click', () => {
                    entity.inheritance.push('父类实体');
                    renderPropertiesPanel();
                    pushHistory();
                });
            }
        }
        if (selectedItem.type === 'relation') {
            const relation = ontologyData.relations[selectedItem.id];
            if (!relation) {
                return;
            }
            const semanticsInput = propertiesPanel.querySelector('#relationSemanticsInput');
            const cardinalitySelect = propertiesPanel.querySelector('#relationCardinalitySelect');
            if (semanticsInput) {
                semanticsInput.addEventListener('input', () => {
                    relation.semantics = semanticsInput.value.trim() || '关联';
                    const label = dynamicRelations.querySelector(`text[data-relation-id="${relation.id}"]`);
                    if (label) {
                        label.setAttribute('data-semantics', relation.semantics);
                        label.textContent = `${relation.semantics} (${relation.cardinality})`;
                    }
                    pushHistory();
                });
            }
            if (cardinalitySelect) {
                cardinalitySelect.addEventListener('change', () => {
                    relation.cardinality = cardinalitySelect.value;
                    const label = dynamicRelations.querySelector(`text[data-relation-id="${relation.id}"]`);
                    if (label) {
                        label.setAttribute('data-cardinality', relation.cardinality);
                        label.textContent = `${relation.semantics} (${relation.cardinality})`;
                    }
                    pushHistory();
                });
            }
        }
    }

    function bindEntityNodeEvents(node) {
        if (!node || node.dataset.bound === 'true') {
            return;
        }
        node.dataset.bound = 'true';
        node.addEventListener('click', function() {
            if (dragMoved) {
                dragMoved = false;
                return;
            }
            setSelectedItem({ type: 'entity', id: this.getAttribute('data-id') });
            if (!annotationActive) {
                return;
            }
            if (this.classList.contains('annotation-selected')) {
                this.classList.remove('annotation-selected');
                annotationSelection = annotationSelection.filter(id => id !== this.getAttribute('data-id'));
                return;
            }
            if (annotationSelection.length >= 2) {
                annotationSelection = [];
                getEntityNodes().forEach(item => item.classList.remove('annotation-selected'));
            }
            this.classList.add('annotation-selected');
            annotationSelection.push(this.getAttribute('data-id'));
            if (annotationSelection.length === 2) {
                const fromNode = document.querySelector(`.entity-node[data-id="${annotationSelection[0]}"]`);
                const toNode = document.querySelector(`.entity-node[data-id="${annotationSelection[1]}"]`);
                if (fromNode && toNode) {
                    const preset = getRelationPreset();
                    addRelation(fromNode, toNode, preset.semantics, preset.cardinality);
                    showNotification(`已建立 ${annotationSelection[0]} → ${annotationSelection[1]} 关系`, 'success');
                    pushHistory();
                }
            }
        });

        node.addEventListener('mousedown', function(event) {
            if (annotationActive) {
                if (!event.target || !event.target.classList.contains('relation-handle')) {
                    return;
                }
                const startId = this.getAttribute('data-id');
                if (!startId) {
                    return;
                }
                const startPoint = getNodeCenter(this, modelerCanvas);
                const tempLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                tempLine.setAttribute('stroke', '#8b5cf6');
                tempLine.setAttribute('stroke-width', '2');
                tempLine.setAttribute('fill', 'none');
                tempLine.setAttribute('stroke-dasharray', '6,4');
                tempLine.setAttribute('data-temp', 'true');
                dynamicRelations.appendChild(tempLine);

                dragState = {
                    startNode: this,
                    startPoint,
                    tempLine
                };
                dragMoved = false;
                return;
            }
            if (event.target && event.target.classList.contains('relation-handle')) {
                return;
            }
            const rect = this.getBoundingClientRect();
            const canvasRect = modelerCanvas.getBoundingClientRect();
            nodeDragState = {
                node: this,
                startX: event.clientX,
                startY: event.clientY,
                originLeft: rect.left - canvasRect.left,
                originTop: rect.top - canvasRect.top
            };
        });
    }

    function addRelation(fromNode, toNode, semantics = '关联', cardinality = '1:N') {
        if (!dynamicRelations || !modelerCanvas) {
            return;
        }
        const fromId = fromNode.getAttribute('data-id');
        const toId = toNode.getAttribute('data-id');
        if (!fromId || !toId || fromId === toId) {
            return;
        }
        const relationId = `rel-${fromId}-${toId}`;
        if (dynamicRelations.querySelector(`[data-relation-id="${relationId}"]`)) {
            showNotification('关系已存在', 'warning');
            return;
        }
        const from = getNodeAnchor(fromNode, toNode, modelerCanvas);
        const to = getNodeAnchor(toNode, fromNode, modelerCanvas);
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2 - 12;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        line.setAttribute('d', `M${from.x} ${from.y} C${from.x + 60} ${from.y}, ${to.x - 60} ${to.y}, ${to.x} ${to.y}`);
        line.setAttribute('stroke', '#3b82f6');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('fill', 'none');
        line.setAttribute('marker-end', 'url(#dynamicArrowhead)');
        line.setAttribute('data-relation-id', relationId);
        line.setAttribute('data-from', fromId);
        line.setAttribute('data-to', toId);
        line.setAttribute('pointer-events', 'none');

        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', midX);
        label.setAttribute('y', midY);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('fill', '#6b7280');
        label.setAttribute('font-size', '12');
        label.setAttribute('data-relation-id', relationId);
        label.setAttribute('data-role', 'cardinality');
        label.setAttribute('data-cardinality', cardinality);
        label.setAttribute('data-semantics', semantics);
        label.setAttribute('class', 'cursor-pointer');
        label.setAttribute('data-offset-x', '0');
        label.setAttribute('data-offset-y', '0');
        label.textContent = `${semantics} (${cardinality})`;

        dynamicRelations.appendChild(line);
        dynamicRelations.appendChild(label);

        ontologyData.relations[relationId] = {
            id: relationId,
            from: fromId,
            to: toId,
            semantics,
            cardinality
        };
        setSelectedItem({ type: 'relation', id: relationId });
    }

    if (modelerCanvas && dynamicRelations) {
        document.addEventListener('mousemove', function(event) {
            if (!dragState || !annotationActive || !modelerCanvas) {
                return;
            }
            const canvasRect = modelerCanvas.getBoundingClientRect();
            const x = event.clientX - canvasRect.left;
            const y = event.clientY - canvasRect.top;
            const start = dragState.startPoint;
            const distance = Math.hypot(x - start.x, y - start.y);
            if (distance > 6) {
                dragMoved = true;
            }
            const tempLine = dragState.tempLine;
            tempLine.setAttribute('d', `M${start.x} ${start.y} C${start.x + 60} ${start.y}, ${x - 60} ${y}, ${x} ${y}`);
        });

        document.addEventListener('mouseup', function(event) {
            if (!dragState) {
                return;
            }
            if (dragState.tempLine) {
                dragState.tempLine.remove();
            }
            const target = event.target.closest('.entity-node');
            if (annotationActive && target && target !== dragState.startNode) {
                const preset = getRelationPreset();
                addRelation(dragState.startNode, target, preset.semantics, preset.cardinality);
                showNotification('已创建拖拽关系，可双击修改语义', 'success');
                pushHistory();
            }
            dragState = null;
        });

        document.addEventListener('mousemove', function(event) {
            if (!nodeDragState || annotationActive) {
                return;
            }
            const dx = event.clientX - nodeDragState.startX;
            const dy = event.clientY - nodeDragState.startY;
            if (Math.hypot(dx, dy) > 3) {
                dragMoved = true;
            }
            nodeDragState.node.style.left = `${nodeDragState.originLeft + dx}px`;
            nodeDragState.node.style.top = `${nodeDragState.originTop + dy}px`;
            updateAllRelations();
        });

        document.addEventListener('mouseup', function() {
            if (nodeDragState) {
                if (dragMoved) {
                    pushHistory();
                }
                nodeDragState = null;
                dragMoved = false;
            }
        });
    }

    if (dynamicRelations) {
        dynamicRelations.addEventListener('click', function(event) {
            const target = event.target;
            if (target && target.getAttribute('data-role') === 'cardinality') {
                const relationId = target.getAttribute('data-relation-id');
                if (relationId) {
                    setSelectedItem({ type: 'relation', id: relationId });
                }
                const current = target.getAttribute('data-cardinality');
                const semantics = target.getAttribute('data-semantics') || '关联';
                const nextIndex = (cardinalityOptions.indexOf(current) + 1) % cardinalityOptions.length;
                const next = cardinalityOptions[nextIndex];
                target.setAttribute('data-cardinality', next);
                target.textContent = `${semantics} (${next})`;
                if (relationId && ontologyData.relations[relationId]) {
                    ontologyData.relations[relationId].cardinality = next;
                }
                showNotification(`已更新基数为 ${next}`, 'info');
                pushHistory();
            }
        });

        dynamicRelations.addEventListener('dblclick', function(event) {
            const target = event.target;
            if (target && target.getAttribute('data-role') === 'cardinality') {
                const currentName = target.getAttribute('data-semantics') || '关联';
                const current = target.getAttribute('data-cardinality') || '1:N';
                const editBox = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
                const x = Number(target.getAttribute('x') || 0) - 60;
                const y = Number(target.getAttribute('y') || 0) - 18;

                editBox.setAttribute('x', x);
                editBox.setAttribute('y', y);
                editBox.setAttribute('width', '120');
                editBox.setAttribute('height', '28');
                editBox.setAttribute('data-editor', 'true');

                const wrapper = document.createElement('div');
                wrapper.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
                wrapper.style.width = '120px';
                wrapper.style.height = '28px';

                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentName;
                input.style.width = '120px';
                input.style.height = '28px';
                input.style.border = '1px solid #3b82f6';
                input.style.borderRadius = '6px';
                input.style.padding = '0 6px';
                input.style.fontSize = '12px';
                input.style.outline = 'none';
                input.style.background = '#ffffff';

                wrapper.appendChild(input);
                editBox.appendChild(wrapper);
                dynamicRelations.appendChild(editBox);
                target.style.display = 'none';
                input.focus();

                const commit = (value) => {
                    const trimmed = (value || '').trim();
                    if (trimmed) {
                        target.setAttribute('data-semantics', trimmed);
                        target.textContent = `${trimmed} (${current})`;
                        const relationId = target.getAttribute('data-relation-id');
                        if (relationId && ontologyData.relations[relationId]) {
                            ontologyData.relations[relationId].semantics = trimmed;
                            setSelectedItem({ type: 'relation', id: relationId });
                        }
                        showNotification('关系语义已更新', 'success');
                        pushHistory();
                    }
                    target.style.display = '';
                    editBox.remove();
                };

                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        commit(input.value);
                    }
                    if (e.key === 'Escape') {
                        target.style.display = '';
                        editBox.remove();
                    }
                });

                input.addEventListener('blur', () => {
                    commit(input.value);
                });
            }
        });

        dynamicRelations.addEventListener('mousedown', function(event) {
            const target = event.target;
            if (target && target.tagName === 'text') {
                labelDragState = {
                    label: target,
                    startX: event.clientX,
                    startY: event.clientY,
                    offsetX: Number(target.getAttribute('data-offset-x') || 0),
                    offsetY: Number(target.getAttribute('data-offset-y') || 0)
                };
            }
        });

        document.addEventListener('mousemove', function(event) {
            if (!labelDragState) {
                return;
            }
            const dx = event.clientX - labelDragState.startX;
            const dy = event.clientY - labelDragState.startY;
            labelDragState.label.setAttribute('data-offset-x', labelDragState.offsetX + dx);
            labelDragState.label.setAttribute('data-offset-y', labelDragState.offsetY + dy);
            const relationId = labelDragState.label.getAttribute('data-relation-id');
            updateRelationPath(relationId);
        });

        document.addEventListener('mouseup', function() {
            if (labelDragState) {
                labelDragState = null;
                pushHistory();
            }
        });
    }

    window.addEventListener('resize', updateAllRelations);

    if (ruleTemplateButton) {
        ruleTemplateButton.addEventListener('click', function() {
            showNotification('已打开规则模板选择面板', 'info');
        });
    }

    if (modelerMoreButton && modelerMoreMenu) {
        modelerMoreButton.addEventListener('click', (event) => {
            event.stopPropagation();
            modelerMoreMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', (event) => {
            if (!modelerMoreMenu.contains(event.target) && !modelerMoreButton.contains(event.target)) {
                modelerMoreMenu.classList.add('hidden');
            }
        });
    }

    if (toggleModelerInsights && modelerInsightsPanel) {
        toggleModelerInsights.addEventListener('click', () => {
            modelerInsightsPanel.classList.toggle('hidden');
        });
    }

    if (heatmap) {
        heatmap.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function() {
                heatmap.querySelectorAll('button').forEach(item => {
                    item.classList.remove('ring-2', 'ring-primary');
                });
                this.classList.add('ring-2', 'ring-primary');
                if (mappingDomainLabel) {
                    mappingDomainLabel.textContent = '当前域：' + this.getAttribute('data-domain');
                }
                showNotification('已聚焦' + this.getAttribute('data-domain') + '映射覆盖率', 'success');
            });
        });
    }

    const mappingRuleList = document.getElementById('mappingRuleList');
    const mappingRuleCount = document.getElementById('mappingRuleCount');
    const addMappingRuleButton = document.getElementById('addMappingRuleButton');
    const saveMappingButton = document.getElementById('saveMappingButton');
    const mappingSourceSelect = document.getElementById('mappingSourceSelect');
    const mappingTargetSelect = document.getElementById('mappingTargetSelect');
    const mappingTransformSelect = document.getElementById('mappingTransformSelect');
    const mappingConditionInput = document.getElementById('mappingConditionInput');
    const mappingScriptInput = document.getElementById('mappingScriptInput');
    const mappingAggregateFields = document.getElementById('mappingAggregateFields');
    const addAggregateField = document.getElementById('addAggregateField');
    const sourceSearchInput = document.getElementById('sourceSearchInput');
    const targetSearchInput = document.getElementById('targetSearchInput');
    const mappingLinkCanvas = document.getElementById('mappingLinkCanvas');
    const sourceTables = document.querySelectorAll('.source-table');
    const targetEntities = document.querySelectorAll('.target-entity');
    const sourceStructurePanel = document.getElementById('sourceStructurePanel');
    const targetStructurePanel = document.getElementById('targetStructurePanel');
    const loadSampleButton = document.getElementById('loadSampleButton');
    const testMappingButton = document.getElementById('testMappingButton');
    const mappingSampleData = document.getElementById('mappingSampleData');
    const mappingResultData = document.getElementById('mappingResultData');
    const ontologyTableBody = document.getElementById('ontologyTableBody');
    const activeOntologyCount = document.getElementById('activeOntologyCount');
    const conceptTotalCount = document.getElementById('conceptTotalCount');
    const newOntologyButton = document.getElementById('newOntologyButton');
    const newOntologyModal = document.getElementById('newOntologyModal');
    const newOntologyOverlay = document.getElementById('newOntologyOverlay');
    const closeNewOntologyModal = document.getElementById('closeNewOntologyModal');
    const cancelNewOntology = document.getElementById('cancelNewOntology');
    const confirmNewOntology = document.getElementById('confirmNewOntology');
    const ontologyNameInput = document.getElementById('ontologyNameInput');
    const ontologyDomainInput = document.getElementById('ontologyDomainInput');
    const ontologyConceptInput = document.getElementById('ontologyConceptInput');
    const ontologyRelationInput = document.getElementById('ontologyRelationInput');
    const ontologyVersionInput = document.getElementById('ontologyVersionInput');
    const ontologyStatusInput = document.getElementById('ontologyStatusInput');

    function setTransformFieldState(field, enabled) {
        if (!field) {
            return;
        }
        if ('disabled' in field) {
            field.disabled = !enabled;
        } else {
            field.querySelectorAll('input, textarea, select').forEach(input => {
                input.disabled = !enabled;
            });
        }
        const container = field.closest('.bg-gray-50');
        if (container) {
            container.classList.toggle('opacity-40', !enabled);
        }
    }

    function getAggregateFieldValues() {
        if (!mappingAggregateFields) {
            return [];
        }
        return Array.from(mappingAggregateFields.querySelectorAll('input'))
            .map(input => input.value.trim())
            .filter(Boolean);
    }

    function updateTransformDetails() {
        if (!mappingTransformSelect) {
            return;
        }
        const transform = mappingTransformSelect.value || '';
        const conditionEnabled = transform.includes('条件映射');
        const aggregateEnabled = transform.includes('多字段聚合');
        const scriptEnabled = transform.includes('数值计算')
            || transform.includes('字符串截取')
            || transform.includes('日期格式化')
            || conditionEnabled
            || aggregateEnabled;
        setTransformFieldState(mappingConditionInput, conditionEnabled);
        setTransformFieldState(mappingAggregateFields, aggregateEnabled);
        setTransformFieldState(mappingScriptInput, scriptEnabled);
    }

    function toggleFieldGroup(elements, targetAttr, targetValue) {
        elements.forEach(item => {
            const group = item.querySelector(`[data-${targetAttr}]`);
            if (group) {
                const match = item.getAttribute(`data-${targetAttr}`) === targetValue;
                group.classList.toggle('hidden', !match);
            }
            item.classList.toggle('ring-2', item.getAttribute(`data-${targetAttr}`) === targetValue);
            item.classList.toggle('ring-primary', item.getAttribute(`data-${targetAttr}`) === targetValue);
        });
    }

    function filterFields(input, selector) {
        if (!input) {
            return;
        }
        const value = input.value.trim().toLowerCase();
        document.querySelectorAll(selector).forEach(field => {
            const text = field.textContent.toLowerCase();
            field.classList.toggle('hidden', value && !text.includes(value));
        });
    }

    if (sourceTables.length) {
        sourceTables.forEach(table => {
            table.addEventListener('click', () => {
                toggleFieldGroup(sourceTables, 'table', table.getAttribute('data-table'));
            });
        });
    }

    if (targetEntities.length) {
        targetEntities.forEach(entity => {
            entity.addEventListener('click', () => {
                toggleFieldGroup(targetEntities, 'entity', entity.getAttribute('data-entity'));
            });
        });
    }

    if (sourceSearchInput) {
        sourceSearchInput.addEventListener('input', () => {
            filterFields(sourceSearchInput, '.source-field');
        });
    }

    if (targetSearchInput) {
        targetSearchInput.addEventListener('input', () => {
            filterFields(targetSearchInput, '.target-field');
        });
    }

    // 抽屉式导航已移除

    const sectionJumpButtons = document.querySelectorAll('.section-jump');
    if (sectionJumpButtons.length) {
        sectionJumpButtons.forEach(button => {
            button.addEventListener('click', () => {
                const anchor = button.getAttribute('data-anchor');
                const target = anchor ? document.getElementById(anchor) : null;
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    sectionJumpButtons.forEach(item => item.classList.remove('bg-primary-light', 'text-primary'));
                    button.classList.add('bg-primary-light', 'text-primary');
                }
            });
        });
    }

    const resourceTabs = document.querySelectorAll('.resource-tab');
    const resourceTableBody = document.getElementById('resourceTableBody');
    const resourceDetailPanel = document.getElementById('resourceDetailPanel');
    const resourceSearchInput = document.getElementById('resourceSearchInput');
    const resourceTableTitle = document.getElementById('resourceTableTitle');
    const resourceCount = document.getElementById('resourceCount');
    const addResourceItem = document.getElementById('addResourceItem');
    const resourceDrawer = document.getElementById('resourceDrawer');
    const resourceDrawerOverlay = document.getElementById('resourceDrawerOverlay');
    const resourceDrawerPanel = document.getElementById('resourceDrawerPanel');
    const closeResourceDrawer = document.getElementById('closeResourceDrawer');
    const cancelResourceDrawer = document.getElementById('cancelResourceDrawer');
    const confirmResourceDrawer = document.getElementById('confirmResourceDrawer');
    const resourceDrawerTitle = document.getElementById('resourceDrawerTitle');
    const resourceNameInput = document.getElementById('resourceNameInput');
    const resourceDescInput = document.getElementById('resourceDescInput');
    const resourceExtraFields = document.getElementById('resourceExtraFields');
    const resourceFormAlert = document.getElementById('resourceFormAlert');

    const resourceLabels = {
        objectTypes: '对象类型',
        sharedAttributes: '共享属性',
        linkTypes: '连接类型',
        relationNames: '关系名称',
        actionTypes: '动作类型',
        groups: '分组',
        functions: '函数'
    };

    const resourceData = {
        objectTypes: [
            { name: '客户', description: '企业业务往来主体', domain: '客户域', attributes: ['客户ID', '客户名称'] },
            { name: '合同', description: '合作协议实体', domain: '合同子域', attributes: ['合同编号', '合同金额'] }
        ],
        sharedAttributes: [
            { name: '创建时间', description: '通用时间戳', type: 'Date' },
            { name: '状态', description: '通用状态枚举', type: 'Enum' }
        ],
        linkTypes: [
            { name: '隶属于', description: '组织层级关系', cardinality: '1:N' },
            { name: '依赖', description: '流程依赖关系', cardinality: 'N:M' }
        ],
        relationNames: [
            { name: '供应/被供应', description: '供应链双向命名' },
            { name: '服务/被服务', description: '服务关系命名' }
        ],
        actionTypes: [
            { name: '合同审批', description: '触发审批流', objects: ['合同'], links: ['客户-合同'], functions: ['金额校验'], webhook: 'https://hooks.example.com/approve' },
            { name: '客户分级', description: '自动分级规则', objects: ['客户'], links: [], functions: ['评分计算'], webhook: '' }
        ],
        groups: [
            { name: '财务域', description: '财务相关资源', members: ['发票', '付款'] },
            { name: '客服域', description: '服务相关资源', members: ['工单', '服务联系人'] }
        ],
        functions: [
            { name: '金额校验', description: '校验金额阈值', signature: 'validateAmount(amount:number)' },
            { name: '评分计算', description: '计算客户评分', signature: 'calcScore(customer)' }
        ]
    };

    let activeResourceKey = 'objectTypes';
    let selectedResourceIndex = null;
    let editingResourceIndex = null;

    const resourceFormSchemas = {
        objectTypes: [
            { key: 'domain', label: '所属域', placeholder: '例如：客户域' },
            { key: 'attributes', label: '共享属性（逗号分隔）', placeholder: '客户ID,客户名称' }
        ],
        sharedAttributes: [
            { key: 'type', label: '数据类型', options: ['String', 'Number', 'Date', 'Enum', 'Boolean'] }
        ],
        linkTypes: [
            { key: 'cardinality', label: '基数', options: ['1:1', '1:N', 'N:1', 'N:M', '0..1', '0..N'] }
        ],
        relationNames: [
            { key: 'alias', label: '双向名称', placeholder: '供应/被供应' }
        ],
        actionTypes: [
            { key: 'objects', label: '包含对象（逗号分隔）', placeholder: '合同,客户' },
            { key: 'links', label: '包含链接（逗号分隔）', placeholder: '客户-合同' },
            { key: 'functions', label: '包含函数（逗号分隔）', placeholder: '金额校验' },
            { key: 'webhook', label: 'Webhook', placeholder: 'https://hooks.example.com/approve' }
        ],
        groups: [
            { key: 'members', label: '成员（逗号分隔）', placeholder: '发票,付款' }
        ],
        functions: [
            { key: 'signature', label: '签名', placeholder: 'calcScore(customer)' }
        ]
    };

    function setActiveResourceTab(key) {
        activeResourceKey = key;
        selectedResourceIndex = null;
        resourceTabs.forEach(tab => {
            const isActive = tab.getAttribute('data-resource') === key;
            tab.classList.toggle('bg-primary', isActive);
            tab.classList.toggle('text-white', isActive);
            tab.classList.toggle('bg-gray-100', !isActive);
            tab.classList.toggle('text-gray-700', !isActive);
        });
        renderResourceTable();
    }

    function renderResourceDetail(item) {
        if (!resourceDetailPanel || !item) {
            return;
        }
        if (activeResourceKey === 'actionTypes') {
            resourceDetailPanel.innerHTML = `
                <div><span class="font-medium">动作名称：</span>${item.name}</div>
                <div><span class="font-medium">描述：</span>${item.description}</div>
                <div><span class="font-medium">对象：</span>${(item.objects || []).join('、') || '无'}</div>
                <div><span class="font-medium">链接：</span>${(item.links || []).join('、') || '无'}</div>
                <div><span class="font-medium">函数：</span>${(item.functions || []).join('、') || '无'}</div>
                <div><span class="font-medium">Webhook：</span>${item.webhook || '未配置'}</div>
            `;
            return;
        }
        const details = Object.entries(item)
            .map(([key, value]) => `<div><span class="font-medium">${key}：</span>${Array.isArray(value) ? value.join('、') : value}</div>`)
            .join('');
        resourceDetailPanel.innerHTML = details;
    }

    function openResourceDrawer(mode, item) {
        if (!resourceDrawer || !resourceNameInput || !resourceDescInput || !resourceExtraFields || !resourceDrawerTitle) {
            return;
        }
        resourceDrawerTitle.textContent = mode === 'edit' ? `编辑${resourceLabels[activeResourceKey]}` : `新增${resourceLabels[activeResourceKey]}`;
        resourceNameInput.value = item?.name || '';
        resourceDescInput.value = item?.description || '';
        resourceExtraFields.innerHTML = '';
        const schema = resourceFormSchemas[activeResourceKey] || [];
        schema.forEach(field => {
            const wrapper = document.createElement('div');
            if (field.options) {
                wrapper.innerHTML = `
                    <label class="block text-xs text-gray-500 mb-1">${field.label}</label>
                    <select data-field="${field.key}" class="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                        ${field.options.map(option => `<option value="${option}">${option}</option>`).join('')}
                    </select>
                `;
            } else {
                wrapper.innerHTML = `
                    <label class="block text-xs text-gray-500 mb-1">${field.label}</label>
                    <input data-field="${field.key}" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="${field.placeholder || ''}">
                `;
            }
            resourceExtraFields.appendChild(wrapper);
            const input = wrapper.querySelector('[data-field]');
            if (input && item && item[field.key]) {
                input.value = Array.isArray(item[field.key]) ? item[field.key].join(',') : item[field.key];
            }
        });
        resourceDrawer.classList.remove('hidden');
        if (resourceDrawerPanel) {
            requestAnimationFrame(() => {
                resourceDrawerPanel.classList.remove('translate-x-full');
            });
        }
        setResourceFormAlert('');
        wireResourceFieldValidation();
    }

    function closeResourceDrawerPanel() {
        if (!resourceDrawer) {
            return;
        }
        if (resourceDrawerPanel) {
            resourceDrawerPanel.classList.add('translate-x-full');
        }
        setTimeout(() => {
            resourceDrawer.classList.add('hidden');
        }, 200);
        editingResourceIndex = null;
    }

    function collectResourceFormData() {
        const item = {
            name: resourceNameInput ? resourceNameInput.value.trim() : '',
            description: resourceDescInput ? resourceDescInput.value.trim() : ''
        };
        const schema = resourceFormSchemas[activeResourceKey] || [];
        schema.forEach(field => {
            const input = resourceExtraFields?.querySelector(`[data-field="${field.key}"]`);
            if (!input) {
                return;
            }
            const raw = input.value.trim();
            if (field.key === 'webhook' || field.key === 'signature' || field.key === 'type' || field.key === 'cardinality' || field.key === 'domain' || field.key === 'alias') {
                item[field.key] = raw;
            } else {
                item[field.key] = raw ? raw.split(',').map(value => value.trim()).filter(Boolean) : [];
            }
        });
        return item;
    }

    function validateResourceItem(item) {
        if (!item.name) {
            return '请填写资源名称';
        }
        const exists = (resourceData[activeResourceKey] || []).some((resource, index) => {
            if (editingResourceIndex !== null && editingResourceIndex !== undefined && index === editingResourceIndex) {
                return false;
            }
            return resource.name === item.name;
        });
        if (exists) {
            return '资源名称已存在';
        }
        if (activeResourceKey === 'sharedAttributes' && !item.type) {
            return '请填写数据类型';
        }
        if (activeResourceKey === 'linkTypes') {
            const allowed = /^(1:1|1:N|N:1|N:M|0\\.\\.1|0\\.\\.N)$/;
            if (item.cardinality && !allowed.test(item.cardinality)) {
                return '基数格式不正确';
            }
        }
        if (activeResourceKey === 'relationNames' && item.alias && !item.alias.includes('/')) {
            return '关系名称需包含双向命名，例如：供应/被供应';
        }
        if (activeResourceKey === 'functions' && item.signature && !item.signature.includes('(')) {
            return '函数签名格式不正确';
        }
        if (activeResourceKey === 'actionTypes' && item.webhook && !/^https?:\/\//.test(item.webhook)) {
            return 'Webhook 需以 http/https 开头';
        }
        return '';
    }

    function setResourceFormAlert(message) {
        if (!resourceFormAlert) {
            return;
        }
        if (!message) {
            resourceFormAlert.classList.add('hidden');
            resourceFormAlert.textContent = '';
            return;
        }
        resourceFormAlert.textContent = message;
        resourceFormAlert.classList.remove('hidden');
    }

    function wireResourceFieldValidation() {
        const inputs = [resourceNameInput, resourceDescInput];
        if (resourceExtraFields) {
            resourceExtraFields.querySelectorAll('[data-field]').forEach(input => inputs.push(input));
        }
        inputs.filter(Boolean).forEach(input => {
            input.addEventListener('input', () => {
                const item = collectResourceFormData();
                const error = validateResourceItem(item);
                setResourceFormAlert(error);
            });
        });
    }

    function renderResourceTable() {
        if (!resourceTableBody) {
            return;
        }
        const list = resourceData[activeResourceKey] || [];
        const query = resourceSearchInput ? resourceSearchInput.value.trim().toLowerCase() : '';
        const filtered = list.filter(item => item.name.toLowerCase().includes(query));
        if (resourceTableTitle) {
            resourceTableTitle.textContent = `${resourceLabels[activeResourceKey]}清单`;
        }
        if (resourceCount) {
            resourceCount.textContent = `${filtered.length} 项`;
        }
        if (!filtered.length) {
            resourceTableBody.innerHTML = '<div class="px-4 py-6 text-gray-400">暂无资源数据</div>';
            if (resourceDetailPanel) {
                resourceDetailPanel.innerHTML = '<div class="text-gray-400">请选择资源查看详情</div>';
            }
            return;
        }
        resourceTableBody.innerHTML = filtered.map((item, index) => `
            <div class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer resource-row" data-index="${index}">
                <div>
                    <div class="text-sm font-medium text-gray-900">${item.name}</div>
                    <div class="text-xs text-gray-500">${item.description || '—'}</div>
                </div>
                <div class="flex items-center space-x-2 text-xs">
                    <button class="text-primary edit-resource" data-index="${index}">编辑</button>
                    <button class="text-danger delete-resource" data-index="${index}">删除</button>
                </div>
            </div>
        `).join('');
        resourceTableBody.querySelectorAll('.resource-row').forEach(row => {
            row.addEventListener('click', (event) => {
                if (event.target.closest('button')) {
                    return;
                }
                const idx = Number(row.getAttribute('data-index'));
                selectedResourceIndex = idx;
                renderResourceDetail(filtered[idx]);
            });
        });
        resourceTableBody.querySelectorAll('.edit-resource').forEach(button => {
            button.addEventListener('click', () => {
                const idx = Number(button.getAttribute('data-index'));
                const item = filtered[idx];
                const originList = resourceData[activeResourceKey];
                const originIndex = originList.indexOf(item);
                editingResourceIndex = originIndex;
                openResourceDrawer('edit', item);
            });
        });
        resourceTableBody.querySelectorAll('.delete-resource').forEach(button => {
            button.addEventListener('click', () => {
                const idx = Number(button.getAttribute('data-index'));
                const item = filtered[idx];
                const originList = resourceData[activeResourceKey];
                const originIndex = originList.indexOf(item);
                if (originIndex > -1 && confirm('确定要删除该资源吗？')) {
                    originList.splice(originIndex, 1);
                    renderResourceTable();
                    showNotification('资源已删除', 'warning');
                }
            });
        });
    }

    if (resourceTabs.length) {
        resourceTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const key = tab.getAttribute('data-resource');
                if (key) {
                    setActiveResourceTab(key);
                }
            });
        });
    }

    if (resourceSearchInput) {
        resourceSearchInput.addEventListener('input', renderResourceTable);
    }

    if (addResourceItem) {
        addResourceItem.addEventListener('click', () => {
            editingResourceIndex = null;
            openResourceDrawer('create');
        });
    }

    if (confirmResourceDrawer) {
        confirmResourceDrawer.addEventListener('click', () => {
            const item = collectResourceFormData();
            const error = validateResourceItem(item);
            if (error) {
                setResourceFormAlert(error);
                showNotification(error, 'warning');
                return;
            }
            if (editingResourceIndex === null || editingResourceIndex === undefined) {
                resourceData[activeResourceKey].push(item);
                showNotification('资源已新增', 'success');
            } else {
                resourceData[activeResourceKey][editingResourceIndex] = { ...resourceData[activeResourceKey][editingResourceIndex], ...item };
                showNotification('资源已更新', 'success');
            }
            renderResourceTable();
            closeResourceDrawerPanel();
        });
    }

    if (resourceDrawerOverlay) {
        resourceDrawerOverlay.addEventListener('click', closeResourceDrawerPanel);
    }

    if (closeResourceDrawer) {
        closeResourceDrawer.addEventListener('click', closeResourceDrawerPanel);
    }

    if (cancelResourceDrawer) {
        cancelResourceDrawer.addEventListener('click', closeResourceDrawerPanel);
    }

    if (resourceTableBody) {
        setActiveResourceTab(activeResourceKey);
    }

    function applyDomainFilter(domain) {
        const nodes = modelerWorkspace ? modelerWorkspace.querySelectorAll('.entity-node') : [];
        const listItems = document.querySelectorAll('.entity-item');
        const showAll = domain === '全部';
        nodes.forEach(node => {
            const match = showAll || node.getAttribute('data-domain') === domain;
            node.classList.toggle('hidden', !match);
        });
        listItems.forEach(item => {
            const match = showAll || item.getAttribute('data-domain') === domain;
            item.classList.toggle('hidden', !match);
        });
        if (modelerRelations.length) {
            modelerRelations.forEach(rel => {
                rel.classList.toggle('hidden', !showAll);
            });
        }
        if (dynamicRelationsLayer) {
            dynamicRelationsLayer.classList.toggle('hidden', !showAll);
        }
        if (modelerDomainPath) {
            modelerDomainPath.textContent = showAll ? '客户域 / 合同子域' : domain;
        }
    }

    if (domainToggles.length) {
        domainToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const targetId = toggle.getAttribute('data-target');
                const panel = targetId ? document.getElementById(targetId) : null;
                if (panel) {
                    panel.classList.toggle('hidden');
                }
            });
        });
    }

    if (domainItems.length) {
        domainItems.forEach(item => {
            item.addEventListener('click', () => {
                domainItems.forEach(btn => {
                    btn.classList.remove('bg-primary-light', 'text-primary');
                });
                item.classList.add('bg-primary-light', 'text-primary');
                const domain = item.getAttribute('data-domain') || '全部';
                applyDomainFilter(domain);
                showNotification(`已切换到 ${domain} 视图`, 'info');
            });
        });
    }


    document.querySelectorAll('.source-field').forEach(field => {
        field.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', field.getAttribute('data-field-id'));
            event.dataTransfer.effectAllowed = 'copy';
        });
    });

    document.querySelectorAll('.target-field').forEach(field => {
        field.addEventListener('dragover', (event) => {
            event.preventDefault();
            field.classList.add('ring-2', 'ring-primary');
        });
        field.addEventListener('dragleave', () => {
            field.classList.remove('ring-2', 'ring-primary');
        });
        field.addEventListener('drop', (event) => {
            event.preventDefault();
            field.classList.remove('ring-2', 'ring-primary');
            const sourceFieldId = event.dataTransfer.getData('text/plain');
            if (!sourceFieldId) {
                return;
            }
            const sourceEl = document.querySelector(`[data-field-id="${sourceFieldId}"]`);
            if (!sourceEl) {
                return;
            }
            const sourceLabel = sourceEl.textContent.trim();
            const targetLabel = field.textContent.trim();
            if (mappingSourceSelect) {
                mappingSourceSelect.value = sourceLabel;
            }
            if (mappingTargetSelect) {
                mappingTargetSelect.value = targetLabel;
            }
            mappingRules.push({
                source: sourceLabel,
                target: targetLabel,
                transform: mappingTransformSelect ? mappingTransformSelect.value : '直接映射',
                condition: mappingConditionInput ? mappingConditionInput.value.trim() : '',
                script: mappingScriptInput ? mappingScriptInput.value.trim() : '',
                aggregateFields: getAggregateFieldValues(),
                sourceFieldId,
                targetFieldId: field.getAttribute('data-field-id')
            });
            renderMappingRules();
            showNotification(`已建立映射：${sourceLabel} → ${targetLabel}`, 'success');
            pushHistory();
        });
    });

    function renderOntologyTable() {
        if (!ontologyTableBody) {
            return;
        }
        ontologyTableBody.innerHTML = ontologies.map((item, index) => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white mr-3">
                            <i class="fa fa-sitemap"></i>
                        </div>
                        <div>
                            <div class="text-sm font-medium text-gray-900">${item.name}</div>
                            <div class="text-xs text-gray-500">${item.domain}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.concepts}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.relations}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.version}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs font-medium ${item.status === '活跃' ? 'bg-success-light text-success' : item.status === '开发中' ? 'bg-warning-light text-warning' : 'bg-neutral-light text-neutral'} rounded-full">${item.status}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="text-primary hover:text-primary/80 mr-3 edit-ontology" data-index="${index}">编辑</button>
                    <button class="text-gray-600 hover:text-gray-900 view-ontology" data-index="${index}">查看</button>
                </td>
            </tr>
        `).join('');
        ontologyTableBody.querySelectorAll('.view-ontology').forEach(button => {
            button.addEventListener('click', () => {
                const idx = Number(button.getAttribute('data-index'));
                const item = ontologies[idx];
                showNotification(`查看本体：${item.name}`, 'info');
            });
        });
        ontologyTableBody.querySelectorAll('.edit-ontology').forEach(button => {
            button.addEventListener('click', () => {
                const idx = Number(button.getAttribute('data-index'));
                const item = ontologies[idx];
                showNotification(`进入编辑：${item.name}`, 'success');
            });
        });
    }

    function updateOntologyMetrics() {
        if (activeOntologyCount) {
            const activeCount = ontologies.filter(item => item.status === '活跃').length;
            activeOntologyCount.textContent = activeCount;
        }
        if (conceptTotalCount) {
            const totalConcepts = ontologies.reduce((sum, item) => sum + Number(item.concepts || 0), 0);
            conceptTotalCount.textContent = totalConcepts.toLocaleString();
        }
    }

    function closeOntologyModal() {
        if (newOntologyModal) {
            newOntologyModal.classList.add('hidden');
        }
    }

    function openOntologyModal() {
        if (newOntologyModal) {
            newOntologyModal.classList.remove('hidden');
        }
    }

    if (newOntologyButton) {
        newOntologyButton.addEventListener('click', () => {
            openOntologyModal();
        });
    }

    if (closeNewOntologyModal) {
        closeNewOntologyModal.addEventListener('click', closeOntologyModal);
    }

    if (cancelNewOntology) {
        cancelNewOntology.addEventListener('click', closeOntologyModal);
    }

    if (newOntologyOverlay) {
        newOntologyOverlay.addEventListener('click', closeOntologyModal);
    }

    if (confirmNewOntology) {
        confirmNewOntology.addEventListener('click', () => {
            const name = ontologyNameInput ? ontologyNameInput.value.trim() : '';
            const domain = ontologyDomainInput ? ontologyDomainInput.value.trim() : '';
            const concepts = ontologyConceptInput ? Number(ontologyConceptInput.value || 0) : 0;
            const relations = ontologyRelationInput ? Number(ontologyRelationInput.value || 0) : 0;
            const version = ontologyVersionInput ? ontologyVersionInput.value.trim() : 'V1.0';
            const status = ontologyStatusInput ? ontologyStatusInput.value : '活跃';
            if (!name || !domain) {
                showNotification('请填写本体名称与业务域', 'warning');
                return;
            }
            ontologies.unshift({
                name,
                domain,
                concepts,
                relations,
                version,
                status
            });
            renderOntologyTable();
            updateOntologyMetrics();
            if (ontologyNameInput) {
                ontologyNameInput.value = '';
            }
            if (ontologyDomainInput) {
                ontologyDomainInput.value = '';
            }
            closeOntologyModal();
            showNotification('本体已创建并加入列表', 'success');
            pushHistory();
        });
    }

    if (mappingTransformSelect) {
        mappingTransformSelect.addEventListener('change', updateTransformDetails);
        updateTransformDetails();
    }

    if (addAggregateField && mappingAggregateFields) {
        addAggregateField.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'w-full border border-gray-200 rounded px-2 py-1 text-sm mapping-aggregate-input';
            input.placeholder = '字段名';
            mappingAggregateFields.appendChild(input);
            updateTransformDetails();
        });
    }

    function getMappingCanvasRect() {
        if (!mappingLinkCanvas) {
            return null;
        }
        return mappingLinkCanvas.getBoundingClientRect();
    }

    function drawMappingLinks() {
        if (!mappingLinkCanvas) {
            return;
        }
        const rect = getMappingCanvasRect();
        if (!rect) {
            return;
        }
        mappingLinkCanvas.innerHTML = `
            <defs>
                <marker id="mappingArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6"></polygon>
                </marker>
            </defs>
        `;
        mappingRules.forEach(rule => {
            if (!rule.sourceFieldId || !rule.targetFieldId) {
                return;
            }
            const sourceEl = document.querySelector(`[data-field-id="${rule.sourceFieldId}"]`);
            const targetEl = document.querySelector(`[data-field-id="${rule.targetFieldId}"]`);
            if (!sourceEl || !targetEl) {
                return;
            }
            const sourceRect = sourceEl.getBoundingClientRect();
            const targetRect = targetEl.getBoundingClientRect();
            const startX = sourceRect.right - rect.left;
            const startY = sourceRect.top + sourceRect.height / 2 - rect.top;
            const endX = targetRect.left - rect.left;
            const endY = targetRect.top + targetRect.height / 2 - rect.top;
            const midX = startX + (endX - startX) * 0.5;
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M${startX},${startY} C${midX},${startY} ${midX},${endY} ${endX},${endY}`);
            path.setAttribute('stroke', '#3b82f6');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('fill', 'none');
            path.setAttribute('marker-end', 'url(#mappingArrow)');
            mappingLinkCanvas.appendChild(path);
        });
    }

    if (sourceStructurePanel) {
        sourceStructurePanel.addEventListener('scroll', drawMappingLinks);
    }

    if (targetStructurePanel) {
        targetStructurePanel.addEventListener('scroll', drawMappingLinks);
    }

    window.addEventListener('resize', drawMappingLinks);

    function renderMappingRules() {
        if (!mappingRuleList || !mappingRuleCount) {
            return;
        }
        mappingRuleCount.textContent = `已配置 ${mappingRules.length} 条规则`;
        if (!mappingRules.length) {
            mappingRuleList.innerHTML = '<div class="text-gray-400">暂无映射规则</div>';
            return;
        }
        mappingRuleList.innerHTML = mappingRules.map((rule, index) => {
            const details = [];
            if (rule.condition) {
                details.push(`条件: ${rule.condition}`);
            }
            if (rule.aggregateFields && rule.aggregateFields.length) {
                details.push(`聚合: ${rule.aggregateFields.join(', ')}`);
            }
            if (rule.script) {
                details.push(`脚本: ${rule.script}`);
            }
            const detailText = details.length ? `<div class="text-xs text-gray-500">${details.join(' · ')}</div>` : '';
            return `
            <div class="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <div>
                    <div class="text-sm text-gray-700">${rule.source} → ${rule.target}</div>
                    <div class="text-xs text-gray-500">${rule.transform}</div>
                    ${detailText}
                </div>
                <button class="text-xs text-danger delete-mapping-rule" data-index="${index}">删除</button>
            </div>
            `;
        }).join('');
        mappingRuleList.querySelectorAll('.delete-mapping-rule').forEach(button => {
            button.addEventListener('click', () => {
                const idx = Number(button.getAttribute('data-index'));
                mappingRules.splice(idx, 1);
                renderMappingRules();
                showNotification('已删除映射规则', 'warning');
                pushHistory();
            });
        });
        drawMappingLinks();
    }

    if (addMappingRuleButton) {
        addMappingRuleButton.addEventListener('click', () => {
            if (!mappingSourceSelect || !mappingTargetSelect || !mappingTransformSelect) {
                return;
            }
            mappingRules.push({
                source: mappingSourceSelect.value,
                target: mappingTargetSelect.value,
                transform: mappingTransformSelect.value,
                condition: mappingConditionInput ? mappingConditionInput.value.trim() : '',
                script: mappingScriptInput ? mappingScriptInput.value.trim() : '',
                aggregateFields: getAggregateFieldValues(),
                sourceFieldId: mappingSourceSelect.value ? `src-customers-${mappingSourceSelect.value}` : '',
                targetFieldId: ''
            });
            renderMappingRules();
            showNotification('已添加映射规则', 'success');
            pushHistory();
        });
    }

    if (saveMappingButton) {
        saveMappingButton.addEventListener('click', () => {
            showNotification('映射规则已保存', 'success');
            pushHistory();
        });
    }

    if (loadSampleButton && mappingSampleData) {
        loadSampleButton.addEventListener('click', () => {
            mappingSampleData.innerHTML = `{
&nbsp;&nbsp;"customer_id": "C009",<br>
&nbsp;&nbsp;"customer_name": "李四",<br>
&nbsp;&nbsp;"customer_type": "法人",<br>
&nbsp;&nbsp;"contract_amount_usd": "500000",<br>
&nbsp;&nbsp;"create_date": "2024-08-01"<br>
}`;
            showNotification('样本数据已加载', 'success');
        });
    }

    function parseSampleData() {
        if (!mappingSampleData) {
            return {};
        }
        const text = mappingSampleData.textContent.replace(/\s/g, '');
        try {
            return JSON.parse(text);
        } catch (error) {
            return {};
        }
    }

    function renderJsonToHtml(data) {
        const entries = Object.entries(data).map(([key, value]) => `&nbsp;&nbsp;"${key}": "${value}"`);
        return `{\n${entries.join(',<br>\n')}\n}`;
    }

    if (testMappingButton && mappingResultData) {
        testMappingButton.addEventListener('click', () => {
            const sourceData = parseSampleData();
            const result = {};
            mappingRules.forEach(rule => {
                const rawValue = sourceData[rule.source];
                if (rawValue === undefined) {
                    return;
                }
                let value = rawValue;
                if (rule.transform.includes('数值计算')) {
                    const num = Number(rawValue);
                    value = Number.isNaN(num) ? rawValue : (num * 7.21).toFixed(0);
                }
                if (rule.transform.includes('日期格式化')) {
                    value = String(rawValue).replace(/-/g, '/');
                }
                if (rule.transform.includes('字符串截取')) {
                    value = String(rawValue).slice(0, 6);
                }
                result[rule.target] = value;
            });
            if (!mappingRules.length) {
                showNotification('请先添加映射规则', 'warning');
                return;
            }
            mappingResultData.innerHTML = renderJsonToHtml(result);
            showNotification('映射测试完成', 'success');
        });
    }

    renderMappingRules();
    renderOntologyTable();
    updateOntologyMetrics();
    renderEntityList();
    getEntityNodes().forEach(bindEntityNodeEvents);

    if (saveModelerButton) {
        saveModelerButton.addEventListener('click', () => {
            const state = serializeState();
            localStorage.setItem('ling_shu_ontology_state', JSON.stringify(state));
            showNotification('已保存当前建模状态', 'success');
        });
    }
    if (undoModelerButton) {
        undoModelerButton.addEventListener('click', undoHistory);
    }
    if (redoModelerButton) {
        redoModelerButton.addEventListener('click', redoHistory);
    }
    if (createSnapshotButton && versionSnapshotList) {
        createSnapshotButton.addEventListener('click', () => {
            const state = serializeState();
            const snapshotId = `V${historyStack.length + 1}.${Math.floor(Math.random() * 9)}`;
            const item = document.createElement('div');
            item.className = 'flex items-center justify-between bg-gray-50 rounded-lg p-4';
            item.innerHTML = `
                <div>
                    <p class="text-sm font-medium text-gray-900">${snapshotId}</p>
                    <p class="text-xs text-gray-500">自动快照 · ${new Date().toLocaleString()}</p>
                </div>
                <button class="text-xs text-primary">对比</button>
            `;
            versionSnapshotList.prepend(item);
            localStorage.setItem(`ling_shu_snapshot_${snapshotId}`, JSON.stringify(state));
            showNotification('已创建快照', 'success');
        });
    }

    const savedState = localStorage.getItem('ling_shu_ontology_state');
    if (savedState) {
        try {
            const parsed = JSON.parse(savedState);
            restoreState(parsed);
        } catch (error) {
            showNotification('本地保存数据损坏，已忽略', 'warning');
        }
    }

    if (!historyStack.length) {
        pushHistory();
    }

    if (impactListButton && impactListPanel) {
        impactListButton.addEventListener('click', function() {
            impactListPanel.classList.add('ring-2', 'ring-primary');
            impactListPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            showNotification('影响清单已生成并高亮', 'success');
            setTimeout(() => {
                impactListPanel.classList.remove('ring-2', 'ring-primary');
            }, 2000);
        });
    }

    const conflictItems = document.querySelectorAll('.conflict-item');
    const conflictDetailType = document.getElementById('conflictDetailType');
    const conflictDetailDesc = document.getElementById('conflictDetailDesc');
    const conflictDetailImpact = document.getElementById('conflictDetailImpact');
    const conflictLeftSystem = document.getElementById('conflictLeftSystem');
    const conflictLeftOwner = document.getElementById('conflictLeftOwner');
    const conflictLeftField = document.getElementById('conflictLeftField');
    const conflictLeftMapping = document.getElementById('conflictLeftMapping');
    const conflictLeftMeaning = document.getElementById('conflictLeftMeaning');
    const conflictRightSystem = document.getElementById('conflictRightSystem');
    const conflictRightOwner = document.getElementById('conflictRightOwner');
    const conflictRightField = document.getElementById('conflictRightField');
    const conflictRightMapping = document.getElementById('conflictRightMapping');
    const conflictRightMeaning = document.getElementById('conflictRightMeaning');
    const conflictList = document.getElementById('conflictList');
    const scanConflictButton = document.getElementById('scanConflictButton');
    const submitDecisionButton = document.getElementById('submitDecisionButton');
    const executeDecisionButton = document.getElementById('executeDecisionButton');
    const decisionStatusBadge = document.getElementById('decisionStatusBadge');
    const versionCompareButtons = document.querySelectorAll('.version-compare-button');
    const impactAppsList = document.getElementById('impactAppsList');
    const impactMetricsList = document.getElementById('impactMetricsList');
    const impactSystemsList = document.getElementById('impactSystemsList');

    function appendAuditEntry(message, actor = '系统') {
        if (!auditTrailList) {
            return;
        }
        const entry = document.createElement('div');
        entry.className = 'flex items-center justify-between';
        entry.innerHTML = `
            <span>${new Date().toLocaleString()} · ${message}</span>
            <span class="text-xs text-gray-400">${actor}</span>
        `;
        auditTrailList.prepend(entry);
    }

    function applyConflictSelection(item) {
        const allItems = document.querySelectorAll('.conflict-item');
        allItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        if (conflictDetailType) {
            conflictDetailType.textContent = item.getAttribute('data-conflict-type') || '';
        }
        if (conflictDetailDesc) {
            conflictDetailDesc.textContent = item.getAttribute('data-conflict-desc') || '';
        }
        if (conflictDetailImpact) {
            conflictDetailImpact.textContent = item.getAttribute('data-conflict-impact') || '';
        }
        if (conflictLeftSystem) {
            conflictLeftSystem.textContent = item.getAttribute('data-left-system') || '';
        }
        if (conflictLeftOwner) {
            conflictLeftOwner.textContent = item.getAttribute('data-left-owner') || '';
        }
        if (conflictLeftField) {
            conflictLeftField.textContent = item.getAttribute('data-left-field') || '';
        }
        if (conflictLeftMapping) {
            conflictLeftMapping.textContent = item.getAttribute('data-left-mapping') || '';
        }
        if (conflictLeftMeaning) {
            conflictLeftMeaning.textContent = item.getAttribute('data-left-meaning') || '';
        }
        if (conflictRightSystem) {
            conflictRightSystem.textContent = item.getAttribute('data-right-system') || '';
        }
        if (conflictRightOwner) {
            conflictRightOwner.textContent = item.getAttribute('data-right-owner') || '';
        }
        if (conflictRightField) {
            conflictRightField.textContent = item.getAttribute('data-right-field') || '';
        }
        if (conflictRightMapping) {
            conflictRightMapping.textContent = item.getAttribute('data-right-mapping') || '';
        }
        if (conflictRightMeaning) {
            conflictRightMeaning.textContent = item.getAttribute('data-right-meaning') || '';
        }
    }

    function bindConflictItem(item) {
        item.addEventListener('click', () => {
            applyConflictSelection(item);
        });
    }

    if (conflictItems.length) {
        conflictItems.forEach(bindConflictItem);
    }

    if (scanConflictButton && conflictList) {
        scanConflictButton.addEventListener('click', () => {
            const newItem = document.createElement('div');
            newItem.className = 'border border-warning rounded-lg p-3 bg-warning-light cursor-pointer hover:bg-warning-light/50 conflict-item';
            newItem.setAttribute('data-conflict-type', '结构失配冲突');
            newItem.setAttribute('data-conflict-desc', '客服系统字段类型与本体定义不一致，需要补充转换规则。');
            newItem.setAttribute('data-conflict-impact', '影响2个下游应用，包括客服画像与服务评估。');
            newItem.setAttribute('data-left-system', '客服系统');
            newItem.setAttribute('data-left-owner', '客服部门');
            newItem.setAttribute('data-left-field', 'service_level');
            newItem.setAttribute('data-left-mapping', '服务等级');
            newItem.setAttribute('data-left-meaning', '系统中以文本描述服务等级');
            newItem.setAttribute('data-right-system', '本体标准');
            newItem.setAttribute('data-right-owner', '数据治理');
            newItem.setAttribute('data-right-field', 'service_level');
            newItem.setAttribute('data-right-mapping', '服务等级');
            newItem.setAttribute('data-right-meaning', '本体定义为枚举类型');
            newItem.innerHTML = `
                <div class="flex items-center justify-between mb-2">
                    <span class="font-medium text-warning">结构失配冲突</span>
                    <span class="px-2 py-1 text-xs font-medium bg-warning text-white rounded-full">中优先级</span>
                </div>
                <p class="text-sm text-gray-700 mb-2">客服系统字段类型与本体定义不一致</p>
                <div class="flex items-center justify-between text-xs text-gray-500">
                    <span>影响: 2个下游应用</span>
                    <span>${new Date().toLocaleDateString()}</span>
                </div>
            `;
            conflictList.prepend(newItem);
            bindConflictItem(newItem);
            applyConflictSelection(newItem);
            appendAuditEntry('自动扫描发现新增冲突并创建任务');
            showNotification('已完成冲突扫描并新增任务', 'success');
        });
    }

    if (submitDecisionButton) {
        submitDecisionButton.addEventListener('click', () => {
            if (decisionStatusBadge) {
                decisionStatusBadge.textContent = '已裁决';
                decisionStatusBadge.className = 'px-2 py-1 text-xs font-medium bg-success text-white rounded-full';
            }
            appendAuditEntry('仲裁裁决已提交', '业务架构师');
            showNotification('裁决已提交，等待执行', 'success');
        });
    }

    if (executeDecisionButton) {
        executeDecisionButton.addEventListener('click', () => {
            appendAuditEntry('裁决执行已同步至本体与映射配置');
            showNotification('裁决执行完成，已同步变更', 'success');
        });
    }

    function closeMergeQueue() {
        if (mergeQueueModal) {
            mergeQueueModal.classList.add('hidden');
        }
    }

    if (openMergeQueueButton && mergeQueueModal) {
        openMergeQueueButton.addEventListener('click', () => {
            mergeQueueModal.classList.remove('hidden');
        });
    }

    if (mergeQueueOverlay) {
        mergeQueueOverlay.addEventListener('click', closeMergeQueue);
    }

    if (closeMergeQueueModal) {
        closeMergeQueueModal.addEventListener('click', closeMergeQueue);
    }

    if (cancelMergeQueue) {
        cancelMergeQueue.addEventListener('click', closeMergeQueue);
    }

    if (executeMergeButton) {
        executeMergeButton.addEventListener('click', () => {
            closeMergeQueue();
            appendAuditEntry('分支合并已提交执行');
            showNotification('分支合并任务已提交', 'success');
        });
    }

    if (versionCompareButtons.length) {
        const impactData = {
            'V2.0': {
                apps: ['客户360视图', '合同审批流', '财务报表接口'],
                metrics: ['合同金额核算', '合同履约率', '客户转化率'],
                systems: ['CRM系统', '财务系统', '合同管理系统']
            },
            'V1.9': {
                apps: ['客户画像', '风险预警', '客服工单'],
                metrics: ['活跃客户数', '响应时长', '投诉率'],
                systems: ['客服系统', '工单系统', '数据仓库']
            }
        };
        versionCompareButtons.forEach(button => {
            button.addEventListener('click', () => {
                const version = button.getAttribute('data-version');
                const data = impactData[version];
                if (data && impactAppsList && impactMetricsList && impactSystemsList) {
                    impactAppsList.innerHTML = data.apps.map(item => `<div>${item}</div>`).join('');
                    impactMetricsList.innerHTML = data.metrics.map(item => `<div>${item}</div>`).join('');
                    impactSystemsList.innerHTML = data.systems.map(item => `<div>${item}</div>`).join('');
                    showNotification(`已加载 ${version} 影响清单`, 'info');
                    pushHistory();
                }
            });
        });
    }

    if (domainItems.length) {
        const defaultDomain = domainItems[0].getAttribute('data-domain') || '全部';
        domainItems[0].classList.add('bg-primary-light', 'text-primary');
        applyDomainFilter(defaultDomain);
    }

    const initialEntities = getEntityNodes();
    if (initialEntities.length && !selectedItem) {
        const first = initialEntities[0].getAttribute('data-id');
        if (first) {
            setSelectedItem({ type: 'entity', id: first });
        }
    }
}

// 初始化导航切换
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const subNavItems = document.querySelectorAll('.nav-subitem');
    const sections = document.querySelectorAll('.section-content');
    const knowledgeSection = document.getElementById('knowledge');
    const knowledgePages = knowledgeSection ? knowledgeSection.querySelectorAll('.knowledge-page') : [];
    const setActiveKnowledgeSubitem = (targetId) => {
        subNavItems.forEach(nav => {
            nav.classList.toggle('active', nav.getAttribute('data-knowledge-target') === targetId);
        });
        setActiveKnowledgeMenu(targetId);
    };
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            
            // 更新导航状态
            navItems.forEach(nav => {
                nav.classList.remove('active');
                nav.classList.remove('bg-primary-light');
                nav.classList.add('border-transparent');
                nav.querySelector('i').classList.remove('text-primary');
                nav.querySelector('i').classList.add('text-gray-500');
            });
            subNavItems.forEach(nav => nav.classList.remove('active'));
            
            this.classList.add('active');
            this.classList.add('bg-primary-light');
            this.classList.remove('border-transparent');
            this.classList.add('border-primary');
            this.querySelector('i').classList.add('text-primary');
            this.querySelector('i').classList.remove('text-gray-500');
            
            // 更新内容区域
            sections.forEach(section => {
                section.classList.add('hidden');
            });
            
            document.getElementById(targetSection).classList.remove('hidden');
            document.getElementById(targetSection).classList.add('fade-in');
            if (targetSection === 'knowledge' && knowledgeSection && knowledgePages.length) {
                knowledgePages.forEach(page => page.classList.add('hidden'));
                const overview = document.getElementById('knowledgeOverviewPanel');
                if (overview) {
                    overview.classList.remove('hidden');
                }
                setActiveKnowledgeSubitem('knowledgeOverviewPanel');
            }
            
            // 更新面包屑
            const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');
            if (breadcrumbItems.length > 1) {
                breadcrumbItems[1].textContent = this.querySelector('span').textContent;
            }
            
            // 显示通知
            const navLabel = this.querySelector('span')?.textContent || '模块';
            showNotification('已切换到 ' + navLabel, 'success');
        });
    });

    subNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPanel = this.getAttribute('data-knowledge-target');
            if (!knowledgeSection || !targetPanel) {
                return;
            }

            const knowledgeNav = document.querySelector('.nav-item[data-section="knowledge"]');
            if (knowledgeNav) {
                knowledgeNav.click();
            }

            subNavItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            if (knowledgePages.length) {
                knowledgePages.forEach(page => page.classList.add('hidden'));
                const targetPage = document.getElementById(targetPanel);
                if (targetPage) {
                    targetPage.classList.remove('hidden');
                    targetPage.classList.add('fade-in');
                }
            }
            setActiveKnowledgeMenu(targetPanel);

            const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');
            if (breadcrumbItems.length > 1) {
                breadcrumbItems[1].textContent = this.textContent.trim();
            }

            showNotification('已切换到 ' + this.textContent.trim(), 'success');
        });
    });
}

// 初始化时间范围下拉菜单
function initTimeRangeDropdown() {
    const dropdown = document.getElementById('timeRangeDropdown');
    const options = document.getElementById('timeRangeOptions');
    
    dropdown.addEventListener('click', function() {
        options.classList.toggle('hidden');
    });
    
    // 点击其他区域关闭下拉菜单
    document.addEventListener('click', function(event) {
        if (!dropdown.contains(event.target) && !options.contains(event.target)) {
            options.classList.add('hidden');
        }
    });
    
    // 时间选项点击事件
    const timeOptions = options.querySelectorAll('a');
    timeOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.innerHTML = this.textContent + `
                <svg class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            `;
            options.classList.add('hidden');
            
            // 显示通知
            showNotification('时间范围已更新为: ' + this.textContent, 'success');
        });
    });
}

// 初始化背景动画
function initBackgroundAnimation() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.getElementById('animationBackground').appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let points = [];
    let mouseX = 0;
    let mouseY = 0;
    
    // 创建初始点阵
    for (let i = 0; i < 50; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3
        });
    }
    
    // 鼠标移动监听
    document.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 0.3;
        
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            
            // 更新点的位置
            point.x += point.speedX;
            point.y += point.speedY;
            
            // 边界检查
            if (point.x < 0 || point.x > canvas.width) point.speedX *= -1;
            if (point.y < 0 || point.y > canvas.height) point.speedY *= -1;
            
            // 绘制点
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
            ctx.fillStyle = '#3b82f6';
            ctx.fill();
            
            // 绘制连接线
            for (let j = i + 1; j < points.length; j++) {
                const otherPoint = points[j];
                const distance = Math.sqrt(
                    Math.pow(point.x - otherPoint.x, 2) + 
                    Math.pow(point.y - otherPoint.y, 2)
                );
                
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(otherPoint.x, otherPoint.y);
                    ctx.stroke();
                }
            }
            
            // 鼠标交互
            const mouseDistance = Math.sqrt(
                Math.pow(point.x - mouseX, 2) + 
                Math.pow(point.y - mouseY, 2)
            );
            
            if (mouseDistance < 100) {
                const angle = Math.atan2(mouseY - point.y, mouseX - point.x);
                point.x += Math.cos(angle) * 0.2;
                point.y += Math.sin(angle) * 0.2;
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // 窗口大小调整
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// 初始化通知系统
function initNotificationSystem() {
    // 显示欢迎通知
    setTimeout(() => {
        showNotification('欢迎使用灵枢企业智能中枢平台', 'success');
    }, 1000);
}

// 显示通知
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const title = document.getElementById('notificationTitle');
    const msg = document.getElementById('notificationMessage');
    const icon = document.getElementById('notificationIcon');
    
    // 设置通知类型
    const typeConfig = {
        success: {
            title: '成功',
            icon: 'fa-check-circle',
            color: 'bg-success',
            textColor: 'text-white'
        },
        error: {
            title: '错误',
            icon: 'fa-exclamation-circle',
            color: 'bg-danger',
            textColor: 'text-white'
        },
        warning: {
            title: '警告',
            icon: 'fa-exclamation-triangle',
            color: 'bg-warning',
            textColor: 'text-white'
        },
        info: {
            title: '信息',
            icon: 'fa-info-circle',
            color: 'bg-primary',
            textColor: 'text-white'
        }
    };
    
    const config = typeConfig[type] || typeConfig.info;
    
    title.textContent = config.title;
    msg.textContent = message;
    icon.className = `flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full mr-3 ${config.color} ${config.textColor}`;
    icon.innerHTML = `<i class="fa ${config.icon}"></i>`;
    
    // 显示通知
    notification.classList.remove('hidden');
    notification.classList.add('fade-in');
    
    // 3秒后自动隐藏
    setTimeout(() => {
        notification.classList.add('opacity-0');
        notification.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            notification.classList.add('hidden');
            notification.classList.remove('opacity-0');
            notification.style.transition = '';
        }, 500);
    }, 3000);
    
    // 关闭按钮事件
    const closeButton = notification.querySelector('button');
    closeButton.addEventListener('click', () => {
        notification.classList.add('opacity-0');
        notification.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            notification.classList.add('hidden');
            notification.classList.remove('opacity-0');
            notification.style.transition = '';
        }, 500);
    });
}

// 初始化按钮事件
function initButtonEvents() {
    // 为所有按钮添加事件监听
    document.addEventListener('click', function(e) {
        const button = e.target.closest('button');
        if (!button) return;
        
        // 跳过导航按钮和通知关闭按钮
        if (button.closest('.nav-item') || button.closest('#notification')) {
            return;
        }
        
        // 获取按钮文本
        const buttonText = button.textContent.trim();
        const buttonLabel = buttonText
            || button.getAttribute('aria-label')
            || button.getAttribute('title')
            || button.getAttribute('data-label')
            || '操作';
        
        // 根据按钮所在的模块和文本执行相应操作
        const sectionId = button.closest('.section-content')?.id || '';
        
        // 通用按钮处理
        if (buttonLabel.includes('新建') || buttonLabel.includes('添加')) {
            showNotification(`正在创建新${buttonLabel.replace('新建', '').replace('添加', '')}...`, 'success');
            setTimeout(() => {
                showNotification('创建成功！', 'success');
            }, 1000);
        }
        else if (buttonLabel.includes('编辑')) {
            showNotification('进入编辑模式', 'info');
        }
        else if (buttonLabel.includes('查看')) {
            showNotification('正在加载详情...', 'info');
        }
        else if (buttonLabel.includes('删除')) {
            if (confirm('确定要删除吗？')) {
                showNotification('删除成功', 'success');
            }
        }
        else if (buttonLabel.includes('刷新')) {
            showNotification('正在刷新数据...', 'info');
            setTimeout(() => {
                showNotification('数据已更新', 'success');
            }, 800);
        }
        else if (buttonLabel.includes('导出')) {
            showNotification('正在准备导出...', 'info');
            setTimeout(() => {
                showNotification('导出成功，文件已下载', 'success');
            }, 1000);
        }
        else if (buttonLabel.includes('搜索')) {
            showNotification('正在搜索...', 'info');
            setTimeout(() => {
                showNotification('搜索完成', 'success');
            }, 500);
        }
        else if (buttonLabel.includes('仲裁')) {
            showNotification('正在处理冲突仲裁...', 'warning');
            setTimeout(() => {
                showNotification('仲裁完成', 'success');
            }, 1500);
        }
        else if (buttonLabel.includes('保存')) {
            showNotification('正在保存设置...', 'info');
            setTimeout(() => {
                showNotification('保存成功', 'success');
            }, 800);
        }
        else if (buttonLabel.includes('恢复')) {
            if (confirm('确定要恢复默认设置吗？')) {
                showNotification('正在恢复默认设置...', 'warning');
                setTimeout(() => {
                    showNotification('恢复完成', 'success');
                }, 1000);
            }
        }
        else if (buttonLabel.includes('对话')) {
            showNotification('正在连接智能体...', 'info');
            setTimeout(() => {
                showNotification('连接成功，开始对话', 'success');
            }, 1200);
        }
        else if (buttonLabel.includes('探索') || buttonLabel.includes('加载图谱')) {
            showNotification('正在加载知识图谱...', 'info');
            setTimeout(() => {
                showNotification('图谱加载完成', 'success');
            }, 2000);
        }
        else if (buttonLabel.includes('处理')) {
            showNotification('正在处理数据...', 'info');
            setTimeout(() => {
                showNotification('处理完成', 'success');
            }, 1000);
        }
        else if (buttonLabel.includes('详情') || buttonLabel.includes('报告')) {
            showNotification('正在生成详细报告...', 'info');
            setTimeout(() => {
                showNotification('报告生成完成', 'success');
            }, 1200);
        }
        else if (buttonLabel.includes('全部')) {
            showNotification('正在加载全部数据...', 'info');
            setTimeout(() => {
                showNotification('数据加载完成', 'success');
            }, 1000);
        }
        else {
            showNotification(`已触发${buttonLabel}`, 'info');
        }
        
        // 特殊处理某些按钮
        if (button.id === 'refreshData') {
            refreshDashboardData();
        }
    });
    
    // 为复选框添加事件监听
    document.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox') {
            const isChecked = e.target.checked;
            const checkboxName = e.target.name || e.target.id;
            
            if (checkboxName === 'toggle' || checkboxName.includes('Toggle')) {
                showNotification(isChecked ? '功能已启用' : '功能已禁用', 'success');
            } else {
                showNotification(isChecked ? '选项已选中' : '选项已取消', 'success');
            }
        }
    });
    
    // 为输入框添加事件监听
    document.addEventListener('input', function(e) {
        if (e.target.tagName === 'INPUT' && e.target.type !== 'checkbox' && e.target.type !== 'radio') {
            // 模拟实时搜索或输入反馈
            if (e.target.placeholder.includes('搜索')) {
                const value = e.target.value.trim();
                if (value.length > 2) {
                    // 防抖处理
                    clearTimeout(e.target.searchTimeout);
                    e.target.searchTimeout = setTimeout(() => {
                        showNotification(`正在搜索: ${value}`, 'info');
                    }, 500);
                }
            }
        }
    });
    
    // 为选择框添加事件监听
    document.addEventListener('change', function(e) {
        if (e.target.tagName === 'SELECT') {
            const selectedValue = e.target.options[e.target.selectedIndex].text;
            showNotification(`已选择: ${selectedValue}`, 'success');
        }
    });
    
    // 为分页按钮添加事件监听
    document.addEventListener('click', function(e) {
        if (e.target.closest('.pagination')) {
            const button = e.target.closest('button');
            if (button && !button.disabled) {
                const pageText = button.textContent.trim();
                showNotification(`跳转到第 ${pageText} 页`, 'info');
            }
        }
    });
}

function initGraphModule() {
    const graphSection = document.getElementById('graph');
    if (!graphSection) {
        return;
    }

    const graphTabs = graphSection.querySelectorAll('.graph-menu-item');
    const graphPanels = graphSection.querySelectorAll('.graph-panel');
    if (!graphTabs.length || !graphPanels.length) {
        return;
    }

    const setActiveGraphTab = (targetId) => {
        graphTabs.forEach(tab => {
            const isActive = tab.getAttribute('data-target') === targetId;
            tab.classList.toggle('active', isActive);
            if (isActive) {
                tab.classList.add('bg-success', 'text-white');
                tab.classList.remove('bg-gray-100', 'text-gray-700');
            } else {
                tab.classList.remove('bg-success', 'text-white');
                tab.classList.add('bg-gray-100', 'text-gray-700');
            }
        });
    };

    const showGraphPanel = (targetId) => {
        graphPanels.forEach(panel => panel.classList.add('hidden'));
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
            targetPanel.classList.remove('hidden');
            targetPanel.classList.add('fade-in');
        }
    };

    graphTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');
            if (!targetId) {
                return;
            }
            setActiveGraphTab(targetId);
            showGraphPanel(targetId);
        });
    });

    const initialTab = graphSection.querySelector('.graph-menu-item.active') || graphTabs[0];
    if (initialTab) {
        const targetId = initialTab.getAttribute('data-target');
        if (targetId) {
            setActiveGraphTab(targetId);
            showGraphPanel(targetId);
        }
    }

    const contextStartDate = document.getElementById('contextStartDate');
    const contextEndDate = document.getElementById('contextEndDate');
    const contextOrgSelect = document.getElementById('contextOrgSelect');
    const contextBizSelect = document.getElementById('contextBizSelect');
    const applyGraphContext = document.getElementById('applyGraphContext');
    const contextSummary = document.getElementById('contextSummary');
    if (contextStartDate && !contextStartDate.value) {
        contextStartDate.value = '2023-01-01';
    }
    if (contextEndDate && !contextEndDate.value) {
        contextEndDate.value = '2023-12-31';
    }
    const updateContextSummary = () => {
        if (!contextSummary) {
            return;
        }
        const org = contextOrgSelect ? contextOrgSelect.value : '全部组织';
        const biz = contextBizSelect ? contextBizSelect.value : '全部业务';
        const start = contextStartDate ? contextStartDate.value : '';
        const end = contextEndDate ? contextEndDate.value : '';
        const timeLabel = start && end ? `${start} 至 ${end}` : '时间不限';
        contextSummary.textContent = `当前上下文：${org} · ${timeLabel} · ${biz}`;
    };
    updateContextSummary();
    if (applyGraphContext) {
        applyGraphContext.addEventListener('click', () => {
            updateContextSummary();
            showNotification('上下文已应用', 'success');
        });
    }
    const contextInputs = [contextStartDate, contextEndDate, contextOrgSelect, contextBizSelect].filter(Boolean);
    contextInputs.forEach(input => {
        input.addEventListener('change', () => {
            updateContextSummary();
        });
    });

    const graphNodeName = document.getElementById('graphNodeName');
    const graphNodeType = document.getElementById('graphNodeType');
    const graphNodeStatus = document.getElementById('graphNodeStatus');
    const graphNodeVersion = document.getElementById('graphNodeVersion');
    const graphNodeContext = document.getElementById('graphNodeContext');
    const graphNodeRelations = document.getElementById('graphNodeRelations');
    const graphNodeConfidence = document.getElementById('graphNodeConfidence');
    const graphNodeConfidenceBar = document.getElementById('graphNodeConfidenceBar');
    const graphNodes = graphSection.querySelectorAll('.graph-node');
    const nodeMeta = {
        'CUST-0192': {
            name: 'VIP客户 CUST-0192',
            type: '实体:客户',
            status: '审核中',
            version: 'v4',
            context: '欧洲分公司 / 2023-01-01 ~ 2023-12-31',
            relations: ['关联合同：CON-554', '关联风险：RISK-302'],
            confidence: 0.78
        },
        'POL-2023-17': {
            name: '欧洲分公司数据跨境政策',
            type: '实体:政策',
            status: '已生效',
            version: 'v12',
            context: '欧洲分公司 / 2023-01-01 ~ 2023-12-31',
            relations: ['关联流程：跨境审批流程', '关联培训：GDPR 培训计划'],
            confidence: 0.92
        },
        'FLOW-88': {
            name: '跨境审批流程',
            type: '实体:流程',
            status: '审核中',
            version: 'v6',
            context: '欧洲分公司 / 2023-03-01 ~ 2024-03-01',
            relations: ['关联政策：POL-2023-17', '关联合同：CON-554'],
            confidence: 0.84
        },
        'CON-554': {
            name: 'EU-2023-554 合同',
            type: '实体:合同',
            status: '已生效',
            version: 'v9',
            context: '欧洲分公司 / 2023-01-01 ~ 2024-12-31',
            relations: ['关联客户：CUST-0192', '关联政策：POL-2023-17'],
            confidence: 0.88
        },
        'TRN-901': {
            name: 'GDPR 培训计划',
            type: '实体:培训',
            status: '已归档',
            version: 'v2',
            context: '欧洲分公司 / 2022-01-01 ~ 2022-12-31',
            relations: ['关联政策：POL-2023-17'],
            confidence: 0.73
        },
        'RISK-302': {
            name: '跨境风险评估',
            type: '实体:风险',
            status: '已生效',
            version: 'v5',
            context: '欧洲分公司 / 2023-01-01 ~ 2023-12-31',
            relations: ['关联客户：CUST-0192', '关联合同：CON-554'],
            confidence: 0.9
        }
    };

    const statusBadgeClasses = {
        '已生效': 'bg-emerald-50 text-emerald-700',
        '审核中': 'bg-amber-50 text-amber-700',
        '已归档': 'bg-slate-100 text-slate-600',
        '草稿': 'bg-gray-100 text-gray-600',
        '已受限': 'bg-red-50 text-red-700',
        '已废止': 'bg-red-50 text-red-700'
    };

    const applyNodeDetail = (nodeId) => {
        const meta = nodeMeta[nodeId];
        if (!meta) {
            return;
        }
        if (graphNodeName) {
            graphNodeName.textContent = meta.name;
        }
        if (graphNodeType) {
            graphNodeType.textContent = meta.type;
        }
        if (graphNodeStatus) {
            graphNodeStatus.textContent = meta.status;
            graphNodeStatus.className = `text-xs font-medium px-2 py-1 rounded-full ${statusBadgeClasses[meta.status] || 'bg-gray-100 text-gray-600'}`;
        }
        if (graphNodeVersion) {
            graphNodeVersion.textContent = meta.version;
        }
        if (graphNodeContext) {
            graphNodeContext.textContent = meta.context;
        }
        if (graphNodeRelations) {
            graphNodeRelations.innerHTML = '';
            meta.relations.forEach(item => {
                const row = document.createElement('div');
                row.textContent = item;
                graphNodeRelations.appendChild(row);
            });
        }
        if (graphNodeConfidence) {
            graphNodeConfidence.textContent = meta.confidence.toFixed(2);
        }
        if (graphNodeConfidenceBar) {
            graphNodeConfidenceBar.style.width = `${meta.confidence * 100}%`;
        }
    };

    const applyNodeHighlight = (activeNode) => {
        graphNodes.forEach(node => {
            if (node === activeNode) {
                node.classList.add('is-active');
                node.classList.remove('is-dim');
            } else {
                node.classList.remove('is-active');
                node.classList.add('is-dim');
            }
        });
    };

    graphNodes.forEach(node => {
        node.addEventListener('click', () => {
            const nodeId = node.getAttribute('data-node-id');
            applyNodeHighlight(node);
            applyNodeDetail(nodeId);
        });
    });

    const graphFilterSelect = document.getElementById('graphFilterSelect');
    const graphSearchInput = document.getElementById('graphSearchInput');
    const applyGraphFilter = () => {
        const filterValue = graphFilterSelect ? graphFilterSelect.value : '全部';
        const searchValue = graphSearchInput ? graphSearchInput.value.trim().toLowerCase() : '';
        graphNodes.forEach(node => {
            const nodeId = node.getAttribute('data-node-id');
            const meta = nodeMeta[nodeId];
            const matchesType = filterValue === '全部' || (meta && meta.type.includes(filterValue));
            const matchesSearch = !searchValue || (meta && meta.name.toLowerCase().includes(searchValue));
            const isMatch = matchesType && matchesSearch;
            node.classList.toggle('is-dim', !isMatch);
        });
    };
    if (graphFilterSelect) {
        graphFilterSelect.addEventListener('change', applyGraphFilter);
    }
    if (graphSearchInput) {
        graphSearchInput.addEventListener('input', applyGraphFilter);
    }

    const graphReloadButton = document.getElementById('graphReloadButton');
    if (graphReloadButton) {
        graphReloadButton.addEventListener('click', () => {
            showNotification('图谱视图已刷新', 'success');
            graphNodes.forEach(node => node.classList.remove('is-dim'));
        });
    }

    const graphCreateObjectButton = document.getElementById('graphCreateObjectButton');
    if (graphCreateObjectButton) {
        graphCreateObjectButton.addEventListener('click', () => {
            const targetTab = graphSection.querySelector('[data-target="graphObjectPanel"]');
            if (targetTab) {
                targetTab.click();
            }
            showNotification('已进入对象创建流程', 'success');
        });
    }

    const objectIdInput = document.getElementById('objectIdInput');
    const generateObjectId = document.getElementById('generateObjectId');
    if (generateObjectId) {
        generateObjectId.addEventListener('click', () => {
            if (objectIdInput) {
                const suffix = Math.floor(Math.random() * 900 + 100);
                objectIdInput.value = `OBJ-${suffix}`;
            }
            showNotification('已生成对象标识符', 'success');
        });
    }

    const objectVersionValue = document.getElementById('objectVersionValue');
    const bumpObjectVersion = document.getElementById('bumpObjectVersion');
    if (bumpObjectVersion) {
        bumpObjectVersion.addEventListener('click', () => {
            if (objectVersionValue) {
                const current = parseInt(objectVersionValue.textContent.replace(/[^\d]/g, ''), 10) || 0;
                objectVersionValue.textContent = `v${current + 1}`;
            }
            showNotification('版本已递增', 'success');
        });
    }

    const objectStateSelect = document.getElementById('objectStateSelect');
    const objectStateBadge = document.getElementById('objectStateBadge');
    const stateImpactLabel = document.getElementById('stateImpactLabel');
    const stateImpactMap = {
        '已生效': '状态影响：已生效对象默认参与通用检索与推理。',
        '审核中': '状态影响：审核中对象仅对审核角色可见。',
        '已受限': '状态影响：已受限对象仅在授权范围内可检索。',
        '已归档': '状态影响：已归档对象默认不出现在通用搜索中。',
        '已废止': '状态影响：已废止对象不可建立新关联。'
    };
    const updateStateBadge = () => {
        if (!objectStateSelect) {
            return;
        }
        const value = objectStateSelect.value;
        if (objectStateBadge) {
            objectStateBadge.textContent = value;
            objectStateBadge.className = `text-xs font-medium px-2 py-1 rounded-full ${statusBadgeClasses[value] || 'bg-gray-100 text-gray-600'}`;
        }
        if (stateImpactLabel) {
            stateImpactLabel.textContent = stateImpactMap[value] || '状态影响：当前状态将影响检索范围。';
        }
    };
    if (objectStateSelect) {
        objectStateSelect.addEventListener('change', updateStateBadge);
        updateStateBadge();
    }

    const nextStateSelect = document.getElementById('nextStateSelect');
    const applyStateTransition = document.getElementById('applyStateTransition');
    if (applyStateTransition) {
        applyStateTransition.addEventListener('click', () => {
            if (objectStateSelect && nextStateSelect) {
                objectStateSelect.value = nextStateSelect.value;
                updateStateBadge();
            }
            showNotification('状态转移已提交', 'success');
        });
    }

    const contextTags = graphSection.querySelectorAll('.context-tag');
    contextTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const isActive = tag.classList.contains('bg-emerald-50');
            tag.classList.toggle('bg-emerald-50', !isActive);
            tag.classList.toggle('text-emerald-700', !isActive);
            tag.classList.toggle('bg-gray-100', isActive);
            tag.classList.toggle('text-gray-600', isActive);
        });
    });

    const saveContextButton = document.getElementById('saveContextButton');
    const contextConfigSummary = document.getElementById('contextConfigSummary');
    if (saveContextButton) {
        saveContextButton.addEventListener('click', () => {
            const selectedOrgs = Array.from(graphSection.querySelectorAll('.context-org:checked')).map(input => input.value);
            const activeTags = Array.from(graphSection.querySelectorAll('.context-tag.bg-emerald-50')).map(tag => tag.getAttribute('data-tag'));
            const start = document.getElementById('objectContextStart')?.value || '';
            const end = document.getElementById('objectContextEnd')?.value || '';
            const timeLabel = start && end ? `${start} ~ ${end}` : '时间不限';
            const orgLabel = selectedOrgs.length ? selectedOrgs.join(' / ') : '未选择组织';
            const tagLabel = activeTags.length ? activeTags.join(' / ') : '未选择业务';
            if (contextConfigSummary) {
                contextConfigSummary.textContent = `上下文已同步：${orgLabel} · ${tagLabel} · ${timeLabel}`;
            }
            showNotification('上下文配置已保存', 'success');
        });
    }

    const relationConfidence = document.getElementById('relationConfidence');
    const relationConfidenceValue = document.getElementById('relationConfidenceValue');
    if (relationConfidence && relationConfidenceValue) {
        relationConfidence.addEventListener('input', () => {
            relationConfidenceValue.textContent = relationConfidence.value;
        });
    }

    const addRelationButton = document.getElementById('addRelationButton');
    const graphRelationTypeSelect = document.getElementById('graphRelationTypeSelect');
    const relationList = document.getElementById('relationList');
    if (addRelationButton && graphRelationTypeSelect && relationList && relationConfidence) {
        addRelationButton.addEventListener('click', () => {
            const typeLabel = graphRelationTypeSelect.value;
            const confidenceValue = parseFloat(relationConfidence.value || '0').toFixed(2);
            const row = document.createElement('div');
            row.className = 'flex items-center justify-between';
            row.innerHTML = `<span>${typeLabel} → 新对象</span><span class="text-emerald-600">${confidenceValue}</span>`;
            relationList.appendChild(row);
            showNotification('关系已添加', 'success');
        });
    }

    const lineageInput = document.getElementById('lineageInput');
    const addLineageButton = document.getElementById('addLineageButton');
    const lineageList = document.getElementById('lineageList');
    if (addLineageButton && lineageInput && lineageList) {
        addLineageButton.addEventListener('click', () => {
            const value = lineageInput.value.trim();
            if (!value) {
                showNotification('请输入谱系描述', 'warning');
                return;
            }
            const row = document.createElement('div');
            row.textContent = value;
            lineageList.appendChild(row);
            lineageInput.value = '';
            showNotification('谱系节点已追加', 'success');
        });
    }

    const auditActionSelect = document.getElementById('auditActionSelect');
    const addAuditLogButton = document.getElementById('addAuditLogButton');
    const auditLogList = document.getElementById('auditLogList');
    if (addAuditLogButton && auditActionSelect && auditLogList) {
        addAuditLogButton.addEventListener('click', () => {
            const time = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
            const row = document.createElement('div');
            row.textContent = `${time} 系统 ${auditActionSelect.value} 操作已记录`;
            auditLogList.prepend(row);
            showNotification('审计日志已记录', 'success');
        });
    }

    const routeQueryButton = document.getElementById('routeQueryButton');
    const queryRouteSummary = document.getElementById('queryRouteSummary');
    if (routeQueryButton && queryRouteSummary) {
        routeQueryButton.addEventListener('click', () => {
            const selectedModes = Array.from(graphSection.querySelectorAll('.query-mode:checked')).map(input => input.value);
            const modeLabel = selectedModes.length ? selectedModes.join(' + ') : '默认检索';
            queryRouteSummary.textContent = `路由结果：${modeLabel}，融合排序开启。`;
            showNotification('查询路由已生成', 'success');
        });
    }

    const runHybridSearch = document.getElementById('runHybridSearch');
    const hybridResults = document.getElementById('hybridResults');
    if (runHybridSearch && hybridResults) {
        runHybridSearch.addEventListener('click', () => {
            const score = (Math.random() * 0.1 + 0.85).toFixed(2);
            const row = document.createElement('div');
            row.className = 'border border-gray-100 rounded-lg p-3';
            row.innerHTML = `
                <div class="flex items-center justify-between">
                    <span class="font-medium text-gray-900">新检索对象</span>
                    <span class="text-xs text-emerald-600">得分 ${score}</span>
                </div>
                <p class="text-xs text-gray-500 mt-1">状态：已生效 · 置信度 0.87 · 新鲜度 0.83</p>
            `;
            hybridResults.prepend(row);
            showNotification('融合检索完成', 'success');
        });
    }

    const runReasoningButton = document.getElementById('runReasoningButton');
    const reasoningOutput = document.getElementById('reasoningOutput');
    if (runReasoningButton && reasoningOutput) {
        runReasoningButton.addEventListener('click', () => {
            reasoningOutput.textContent = '推理链：客户B → 逾期次数=5 → 行业=医疗 → 标记高风险';
            showNotification('推理执行完成', 'success');
        });
    }

    const validateWriteButton = document.getElementById('validateWriteButton');
    const writeValidationSelect = document.getElementById('writeValidationSelect');
    const writeValidationResult = document.getElementById('writeValidationResult');
    if (validateWriteButton && writeValidationSelect && writeValidationResult) {
        validateWriteButton.addEventListener('click', () => {
            const value = writeValidationSelect.value;
            if (value.includes('已废止')) {
                writeValidationResult.textContent = '校验失败：关联对象已废止，禁止写入关联。';
                showNotification('写入校验失败', 'warning');
                return;
            }
            writeValidationResult.textContent = '校验通过：关联关系允许写入。';
            showNotification('写入校验通过', 'success');
        });
    }

    const algorithmSelect = document.getElementById('algorithmSelect');
    const runAlgorithmButton = document.getElementById('runAlgorithmButton');
    const algorithmResult = document.getElementById('algorithmResult');
    if (runAlgorithmButton && algorithmSelect && algorithmResult) {
        runAlgorithmButton.addEventListener('click', () => {
            const value = algorithmSelect.value;
            if (value === 'community') {
                algorithmResult.innerHTML = `
                    <div class="bg-gray-50 rounded p-3">
                        <p class="font-medium text-gray-900">社区 B</p>
                        <p>新增文档 18 个</p>
                    </div>
                    <div class="bg-gray-50 rounded p-3">
                        <p class="font-medium text-gray-900">高密度区</p>
                        <p>客户 / 合同 / 流程</p>
                    </div>
                    <div class="bg-gray-50 rounded p-3">
                        <p class="font-medium text-gray-900">风险提示</p>
                        <p>发现 2 个弱关联点</p>
                    </div>
                `;
            } else if (value === 'centrality') {
                algorithmResult.innerHTML = `
                    <div class="bg-gray-50 rounded p-3">
                        <p class="font-medium text-gray-900">核心节点</p>
                        <p>POL-2023-17, CON-554</p>
                    </div>
                    <div class="bg-gray-50 rounded p-3">
                        <p class="font-medium text-gray-900">中心性评分</p>
                        <p>最高 0.89</p>
                    </div>
                    <div class="bg-gray-50 rounded p-3">
                        <p class="font-medium text-gray-900">影响范围</p>
                        <p>覆盖 62% 节点</p>
                    </div>
                `;
            } else {
                algorithmResult.innerHTML = `
                    <div class="bg-gray-50 rounded p-3">
                        <p class="font-medium text-gray-900">路径发现</p>
                        <p>故障 → 合同 → 客户 → 培训</p>
                    </div>
                    <div class="bg-gray-50 rounded p-3">
                        <p class="font-medium text-gray-900">路径长度</p>
                        <p>4 跳</p>
                    </div>
                    <div class="bg-gray-50 rounded p-3">
                        <p class="font-medium text-gray-900">风险节点</p>
                        <p>1 个关键节点</p>
                    </div>
                `;
            }
            showNotification('算法已执行', 'success');
        });
    }

    const graphSnapshotCreateButton = document.getElementById('graphSnapshotCreateButton');
    const graphCreateSnapshotButton = document.getElementById('graphCreateSnapshotButton');
    const snapshotList = document.getElementById('snapshotList');
    const addSnapshot = (reason = '手动触发') => {
        if (!snapshotList) {
            return;
        }
        const now = new Date();
        const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const row = document.createElement('div');
        row.className = 'flex items-center justify-between bg-gray-50 rounded px-3 py-2';
        row.innerHTML = `<span>${timestamp} · 增量快照</span><span class="text-gray-400">${reason}</span>`;
        snapshotList.prepend(row);
    };
    if (graphSnapshotCreateButton) {
        graphSnapshotCreateButton.addEventListener('click', () => {
            const reasonInput = document.getElementById('snapshotReasonInput');
            addSnapshot(reasonInput ? reasonInput.value || '手动触发' : '手动触发');
            showNotification('快照已创建', 'success');
        });
    }
    if (graphCreateSnapshotButton) {
        graphCreateSnapshotButton.addEventListener('click', () => {
            addSnapshot('顶部触发');
            showNotification('快照创建任务已提交', 'success');
        });
    }

    const compareSnapshotButton = document.getElementById('compareSnapshotButton');
    const snapshotDiffSummary = document.getElementById('snapshotDiffSummary');
    if (compareSnapshotButton && snapshotDiffSummary) {
        compareSnapshotButton.addEventListener('click', () => {
            const added = Math.floor(Math.random() * 150 + 80);
            const removed = Math.floor(Math.random() * 20 + 5);
            const updated = Math.floor(Math.random() * 60 + 20);
            snapshotDiffSummary.textContent = `新增对象 ${added} · 删除对象 ${removed} · 变更对象 ${updated}`;
            showNotification('快照对比已生成', 'success');
        });
    }

    const runVersionDiff = document.getElementById('runVersionDiff');
    const versionDiffResult = document.getElementById('versionDiffResult');
    if (runVersionDiff && versionDiffResult) {
        runVersionDiff.addEventListener('click', () => {
            versionDiffResult.textContent = '属性差异：风险等级提升至中高，新增关联流程 2 条。';
            showNotification('版本差异已更新', 'success');
        });
    }

    const scenarioSteps = graphSection.querySelectorAll('.scenario-step');
    const scenarioDetail = document.getElementById('scenarioDetail');
    const scenarioDetails = {
        1: '当前选中：上下文化查询。系统自动限定组织与时间范围，确保检索对象处于生效上下文。',
        2: '当前选中：图谱多跳遍历。系统拉取政策、流程、合同及关联记录形成证据网络。',
        3: '当前选中：时间旅行对比。系统对比历史版本，输出变更列表与差异说明。',
        4: '当前选中：社区发现洞察。算法识别弱关联社群并标记风险盲区。',
        5: '当前选中：证据包输出。生成可导出的证据材料与审计摘要。'
    };
    scenarioSteps.forEach(step => {
        step.addEventListener('click', () => {
            scenarioSteps.forEach(item => item.classList.remove('bg-emerald-50', 'border-emerald-200'));
            step.classList.add('bg-emerald-50', 'border-emerald-200');
            const key = step.getAttribute('data-step');
            if (scenarioDetail && scenarioDetails[key]) {
                scenarioDetail.textContent = scenarioDetails[key];
            }
        });
    });

    const runScenarioButton = document.getElementById('runScenarioButton');
    if (runScenarioButton) {
        runScenarioButton.addEventListener('click', () => {
            let index = 0;
            const stepArray = Array.from(scenarioSteps);
            const timer = setInterval(() => {
                if (index >= stepArray.length) {
                    clearInterval(timer);
                    showNotification('合规审计流程执行完成', 'success');
                    return;
                }
                stepArray[index].click();
                index += 1;
            }, 600);
        });
    }

    const graphStatusChart = document.getElementById('graphStatusChart');
    if (graphStatusChart && typeof Chart !== 'undefined') {
        new Chart(graphStatusChart.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['已生效', '审核中', '已归档'],
                datasets: [{
                    data: [62, 24, 14],
                    backgroundColor: ['#10b981', '#f59e0b', '#94a3b8'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            boxWidth: 6,
                            padding: 12
                        }
                    }
                },
                cutout: '65%'
            }
        });
    }
}

function initKnowledgeModule() {
    const knowledgeSection = document.getElementById('knowledge');
    if (!knowledgeSection) {
        return;
    }

    const pages = knowledgeSection.querySelectorAll('.knowledge-page');
    if (pages.length) {
        pages.forEach(page => page.classList.add('hidden'));
        const overview = document.getElementById('knowledgeOverviewPanel');
        if (overview) {
            overview.classList.remove('hidden');
        }
        setActiveKnowledgeMenu('knowledgeOverviewPanel');
    }

    const knowledgeNewPipeline = document.getElementById('knowledgeNewPipeline');
    const knowledgeNewSource = document.getElementById('knowledgeNewSource');
    const knowledgeRunSimulation = document.getElementById('knowledgeRunSimulation');
    if (knowledgeNewPipeline) {
        knowledgeNewPipeline.addEventListener('click', () => showNotification('已进入新建流水线向导', 'success'));
    }
    if (knowledgeNewSource) {
        knowledgeNewSource.addEventListener('click', () => showNotification('已打开数据源配置向导', 'success'));
    }
    if (knowledgeRunSimulation) {
        knowledgeRunSimulation.addEventListener('click', () => showNotification('模拟运行已启动', 'info'));
    }

    const connectorActions = knowledgeSection.querySelectorAll('.connector-action');
    connectorActions.forEach(action => {
        action.addEventListener('click', () => {
            showNotification(`连接器操作：${action.textContent}`, 'success');
        });
    });

    const addCustomConnector = document.getElementById('addCustomConnector');
    if (addCustomConnector) {
        addCustomConnector.addEventListener('click', () => showNotification('已打开自定义连接器开发模板', 'info'));
    }

    const testSourceConnection = document.getElementById('testSourceConnection');
    const saveSourceConfig = document.getElementById('saveSourceConfig');
    const sourceConfigStatus = document.getElementById('sourceConfigStatus');
    if (testSourceConnection) {
        testSourceConnection.addEventListener('click', () => {
            if (sourceConfigStatus) {
                sourceConfigStatus.textContent = '连接成功，已获取元数据。';
            }
            showNotification('连接测试通过', 'success');
        });
    }
    if (saveSourceConfig) {
        saveSourceConfig.addEventListener('click', () => {
            if (sourceConfigStatus) {
                sourceConfigStatus.textContent = '实例已保存，已加入监控。';
            }
            showNotification('数据源实例已保存', 'success');
        });
    }

    const runSyncNow = document.getElementById('runSyncNow');
    const syncLogList = document.getElementById('syncLogList');
    if (runSyncNow && syncLogList) {
        runSyncNow.addEventListener('click', () => {
            const now = new Date();
            const timeLabel = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            const row = document.createElement('div');
            row.className = 'flex items-center justify-between bg-gray-50 rounded px-3 py-2';
            row.innerHTML = `<span>读取 ${Math.floor(Math.random() * 2000 + 1500)} 条记录</span><span class="text-gray-400">成功 ${timeLabel}</span>`;
            syncLogList.prepend(row);
            showNotification('同步任务已执行', 'success');
        });
    }

    const saveAlertRules = document.getElementById('saveAlertRules');
    if (saveAlertRules) {
        saveAlertRules.addEventListener('click', () => showNotification('告警规则已更新', 'success'));
    }

    const processorItems = knowledgeSection.querySelectorAll('.processor-item');
    const pipelineCanvas = document.getElementById('pipelineCanvas');
    const activeProcessorLabel = document.getElementById('activeProcessorLabel');
    const pipelineSteps = [];
    const renderPipeline = () => {
        if (!pipelineCanvas) {
            return;
        }
        if (!pipelineSteps.length) {
            pipelineCanvas.textContent = '拖拽处理器到此处，构建流水线';
            return;
        }
        pipelineCanvas.innerHTML = '';
        pipelineSteps.forEach((step, index) => {
            const item = document.createElement('div');
            item.className = 'flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2 mb-2 text-xs';
            item.innerHTML = `<span>${index + 1}. ${step}</span><button data-remove=\"${index}\" class=\"text-gray-400 hover:text-gray-700\">移除</button>`;
            pipelineCanvas.appendChild(item);
        });
    };

    processorItems.forEach(item => {
        item.addEventListener('click', () => {
            const name = item.getAttribute('data-processor') || item.textContent.trim();
            pipelineSteps.push(name);
            processorItems.forEach(btn => btn.classList.remove('is-active'));
            item.classList.add('is-active');
            if (activeProcessorLabel) {
                activeProcessorLabel.textContent = name;
            }
            renderPipeline();
            showNotification(`已添加处理器：${name}`, 'success');
        });
    });

    if (pipelineCanvas) {
        pipelineCanvas.addEventListener('click', (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) {
                return;
            }
            const index = target.getAttribute('data-remove');
            if (index !== null) {
                pipelineSteps.splice(parseInt(index, 10), 1);
                renderPipeline();
                showNotification('已移除处理器', 'warning');
            }
        });
    }

    const clearPipeline = document.getElementById('clearPipeline');
    if (clearPipeline) {
        clearPipeline.addEventListener('click', () => {
            pipelineSteps.length = 0;
            renderPipeline();
            showNotification('流水线已清空', 'warning');
        });
    }

    const simulatePipeline = document.getElementById('simulatePipeline');
    const pipelineOutput = document.getElementById('pipelineOutput');
    if (simulatePipeline && pipelineOutput) {
        simulatePipeline.addEventListener('click', () => {
            const result = {
                steps: pipelineSteps.length ? pipelineSteps : ['未配置处理器'],
                output: '模拟完成，生成结构化片段与摘要'
            };
            pipelineOutput.textContent = JSON.stringify(result, null, 2);
            showNotification('单步调试完成', 'success');
        });
    }

    const savePipelineTemplate = document.getElementById('savePipelineTemplate');
    const pipelineTemplateList = document.getElementById('pipelineTemplateList');
    if (savePipelineTemplate && pipelineTemplateList) {
        savePipelineTemplate.addEventListener('click', () => {
            const row = document.createElement('div');
            row.className = 'flex items-center justify-between bg-gray-50 rounded px-3 py-2';
            row.innerHTML = '<span>新建模板</span><button class=\"text-secondary\">使用</button>';
            pipelineTemplateList.prepend(row);
            showNotification('流水线模板已保存', 'success');
        });
    }

    const publishTemplate = document.getElementById('publishTemplate');
    if (publishTemplate) {
        publishTemplate.addEventListener('click', () => showNotification('模板已发布到仓库', 'success'));
    }

    const createPipelineVersion = document.getElementById('createPipelineVersion');
    const pipelineVersionLabel = document.getElementById('pipelineVersionLabel');
    if (createPipelineVersion && pipelineVersionLabel) {
        createPipelineVersion.addEventListener('click', () => {
            const current = parseFloat(pipelineVersionLabel.textContent.replace(/[^\d.]/g, '')) || 0;
            const next = (current + 0.1).toFixed(1);
            pipelineVersionLabel.textContent = `当前版本：v${next}`;
            showNotification('流水线版本已生成', 'success');
        });
    }

    const runSampleDebug = document.getElementById('runSampleDebug');
    const sampleInput = document.getElementById('sampleInput');
    if (runSampleDebug && sampleInput && pipelineOutput) {
        runSampleDebug.addEventListener('click', () => {
            const content = sampleInput.value.slice(0, 30);
            pipelineOutput.textContent = JSON.stringify({
                snippet: content,
                entities: ['方案C', '张工', '性能优化'],
                summary: '已生成会议摘要与责任归属'
            }, null, 2);
            showNotification('样本调试完成', 'success');
        });
    }

    const resolveByPriority = document.getElementById('resolveByPriority');
    const sendToArbitration = document.getElementById('sendToArbitration');
    const fusionResult = document.getElementById('fusionResult');
    const reviewQueue = document.getElementById('reviewQueue');
    if (resolveByPriority && fusionResult) {
        resolveByPriority.addEventListener('click', () => {
            fusionResult.textContent = '融合结果：采用权威源描述，已写入实体主属性。';
            showNotification('融合完成', 'success');
        });
    }
    if (sendToArbitration && reviewQueue) {
        sendToArbitration.addEventListener('click', () => {
            const row = document.createElement('div');
            row.className = 'flex items-center justify-between bg-gray-50 rounded px-3 py-2';
            row.innerHTML = '<span>方案C负责人冲突</span><button class=\"text-secondary\">复审</button>';
            reviewQueue.prepend(row);
            showNotification('已加入人工仲裁队列', 'warning');
        });
    }

    const runQualityCheck = document.getElementById('runQualityCheck');
    const qualityResultSummary = document.getElementById('qualityResultSummary');
    if (runQualityCheck && qualityResultSummary) {
        runQualityCheck.addEventListener('click', () => {
            const pass = Math.floor(Math.random() * 5 + 94);
            qualityResultSummary.textContent = `最近结果：通过率 ${pass}%，拦截 2，降级 7，复审 3。`;
            showNotification('质检完成', 'success');
        });
    }

    const resolveReviewItem = document.getElementById('resolveReviewItem');
    if (resolveReviewItem && reviewQueue) {
        resolveReviewItem.addEventListener('click', () => {
            const first = reviewQueue.querySelector('div');
            if (first) {
                first.remove();
                showNotification('复审已完成', 'success');
            }
        });
    }

    const traceQualityIssue = document.getElementById('traceQualityIssue');
    if (traceQualityIssue) {
        traceQualityIssue.addEventListener('click', () => showNotification('已定位质量问题来源与加工路径', 'info'));
    }

    const knowledgeDimensions = knowledgeSection.querySelectorAll('.knowledge-dimension');
    knowledgeDimensions.forEach(button => {
        button.addEventListener('click', () => {
            knowledgeDimensions.forEach(item => item.classList.remove('is-active'));
            button.classList.add('is-active');
        });
    });
    if (knowledgeDimensions.length) {
        knowledgeDimensions[0].classList.add('is-active');
    }

    const saveKnowledgeDimension = document.getElementById('saveKnowledgeDimension');
    if (saveKnowledgeDimension) {
        saveKnowledgeDimension.addEventListener('click', () => {
            const active = knowledgeSection.querySelector('.knowledge-dimension.is-active');
            showNotification(`组织维度已保存：${active ? active.textContent.trim() : '默认'}`, 'success');
        });
    }

    const dataAssets = [
        { name: '设计评审会议纪要', type: '文档', source: '会议系统', domain: '产品研发', status: '已质检', owner: '张经理', updated: '10:20', tags: ['评审', '方案C'] },
        { name: '跨境合规政策', type: '文档', source: 'Confluence', domain: '供应链', status: '已入库', owner: '法务组', updated: '09:10', tags: ['合规'] },
        { name: '客服FAQ V2', type: 'FAQ', source: 'Kafka', domain: '客户服务', status: '处理中', owner: '李工程师', updated: '08:45', tags: ['FAQ'] },
        { name: '供应链风险表', type: '结构化', source: 'GitLab', domain: '供应链', status: '已接入', owner: '王总监', updated: '08:00', tags: ['风险'] },
        { name: '会议录音', type: '多媒体', source: '会议系统', domain: '产品研发', status: '已接入', owner: '系统', updated: '07:50', tags: ['音频'] }
    ];

    const dataViewList = document.getElementById('dataViewList');
    const dataDetailPanel = document.getElementById('dataDetailPanel');
    const dataTypeFilter = document.getElementById('dataTypeFilter');
    const dataSourceFilter = document.getElementById('dataSourceFilter');
    const dataDomainFilter = document.getElementById('dataDomainFilter');
    const dataStatusFilter = document.getElementById('dataStatusFilter');
    const dataSearchInput = document.getElementById('dataSearchInput');

    const renderDataList = () => {
        if (!dataViewList) {
            return;
        }
        const typeValue = dataTypeFilter ? dataTypeFilter.value : '全部';
        const sourceValue = dataSourceFilter ? dataSourceFilter.value : '全部';
        const domainValue = dataDomainFilter ? dataDomainFilter.value : '全部';
        const statusValue = dataStatusFilter ? dataStatusFilter.value : '全部';
        const keyword = dataSearchInput ? dataSearchInput.value.trim().toLowerCase() : '';

        const rows = dataAssets.filter(item => {
            const matchType = typeValue === '全部' || item.type === typeValue;
            const matchSource = sourceValue === '全部' || item.source === sourceValue;
            const matchDomain = domainValue === '全部' || item.domain === domainValue;
            const matchStatus = statusValue === '全部' || item.status === statusValue;
            const matchKeyword = !keyword || item.name.toLowerCase().includes(keyword);
            return matchType && matchSource && matchDomain && matchStatus && matchKeyword;
        });

        dataViewList.innerHTML = '';
        rows.forEach((item, index) => {
            const row = document.createElement('tr');
            row.className = 'data-row cursor-pointer hover:bg-gray-50';
            row.setAttribute('data-index', index.toString());
            row.innerHTML = `
                <td class="px-4 py-2 text-gray-900">${item.name}</td>
                <td class="px-4 py-2 text-gray-600">${item.type}</td>
                <td class="px-4 py-2 text-gray-600">${item.source}</td>
                <td class="px-4 py-2 text-gray-600">${item.status}</td>
            `;
            dataViewList.appendChild(row);
        });
        if (!rows.length) {
            const row = document.createElement('tr');
            row.innerHTML = '<td class="px-4 py-4 text-center text-gray-400" colspan="4">暂无匹配数据</td>';
            dataViewList.appendChild(row);
        }
    };

    if (dataViewList) {
        dataViewList.addEventListener('click', (event) => {
            const target = event.target;
            const row = target instanceof HTMLElement ? target.closest('tr') : null;
            if (!row || !row.classList.contains('data-row')) {
                return;
            }
            const nameCell = row.querySelector('td');
            if (!nameCell) {
                return;
            }
            const name = nameCell.textContent || '';
            const item = dataAssets.find(asset => asset.name === name);
            if (!item || !dataDetailPanel) {
                return;
            }
            dataDetailPanel.innerHTML = `
                <p><span class="text-gray-500">名称：</span>${item.name}</p>
                <p><span class="text-gray-500">类型：</span>${item.type}</p>
                <p><span class="text-gray-500">来源：</span>${item.source}</p>
                <p><span class="text-gray-500">业务域：</span>${item.domain}</p>
                <p><span class="text-gray-500">状态：</span>${item.status}</p>
                <p><span class="text-gray-500">责任人：</span>${item.owner}</p>
                <p><span class="text-gray-500">更新时间：</span>${item.updated}</p>
                <p><span class="text-gray-500">标签：</span>${item.tags.join(' / ')}</p>
            `;
        });
    }

    [dataTypeFilter, dataSourceFilter, dataDomainFilter, dataStatusFilter, dataSearchInput].forEach(control => {
        if (control) {
            control.addEventListener('input', renderDataList);
            control.addEventListener('change', renderDataList);
        }
    });
    renderDataList();

    const outputTabButtons = knowledgeSection.querySelectorAll('.output-tab');
    const outputList = document.getElementById('outputList');
    const outputDetail = document.getElementById('outputDetail');
    const outputData = {
        文档: [
            { title: '设计评审会议摘要', source: '会议系统', status: '已入库', preview: '会议确认采用方案C。' },
            { title: '跨境合规政策', source: 'Confluence', status: '已入库', preview: '明确跨境审批流程。' }
        ],
        FAQ: [
            { title: 'FAQ：如何提交审批', source: '客服系统', status: '降级', preview: '标准问答 12 条。' },
            { title: 'FAQ：账号权限说明', source: 'Confluence', status: '已质检', preview: '权限申请与审批流程。' }
        ],
        数据库: [
            { title: '供应链风险表', source: 'ERP', status: '已接入', preview: '字段标准化完成。' },
            { title: '客户主数据', source: 'CRM', status: '已入库', preview: '已映射 23 个字段。' }
        ],
        多媒体: [
            { title: '会议录音 07-21', source: '会议系统', status: '处理中', preview: '转写进度 72%。' },
            { title: '培训视频 A1', source: '媒体库', status: '已质检', preview: '已生成摘要与关键词。' }
        ]
    };

    const renderOutputList = (type) => {
        if (!outputList) {
            return;
        }
        outputList.innerHTML = '';
        const items = outputData[type] || [];
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'border border-gray-200 rounded-lg p-3 bg-white hover:shadow-sm cursor-pointer';
            card.innerHTML = `
                <div class="flex items-center justify-between">
                    <span class="font-medium text-gray-900">${item.title}</span>
                    <span class="text-xs text-gray-400">${item.status}</span>
                </div>
                <p class="text-xs text-gray-500 mt-1">来源：${item.source}</p>
            `;
            card.addEventListener('click', () => {
                if (!outputDetail) {
                    return;
                }
                outputDetail.innerHTML = `
                    <p><span class="text-gray-500">标题：</span>${item.title}</p>
                    <p><span class="text-gray-500">来源：</span>${item.source}</p>
                    <p><span class="text-gray-500">状态：</span>${item.status}</p>
                    <p><span class="text-gray-500">预览：</span>${item.preview}</p>
                    <div class="flex gap-2 mt-3">
                        <button class="px-2 py-1 text-xs bg-gray-100 rounded">查看详情</button>
                        <button class="px-2 py-1 text-xs bg-secondary text-white rounded">回溯流水线</button>
                    </div>
                `;
            });
            outputList.appendChild(card);
        });
    };

    outputTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            outputTabButtons.forEach(tab => tab.classList.remove('active', 'bg-secondary', 'text-white'));
            outputTabButtons.forEach(tab => tab.classList.add('bg-gray-100', 'text-gray-700'));
            button.classList.add('active', 'bg-secondary', 'text-white');
            button.classList.remove('bg-gray-100', 'text-gray-700');
            renderOutputList(button.getAttribute('data-type') || '文档');
        });
    });
    if (outputTabButtons.length) {
        outputTabButtons[0].click();
    }

    const dimensionChips = knowledgeSection.querySelectorAll('.dimension-chip');
    dimensionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            chip.classList.toggle('is-active');
        });
    });
    const saveDimensionConfig = document.getElementById('saveDimensionConfig');
    if (saveDimensionConfig) {
        saveDimensionConfig.addEventListener('click', () => {
            const active = Array.from(knowledgeSection.querySelectorAll('.dimension-chip.is-active')).map(item => item.getAttribute('data-dimension'));
            showNotification(`加工维度已保存：${active.join(' / ') || '未选择'}`, 'success');
        });
    }

    const pushToGraph = document.getElementById('pushToGraph');
    const validateGraphContext = document.getElementById('validateGraphContext');
    const graphSyncStatus = document.getElementById('graphSyncStatus');
    if (pushToGraph && graphSyncStatus) {
        pushToGraph.addEventListener('click', () => {
            graphSyncStatus.textContent = '入图完成：已写入 3 个实体、2 条关系。';
            showNotification('已写入动态知识图谱', 'success');
        });
    }
    if (validateGraphContext && graphSyncStatus) {
        validateGraphContext.addEventListener('click', () => {
            graphSyncStatus.textContent = '上下文校验通过：组织=产品研发，时间=2023-07-21。';
            showNotification('上下文校验通过', 'success');
        });
    }
    const saveGraphPolicy = document.getElementById('saveGraphPolicy');
    if (saveGraphPolicy) {
        saveGraphPolicy.addEventListener('click', () => showNotification('入图策略已保存', 'success'));
    }

    const knowledgeScenarioSteps = knowledgeSection.querySelectorAll('.knowledge-step');
    const knowledgeScenarioDetail = document.getElementById('knowledgeScenarioDetail');
    const scenarioDetails = {
        1: '当前选中：多源接入。自动抓取会议元数据、录音文件、PPT 与纪要文档。',
        2: '当前选中：触发加工流水线。音频转文本、实体关系抽取与摘要同步执行。',
        3: '当前选中：融合与质检。冲突合并并校验负责人完整性。',
        4: '当前选中：产出知识原料。生成决策片段并写入知识图谱队列。'
    };
    if (knowledgeScenarioSteps.length) {
        knowledgeScenarioSteps[0].classList.add('is-active');
    }
    knowledgeScenarioSteps.forEach(step => {
        step.addEventListener('click', () => {
            knowledgeScenarioSteps.forEach(item => item.classList.remove('is-active'));
            step.classList.add('is-active');
            const key = step.getAttribute('data-step');
            if (knowledgeScenarioDetail && scenarioDetails[key]) {
                knowledgeScenarioDetail.textContent = scenarioDetails[key];
            }
        });
    });

    const runKnowledgeScenario = document.getElementById('runKnowledgeScenario');
    if (runKnowledgeScenario) {
        runKnowledgeScenario.addEventListener('click', () => {
            let index = 0;
            const steps = Array.from(knowledgeScenarioSteps);
            const timer = setInterval(() => {
                if (index >= steps.length) {
                    clearInterval(timer);
                    showNotification('会议处理流程执行完成', 'success');
                    return;
                }
                steps[index].click();
                index += 1;
            }, 600);
        });
    }
}

// 刷新仪表盘数据
function refreshDashboardData() {
    showNotification('正在刷新仪表盘数据...', 'info');
    
    // 模拟数据刷新
    setTimeout(() => {
        // 更新所有指标卡片
        const metricValues = document.querySelectorAll('.metric-value');
        metricValues.forEach(element => {
            const currentValue = parseInt(element.textContent.replace(/[^\d]/g, ''));
            const change = Math.floor(Math.random() * 20) - 10; // -10 到 +10 的随机变化
            const newValue = Math.max(0, currentValue + change);
            
            // 格式化新值
            let formattedValue = newValue.toString();
            if (element.textContent.includes('K')) {
                formattedValue = (newValue / 1000).toFixed(1) + 'K';
            } else if (element.textContent.includes('M')) {
                formattedValue = (newValue / 1000000).toFixed(1) + 'M';
            } else if (element.textContent.includes('%')) {
                formattedValue = newValue + '%';
            } else if (newValue >= 1000) {
                formattedValue = newValue.toLocaleString();
            }
            
            // 动画更新
            element.style.transform = 'scale(1.1)';
            element.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                element.textContent = formattedValue;
                element.style.transform = 'scale(1)';
            }, 300);
        });
        
        showNotification('仪表盘数据已更新', 'success');
    }, 1000);
}

// 智能体工作台初始化
function initAgentWorkbench() {
    const agentSection = document.getElementById('agent');
    if (!agentSection) {
        return;
    }

    // 初始化智能体工作台标签页
    const agentTabs = agentSection.querySelectorAll('.agent-tab');
    const agentPanels = agentSection.querySelectorAll('.agent-panel');

    // 隐藏所有面板
    agentPanels.forEach(panel => {
        panel.classList.add('hidden');
    });

    // 显示第一个面板
    if (agentTabs.length > 0) {
        agentTabs[0].classList.add('active');
        agentTabs[0].classList.remove('bg-gray-100', 'text-gray-600');
        agentTabs[0].classList.add('bg-warning', 'text-white');
        const firstTabId = agentTabs[0].getAttribute('data-agent-tab');
        const firstPanel = agentSection.querySelector(`#${firstTabId}`);
        if (firstPanel) {
            firstPanel.classList.remove('hidden');
        }
    }

    // 添加标签切换事件
    agentTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有标签的active类
            agentTabs.forEach(t => {
                t.classList.remove('active');
                t.classList.remove('bg-warning', 'text-white');
                t.classList.add('bg-gray-100', 'text-gray-600');
            });
            // 隐藏所有面板
            agentPanels.forEach(panel => panel.classList.add('hidden'));
            // 添加当前标签的active类
            tab.classList.add('active');
            tab.classList.remove('bg-gray-100', 'text-gray-600');
            tab.classList.add('bg-warning', 'text-white');
            // 显示对应的面板
            const tabId = tab.getAttribute('data-agent-tab');
            const panel = agentSection.querySelector(`#${tabId}`);
            if (panel) {
                panel.classList.remove('hidden');
            }
            showNotification(`已切换到${tab.textContent.trim()}`, 'success');
        });
    });

    // 初始化蓝图工作台交互
    initBlueprintWorkbench(agentSection);
    
    // 初始化运行舱交互
    initRuntimePanel(agentSection);
    
    // 初始化技能市场交互
    initSkillMarketPanel(agentSection);
    
    // 初始化思维链审计交互
    initAuditChainPanel(agentSection);
}

// 蓝图工作台初始化
function initBlueprintWorkbench(agentSection) {
    const blueprintPanel = document.getElementById('agentBlueprintPanel');
    if (!blueprintPanel) {
        return;
    }

    // 蓝图列表项点击事件
    const blueprintItems = blueprintPanel.querySelectorAll('.bg-gray-50');
    blueprintItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // 移除所有选中状态
            blueprintItems.forEach(blueprint => {
                blueprint.classList.remove('border-2', 'border-warning');
                blueprint.classList.add('border', 'border-transparent');
            });
            // 添加当前选中状态
            item.classList.remove('border', 'border-transparent');
            item.classList.add('border-2', 'border-warning');
            
            const blueprintName = item.querySelector('.font-medium').textContent;
            showNotification(`已选择蓝图：${blueprintName}`, 'success');
            
            // 模拟加载蓝图详情
            simulateBlueprintLoading(blueprintPanel, index);
        });
    });

    // 节点配置项点击事件
    const nodeConfigItems = blueprintPanel.querySelectorAll('.grid > .bg-gray-50');
    nodeConfigItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有选中状态
            nodeConfigItems.forEach(node => {
                node.classList.remove('border-2', 'border-primary');
            });
            // 添加当前选中状态
            item.classList.add('border-2', 'border-primary');
            
            const nodeName = item.querySelector('.font-medium').textContent;
            showNotification(`已选择节点：${nodeName}`, 'info');
        });
    });

    // 上下文与记忆配置点击事件
    const contextItems = blueprintPanel.querySelectorAll('.border > .flex.items-center.justify-between');
    contextItems.forEach(item => {
        item.addEventListener('click', () => {
            const label = item.querySelector('span:first-child').textContent;
            const value = item.querySelector('span:last-child').textContent;
            showNotification(`正在编辑：${label}`, 'info');
            
            // 模拟编辑模态框
            setTimeout(() => {
                showNotification(`${label}已更新为：${value}（模拟）`, 'success');
            }, 1000);
        });
    });

    // 发布包准备度点击事件
    const readinessItems = blueprintPanel.querySelectorAll('.border > .space-y-2 > .flex');
    readinessItems.forEach(item => {
        item.addEventListener('click', () => {
            const label = item.querySelector('span:first-child').textContent;
            const status = item.querySelector('span:last-child').textContent;
            showNotification(`查看：${label} - ${status}`, 'info');
        });
    });

    // 提交审核按钮事件
    const submitReviewBtn = blueprintPanel.querySelector('.mt-4.w-full');
    if (submitReviewBtn) {
        submitReviewBtn.addEventListener('click', () => {
            showNotification('提交审核功能已触发，进入审核流程', 'success');
            
            // 模拟审核状态更新
            setTimeout(() => {
                const readinessItem = blueprintPanel.querySelector('.border > .space-y-2 > .flex:nth-child(2) > span:last-child');
                if (readinessItem) {
                    readinessItem.textContent = '审核中';
                    readinessItem.className = 'text-warning font-medium';
                }
            }, 1500);
        });
    }
}

// 模拟蓝图加载
function simulateBlueprintLoading(blueprintPanel, index) {
    // 模拟更新上下文与记忆配置
    const contextItems = blueprintPanel.querySelectorAll('.border > .space-y-3 > .flex');
    const contextConfigs = [
        ['8小时', '销售域', 'P1级脱敏'],
        ['12小时', '销售+供应链域', 'P2级脱敏'],
        ['24小时', '全域', 'P3级脱敏']
    ];
    
    const config = contextConfigs[index % contextConfigs.length];
    if (contextItems.length >= 3) {
        contextItems[0].querySelector('span:last-child').textContent = config[0];
        contextItems[1].querySelector('span:last-child').textContent = config[1];
        contextItems[2].querySelector('span:last-child').textContent = config[2];
    }
}

// 运行舱面板初始化
function initRuntimePanel(agentSection) {
    const runtimePanel = document.getElementById('agentRuntimePanel');
    if (!runtimePanel) {
        return;
    }

    // 运行舱实例点击事件
    const runtimeInstances = runtimePanel.querySelectorAll('.bg-gray-50');
    runtimeInstances.forEach((instance, index) => {
        instance.addEventListener('click', () => {
            // 移除所有选中状态
            runtimeInstances.forEach(inst => {
                inst.classList.remove('border-2', 'border-primary');
                inst.classList.add('border', 'border-transparent');
            });
            // 添加当前选中状态
            instance.classList.remove('border', 'border-transparent');
            instance.classList.add('border-2', 'border-primary');
            
            const instanceName = instance.querySelector('.font-medium').textContent;
            showNotification(`已选择运行舱实例：${instanceName}`, 'success');
        });
    });

    // 任务队列项点击事件
    const taskQueueItems = runtimePanel.querySelectorAll('.grid > .bg-gray-50');
    taskQueueItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有选中状态
            taskQueueItems.forEach(task => {
                task.classList.remove('border-2', 'border-secondary');
            });
            // 添加当前选中状态
            item.classList.add('border-2', 'border-secondary');
            
            const taskName = item.querySelector('.font-medium').textContent;
            showNotification(`已选择任务队列：${taskName}`, 'info');
        });
    });

    // 资源负载趋势图表
    const loadChartCanvas = document.getElementById('agentLoadChart');
    if (loadChartCanvas && typeof Chart !== 'undefined') {
        new Chart(loadChartCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                datasets: [{
                    label: 'CPU 负载',
                    data: [42, 38, 55, 72, 68, 50],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: '内存 负载',
                    data: [65, 62, 70, 85, 82, 75],
                    borderColor: '#eab308',
                    backgroundColor: 'rgba(234, 179, 8, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 10
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            font: {
                                size: 10
                            }
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 10
                            }
                        }
                    }
                }
            }
        });
    }

    // 配额与成本点击事件
    const quotaItems = runtimePanel.querySelectorAll('.space-y-3 > div');
    quotaItems.forEach(item => {
        item.addEventListener('click', () => {
            const label = item.querySelector('span:first-child').textContent;
            const percentage = item.querySelector('span:last-child').textContent;
            showNotification(`正在查看：${label} - ${percentage}`, 'info');
        });
    });

    // 成本分析报告按钮事件
    const costReportBtn = runtimePanel.querySelector('.mt-4.w-full');
    if (costReportBtn) {
        costReportBtn.addEventListener('click', () => {
            showNotification('正在生成成本分析报告...', 'info');
            
            // 模拟报告生成
            setTimeout(() => {
                showNotification('成本分析报告已生成', 'success');
            }, 1500);
        });
    }

    // 弹性伸缩策略按钮事件
    const scalingBtn = runtimePanel.querySelector('.text-xs.text-warning');
    if (scalingBtn) {
        scalingBtn.addEventListener('click', () => {
            showNotification('弹性伸缩策略配置已打开', 'success');
        });
    }

    // 查看队列详情按钮事件
    const queueDetailBtn = runtimePanel.querySelectorAll('.text-xs.text-warning')[1];
    if (queueDetailBtn) {
        queueDetailBtn.addEventListener('click', () => {
            showNotification('任务队列详情已打开', 'success');
        });
    }
}

// 技能市场面板初始化
function initSkillMarketPanel(agentSection) {
    const skillPanel = document.getElementById('agentSkillPanel');
    if (!skillPanel) {
        return;
    }

    // 官方技能库点击事件
    const officialSkills = skillPanel.querySelectorAll('.grid > .bg-gray-50');
    officialSkills.forEach((skill, index) => {
        skill.addEventListener('click', () => {
            // 移除所有选中状态
            officialSkills.forEach(sk => {
                sk.classList.remove('border-2', 'border-warning');
            });
            // 添加当前选中状态
            skill.classList.add('border-2', 'border-warning');
            
            const skillName = skill.querySelector('.font-medium').textContent;
            showNotification(`已选择官方技能：${skillName}`, 'success');
        });
    });

    // 自定义技能开发点击事件
    const customSkills = skillPanel.querySelectorAll('.space-y-3 > .bg-gray-50');
    customSkills.forEach((skill, index) => {
        skill.addEventListener('click', () => {
            // 移除所有选中状态
            customSkills.forEach(sk => {
                sk.classList.remove('border-2', 'border-primary');
            });
            // 添加当前选中状态
            skill.classList.add('border-2', 'border-primary');
            
            const skillName = skill.querySelector('.font-medium').textContent;
            showNotification(`已选择自定义技能：${skillName}`, 'success');
        });
    });

    // 技能装配情况点击事件
    const assemblyItems = skillPanel.querySelectorAll('.flex.items-center.justify-between');
    assemblyItems.forEach(item => {
        item.addEventListener('click', () => {
            const label = item.querySelector('span:first-child').textContent;
            const value = item.querySelector('span:last-child').textContent;
            showNotification(`正在查看：${label} - ${value}`, 'info');
        });
    });

    // 技能授权清单点击事件
    const authorizationItems = skillPanel.querySelectorAll('.space-y-2 > .flex');
    authorizationItems.forEach(item => {
        item.addEventListener('click', () => {
            const label = item.querySelector('span:first-child').textContent;
            const status = item.querySelector('span:last-child').textContent;
            showNotification(`查看技能授权：${label} - ${status}`, 'info');
        });
    });

    // 批量更新按钮事件
    const batchUpdateBtn = skillPanel.querySelector('.mt-4.w-full.bg-warning');
    if (batchUpdateBtn) {
        batchUpdateBtn.addEventListener('click', () => {
            showNotification('正在执行技能批量更新...', 'info');
            
            // 模拟批量更新
            setTimeout(() => {
                showNotification('技能批量更新完成', 'success');
                
                // 更新待更新技能数量
                const pendingUpdates = skillPanel.querySelector('.space-y-3 > .flex:nth-child(3) > span:last-child');
                if (pendingUpdates) {
                    pendingUpdates.textContent = '0';
                }
            }, 2000);
        });
    }

    // 授权管理按钮事件
    const authManageBtn = skillPanel.querySelectorAll('.mt-4.w-full.bg-gray-100')[0];
    if (authManageBtn) {
        authManageBtn.addEventListener('click', () => {
            showNotification('技能授权管理功能已打开', 'success');
        });
    }

    // 进入技能市场按钮事件
    const enterMarketBtn = skillPanel.querySelector('.text-xs.text-warning');
    if (enterMarketBtn) {
        enterMarketBtn.addEventListener('click', () => {
            showNotification('正在进入技能市场...', 'info');
        });
    }

    // 获取 SDK 按钮事件
    const getSdkBtn = skillPanel.querySelectorAll('.text-xs.text-warning')[1];
    if (getSdkBtn) {
        getSdkBtn.addEventListener('click', () => {
            showNotification('SDK 下载链接已生成', 'success');
        });
    }
}

// 思维链审计面板初始化
function initAuditChainPanel(agentSection) {
    const auditPanel = document.getElementById('agentAuditPanel');
    if (!auditPanel) {
        return;
    }

    // 思维链追踪器点击事件
    const auditChains = auditPanel.querySelectorAll('.bg-gray-50');
    auditChains.forEach((chain, index) => {
        chain.addEventListener('click', () => {
            // 移除所有选中状态
            auditChains.forEach(ch => {
                ch.classList.remove('border-2', 'border-primary');
                ch.classList.add('border', 'border-transparent');
            });
            // 添加当前选中状态
            chain.classList.remove('border', 'border-transparent');
            chain.classList.add('border-2', 'border-primary');
            
            const chainName = chain.querySelector('.font-medium').textContent;
            showNotification(`已选择思维链：${chainName}`, 'success');
        });
    });

    // 合规审计快照点击事件
    const complianceItems = auditPanel.querySelectorAll('.grid > .bg-gray-50');
    complianceItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有选中状态
            complianceItems.forEach(compliance => {
                compliance.classList.remove('border-2', 'border-secondary');
            });
            // 添加当前选中状态
            item.classList.add('border-2', 'border-secondary');
            
            const itemName = item.querySelector('.font-medium').textContent;
            showNotification(`已选择合规审计项：${itemName}`, 'info');
        });
    });

    // 发布包与权限点击事件
    const packageItems = auditPanel.querySelectorAll('.space-y-2 > .flex');
    packageItems.forEach(item => {
        item.addEventListener('click', () => {
            const label = item.querySelector('span:first-child').textContent;
            const value = item.querySelector('span:last-child').textContent;
            showNotification(`正在查看：${label} - ${value}`, 'info');
        });
    });

    // 授权智能体清单点击事件
    const agentItems = auditPanel.querySelectorAll('.space-y-2 > .flex');
    agentItems.forEach(item => {
        item.addEventListener('click', () => {
            const label = item.querySelector('span:first-child').textContent;
            const status = item.querySelector('span:last-child').textContent;
            showNotification(`查看智能体授权：${label} - ${status}`, 'info');
        });
    });

    // 提交治理中心按钮事件
    const submitGovernanceBtn = auditPanel.querySelector('.mt-4.w-full.bg-warning');
    if (submitGovernanceBtn) {
        submitGovernanceBtn.addEventListener('click', () => {
            showNotification('正在提交至治理中心...', 'info');
            
            // 模拟提交治理
            setTimeout(() => {
                showNotification('已提交至治理中心', 'success');
                
                // 更新审核状态
                const auditStatus = auditPanel.querySelector('.space-y-2 > .flex:nth-child(4) > span:last-child');
                if (auditStatus) {
                    auditStatus.textContent = '已提交';
                    auditStatus.className = 'text-primary font-medium';
                }
            }, 1500);
        });
    }

    // 授权策略按钮事件
    const authPolicyBtn = auditPanel.querySelectorAll('.mt-4.w-full.bg-gray-100')[0];
    if (authPolicyBtn) {
        authPolicyBtn.addEventListener('click', () => {
            showNotification('授权策略管理功能已打开', 'success');
        });
    }

    // 导出记录按钮事件
    const exportBtn = auditPanel.querySelector('.text-xs.text-warning');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            showNotification('正在导出思维链记录...', 'info');
            
            // 模拟导出
            setTimeout(() => {
                showNotification('思维链记录导出完成', 'success');
            }, 1500);
        });
    }

    // 查看详情按钮事件
    const detailBtn = auditPanel.querySelectorAll('.text-xs.text-warning')[1];
    if (detailBtn) {
        detailBtn.addEventListener('click', () => {
            showNotification('合规审计详情已打开', 'success');
        });
    }
}


// 智能体工厂初始化函数
function initAgentFactory() {
    const agentSection = document.getElementById('agent');
    if (!agentSection) {
        return;
    }

    // 搜索框事件
    const searchInput = agentSection.querySelector('input[placeholder="搜索智能体..."]');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.trim();
            if (searchTerm.length > 0) {
                showNotification(`正在搜索智能体: ${searchTerm}`, 'info');
            }
        });

        // 搜索框回车事件
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = e.target.value.trim();
                if (searchTerm.length > 0) {
                    showNotification(`搜索完成: "${searchTerm}"`, 'success');
                }
            }
        });
    }

    // 智能体列表页面相关元素
    const agentList = document.getElementById('agent-list');
    const newAgentBtn = document.getElementById('new-agent-btn');
    
    // 右侧面板相关元素
    const createAgentPanel = document.getElementById('create-agent-panel');
    const backToListBtn = document.getElementById('back-to-list-btn');
    const panelCloseBtn = document.getElementById('panel-close-btn');

    // 打开右侧面板事件
    if (newAgentBtn && createAgentPanel) {
        newAgentBtn.addEventListener('click', () => {
            createAgentPanel.classList.add('open');
        });
    }
    
    // 返回列表按钮事件
    if (backToListBtn && createAgentPanel) {
        backToListBtn.addEventListener('click', () => {
            createAgentPanel.classList.remove('open');
        });
    }
    
    // 关闭面板按钮事件
    if (panelCloseBtn && createAgentPanel) {
        panelCloseBtn.addEventListener('click', () => {
            createAgentPanel.classList.remove('open');
        });
    }
    
    // 取消创建按钮事件
    const cancelCreateBtn = document.getElementById('cancel-create-btn');
    if (cancelCreateBtn && createAgentPanel) {
        cancelCreateBtn.addEventListener('click', () => {
            createAgentPanel.classList.remove('open');
        });
    }
    
    // 标签页切换功能
    const configTabs = agentSection.querySelectorAll('.config-tab');
    const configContents = agentSection.querySelectorAll('.config-content');
    
    configTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // 移除所有激活状态
            configTabs.forEach(t => t.classList.remove('active-config-tab'));
            configContents.forEach(c => c.classList.add('hidden'));
            
            // 添加当前激活状态
            tab.classList.add('active-config-tab');
            document.getElementById(`${targetTab}-tab`).classList.remove('hidden');
        });
    });
    
    // 实时预览更新功能
    const updatePreview = () => {
        // 获取预览元素
        const previewName = document.getElementById('preview-agent-name');
        const previewType = document.getElementById('preview-agent-type');
        const previewModel = document.getElementById('preview-agent-model');
        const previewSkills = document.getElementById('preview-agent-skills');
        const previewMemory = document.getElementById('preview-agent-memory');
        
        // 获取表单元素值
        const agentName = document.getElementById('agent-name').value;
        const agentType = document.getElementById('agent-type').value;
        const agentModel = document.getElementById('agent-model').value;
        
        // 获取记忆配置
        const memoryType = document.getElementById('memory-type').value;
        let memoryInfo = '';
        
        if (memoryType === 'context') {
            const contextWindowSize = document.getElementById('context-window-size').value;
            memoryInfo = `上下文记忆 (${contextWindowSize})`;
        } else if (memoryType === 'short-term') {
            const shortTermDuration = document.getElementById('short-term-duration').value;
            memoryInfo = `短期记忆 (${shortTermDuration})`;
        } else if (memoryType === 'long-term') {
            const isEnabled = document.getElementById('enable-long-term-memory').checked;
            if (isEnabled) {
                const longTermStorage = document.getElementById('long-term-storage').value;
                memoryInfo = `长期记忆 (${longTermStorage})`;
            } else {
                memoryInfo = '长期记忆 (未启用)';
            }
        } else if (memoryType === 'hybrid') {
            memoryInfo = '混合记忆';
        }
        
        // 更新预览
        if (previewName) {
            previewName.textContent = agentName || '新智能体';
        }
        
        if (previewType) {
            previewType.textContent = agentType ? `类型: ${agentType}` : '未选择类型';
        }
        
        if (previewModel) {
            previewModel.textContent = agentModel;
        }
        
        if (previewMemory) {
            previewMemory.textContent = memoryInfo;
        }
        
        // 更新技能预览
        if (previewSkills) {
            const selectedSkills = document.querySelectorAll('#selected-skills-list .text-sm.font-medium.text-gray-900');
            if (selectedSkills.length > 0) {
                const skillNames = Array.from(selectedSkills).map(skill => skill.textContent);
                previewSkills.textContent = skillNames.join('、');
            } else {
                previewSkills.textContent = '无';
            }
        }
    };
    
    // 为表单元素添加事件监听器
    const agentNameInput = document.getElementById('agent-name');
    const agentTypeSelect = document.getElementById('agent-type');
    const agentModelSelect = document.getElementById('agent-model');
    
    // 记忆配置元素
    const memoryTypeSelect = document.getElementById('memory-type');
    const contextWindowSizeSelect = document.getElementById('context-window-size');
    const shortTermDurationSelect = document.getElementById('short-term-duration');
    const enableLongTermMemoryCheckbox = document.getElementById('enable-long-term-memory');
    const longTermStorageSelect = document.getElementById('long-term-storage');
    
    if (agentNameInput) {
        agentNameInput.addEventListener('input', updatePreview);
    }
    
    if (agentTypeSelect) {
        agentTypeSelect.addEventListener('change', updatePreview);
    }
    
    if (agentModelSelect) {
        agentModelSelect.addEventListener('change', updatePreview);
    }
    
    // 记忆配置事件监听器
    if (memoryTypeSelect) {
        memoryTypeSelect.addEventListener('change', updatePreview);
    }
    
    if (contextWindowSizeSelect) {
        contextWindowSizeSelect.addEventListener('change', updatePreview);
    }
    
    if (shortTermDurationSelect) {
        shortTermDurationSelect.addEventListener('change', updatePreview);
    }
    
    if (enableLongTermMemoryCheckbox) {
        enableLongTermMemoryCheckbox.addEventListener('change', updatePreview);
    }
    
    if (longTermStorageSelect) {
        longTermStorageSelect.addEventListener('change', updatePreview);
    }
    
    // 技能变化监听器
    const selectedSkillsList = document.getElementById('selected-skills-list');
    if (selectedSkillsList) {
        // 使用MutationObserver监听技能列表变化
        const observer = new MutationObserver(updatePreview);
        observer.observe(selectedSkillsList, { childList: true, subtree: true });
    }
    
    // 创建智能体表单提交事件
    const createAgentForm = document.getElementById('create-agent-form');
    if (createAgentForm) {
        createAgentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(createAgentForm);
            const agentName = formData.get('agentName').trim();
            const agentType = formData.get('agentType');
            const agentDescription = formData.get('agentDescription').trim() || `${agentType}智能体`;
            const agentModel = formData.get('agentModel');
            const memoryDuration = formData.get('memoryDuration');
            const temperature = formData.get('temperature');
            const maxTokens = formData.get('maxTokens');
            const openingPrompt = formData.get('openingPrompt');
            
            // 获取工作流配置
            const workflowData = JSON.stringify(workflowManager.getWorkflowData());
            
            // 创建新智能体卡片
            const newAgentCard = createNewAgentCard(agentName, agentType, agentDescription, agentModel, memoryDuration, workflowData);
            
            // 添加到智能体列表
            const agentGrid = agentSection.querySelector('.grid.grid-cols-1.md\:grid-cols-2.lg\:grid-cols-3.gap-4');
            if (agentGrid) {
                agentGrid.appendChild(newAgentCard);
            }
            
            // 更新活跃智能体数量
            const activeAgentCount = agentSection.querySelector('.metric-value');
            if (activeAgentCount) {
                activeAgentCount.textContent = parseInt(activeAgentCount.textContent) + 1;
            }
            
            // 关闭模态框
            if (modal) {
                modal.classList.add('hidden');
            }
            
            // 重置表单
            createAgentForm.reset();
            
            // 显示成功通知
            showNotification(`智能体「${agentName}」已创建成功！`, 'success');
        });
    }
    
    // 初始化技能系统
    initSkillSystem();
    
    // 初始化记忆系统
    initMemorySystem();
    
    // 技能系统初始化函数
    function initSkillSystem() {
        const skillsTab = document.getElementById('skills-tab');
        if (!skillsTab) return;
        
        // 技能列表元素
        const selectedSkillsList = document.getElementById('selected-skills-list');
        const skillItems = document.querySelectorAll('.skill-item');
        const addSkillButtons = document.querySelectorAll('.add-skill-btn');
        const deleteSkillButtons = document.querySelectorAll('.delete-skill-btn');
        
        // 自定义技能模态框元素
        const createCustomSkillBtn = document.getElementById('create-custom-skill-btn');
        const customSkillModal = document.getElementById('create-custom-skill-modal');
        const closeCustomSkillModalBtn = document.getElementById('close-custom-skill-modal-btn');
        const cancelCreateCustomSkillBtn = document.getElementById('cancel-create-custom-skill-btn');
        const createCustomSkillForm = document.getElementById('create-custom-skill-form');
        const customSkillType = document.getElementById('custom-skill-type');
        const apiConfig = document.getElementById('api-config');
        const functionConfig = document.getElementById('function-config');
        
        // 技能图标映射
        const skillIcons = {
            '文档分析': 'fa-file-text-o text-blue-500',
            '数据分析': 'fa-chart-bar text-green-500',
            '知识检索': 'fa-search text-purple-500',
            '内容生成': 'fa-paint-brush text-pink-500',
            '表格处理': 'fa-file-excel-o text-green-500'
        };
        
        // 技能描述映射
        const skillDescriptions = {
            '文档分析': '解析和分析各种格式文档',
            '数据分析': '处理和可视化数据',
            '知识检索': '从知识库中检索相关信息',
            '内容生成': '生成各种类型的文本内容',
            '表格处理': '处理和分析表格数据'
        };
        
        // 添加技能事件
        addSkillButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const skillItem = btn.closest('.skill-item');
                const skillName = skillItem.querySelector('.text-sm.font-medium').textContent;
                addSkill(skillName);
            });
        });
        
        // 删除技能事件
        deleteSkillButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const skillElement = btn.closest('.p-3.bg-gray-50.rounded-md.border.border-gray-200');
                skillElement.remove();
            });
        });
        
        // 添加技能到已选列表
        function addSkill(skillName) {
            // 检查是否已添加
            const existingSkills = Array.from(selectedSkillsList.querySelectorAll('.text-sm.font-medium.text-gray-900'));
            if (existingSkills.some(skill => skill.textContent === skillName)) {
                showNotification('该技能已添加', 'info');
                return;
            }
            
            const skillIcon = skillIcons[skillName] || 'fa-cogs text-gray-500';
            const skillDescription = skillDescriptions[skillName] || '自定义技能';
            
            const skillElement = document.createElement('div');
            skillElement.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200';
            skillElement.innerHTML = `
                <div class="flex items-center gap-2">
                    <i class="fa ${skillIcon}"></i>
                    <div>
                        <div class="text-sm font-medium text-gray-900">${skillName}</div>
                        <div class="text-xs text-gray-500">${skillDescription}</div>
                    </div>
                </div>
                <button type="button" class="text-red-500 hover:text-red-700 transition-colors delete-skill-btn">
                    <i class="fa fa-times"></i>
                </button>
            `;
            
            // 添加删除事件
            const deleteBtn = skillElement.querySelector('.delete-skill-btn');
            deleteBtn.addEventListener('click', () => {
                skillElement.remove();
            });
            
            selectedSkillsList.appendChild(skillElement);
            showNotification(`已添加技能: ${skillName}`, 'success');
        }
        
        // 打开自定义技能模态框
        if (createCustomSkillBtn && customSkillModal) {
            createCustomSkillBtn.addEventListener('click', () => {
                customSkillModal.classList.remove('hidden');
            });
        }
        
        // 关闭自定义技能模态框
        if (closeCustomSkillModalBtn && customSkillModal) {
            closeCustomSkillModalBtn.addEventListener('click', () => {
                customSkillModal.classList.add('hidden');
            });
        }
        
        if (cancelCreateCustomSkillBtn && customSkillModal) {
            cancelCreateCustomSkillBtn.addEventListener('click', () => {
                customSkillModal.classList.add('hidden');
            });
        }
        
        // 点击背景关闭模态框
        if (customSkillModal) {
            customSkillModal.addEventListener('click', (e) => {
                if (e.target === customSkillModal) {
                    customSkillModal.classList.add('hidden');
                }
            });
        }
        
        // 技能类型切换
        if (customSkillType) {
            customSkillType.addEventListener('change', () => {
                const type = customSkillType.value;
                if (type === 'api') {
                    apiConfig.classList.remove('hidden');
                    functionConfig.classList.add('hidden');
                } else if (type === 'function') {
                    apiConfig.classList.add('hidden');
                    functionConfig.classList.remove('hidden');
                } else {
                    apiConfig.classList.add('hidden');
                    functionConfig.classList.add('hidden');
                }
            });
        }
        
        // 创建自定义技能表单提交
        if (createCustomSkillForm) {
            createCustomSkillForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(createCustomSkillForm);
                const skillName = formData.get('skillName').trim();
                const skillDescription = formData.get('skillDescription').trim() || `${skillName}`;
                const skillType = formData.get('skillType');
                
                // 根据技能类型收集配置
                const skillConfig = {};
                if (skillType === 'api') {
                    skillConfig.url = formData.get('apiUrl');
                    skillConfig.method = formData.get('apiMethod');
                    skillConfig.headers = formData.get('apiHeaders');
                    skillConfig.body = formData.get('apiBody');
                } else if (skillType === 'function') {
                    skillConfig.code = formData.get('functionCode');
                }
                
                // 创建自定义技能
                addCustomSkill(skillName, skillDescription, skillType, skillConfig);
                
                // 关闭模态框
                if (customSkillModal) {
                    customSkillModal.classList.add('hidden');
                }
                
                // 重置表单
                createCustomSkillForm.reset();
                
                // 显示成功通知
                showNotification(`自定义技能「${skillName}」已创建！`, 'success');
            });
        }
        
        // 添加自定义技能到已选列表
        function addCustomSkill(skillName, skillDescription, skillType, config) {
            const skillElement = document.createElement('div');
            skillElement.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200';
            
            // 根据技能类型选择图标
            let iconClass = 'fa-cogs text-gray-500';
            if (skillType === 'api') {
                iconClass = 'fa-plug text-purple-500';
            } else if (skillType === 'function') {
                iconClass = 'fa-code text-green-500';
            } else if (skillType === 'workflow') {
                iconClass = 'fa-sitemap text-blue-500';
            }
            
            skillElement.innerHTML = `
                <div class="flex items-center gap-2">
                    <i class="fa ${iconClass}"></i>
                    <div>
                        <div class="text-sm font-medium text-gray-900">${skillName}</div>
                        <div class="text-xs text-gray-500">${skillDescription}</div>
                        <div class="text-xs text-yellow-600 mt-1">自定义</div>
                    </div>
                </div>
                <button type="button" class="text-red-500 hover:text-red-700 transition-colors delete-skill-btn">
                    <i class="fa fa-times"></i>
                </button>
            `;
            
            // 添加删除事件
            const deleteBtn = skillElement.querySelector('.delete-skill-btn');
            deleteBtn.addEventListener('click', () => {
                skillElement.remove();
            });
            
            selectedSkillsList.appendChild(skillElement);
        }
    }
    
    // 记忆系统初始化函数
    function initMemorySystem() {
        const memoryTab = document.getElementById('memory-tab');
        if (!memoryTab) return;
        
        // 记忆类型切换
        const memoryType = document.getElementById('memory-type');
        const contextMemoryConfig = document.getElementById('context-memory-config');
        const shortTermMemoryConfig = document.getElementById('short-term-memory-config');
        const longTermMemoryConfig = document.getElementById('long-term-memory-config');
        
        if (memoryType) {
            memoryType.addEventListener('change', () => {
                const type = memoryType.value;
                
                // 隐藏所有配置面板
                contextMemoryConfig.classList.add('hidden');
                shortTermMemoryConfig.classList.add('hidden');
                longTermMemoryConfig.classList.add('hidden');
                
                // 根据记忆类型显示相应的配置面板
                if (type === 'context') {
                    contextMemoryConfig.classList.remove('hidden');
                } else if (type === 'short-term') {
                    shortTermMemoryConfig.classList.remove('hidden');
                } else if (type === 'long-term') {
                    longTermMemoryConfig.classList.remove('hidden');
                } else if (type === 'hybrid') {
                    // 混合记忆显示所有配置
                    contextMemoryConfig.classList.remove('hidden');
                    shortTermMemoryConfig.classList.remove('hidden');
                    longTermMemoryConfig.classList.remove('hidden');
                }
            });
        }
        
        // 长期记忆启用/禁用
        const enableLongTermMemory = document.getElementById('enable-long-term-memory');
        const longTermStorage = document.getElementById('long-term-storage');
        const longTermRetrieval = document.getElementById('long-term-retrieval');
        
        if (enableLongTermMemory) {
            enableLongTermMemory.addEventListener('change', () => {
                const isEnabled = enableLongTermMemory.checked;
                if (longTermStorage) {
                    longTermStorage.disabled = !isEnabled;
                }
                if (longTermRetrieval) {
                    longTermRetrieval.disabled = !isEnabled;
                }
            });
        }
        
        // 初始化状态
        if (enableLongTermMemory && (longTermStorage || longTermRetrieval)) {
            const isEnabled = enableLongTermMemory.checked;
            if (longTermStorage) {
                longTermStorage.disabled = !isEnabled;
            }
            if (longTermRetrieval) {
                longTermRetrieval.disabled = !isEnabled;
            }
        }
    }
    
    // 初始化工作流管理器
    const workflowManager = initWorkflowManager();
    
    // 初始化记忆系统
    initMemorySystem();
    
    // 初始化权限系统
    initPermissionSystem();
    
    // 初始化版本控制系统
    initVersionControl();
    
    // 初始化监控与分析系统
    initMonitoring();
    
    // 权限系统初始化函数
    function initPermissionSystem() {
        const permissionTab = document.getElementById('permission-tab');
        if (!permissionTab) return;
        
        // 权限模式切换
        const permissionMode = document.getElementById('permission-mode');
        const rolePermissions = document.getElementById('role-permissions');
        const userPermissions = document.getElementById('user-permissions');
        
        if (permissionMode) {
            permissionMode.addEventListener('change', () => {
                const mode = permissionMode.value;
                
                // 隐藏所有权限配置
                rolePermissions.classList.add('hidden');
                userPermissions.classList.add('hidden');
                
                // 根据权限模式显示相应的配置
                if (mode === 'role-based') {
                    rolePermissions.classList.remove('hidden');
                } else if (mode === 'user-based') {
                    userPermissions.classList.remove('hidden');
                }
            });
        }
        
        // 用户搜索功能
        const userSearch = document.getElementById('user-search');
        const searchBtn = userPermissions?.querySelector('.fa-search')?.closest('button');
        
        if (userSearch) {
            // 输入框回车搜索
            userSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    searchUsers();
                }
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', searchUsers);
        }
        
        // 用户搜索辅助函数
        function searchUsers() {
            if (!userSearch) return;
            const query = userSearch.value.trim();
            if (query) {
                showNotification(`正在搜索用户: ${query}`, 'info');
                // 模拟搜索结果
                setTimeout(() => {
                    showNotification(`找到用户: ${query}`, 'success');
                }, 500);
            }
        }
        
        // 移除用户功能
        if (userPermissions) {
            const removeUserIcons = userPermissions.querySelectorAll('.fa-times');
            removeUserIcons.forEach(icon => {
                const btn = icon.closest('button');
                if (btn) {
                    btn.addEventListener('click', () => {
                        const userItem = btn.closest('div');
                        if (userItem) {
                            userItem.remove();
                            showNotification('已移除用户', 'success');
                        }
                    });
                }
            });
        }
        
        // 操作权限联动
        const actionRead = document.getElementById('action-read');
        const actionUpdate = document.getElementById('action-update');
        
        if (actionRead) {
            actionRead.addEventListener('change', () => {
                if (!actionRead.checked) {
                    // 如果读取权限被取消，更新权限也自动取消
                    if (actionUpdate && actionUpdate.checked) {
                        actionUpdate.checked = false;
                        showNotification('更新权限依赖读取权限，已自动取消', 'warning');
                    }
                }
            });
        }
        
        // 初始化权限模式
        permissionMode.dispatchEvent(new Event('change'));
    }
    
    // 版本控制系统初始化函数
    function initVersionControl() {
        const versionTab = document.getElementById('version-tab');
        if (!versionTab) return;
        
        // 发布按钮事件
        const publishBtn = document.getElementById('publish-btn');
        if (publishBtn) {
            publishBtn.addEventListener('click', () => {
                publishNewVersion();
            });
        }
        
        // 版本历史操作按钮事件
        const versionHistory = document.getElementById('version-history');
        if (versionHistory) {
            // 查看版本
            const viewVersionBtns = versionHistory.querySelectorAll('.text-blue-600');
            viewVersionBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const versionRow = btn.closest('tr');
                    const versionName = versionRow?.querySelector('td:first-child').textContent;
                    if (versionName) {
                        showNotification(`正在查看版本: ${versionName}`, 'info');
                    }
                });
            });
            
            // 部署版本
            const deployVersionBtns = versionHistory.querySelectorAll('.text-green-600');
            deployVersionBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const versionRow = btn.closest('tr');
                    const versionName = versionRow?.querySelector('td:first-child').textContent;
                    if (versionName) {
                        showNotification(`正在部署版本: ${versionName}`, 'info');
                        // 模拟部署过程
                        setTimeout(() => {
                            showNotification(`版本 ${versionName} 部署成功`, 'success');
                        }, 1000);
                    }
                });
            });
            
            // 删除版本
            const deleteVersionBtns = versionHistory.querySelectorAll('.text-red-600');
            deleteVersionBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const versionRow = btn.closest('tr');
                    const versionName = versionRow?.querySelector('td:first-child').textContent;
                    if (versionName) {
                        // 确认删除
                        if (confirm(`确定要删除版本 ${versionName} 吗？`)) {
                            versionRow.remove();
                            showNotification(`版本 ${versionName} 已删除`, 'success');
                        }
                    }
                });
            });
        }
        
        // 发布新版本辅助函数
        function publishNewVersion() {
            const versionName = document.getElementById('version-name')?.value.trim();
            const versionDescription = document.getElementById('version-description')?.value.trim();
            const versionType = document.getElementById('version-type')?.value;
            const publishEnvironment = document.getElementById('publish-environment')?.value;
            const publishMessage = document.getElementById('publish-message')?.value.trim();
            const isMajorPublish = document.getElementById('is-major-publish')?.checked;
            const notifyUsers = document.getElementById('notify-users')?.checked;
            
            if (!versionName) {
                showNotification('请输入版本名称', 'error');
                return;
            }
            
            showNotification('正在发布新版本...', 'info');
            
            // 模拟发布过程
            setTimeout(() => {
                // 更新版本历史
                addVersionToHistory(versionName, versionType, new Date().toLocaleString(), '已发布');
                
                // 显示成功通知
                showNotification(`版本 ${versionName} 已成功发布到 ${publishEnvironment} 环境`, 'success');
                
                // 如果需要通知用户
                if (notifyUsers) {
                    showNotification('已通知相关用户', 'info');
                }
            }, 1500);
        }
        
        // 添加版本到历史记录辅助函数
        function addVersionToHistory(name, type, time, status) {
            const versionHistory = document.getElementById('version-history');
            if (!versionHistory) return;
            
            // 获取状态标签颜色
            let statusColor = 'bg-gray-100 text-gray-800';
            if (status === '测试中') {
                statusColor = 'bg-blue-100 text-blue-800';
            } else if (status === '已发布') {
                statusColor = 'bg-green-100 text-green-800';
            } else if (status === '已归档') {
                statusColor = 'bg-gray-100 text-gray-800';
            }
            
            // 创建新的版本行
            const newRow = document.createElement('tr');
            newRow.className = 'hover:bg-gray-50';
            
            newRow.innerHTML = `
                <td class="px-3 py-2 text-sm font-medium text-gray-900">${name}</td>
                <td class="px-3 py-2 text-sm text-gray-600">${type.charAt(0).toUpperCase() + type.slice(1)}</td>
                <td class="px-3 py-2 text-sm text-gray-600">${time}</td>
                <td class="px-3 py-2">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}">
                        ${status}
                    </span>
                </td>
                <td class="px-3 py-2 space-x-2">
                    <button type="button" class="text-xs font-medium text-blue-600 hover:text-blue-800">查看</button>
                    <button type="button" class="text-xs font-medium text-green-600 hover:text-green-800">部署</button>
                    <button type="button" class="text-xs font-medium text-red-600 hover:text-red-800">删除</button>
                </td>
            `;
            
            // 插入到版本历史表格顶部
            versionHistory.insertBefore(newRow, versionHistory.firstChild);
            
            // 添加事件监听器
            const viewBtn = newRow.querySelector('.text-blue-600');
            const deployBtn = newRow.querySelector('.text-green-600');
            const deleteBtn = newRow.querySelector('.text-red-600');
            
            if (viewBtn) {
                viewBtn.addEventListener('click', () => {
                    showNotification(`正在查看版本: ${name}`, 'info');
                });
            }
            
            if (deployBtn) {
                deployBtn.addEventListener('click', () => {
                    showNotification(`正在部署版本: ${name}`, 'info');
                    setTimeout(() => {
                        showNotification(`版本 ${name} 部署成功`, 'success');
                    }, 1000);
                });
            }
            
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => {
                    if (confirm(`确定要删除版本 ${name} 吗？`)) {
                        newRow.remove();
                        showNotification(`版本 ${name} 已删除`, 'success');
                    }
                });
            }
        }
    }
    
    // 监控与分析系统初始化函数
    function initMonitoring() {
        const monitoringTab = document.getElementById('monitoring-tab');
        if (!monitoringTab) return;
        
        // 监控启用/禁用切换
        const monitoringEnabled = document.getElementById('monitoring-enabled');
        const monitoringDisabled = document.getElementById('monitoring-disabled');
        const monitoringSettings = document.querySelectorAll('#monitoring-tab .config-content > div > div:not(:first-child)');
        
        if (monitoringEnabled && monitoringDisabled) {
            // 启用监控
            monitoringEnabled.addEventListener('change', () => {
                if (monitoringEnabled.checked) {
                    // 启用所有监控设置
                    monitoringSettings.forEach(setting => {
                        setting.classList.remove('opacity-50', 'pointer-events-none');
                    });
                    showNotification('监控已启用', 'success');
                }
            });
            
            // 禁用监控
            monitoringDisabled.addEventListener('change', () => {
                if (monitoringDisabled.checked) {
                    // 禁用所有监控设置
                    monitoringSettings.forEach(setting => {
                        setting.classList.add('opacity-50', 'pointer-events-none');
                    });
                    showNotification('监控已禁用', 'info');
                }
            });
        }
        
        // 统计周期切换
        const periodButtons = monitoringTab.querySelectorAll('.bg-primary, .bg-gray-100');
        if (periodButtons) {
            periodButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    // 移除所有按钮的激活状态
                    periodButtons.forEach(b => {
                        b.classList.remove('bg-primary', 'text-white');
                        b.classList.add('bg-gray-100', 'text-gray-700');
                    });
                    
                    // 添加当前按钮的激活状态
                    btn.classList.remove('bg-gray-100', 'text-gray-700');
                    btn.classList.add('bg-primary', 'text-white');
                    
                    const period = btn.textContent;
                    showNotification(`已切换统计周期为：${period}`, 'success');
                    
                    // 模拟数据更新
                    simulateDataUpdate(period);
                });
            });
        }
        
        // 告警配置保存
        const saveAlertConfigBtn = document.getElementById('save-alert-config');
        if (saveAlertConfigBtn) {
            saveAlertConfigBtn.addEventListener('click', () => {
                // 获取告警配置
                const alertResponseTime = document.getElementById('alert-response-time')?.checked;
                const responseTimeThreshold = document.getElementById('response-time-threshold')?.value;
                const alertErrorRate = document.getElementById('alert-error-rate')?.checked;
                const errorRateThreshold = document.getElementById('error-rate-threshold')?.value;
                const alertConcurrency = document.getElementById('alert-concurrency')?.checked;
                const concurrencyThreshold = document.getElementById('concurrency-threshold')?.value;
                
                showNotification('正在保存告警配置...', 'info');
                
                // 模拟保存过程
                setTimeout(() => {
                    showNotification('告警配置已保存', 'success');
                    
                    // 显示配置摘要
                    console.log('告警配置：', {
                        responseTime: { enabled: alertResponseTime, threshold: responseTimeThreshold },
                        errorRate: { enabled: alertErrorRate, threshold: errorRateThreshold },
                        concurrency: { enabled: alertConcurrency, threshold: concurrencyThreshold }
                    });
                }, 800);
            });
        }
        
        // 模拟数据更新辅助函数
        function simulateDataUpdate(period) {
            // 模拟性能指标更新
            const avgResponseTimeEl = monitoringTab.querySelector('.text-lg.font-semibold.text-gray-900');
            const successRateEl = monitoringTab.querySelectorAll('.text-lg.font-semibold.text-gray-900')[1];
            const concurrentRequestsEl = monitoringTab.querySelectorAll('.text-lg.font-semibold.text-gray-900')[2];
            
            if (avgResponseTimeEl) {
                // 生成随机响应时间
                const newResponseTime = Math.floor(Math.random() * 300) + 100;
                avgResponseTimeEl.textContent = `${newResponseTime}ms`;
            }
            
            if (successRateEl) {
                // 生成随机成功率
                const newSuccessRate = (Math.random() * 0.5 + 99.5).toFixed(1);
                successRateEl.textContent = `${newSuccessRate}%`;
            }
            
            if (concurrentRequestsEl) {
                // 生成随机并发请求数
                const newConcurrentRequests = Math.floor(Math.random() * 200) + 50;
                concurrentRequestsEl.textContent = newConcurrentRequests.toString();
            }
        }
    }
    
    // 工作流管理器初始化函数
    function initWorkflowManager() {
        const canvas = document.getElementById('workflow-canvas');
        const nodeProperties = document.getElementById('node-properties');
        const nodePropertyForm = document.getElementById('node-property-form');
        const saveWorkflowBtn = document.getElementById('save-workflow-btn');
        const clearWorkflowBtn = document.getElementById('clear-workflow-btn');
        
        let nodes = [];
        let edges = [];
        let selectedNode = null;
        let nextNodeId = 1;
        
        // 初始化拖拽功能
        const nodeItems = document.querySelectorAll('.node-item');
        nodeItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.nodeType);
            });
        });
        
        if (canvas) {
            canvas.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            
            canvas.addEventListener('drop', (e) => {
                e.preventDefault();
                const nodeType = e.dataTransfer.getData('text/plain');
                
                // 计算节点位置
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // 创建新节点
                createNode(nodeType, x, y);
            });
        }
        
        // 创建节点函数
        function createNode(type, x, y) {
            const nodeId = `node-${nextNodeId++}`;
            const node = {
                id: nodeId,
                type: type,
                x: x - 75, // 调整位置使其居中
                y: y - 25,
                properties: getDefaultNodeProperties(type)
            };
            
            nodes.push(node);
            renderNode(node);
        }
        
        // 渲染节点
        function renderNode(node) {
            const nodeElement = document.createElement('div');
            nodeElement.id = node.id;
            nodeElement.className = `workflow-node absolute p-2 rounded-md border-2 cursor-move select-none`;
            nodeElement.style.left = `${node.x}px`;
            nodeElement.style.top = `${node.y}px`;
            
            // 设置节点样式
            const nodeStyles = {
                start: { className: 'bg-green-100 border-green-500', icon: 'fa-play-circle text-green-500', text: '开始' },
                end: { className: 'bg-red-100 border-red-500', icon: 'fa-stop-circle text-red-500', text: '结束' },
                condition: { className: 'bg-yellow-100 border-yellow-500', icon: 'fa-code-fork text-yellow-500', text: '条件判断' },
                skill: { className: 'bg-blue-100 border-blue-500', icon: 'fa-cogs text-blue-500', text: '技能调用' },
                api: { className: 'bg-purple-100 border-purple-500', icon: 'fa-plug text-purple-500', text: 'API调用' },
                delay: { className: 'bg-orange-100 border-orange-500', icon: 'fa-clock-o text-orange-500', text: '延迟等待' }
            };
            
            const style = nodeStyles[node.type];
            nodeElement.className += ` ${style.className}`;
            nodeElement.innerHTML = `
                <div class="flex items-center gap-2">
                    <i class="fa ${style.icon}"></i>
                    <span class="text-xs font-medium">${style.text}</span>
                </div>
                <div class="node-handle absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 ${style.className.split(' ')[1]} cursor-pointer"></div>
            `;
            
            // 添加节点事件
            addNodeEvents(nodeElement, node);
            
            // 添加到画布
            canvas.appendChild(nodeElement);
        }
        
        // 添加节点事件
        function addNodeEvents(nodeElement, node) {
            // 移动节点
            let isDragging = false;
            let startX, startY, offsetX, offsetY;
            
            nodeElement.addEventListener('mousedown', (e) => {
                if (!e.target.classList.contains('node-handle')) {
                    isDragging = true;
                    startX = e.clientX;
                    startY = e.clientY;
                    offsetX = node.x;
                    offsetY = node.y;
                    
                    // 选中节点
                    selectNode(node);
                    
                    document.addEventListener('mousemove', drag);
                    document.addEventListener('mouseup', stopDrag);
                    
                    e.stopPropagation();
                }
            });
            
            function drag(e) {
                if (isDragging) {
                    const rect = canvas.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    node.x = x - (startX - offsetX);
                    node.y = y - (startY - offsetY);
                    
                    nodeElement.style.left = `${node.x}px`;
                    nodeElement.style.top = `${node.y}px`;
                    
                    // 更新连线
                    updateEdges();
                }
            }
            
            function stopDrag() {
                isDragging = false;
                document.removeEventListener('mousemove', drag);
                document.removeEventListener('mouseup', stopDrag);
            }
        }
        
        // 选中节点
        function selectNode(node) {
            // 移除之前的选中状态
            if (selectedNode) {
                const prevNodeElement = document.getElementById(selectedNode.id);
                if (prevNodeElement) {
                    prevNodeElement.classList.remove('ring-4', 'ring-blue-300');
                }
            }
            
            selectedNode = node;
            
            // 添加选中状态
            const nodeElement = document.getElementById(node.id);
            if (nodeElement) {
                nodeElement.classList.add('ring-4', 'ring-blue-300');
            }
            
            // 显示节点属性
            showNodeProperties(node);
        }
        
        // 显示节点属性
        function showNodeProperties(node) {
            if (!nodeProperties || !nodePropertyForm) return;
            
            // 清空表单
            nodePropertyForm.innerHTML = '';
            
            // 根据节点类型生成属性表单
            const properties = node.properties;
            for (const [key, value] of Object.entries(properties)) {
                const propertyGroup = document.createElement('div');
                propertyGroup.className = 'space-y-1';
                
                const label = document.createElement('label');
                label.className = 'block text-xs font-medium text-gray-700';
                label.textContent = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                
                let input;
                if (typeof value === 'boolean') {
                    input = document.createElement('input');
                    input.type = 'checkbox';
                    input.className = 'rounded border-gray-300 text-primary focus:ring-primary';
                    input.checked = value;
                } else {
                    input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent';
                    input.value = value;
                }
                
                input.addEventListener('change', () => {
                    node.properties[key] = input.type === 'checkbox' ? input.checked : input.value;
                });
                
                propertyGroup.appendChild(label);
                propertyGroup.appendChild(input);
                nodePropertyForm.appendChild(propertyGroup);
            }
            
            nodeProperties.classList.remove('hidden');
        }
        
        // 获取节点默认属性
        function getDefaultNodeProperties(type) {
            const defaults = {
                start: { name: '开始' },
                end: { name: '结束', message: '任务完成' },
                condition: { name: '条件判断', condition: 'true' },
                skill: { name: '技能调用', skillName: '', parameters: '{}' },
                api: { name: 'API调用', url: '', method: 'GET', headers: '{}', body: '{}' },
                delay: { name: '延迟等待', duration: '1000', unit: 'ms' }
            };
            
            return defaults[type] || {};
        }
        
        // 更新连线
        function updateEdges() {
            // 简单实现，实际项目中需要更复杂的连线逻辑
        }
        
        // 清空工作流
        if (clearWorkflowBtn) {
            clearWorkflowBtn.addEventListener('click', () => {
                nodes = [];
                edges = [];
                selectedNode = null;
                
                if (canvas) {
                    canvas.innerHTML = `
                        <p class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-400">
                            从左侧拖拽节点到此处开始设计工作流
                        </p>
                    `;
                }
                
                if (nodeProperties) {
                    nodeProperties.classList.add('hidden');
                }
            });
        }
        
        // 保存工作流
        if (saveWorkflowBtn) {
            saveWorkflowBtn.addEventListener('click', () => {
                const workflowData = {
                    nodes: nodes,
                    edges: edges
                };
                
                // 这里可以添加保存到本地存储或发送到服务器的逻辑
                showNotification('工作流已保存！', 'success');
            });
        }
        
        // 点击画布空白处取消选中
        if (canvas) {
            canvas.addEventListener('click', (e) => {
                if (e.target === canvas) {
                    // 移除之前的选中状态
                    if (selectedNode) {
                        const nodeElement = document.getElementById(selectedNode.id);
                        if (nodeElement) {
                            nodeElement.classList.remove('ring-4', 'ring-blue-300');
                        }
                        selectedNode = null;
                    }
                    
                    // 隐藏节点属性
                    if (nodeProperties) {
                        nodeProperties.classList.add('hidden');
                    }
                }
            });
        }
        
        // 返回工作流管理器API
        return {
            getWorkflowData: () => ({ nodes, edges }),
            loadWorkflowData: (data) => {
                nodes = data.nodes || [];
                edges = data.edges || [];
                nextNodeId = Math.max(...nodes.map(n => parseInt(n.id.split('-')[1])) || [0]) + 1;
                
                // 重新渲染所有节点
                if (canvas) {
                    canvas.innerHTML = '';
                }
                
                nodes.forEach(node => renderNode(node));
            }
        };
    }
    
    // 获取节点默认属性辅助函数
    function getDefaultNodeProperties(type) {
        const defaults = {
            start: { name: '开始' },
            end: { name: '结束', message: '任务完成' },
            condition: { name: '条件判断', condition: 'true' },
            skill: { name: '技能调用', skillName: '', parameters: '{}' },
            api: { name: 'API调用', url: '', method: 'GET', headers: '{}', body: '{}' },
            delay: { name: '延迟等待', duration: '1000', unit: 'ms' }
        };
        
        return defaults[type] || {};
    }

    // 导入发布包按钮事件
    if (importPackageBtn) {
        importPackageBtn.addEventListener('click', () => {
            showNotification('正在打开导入发布包界面...', 'info');
        });
    }

    // 授权接入按钮事件
    if (authorizeAccessBtn) {
        authorizeAccessBtn.addEventListener('click', () => {
            showNotification('正在打开授权接入界面...', 'info');
        });
    }

    // 模态框功能已集成到动态创建逻辑中
    // 不再需要单独的事件监听器

    // 创建新智能体卡片的函数
    function createNewAgentCard(name, type, description, model, memoryDuration) {
        const card = document.createElement('div');
        card.className = 'border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow';

        // 随机选择图标和颜色
        const iconColors = ['bg-primary', 'bg-secondary', 'bg-success', 'bg-danger', 'bg-warning'];
        const randomColor = iconColors[Math.floor(Math.random() * iconColors.length)];

        const icons = ['fa-line-chart', 'fa-headphones', 'fa-truck', 'fa-shield', 'fa-edit', 'fa-bar-chart', 'fa-users'];
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];

        card.innerHTML = `
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                    <div class="w-10 h-10 ${randomColor} rounded-lg flex items-center justify-center text-white mr-3">
                        <i class="fa ${randomIcon}"></i>
                    </div>
                    <div>
                        <h4 class="text-sm font-medium text-gray-900">${name}</h4>
                        <p class="text-xs text-gray-500">${type} · v1.0</p>
                    </div>
                </div>
                <span class="px-2 py-1 text-xs font-medium bg-success-light text-success rounded-full">
                    沙盒
                </span>
            </div>
            <p class="text-xs text-gray-600 mb-3">${description}</p>
            <div class="flex flex-wrap gap-2 text-xs mb-3">
                <span class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">${model}</span>
                <span class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">技能 2</span>
                <span class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">权限 L1</span>
                <span class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">记忆 ${memoryDuration}</span>
            </div>
            <div class="flex items-center justify-between text-xs text-gray-500">
                <span>今日任务: 0</span>
                <button class="text-warning hover:text-warning/80 font-medium">进入沙盒</button>
            </div>
        `;

        // 添加卡片点击事件
        card.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                return;
            }
            showNotification(`正在查看智能体详情: ${name}`, 'info');
        });

        // 添加进入沙盒按钮事件
        const enterSandboxBtn = card.querySelector('button');
        if (enterSandboxBtn) {
            enterSandboxBtn.addEventListener('click', () => {
                showNotification(`正在进入${name}沙盒界面...`, 'info');
            });
        }

        return card;
    }

    // 状态筛选按钮事件
    const statusButtons = agentSection.querySelectorAll('.flex.items-center.gap-2 > button');
    statusButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // 移除所有按钮的激活状态
            statusButtons.forEach(btn => {
                btn.classList.remove('bg-warning', 'text-white');
                btn.classList.add('bg-gray-100', 'text-gray-700');
            });
            
            // 添加当前按钮的激活状态
            button.classList.remove('bg-gray-100', 'text-gray-700');
            button.classList.add('bg-warning', 'text-white');
            
            showNotification(`已筛选${button.textContent}状态的智能体`, 'success');
        });
    });

    // 智能体卡片点击事件
    const agentCards = agentSection.querySelectorAll('.border.border-gray-200.rounded-lg');
    agentCards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            // 检查点击的是不是按钮，如果是则不执行卡片点击事件
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                return;
            }
            
            const agentName = card.querySelector('.font-medium.text-gray-900').textContent;
            showNotification(`正在查看智能体详情: ${agentName}`, 'info');
        });

        // 智能体卡片内的按钮事件
        const enterRunBtn = card.querySelector('button');
        if (enterRunBtn && enterRunBtn.textContent.includes('进入运行')) {
            enterRunBtn.addEventListener('click', () => {
                const agentName = card.querySelector('.font-medium.text-gray-900').textContent;
                showNotification(`正在进入${agentName}运行界面...`, 'info');
            });
        } else if (enterRunBtn && enterRunBtn.textContent.includes('进入沙盒')) {
            enterRunBtn.addEventListener('click', () => {
                const agentName = card.querySelector('.font-medium.text-gray-900').textContent;
                showNotification(`正在进入${agentName}沙盒界面...`, 'info');
            });
        } else if (enterRunBtn && enterRunBtn.textContent.includes('发起授权')) {
            enterRunBtn.addEventListener('click', () => {
                const agentName = card.querySelector('.font-medium.text-gray-900').textContent;
                showNotification(`正在发起${agentName}授权流程...`, 'info');
            });
        }
    });

    // 运行趋势图表切换按钮事件
    const chartButtons = agentSection.querySelectorAll('.flex.space-x-2 > button');
    chartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // 移除所有按钮的激活状态
            chartButtons.forEach(btn => {
                btn.classList.remove('bg-warning', 'text-white');
                btn.classList.add('bg-gray-100', 'text-gray-700');
            });
            
            // 添加当前按钮的激活状态
            button.classList.remove('bg-gray-100', 'text-gray-700');
            button.classList.add('bg-warning', 'text-white');
            
            showNotification(`已切换运行趋势为${button.textContent}视图`, 'success');
        });
    });

    // 智能体性能概览详情按钮事件
    const performanceDetailBtn = agentSection.querySelector('.text-sm.text-warning');
    if (performanceDetailBtn) {
        performanceDetailBtn.addEventListener('click', () => {
            showNotification('正在打开智能体性能详情页面...', 'info');
        });
    }

    // 进化与治理中心按钮事件
    const governanceSection = agentSection.querySelector('#governance');
    if (governanceSection) {
        // 冲突仲裁按钮
        const conflictArbitrationBtn = governanceSection.querySelector('.bg-danger');
        if (conflictArbitrationBtn) {
            conflictArbitrationBtn.addEventListener('click', () => {
                showNotification('正在打开冲突仲裁界面...', 'info');
            });
        }

        // 治理统计卡片点击事件
        const governanceCards = governanceSection.querySelectorAll('.grid.grid-cols-1.md\:grid-cols-4.gap-6 > div');
        governanceCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                const cardTitle = card.querySelector('.text-sm.font-medium.text-gray-500').textContent;
                showNotification(`正在查看${cardTitle}详情...`, 'info');
            });
        });

        // 冲突管理项点击事件
        const conflictItems = governanceSection.querySelectorAll('.border.border-danger.rounded-lg');
        conflictItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const itemTitle = item.querySelector('.text-sm.font-medium.text-gray-900').textContent;
                showNotification(`正在处理冲突: ${itemTitle}`, 'info');
            });
        });
    }
}

// 智能体工厂按钮事件初始化
function addAgentFactoryButtonEvents() {
    // 蓝图工作台按钮
    const blueprintButtons = [
        document.getElementById('create-blueprint'),
        document.getElementById('import-blueprint'),
        document.getElementById('run-blueprint'),
        document.getElementById('export-blueprint')
    ];

    blueprintButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                showNotification(`蓝图工作台：${button.textContent.trim()}功能已触发`, 'success');
            });
        }
    });

    // 运行舱按钮
    const runButtons = [
        document.getElementById('start-instance'),
        document.getElementById('stop-instance'),
        document.getElementById('restart-instance'),
        document.getElementById('scale-instance')
    ];

    runButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                showNotification(`运行舱：${button.textContent.trim()}功能已触发`, 'success');
            });
        }
    });

    // 技能市场按钮
    const skillButtons = [
        document.getElementById('create-skill'),
        document.getElementById('import-skill'),
        document.getElementById('authorize-skill'),
        document.getElementById('update-skill')
    ];

    skillButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                showNotification(`技能市场：${button.textContent.trim()}功能已触发`, 'success');
            });
        }
    });

    // 思维链审计按钮
    const auditButtons = [
        document.getElementById('search-audit'),
        document.getElementById('export-audit'),
        document.getElementById('analyze-audit')
    ];

    auditButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                showNotification(`思维链审计：${button.textContent.trim()}功能已触发`, 'success');
            });
        }
    });

    // 表格行点击事件
    const blueprintRows = document.querySelectorAll('#blueprint-table tbody tr');
    blueprintRows.forEach(row => {
        row.addEventListener('click', () => {
            showNotification(`已选择蓝图：${row.cells[0].textContent.trim()}`, 'info');
        });
    });

    const instanceRows = document.querySelectorAll('#instance-table tbody tr');
    instanceRows.forEach(row => {
        row.addEventListener('click', () => {
            showNotification(`已选择实例：${row.cells[0].textContent.trim()}`, 'info');
        });
    });

    const skillRows = document.querySelectorAll('#skill-table tbody tr');
    skillRows.forEach(row => {
        row.addEventListener('click', () => {
            showNotification(`已选择技能：${row.cells[0].textContent.trim()}`, 'info');
        });
    });

    const auditRows = document.querySelectorAll('#audit-table tbody tr');
    auditRows.forEach(row => {
        row.addEventListener('click', () => {
            showNotification(`已选择审计记录：${row.cells[0].textContent.trim()}`, 'info');
        });
    });
}

// 进度指示器更新函数
function updateProgressIndicator() {
    // 计算已完成的必填字段数量
    let completedFields = 0;
    let totalFields = 0;
    
    // 基本信息配置
    const agentName = document.getElementById('agent-name')?.value?.trim();
    const agentType = document.getElementById('agent-type')?.value;
    
    totalFields += 2; // 名称和类型是必填项
    if (agentName) completedFields++;
    if (agentType) completedFields++;
    
    // 模型配置
    const modelProvider = document.getElementById('model-provider')?.value;
    const modelName = document.getElementById('model-name')?.value;
    
    totalFields += 2;
    if (modelProvider) completedFields++;
    if (modelName) completedFields++;
    
    // 技能配置（至少选择一个技能）
    const skillCheckboxes = document.querySelectorAll('#skills-tab input[type="checkbox"]:checked');
    totalFields += 1;
    if (skillCheckboxes.length > 0) completedFields++;
    
    // 工作流配置（至少有一个节点）
    const workflowNodes = document.querySelectorAll('#workflow-canvas .node');
    totalFields += 1;
    if (workflowNodes.length > 0) completedFields++;
    
    // 知识库配置（至少选择一个知识库）
    const knowledgeCheckboxes = document.querySelectorAll('#knowledge-tab input[type="checkbox"]:checked');
    totalFields += 1;
    if (knowledgeCheckboxes.length > 0) completedFields++;
    
    // 记忆配置
    const memoryType = document.getElementById('memory-type')?.value;
    totalFields += 1;
    if (memoryType) completedFields++;
    
    // 计算进度百分比
    const progressPercentage = Math.round((completedFields / totalFields) * 100);
    
    // 更新进度显示
    const progressPercentageEl = document.getElementById('panel-progress-percentage');
    
    if (progressPercentageEl) {
        progressPercentageEl.textContent = `${progressPercentage}%`;
    }
    
    return progressPercentage;
}

// 配置选项变更监听器
function initConfigChangeListeners() {
    // 基本信息配置监听
    const agentName = document.getElementById('agent-name');
    const agentType = document.getElementById('agent-type');
    
    if (agentName) {
        agentName.addEventListener('input', updateProgressIndicator);
    }
    
    if (agentType) {
        agentType.addEventListener('change', updateProgressIndicator);
    }
    
    // 模型配置监听
    const modelProvider = document.getElementById('model-provider');
    const modelName = document.getElementById('model-name');
    
    if (modelProvider) {
        modelProvider.addEventListener('change', updateProgressIndicator);
    }
    
    if (modelName) {
        modelName.addEventListener('change', updateProgressIndicator);
    }
    
    // 技能配置监听
    const skillsTab = document.getElementById('skills-tab');
    if (skillsTab) {
        skillsTab.addEventListener('change', updateProgressIndicator);
    }
    
    // 工作流配置监听 - 这里需要与工作流管理器集成
    // 知识库配置监听
    const knowledgeTab = document.getElementById('knowledge-tab');
    if (knowledgeTab) {
        knowledgeTab.addEventListener('change', updateProgressIndicator);
    }
    
    // 记忆配置监听
    const memoryType = document.getElementById('memory-type');
    if (memoryType) {
        memoryType.addEventListener('change', updateProgressIndicator);
    }
}

// 多模态系统初始化函数
function initMultimodalSystem() {
    const multimodalTab = document.getElementById('multimodal-tab');
    if (!multimodalTab) return;
    
    // 输入模态配置显示/隐藏逻辑
    const inputImage = document.getElementById('input-image');
    const imageInputConfig = document.getElementById('image-input-config');
    
    if (inputImage && imageInputConfig) {
        inputImage.addEventListener('change', () => {
            if (inputImage.checked) {
                imageInputConfig.classList.remove('hidden');
                showNotification('已启用图像输入', 'success');
            } else {
                imageInputConfig.classList.add('hidden');
                showNotification('已禁用图像输入', 'info');
            }
        });
    }
    
    const inputVoice = document.getElementById('input-voice');
    // 语音输入配置可以在这里添加类似的逻辑
    
    const inputVideo = document.getElementById('input-video');
    // 视频输入配置可以在这里添加类似的逻辑
    
    const inputFile = document.getElementById('input-file');
    const fileInputConfig = document.getElementById('file-input-config');
    
    if (inputFile && fileInputConfig) {
        inputFile.addEventListener('change', () => {
            if (inputFile.checked) {
                fileInputConfig.classList.remove('hidden');
                showNotification('已启用文件输入', 'success');
            } else {
                fileInputConfig.classList.add('hidden');
                showNotification('已禁用文件输入', 'info');
            }
        });
    }
    
    // 输出模态配置显示/隐藏逻辑
    const outputVoice = document.getElementById('output-voice');
    const voiceOutputConfig = document.getElementById('voice-output-config');
    
    if (outputVoice && voiceOutputConfig) {
        outputVoice.addEventListener('change', () => {
            if (outputVoice.checked) {
                voiceOutputConfig.classList.remove('hidden');
                showNotification('已启用语音输出', 'success');
            } else {
                voiceOutputConfig.classList.add('hidden');
                showNotification('已禁用语音输出', 'info');
            }
        });
    }
    
    const outputImage = document.getElementById('output-image');
    const imageOutputConfig = document.getElementById('image-output-config');
    
    if (outputImage && imageOutputConfig) {
        outputImage.addEventListener('change', () => {
            if (outputImage.checked) {
                imageOutputConfig.classList.remove('hidden');
                showNotification('已启用图像输出', 'success');
            } else {
                imageOutputConfig.classList.add('hidden');
                showNotification('已禁用图像输出', 'info');
            }
        });
    }
    
    const outputCode = document.getElementById('output-code');
    // 代码输出配置可以在这里添加类似的逻辑
    
    const outputFile = document.getElementById('output-file');
    // 文件输出配置可以在这里添加类似的逻辑
    
    // 多模态处理模式切换
    const processingMode = document.getElementById('processing-mode');
    const singleModalConfig = document.getElementById('single-modal-config');
    const crossModalConfig = document.getElementById('cross-modal-config');
    const multiModalFusionConfig = document.getElementById('multi-modal-fusion-config');
    
    if (processingMode) {
        processingMode.addEventListener('change', () => {
            const mode = processingMode.value;
            
            // 隐藏所有配置面板
            singleModalConfig.classList.add('hidden');
            crossModalConfig.classList.add('hidden');
            multiModalFusionConfig.classList.add('hidden');
            
            // 根据处理模式显示相应的配置
            if (mode === 'single') {
                singleModalConfig.classList.remove('hidden');
                showNotification('已切换到单模态处理模式', 'info');
            } else if (mode === 'cross') {
                crossModalConfig.classList.remove('hidden');
                showNotification('已切换到跨模态处理模式', 'info');
            } else if (mode === 'fusion') {
                multiModalFusionConfig.classList.remove('hidden');
                showNotification('已切换到多模态融合处理模式', 'info');
            }
        });
    }
    
    // 保存多模态配置
    const saveMultimodalConfigBtn = document.getElementById('save-multimodal-config');
    if (saveMultimodalConfigBtn) {
        saveMultimodalConfigBtn.addEventListener('click', () => {
            // 获取输入模态配置
            const inputText = document.getElementById('input-text')?.checked;
            const inputVoice = document.getElementById('input-voice')?.checked;
            const inputImage = document.getElementById('input-image')?.checked;
            const inputVideo = document.getElementById('input-video')?.checked;
            const inputFile = document.getElementById('input-file')?.checked;
            
            // 获取图像输入配置
            const imageResolutions = [];
            if (document.getElementById('resolution-720p')?.checked) imageResolutions.push('720p');
            if (document.getElementById('resolution-1080p')?.checked) imageResolutions.push('1080p');
            if (document.getElementById('resolution-4k')?.checked) imageResolutions.push('4k');
            
            const imageFormats = [];
            if (document.getElementById('format-jpg')?.checked) imageFormats.push('jpg');
            if (document.getElementById('format-png')?.checked) imageFormats.push('png');
            if (document.getElementById('format-webp')?.checked) imageFormats.push('webp');
            
            // 获取文件输入配置
            const maxFileSize = document.getElementById('max-file-size')?.value;
            const supportedFormats = [];
            if (document.getElementById('file-pdf')?.checked) supportedFormats.push('pdf');
            if (document.getElementById('file-docx')?.checked) supportedFormats.push('docx');
            if (document.getElementById('file-excel')?.checked) supportedFormats.push('excel');
            if (document.getElementById('file-ppt')?.checked) supportedFormats.push('ppt');
            
            // 获取输出模态配置
            const outputText = document.getElementById('output-text')?.checked;
            const outputVoice = document.getElementById('output-voice')?.checked;
            const outputImage = document.getElementById('output-image')?.checked;
            const outputCode = document.getElementById('output-code')?.checked;
            const outputFile = document.getElementById('output-file')?.checked;
            
            // 获取语音输出配置
            const voiceVoice = document.getElementById('voice-voice')?.value;
            const voiceSpeed = document.getElementById('voice-speed')?.value;
            
            // 获取图像输出配置
            const outputImageResolution = document.getElementById('output-image-resolution')?.value;
            
            // 获取多模态处理模式
            const processingMode = document.getElementById('processing-mode')?.value;
            
            showNotification('正在保存多模态配置...', 'info');
            
            // 模拟保存过程
            setTimeout(() => {
                showNotification('多模态配置已保存', 'success');
                
                // 显示配置摘要
                console.log('多模态配置：', {
                    inputModalities: {
                        text: inputText,
                        voice: inputVoice,
                        image: inputImage,
                        video: inputVideo,
                        file: inputFile
                    },
                    imageInputConfig: { resolutions: imageResolutions, formats: imageFormats },
                    fileInputConfig: { maxSize: maxFileSize, formats: supportedFormats },
                    outputModalities: {
                        text: outputText,
                        voice: outputVoice,
                        image: outputImage,
                        code: outputCode,
                        file: outputFile
                    },
                    voiceOutputConfig: { voice: voiceVoice, speed: voiceSpeed },
                    imageOutputConfig: { resolution: outputImageResolution },
                    processingMode: processingMode
                });
            }, 800);
        });
    }
    
    // 初始化输入模态配置状态
    if (inputImage && imageInputConfig) {
        if (inputImage.checked) {
            imageInputConfig.classList.remove('hidden');
        } else {
            imageInputConfig.classList.add('hidden');
        }
    }
    
    if (inputFile && fileInputConfig) {
        if (inputFile.checked) {
            fileInputConfig.classList.remove('hidden');
        } else {
            fileInputConfig.classList.add('hidden');
        }
    }
    
    // 初始化输出模态配置状态
    if (outputVoice && voiceOutputConfig) {
        if (outputVoice.checked) {
            voiceOutputConfig.classList.remove('hidden');
        } else {
            voiceOutputConfig.classList.add('hidden');
        }
    }
    
    if (outputImage && imageOutputConfig) {
        if (outputImage.checked) {
            imageOutputConfig.classList.remove('hidden');
        } else {
            imageOutputConfig.classList.add('hidden');
        }
    }
    
    // 初始化多模态处理模式
    if (processingMode) {
        processingMode.dispatchEvent(new Event('change'));
    }
}

// 初始化创建智能体模态框按钮事件
function initCreateAgentModalButtons() {
    // 保存草稿按钮
    const saveDraftBtn = document.getElementById('save-draft-btn');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', () => {
            showNotification('正在保存草稿...', 'info');
            
            // 模拟保存草稿过程
            setTimeout(() => {
                showNotification('草稿已保存', 'success');
            }, 800);
        });
    }
    
    // 取消创建按钮
    const cancelCreateBtn = document.getElementById('cancel-create-btn');
    if (cancelCreateBtn) {
        cancelCreateBtn.addEventListener('click', () => {
            // 关闭模态框
            const createAgentModal = document.getElementById('create-agent-modal');
            if (createAgentModal) {
                createAgentModal.classList.add('hidden');
            }
        });
    }
    
    // 创建智能体按钮
    const createAgentBtn = document.getElementById('create-agent-btn');
    const createAgentForm = document.getElementById('create-agent-form');
    
    if (createAgentBtn) {
        createAgentBtn.addEventListener('click', () => {
            // 验证表单
            if (createAgentForm && !createAgentForm.checkValidity()) {
                // 显示表单验证错误
                createAgentForm.reportValidity();
                showNotification('请填写必填字段', 'error');
                return;
            }
            
            // 检查进度
            const progressPercentage = updateProgressIndicator();
            
            if (progressPercentage < 50) {
                // 显示确认对话框
                if (confirm('智能体配置尚未完成（进度：' + progressPercentage + '%），确定要创建吗？')) {
                    createAgent();
                }
            } else {
                createAgent();
            }
        });
    }
    
    // 辅助函数：创建智能体
    function createAgent() {
        showNotification('正在创建智能体...', 'info');
        
        // 模拟创建过程
        setTimeout(() => {
            showNotification('智能体创建成功！', 'success');
            
            // 关闭模态框
            const createAgentModal = document.getElementById('create-agent-modal');
            if (createAgentModal) {
                createAgentModal.classList.add('hidden');
            }
        }, 1500);
    }
}

// 在初始化部分添加多模态系统初始化
initMultimodalSystem();

// 初始化进度指示器
updateProgressIndicator();

// 初始化配置变更监听器
initConfigChangeListeners();

// 初始化创建智能体模态框按钮事件
initCreateAgentModalButtons();
