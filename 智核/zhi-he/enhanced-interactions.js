/**
 * 智核平台 - 智能知识库模块 - 增强交互逻辑
 * 实现真实可操作的前端交互
 */

// ==================== 全局状态管理 ====================
const AppState = {
    currentView: 'tree',
    selectedDocs: new Set(),
    isSelectMode: false,
    editorContent: {},
    autoSaveTimer: null,
    graphNodes: [],
    aiSuggestions: [],
    currentOutline: null
};

// ==================== 工具函数 ====================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg text-white z-50 ${
            type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-primary'
        }`;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }
}

function animateElement(element, animation) {
    element.style.animation = animation;
    setTimeout(() => { element.style.animation = ''; }, 500);
}

// ==================== 编辑器真实交互 ====================
class SmartEditor {
    constructor() {
        this.lastSaveTime = Date.now();
        this.isDirty = false;
        this.init();
    }

    init() {
        // 编辑器内容真实可编辑
        const editableSections = document.querySelectorAll('.editable-section');
        editableSections.forEach(section => {
            section.addEventListener('input', () => {
                this.isDirty = true;
                this.scheduleAutoSave();
                this.updateStatus('编辑中...');
            });
        });

        // AI续写功能
        document.querySelectorAll('.ai-continue-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.closest('.editable-section');
                this.aiContinueWriting(section);
            });
        });

        // AI改写功能
        document.querySelectorAll('.ai-rewrite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.closest('.editable-section');
                this.showRewriteOptions(section);
            });
        });

        // 应用AI建议
        document.querySelectorAll('.apply-suggestion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.applySuggestion(e.target);
            });
        });
    }

    aiContinueWriting(section) {
        const contentP = section.querySelector('p.text-muted');
        if (!contentP) return;

        showToast('AI正在续写...', 'info');

        // 模拟AI生成内容
        setTimeout(() => {
            const currentText = contentP.textContent;
            const aiGeneratedText = this.generateAIContent(currentText);

            // 逐字显示效果
            let index = 0;
            const originalLength = currentText.length;
            const interval = setInterval(() => {
                if (index < aiGeneratedText.length) {
                    contentP.textContent = currentText + aiGeneratedText.substring(0, index + 1);
                    index++;
                } else {
                    clearInterval(interval);
                    showToast('AI续写完成');
                    this.scheduleAutoSave();
                }
            }, 30);
        }, 500);
    }

    generateAIContent(context) {
        const samples = [
            '根据最新数据显示，线上渠道销售同比增长32.5%，其中移动端贡献了68%的增量。客户画像分析表明，25-35岁年龄段用户占比达到47%，相比去年提升12个百分点。',
            '竞品分析方面，主要竞争对手A在Q2推出了三款新品，价格区间覆盖中高端市场。我们的产品在功能完整性上保持领先，客户满意度达87%，高于行业平均水平15个百分点。',
            '从区域分布来看，华东地区依然是核心市场，贡献了全国60%的销售额。其中上海、杭州、南京三个城市占据华东市场的75%份额。建议加大对二线城市的渗透力度。'
        ];
        return samples[Math.floor(Math.random() * samples.length)];
    }

    showRewriteOptions(section) {
        const contentP = section.querySelector('p.text-muted');
        if (!contentP) return;

        const originalText = contentP.textContent;

        // 创建改写选项面板
        const existingPanel = section.querySelector('.rewrite-panel');
        if (existingPanel) existingPanel.remove();

        const panel = document.createElement('div');
        panel.className = 'rewrite-panel mt-2 p-3 rounded-lg bg-white border border-primary shadow-lg space-y-2 text-xs';
        panel.innerHTML = `
            <p class="font-medium">AI改写建议 (点击应用)</p>
            <div class="rewrite-option p-2 rounded bg-ocean cursor-pointer hover:bg-primary hover:text-white transition" data-style="professional">
                <span class="font-medium">更专业：</span>
                <span class="rewrite-text">${this.rewriteText(originalText, 'professional')}</span>
            </div>
            <div class="rewrite-option p-2 rounded bg-coral cursor-pointer hover:bg-secondary hover:text-white transition" data-style="concise">
                <span class="font-medium">更简洁：</span>
                <span class="rewrite-text">${this.rewriteText(originalText, 'concise')}</span>
            </div>
            <div class="rewrite-option p-2 rounded bg-mist cursor-pointer hover:bg-accent hover:text-white transition" data-style="casual">
                <span class="font-medium">更通俗：</span>
                <span class="rewrite-text">${this.rewriteText(originalText, 'casual')}</span>
            </div>
            <button class="close-panel w-full px-2 py-1 mt-2 rounded-full bg-mist hover:bg-danger hover:text-white transition text-xs">关闭</button>
        `;

        section.appendChild(panel);

        // 应用改写
        panel.querySelectorAll('.rewrite-option').forEach(option => {
            option.addEventListener('click', () => {
                const newText = option.querySelector('.rewrite-text').textContent;
                contentP.textContent = newText;
                animateElement(contentP, 'fadeIn 0.5s');
                showToast('改写已应用');
                panel.remove();
                this.scheduleAutoSave();
            });
        });

        // 关闭面板
        panel.querySelector('.close-panel').addEventListener('click', () => {
            panel.remove();
        });
    }

    rewriteText(text, style) {
        const templates = {
            professional: [
                '华东区市场呈现加速增长态势，其中上海地区销售额同比增长18.7%，贡献了区域60%的市场份额，整体表现超出预期目标。',
                '根据数据分析显示，该区域Q2季度销售业绩同比提升15.3个百分点，线上渠道贡献率达到32.5%，移动端转化率较上季度提升显著。'
            ],
            concise: [
                '华东区高速增长，上海领跑，占比60%。',
                'Q2销售增长15.3%，线上渠道增长32.5%。'
            ],
            casual: [
                '华东区市场发展很快，上海的业绩特别好，占了华东市场的大头。',
                '这个季度华东区表现不错，销售额涨了15%多，线上卖得特别好。'
            ]
        };
        const options = templates[style] || templates.professional;
        return options[Math.floor(Math.random() * options.length)];
    }

    applySuggestion(button) {
        const suggestion = button.closest('.bg-warning\\/10');
        if (suggestion) {
            const section = suggestion.closest('.editable-section');
            const content = section.querySelector('p.text-muted');
            if (content) {
                content.textContent = content.textContent.replace(/K8S/g, 'Kubernetes');
                animateElement(content, 'pulse 0.5s');
                suggestion.remove();
                showToast('术语已规范化');
                this.scheduleAutoSave();
            }
        }
    }

    scheduleAutoSave() {
        if (this.autoSaveTimer) clearTimeout(this.autoSaveTimer);

        this.autoSaveTimer = setTimeout(() => {
            this.autoSave();
        }, 2000);
    }

    autoSave() {
        if (!this.isDirty) return;

        this.updateStatus('正在保存...');

        // 模拟保存
        setTimeout(() => {
            this.lastSaveTime = Date.now();
            this.isDirty = false;
            this.updateSaveTime();
            this.updateStatus('草稿');
            showToast('自动保存成功');
        }, 300);
    }

    updateStatus(status) {
        const statusEl = document.getElementById('doc-status');
        if (statusEl) {
            statusEl.textContent = status;
            statusEl.className = status === '草稿' ? 'px-2 py-1 rounded-full bg-white' :
                                 status === '编辑中...' ? 'px-2 py-1 rounded-full bg-warning text-white' :
                                 'px-2 py-1 rounded-full bg-success text-white';
        }
    }

    updateSaveTime() {
        const timeEl = document.getElementById('auto-save-time');
        if (timeEl) {
            timeEl.textContent = '刚刚保存';
            setTimeout(() => {
                timeEl.textContent = '自动保存于 1分钟前';
            }, 60000);
        }
    }
}

// ==================== 大纲生成器 ====================
class OutlineGenerator {
    constructor() {
        this.init();
    }

    init() {
        const generateBtn = document.querySelector('.generate-outline-btn');
        const applyBtn = document.querySelector('.apply-outline-btn');

        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateOutline());
        }

        if (applyBtn) {
            applyBtn.addEventListener('click', () => this.applyOutline());
        }
    }

    generateOutline() {
        const titleInput = document.querySelector('input[placeholder*="文档标题"]');
        const typeSelect = document.querySelector('select');

        if (!titleInput || !typeSelect) return;

        const title = titleInput.value || '未命名文档';
        const type = typeSelect.value;

        showToast('正在生成大纲...', 'info');

        // 模拟AI生成
        setTimeout(() => {
            const outline = this.generateOutlineByType(type);
            this.displayOutline(outline);
            AppState.currentOutline = outline;
            showToast('大纲生成完成');
        }, 1500);
    }

    generateOutlineByType(type) {
        const templates = {
            '市场分析': [
                { title: '一、背景与目标', level: 1, status: 'ready', children: [] },
                { title: '二、市场现状分析', level: 1, status: 'ready', children: [
                    { title: '2.1 整体市场规模与增速', level: 2, status: 'ready' },
                    { title: '2.2 区域分布与特征', level: 2, status: 'ready' },
                    { title: '2.3 用户画像分析', level: 2, status: 'pending' }
                ]},
                { title: '三、竞品对比分析', level: 1, status: 'pending', children: [
                    { title: '3.1 竞品A策略分析', level: 2, status: 'pending' },
                    { title: '3.2 竞品B价格变动', level: 2, status: 'pending' }
                ]},
                { title: '四、增长策略建议', level: 1, status: 'ready', children: [] },
                { title: '五、风险评估与应对', level: 1, status: 'ready', children: [] }
            ],
            '技术方案': [
                { title: '一、需求背景', level: 1, status: 'ready', children: [] },
                { title: '二、技术选型', level: 1, status: 'ready', children: [
                    { title: '2.1 架构设计', level: 2, status: 'ready' },
                    { title: '2.2 技术栈评估', level: 2, status: 'pending' }
                ]},
                { title: '三、实现方案', level: 1, status: 'pending', children: [] },
                { title: '四、性能优化', level: 1, status: 'ready', children: [] },
                { title: '五、部署方案', level: 1, status: 'ready', children: [] }
            ]
        };

        return templates[type] || templates['市场分析'];
    }

    displayOutline(outline) {
        const container = document.querySelector('.outline-preview-container');
        if (!container) return;

        let html = '<div class="space-y-1 pl-3">';

        outline.forEach(item => {
            const icon = item.status === 'ready' ? '<i class="fa fa-check-circle text-success"></i>' :
                        '<i class="fa fa-exclamation-circle text-warning"></i>';

            html += `
                <div class="flex items-center justify-between p-2 hover:bg-mist rounded cursor-pointer outline-item" data-title="${item.title}">
                    <span><i class="fa fa-angle-right text-muted outline-toggle"></i> ${item.title}</span>
                    <div class="flex items-center gap-2">
                        ${icon}
                        <button class="edit-outline-item text-primary text-xs hover:underline">编辑</button>
                    </div>
                </div>
            `;

            if (item.children && item.children.length > 0) {
                html += '<div class="pl-4 space-y-1 hidden outline-children">';
                item.children.forEach(child => {
                    const childIcon = child.status === 'ready' ? '<i class="fa fa-check-circle text-success"></i>' :
                                    '<i class="fa fa-exclamation-circle text-warning"></i>';
                    html += `
                        <div class="flex items-center justify-between p-1 hover:bg-mist rounded text-muted">
                            <span>${child.title}</span>
                            ${childIcon}
                        </div>
                    `;
                });
                html += '</div>';
            }
        });

        html += '</div>';
        container.innerHTML = html;

        // 添加折叠展开交互
        container.querySelectorAll('.outline-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const item = toggle.closest('.outline-item');
                const children = item.nextElementSibling;
                if (children && children.classList.contains('outline-children')) {
                    children.classList.toggle('hidden');
                    toggle.classList.toggle('fa-angle-right');
                    toggle.classList.toggle('fa-angle-down');
                }
            });
        });

        // 编辑大纲项
        container.querySelectorAll('.edit-outline-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const item = e.target.closest('.outline-item');
                const titleSpan = item.querySelector('span');
                const currentTitle = item.dataset.title;

                const newTitle = prompt('修改标题:', currentTitle);
                if (newTitle && newTitle !== currentTitle) {
                    item.dataset.title = newTitle;
                    titleSpan.innerHTML = `<i class="fa fa-angle-right text-muted outline-toggle"></i> ${newTitle}`;
                    showToast('标题已更新');
                }
            });
        });
    }

    applyOutline() {
        if (!AppState.currentOutline) {
            showToast('请先生成大纲', 'error');
            return;
        }

        const editor = document.getElementById('editor-content');
        if (!editor) return;

        showToast('正在应用大纲到编辑器...', 'info');

        setTimeout(() => {
            let html = '';
            AppState.currentOutline.forEach((item, index) => {
                const borderColors = ['border-primary', 'border-secondary', 'border-accent', 'border-success', 'border-warning'];
                const borderColor = borderColors[index % borderColors.length];

                html += `
                    <div class="p-2 bg-white rounded border-l-4 ${borderColor} editable-section" contenteditable="true">
                        <p class="font-medium">${item.title}</p>
                        <p class="text-muted mt-1">[请在此处填写内容...]</p>
                    </div>
                `;
            });

            editor.innerHTML = html;
            showToast('大纲已应用，可以开始编辑');

            // 重新初始化编辑器
            new SmartEditor();
        }, 500);
    }
}

// ==================== 知识图谱交互增强 ====================
class EnhancedKnowledgeGraph {
    constructor() {
        this.selectedNode = null;
        this.isDragging = false;
        this.dragNode = null;
        this.init();
    }

    init() {
        this.initNodeDrag();
        this.initNodeInteraction();
        this.initControls();
    }

    initNodeDrag() {
        const svg = document.getElementById('knowledge-graph-svg');
        if (!svg) return;

        const nodes = svg.querySelectorAll('.graph-node');

        nodes.forEach(node => {
            const circle = node.querySelector('circle');
            let startX, startY, initialCX, initialCY;

            circle.addEventListener('mousedown', (e) => {
                this.isDragging = true;
                this.dragNode = node;
                startX = e.clientX;
                startY = e.clientY;
                initialCX = parseFloat(circle.getAttribute('cx'));
                initialCY = parseFloat(circle.getAttribute('cy'));
                circle.style.cursor = 'grabbing';
                e.preventDefault();
            });

            svg.addEventListener('mousemove', (e) => {
                if (this.isDragging && this.dragNode === node) {
                    const dx = e.clientX - startX;
                    const dy = e.clientY - startY;
                    const newCX = initialCX + dx * 0.5;
                    const newCY = initialCY + dy * 0.5;

                    circle.setAttribute('cx', newCX);
                    circle.setAttribute('cy', newCY);

                    const text = node.querySelector('text');
                    if (text) {
                        text.setAttribute('x', newCX);
                        text.setAttribute('y', newCY + 5);
                    }

                    this.updateConnectedEdges(node, newCX, newCY);
                }
            });

            svg.addEventListener('mouseup', () => {
                if (this.isDragging) {
                    this.isDragging = false;
                    this.dragNode = null;
                    circle.style.cursor = 'pointer';
                    showToast('节点位置已更新');
                }
            });
        });
    }

    updateConnectedEdges(node, newX, newY) {
        const nodeId = node.dataset.id;
        const svg = document.getElementById('knowledge-graph-svg');
        const edges = svg.querySelectorAll('.graph-edge');

        // 这是简化版本，真实项目中需要根据实际的边连接关系来更新
        // 这里仅作演示
    }

    initNodeInteraction() {
        const nodes = document.querySelectorAll('.graph-node');
        const tooltip = document.getElementById('graph-tooltip');
        const infoPanel = document.getElementById('selected-node-info');

        nodes.forEach(node => {
            node.addEventListener('mouseenter', (e) => {
                if (this.isDragging) return;

                const nodeType = node.dataset.type;
                const nodeText = node.querySelector('text')?.textContent || '';

                if (tooltip) {
                    tooltip.innerHTML = `
                        <p class="font-medium text-sm">${nodeText}</p>
                        <p class="text-muted mt-1">这是一个${nodeType}节点</p>
                        <div class="mt-2 flex gap-2">
                            <span class="px-2 py-1 bg-mist rounded">类型: ${nodeType}</span>
                            <span class="px-2 py-1 bg-mist rounded">关联: ${Math.floor(Math.random() * 8) + 2}</span>
                        </div>
                        <button class="mt-2 w-full px-2 py-1 rounded-full bg-primary text-white text-xs">查看详情</button>
                    `;
                    tooltip.classList.remove('hidden');
                }
            });

            node.addEventListener('mouseleave', () => {
                if (tooltip && !this.isDragging) {
                    setTimeout(() => tooltip.classList.add('hidden'), 200);
                }
            });

            node.addEventListener('click', () => {
                if (this.isDragging) return;

                const nodeText = node.querySelector('text')?.textContent || '';
                const nodeType = node.dataset.type;

                // 高亮选中节点
                nodes.forEach(n => {
                    const circle = n.querySelector('.node-circle');
                    circle.setAttribute('stroke', 'none');
                    circle.setAttribute('stroke-width', '0');
                });

                const circle = node.querySelector('.node-circle');
                circle.setAttribute('stroke', '#3b82f6');
                circle.setAttribute('stroke-width', '3');

                // 更新信息面板
                if (infoPanel) {
                    infoPanel.innerHTML = `
                        <p class="font-medium">${nodeText}</p>
                        <p class="text-muted mt-1">类型: ${nodeType}</p>
                        <p class="text-muted">关联节点: ${Math.floor(Math.random() * 8) + 2}个</p>
                        <p class="text-muted">创建时间: 2024/07/12</p>
                        <button class="mt-2 px-2 py-1 rounded-full bg-primary text-white w-full text-xs">查看完整信息</button>
                        <button class="mt-1 px-2 py-1 rounded-full bg-secondary text-white w-full text-xs">展开关联</button>
                    `;
                }

                this.selectedNode = node;
                showToast(`已选中: ${nodeText}`);
            });
        });
    }

    initControls() {
        // 关系筛选
        const filters = document.querySelectorAll('.relation-filter');
        filters.forEach(filter => {
            filter.addEventListener('change', () => {
                const type = filter.dataset.type;
                const checked = filter.checked;
                const edges = document.querySelectorAll(`.graph-edge[data-type="${type}"]`);

                edges.forEach(edge => {
                    edge.style.display = checked ? '' : 'none';
                    edge.style.transition = 'opacity 0.3s';
                    edge.style.opacity = checked ? '0.4' : '0';
                });

                showToast(`${checked ? '显示' : '隐藏'}了"${type}"关系`);
            });
        });

        // 布局切换
        const layoutSelect = document.getElementById('graph-layout');
        if (layoutSelect) {
            layoutSelect.addEventListener('change', (e) => {
                const layout = e.target.value;
                this.switchLayout(layout);
            });
        }

        // 展开节点
        const expandOne = document.getElementById('expand-one-hop');
        const expandTwo = document.getElementById('expand-two-hop');

        if (expandOne) {
            expandOne.addEventListener('click', () => {
                this.expandNodes(1);
            });
        }

        if (expandTwo) {
            expandTwo.addEventListener('click', () => {
                this.expandNodes(2);
            });
        }
    }

    switchLayout(layoutType) {
        showToast(`正在切换到${layoutType}布局...`, 'info');

        const svg = document.getElementById('knowledge-graph-svg');
        if (!svg) return;

        setTimeout(() => {
            // 模拟布局切换动画
            svg.style.transition = 'transform 0.5s';
            svg.style.transform = 'scale(0.95)';

            setTimeout(() => {
                svg.style.transform = 'scale(1)';
                showToast('布局切换完成');
            }, 500);
        }, 300);
    }

    expandNodes(degree) {
        if (!this.selectedNode) {
            showToast('请先选择一个节点', 'error');
            return;
        }

        showToast(`正在展开${degree}度关联节点...`, 'info');

        setTimeout(() => {
            // 这里应该添加新节点到SVG
            // 简化实现：仅显示提示
            const nodeText = this.selectedNode.querySelector('text')?.textContent || '';
            showToast(`已展开${nodeText}的${degree}度关联节点（共${Math.floor(Math.random() * 5) + 3}个）`);
        }, 800);
    }
}

// ==================== 文档树真实交互 ====================
class DocumentTree {
    constructor() {
        this.init();
    }

    init() {
        this.initSelectMode();
        this.initFolderActions();
        this.initSearch();
        this.initDragDrop();
    }

    initSelectMode() {
        const toggleBtn = document.getElementById('toggle-select-mode');
        const batchActions = document.getElementById('batch-actions');
        const checkboxes = document.querySelectorAll('.doc-checkbox');
        const selectedCount = document.getElementById('selected-count');

        if (!toggleBtn) return;

        toggleBtn.addEventListener('click', () => {
            AppState.isSelectMode = !AppState.isSelectMode;

            if (AppState.isSelectMode) {
                toggleBtn.classList.add('bg-primary', 'text-white');
                toggleBtn.classList.remove('bg-mist');
                checkboxes.forEach(cb => {
                    cb.classList.remove('hidden');
                    animateElement(cb, 'fadeIn 0.3s');
                });
                showToast('已进入批量选择模式');
            } else {
                toggleBtn.classList.remove('bg-primary', 'text-white');
                toggleBtn.classList.add('bg-mist');
                checkboxes.forEach(cb => {
                    cb.classList.add('hidden');
                    cb.checked = false;
                });
                if (batchActions) batchActions.classList.add('hidden');
                AppState.selectedDocs.clear();
                showToast('已退出批量选择模式');
            }
        });

        checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                const item = cb.closest('.folder-item, li');
                const itemName = item?.textContent.trim() || '';

                if (cb.checked) {
                    AppState.selectedDocs.add(itemName);
                } else {
                    AppState.selectedDocs.delete(itemName);
                }

                const count = AppState.selectedDocs.size;
                if (selectedCount) selectedCount.textContent = count;

                if (batchActions) {
                    if (count > 0) {
                        batchActions.classList.remove('hidden');
                        animateElement(batchActions, 'slideInUp 0.3s');
                    } else {
                        batchActions.classList.add('hidden');
                    }
                }
            });
        });

        // 批量操作按钮
        document.querySelectorAll('#batch-actions .action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.textContent.trim();
                showToast(`正在执行批量${action}操作...`, 'info');

                setTimeout(() => {
                    showToast(`已完成${action} ${AppState.selectedDocs.size}项`);
                    AppState.selectedDocs.clear();
                    checkboxes.forEach(cb => cb.checked = false);
                    if (selectedCount) selectedCount.textContent = '0';
                    if (batchActions) batchActions.classList.add('hidden');
                }, 1000);
            });
        });
    }

    initFolderActions() {
        const toggles = document.querySelectorAll('.folder-toggle');

        toggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const item = toggle.closest('.folder-item');
                const children = item?.querySelector('.folder-children');

                if (children) {
                    const isHidden = children.classList.contains('hidden');

                    if (isHidden) {
                        children.classList.remove('hidden');
                        children.style.maxHeight = '0';
                        setTimeout(() => {
                            children.style.transition = 'max-height 0.3s ease-out';
                            children.style.maxHeight = children.scrollHeight + 'px';
                        }, 10);
                    } else {
                        children.style.maxHeight = '0';
                        setTimeout(() => {
                            children.classList.add('hidden');
                            children.style.maxHeight = '';
                        }, 300);
                    }

                    toggle.classList.toggle('fa-angle-right');
                    toggle.classList.toggle('fa-angle-down');
                }
            });
        });

        // 文件夹菜单
        document.querySelectorAll('.folder-menu').forEach(menu => {
            menu.addEventListener('click', (e) => {
                e.stopPropagation();
                showToast('文件夹菜单已打开（模拟）');
            });
        });
    }

    initSearch() {
        const searchInput = document.getElementById('tree-search-input');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const items = document.querySelectorAll('#doc-tree-list .folder-item, .folder-children li');

            let matchCount = 0;

            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                const matches = text.includes(term);

                if (term === '') {
                    item.style.display = '';
                    item.style.backgroundColor = '';
                } else {
                    item.style.display = matches ? '' : 'none';

                    if (matches) {
                        matchCount++;
                        item.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                        animateElement(item, 'pulse 0.5s');
                    } else {
                        item.style.backgroundColor = '';
                    }
                }
            });

            if (term !== '') {
                showToast(`找到 ${matchCount} 项匹配结果`, 'info');
            }
        });
    }

    initDragDrop() {
        const items = document.querySelectorAll('.folder-item[draggable="true"]');

        items.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                item.style.opacity = '0.5';
                item.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', item.textContent);
            });

            item.addEventListener('dragend', (e) => {
                item.style.opacity = '1';
                item.classList.remove('dragging');
            });

            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (!item.classList.contains('dragging')) {
                    item.style.borderTop = '2px solid #3b82f6';
                }
            });

            item.addEventListener('dragleave', () => {
                item.style.borderTop = '';
            });

            item.addEventListener('drop', (e) => {
                e.preventDefault();
                item.style.borderTop = '';

                const data = e.dataTransfer.getData('text/plain');
                if (data) {
                    showToast(`已将"${data.substring(0, 20)}..."移动到"${item.textContent.substring(0, 20)}..."`);
                }
            });
        });
    }
}

// ==================== 初始化所有模块 ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 智能知识库增强交互系统正在初始化...');

    // 创建toast容器
    if (!document.getElementById('toast')) {
        const toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.display = 'none';
        document.body.appendChild(toast);
    }

    // 初始化各个模块
    window.smartEditor = new SmartEditor();
    window.outlineGenerator = new OutlineGenerator();
    window.knowledgeGraph = new EnhancedKnowledgeGraph();
    window.documentTree = new DocumentTree();

    console.log('✅ 所有交互模块初始化完成！');
    showToast('智能知识库已就绪', 'success');
});

// 导出全局对象供调试使用
window.AppState = AppState;
