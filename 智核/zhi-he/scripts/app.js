const summaryToggle = document.getElementById('toggle-summary');
        const summaryContent = document.getElementById('summary-content');
        const sendMessageBtn = document.getElementById('send-message');
        const messageInput = document.getElementById('message-input');
        const chatHistory = document.getElementById('chat-history');
        const searchInput = document.getElementById('global-search');
        const searchModal = document.getElementById('search-modal');
        const searchSuggestions = document.getElementById('search-suggestions');
        const closeSearch = document.getElementById('close-search');
        const taskBoardModal = document.getElementById('task-board-modal');
        const closeTaskBoard = document.getElementById('close-task-board');
        const summaryTaskButtons = document.querySelectorAll('.open-task-board');
        const versionModal = document.getElementById('version-modal');
        const openVersion = document.getElementById('open-version-compare');
        const closeVersion = document.getElementById('close-version');
        // 创建空间模态框相关元素
        const createSpaceModal = document.getElementById('create-space-modal');
        const closeCreateSpace = document.getElementById('close-create-space');
        const cancelCreateSpace = document.getElementById('cancel-create-space');
        const createSpaceForm = document.getElementById('create-space-form');
        const newSpaceName = document.getElementById('new-space-name');
        const newSpaceType = document.getElementById('new-space-type');
        const newSpaceDescription = document.getElementById('new-space-description');
        const agentModal = document.getElementById('agent-modal');
        const closeAgent = document.getElementById('close-agent');
        const subscribeAgent = document.getElementById('subscribe-agent');
        const discussionModal = document.getElementById('discussion-modal');
        const openDiscussion = document.getElementById('open-discussion');
        const closeDiscussion = document.getElementById('close-discussion');
        const publishModal = document.getElementById('publish-modal');
        const openPublish = document.getElementById('open-publish');
        const closePublish = document.getElementById('close-publish');
        const captureDrawer = document.getElementById('capture-drawer');
        const openCapture = document.getElementById('open-capture');
        const closeCapture = document.getElementById('close-capture');
        const toast = document.getElementById('toast');
        const viewButtons = document.querySelectorAll('.view-btn');
        const viewPanels = document.querySelectorAll('.view-panel');
        const sectionButtons = document.querySelectorAll('.section-btn');
        const sectionPanels = document.querySelectorAll('.section-panel');
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');
        const quickCommands = document.querySelectorAll('.quick-command');
        const fillMessages = document.querySelectorAll('.fill-message');
        const quickNoteInput = document.getElementById('quick-note-input');
        const quickNoteList = document.getElementById('quick-note-list');
        const saveQuickNote = document.getElementById('save-quick-note');
        const saveClip = document.getElementById('save-clip');
        const clipUrl = document.getElementById('clip-url');

        // 项目任务管理系统
        const projectTaskManager = {
            // 任务数据
            tasks: [
                {
                    id: 1,
                    title: '审核产品需求文档',
                    assignee: '张明',
                    deadline: '2024-01-18',
                    priority: '高',
                    status: '进行中',
                    description: '审核最新版本的PRD文档，重点关注功能完整性和用户体验'
                },
                {
                    id: 2,
                    title: '参加周例会',
                    assignee: '张明',
                    deadline: '2024-01-18T14:00',
                    priority: '中',
                    status: '待开始',
                    description: '项目团队每周进度汇报会议'
                },
                {
                    id: 3,
                    title: '前端开发实现',
                    assignee: '李华',
                    deadline: '2024-01-20',
                    priority: '高',
                    status: '待开始',
                    description: '完成项目首页的前端开发和交互实现'
                },
                {
                    id: 4,
                    title: '后端API接口开发',
                    assignee: '王五',
                    deadline: '2024-01-22',
                    priority: '高',
                    status: '待开始',
                    description: '开发项目所需的后端API接口'
                },
                {
                    id: 5,
                    title: '单元测试编写',
                    assignee: '李华',
                    deadline: '2024-01-24',
                    priority: '中',
                    status: '待开始',
                    description: '为前端代码编写单元测试用例'
                },
                {
                    id: 6,
                    title: '数据库设计',
                    assignee: '王五',
                    deadline: '2024-01-15',
                    priority: '高',
                    status: '已完成',
                    description: '完成项目数据库表结构设计'
                },
                {
                    id: 7,
                    title: 'UI设计稿评审',
                    assignee: '张明',
                    deadline: '2024-01-10',
                    priority: '中',
                    status: '已完成',
                    description: '评审UI设计师提供的设计稿'
                },
                {
                    id: 8,
                    title: '项目计划制定',
                    assignee: '张明',
                    deadline: '2024-01-05',
                    priority: '高',
                    status: '已完成',
                    description: '制定项目开发计划和里程碑'
                },
                {
                    id: 9,
                    title: '技术栈选型',
                    assignee: '王五',
                    deadline: '2024-01-03',
                    priority: '高',
                    status: '已完成',
                    description: '选择项目合适的技术栈'
                },
                {
                    id: 10,
                    title: '需求分析',
                    assignee: '张明',
                    deadline: '2024-01-08',
                    priority: '高',
                    status: '已完成',
                    description: '完成项目需求分析和文档编写'
                }
            ],
            
            // 添加新任务
            addTask: (taskData) => {
                const newTask = {
                    id: Date.now(),
                    ...taskData
                };
                projectTaskManager.tasks.push(newTask);
                projectTaskManager.renderTasks();
                return newTask;
            },
            
            // 更新任务状态
            updateTaskStatus: (taskId, newStatus) => {
                const task = projectTaskManager.tasks.find(t => t.id === taskId);
                if (task) {
                    task.status = newStatus;
                    projectTaskManager.renderTasks();
                    return true;
                }
                return false;
            },
            
            // 渲染任务列表视图
            renderTaskList: () => {
                const taskList = document.getElementById('task-list');
                if (!taskList) return;
                
                taskList.innerHTML = projectTaskManager.tasks.map(task => {
                    const deadlineClass = task.deadline < new Date().toISOString().split('T')[0] ? 'text-danger' : '';
                    const priorityClass = {
                        '高': 'text-danger',
                        '中': 'text-warning',
                        '低': 'text-muted'
                    }[task.priority] || 'text-muted';
                    
                    return `
                        <tr class="border-t border-line">
                            <td class="py-3">${task.title}</td>
                            <td>${task.assignee}</td>
                            <td class="${deadlineClass}">${task.deadline}</td>
                            <td class="${priorityClass}">${task.priority}</td>
                            <td>
                                <select class="task-status-select text-xs px-2 py-1 border border-line rounded-full bg-white" data-task-id="${task.id}">
                                    <option value="待开始" ${task.status === '待开始' ? 'selected' : ''}>待开始</option>
                                    <option value="进行中" ${task.status === '进行中' ? 'selected' : ''}>进行中</option>
                                    <option value="已完成" ${task.status === '已完成' ? 'selected' : ''}>已完成</option>
                                </select>
                            </td>
                            <td>
                                <button class="text-xs text-primary mr-2">编辑</button>
                                <button class="text-xs text-muted">删除</button>
                            </td>
                        </tr>
                    `;
                }).join('');
                
                // 添加状态变更事件
                document.querySelectorAll('.task-status-select').forEach(select => {
                    select.addEventListener('change', (e) => {
                        const taskId = parseInt(e.target.dataset.taskId);
                        const newStatus = e.target.value;
                        projectTaskManager.updateTaskStatus(taskId, newStatus);
                    });
                });
            },
            
            // 渲染看板视图
            renderTaskBoard: () => {
                const todoColumn = document.getElementById('todo-column');
                const inProgressColumn = document.getElementById('in-progress-column');
                const doneColumn = document.getElementById('done-column');
                
                if (!todoColumn || !inProgressColumn || !doneColumn) return;
                
                // 清空列
                todoColumn.innerHTML = '';
                inProgressColumn.innerHTML = '';
                doneColumn.innerHTML = '';
                
                // 分类任务
                const todoTasks = projectTaskManager.tasks.filter(t => t.status === '待开始');
                const inProgressTasks = projectTaskManager.tasks.filter(t => t.status === '进行中');
                const doneTasks = projectTaskManager.tasks.filter(t => t.status === '已完成');
                
                // 渲染任务卡片
                const renderTaskCard = (task) => {
                    const priorityColor = {
                        '高': 'bg-danger',
                        '中': 'bg-warning',
                        '低': 'bg-muted'
                    }[task.priority] || 'bg-muted';
                    
                    return `
                        <div class="bg-white rounded-xl border border-line shadow-sm p-3 cursor-move transition-shadow hover:shadow-md">
                            <div class="flex items-start justify-between mb-2">
                                <span class="${priorityColor} w-2 h-2 rounded-full"></span>
                                <div class="text-xs text-muted">ID: ${task.id}</div>
                            </div>
                            <h5 class="font-medium text-sm mb-2">${task.title}</h5>
                            <div class="flex items-center gap-2 text-xs mb-2">
                                <span class="bg-ocean-light text-ocean px-2 py-0.5 rounded-full">${task.assignee}</span>
                                <span class="text-muted">${task.deadline}</span>
                            </div>
                            <div class="text-xs text-muted line-clamp-2">${task.description}</div>
                            <div class="mt-3 flex justify-end gap-2">
                                <button class="text-xs text-primary">编辑</button>
                                <button class="text-xs text-muted">删除</button>
                            </div>
                        </div>
                    `;
                };
                
                // 添加任务到对应列
                todoTasks.forEach(task => {
                    todoColumn.innerHTML += renderTaskCard(task);
                });
                
                inProgressTasks.forEach(task => {
                    inProgressColumn.innerHTML += renderTaskCard(task);
                });
                
                doneTasks.forEach(task => {
                    doneColumn.innerHTML += renderTaskCard(task);
                });
                
                // 更新列计数
                document.querySelectorAll('.bg-ocean-light.px-2.py-1.rounded-full')[0].textContent = `${todoTasks.length}项`;
                document.querySelectorAll('.bg-coral-light.px-2.py-1.rounded-full')[0].textContent = `${inProgressTasks.length}项`;
                document.querySelectorAll('.bg-accent-light.px-2.py-1.rounded-full')[0].textContent = `${doneTasks.length}项`;
            },
            
            // 渲染所有视图
            renderTasks: () => {
                projectTaskManager.renderTaskList();
                projectTaskManager.renderTaskBoard();
            }
        };

        
        // 全局DOM元素引用
        let clipList = null;
        let recordToggle = null;
        let recordTimer = null;
        let termButtons = null;
        let termDefinition = null;
        let runQualityCheckBtn = null;
        let maturityLevel = null;
        let qualityScore = null;
        let saveSettings = null;
        let actionButtons = null;
        let agentCards = null;
        let agentTitle = null;
        let agentDesc = null;
        let addFlowStep = null;
        let agentFlow = null;
        let salesChartCanvas = null;
        
        // 初始化用户反馈功能
        function initUserFeedback() {
            console.log('开始初始化用户反馈功能');
            
            // 隐藏完整反馈面板，只显示悬浮按钮
            const feedbackPanel = document.getElementById('user-feedback');
            const quickFeedbackBtn = document.getElementById('quick-feedback-btn');
            
            console.log('反馈面板元素:', feedbackPanel);
            console.log('快速反馈按钮元素:', quickFeedbackBtn);
            
            if (feedbackPanel && quickFeedbackBtn) {
                feedbackPanel.style.display = 'none';
                quickFeedbackBtn.style.display = 'flex';
                console.log('已设置反馈面板初始状态');
                
                // 点击悬浮按钮显示反馈面板
                quickFeedbackBtn.addEventListener('click', function() {
                    console.log('点击了快速反馈按钮');
                    feedbackPanel.style.display = 'block';
                    quickFeedbackBtn.style.display = 'none';
                });
                
                // 关闭反馈面板
                const closeFeedbackBtn = document.getElementById('close-feedback');
                console.log('关闭反馈按钮元素:', closeFeedbackBtn);
                if (closeFeedbackBtn) {
                    closeFeedbackBtn.addEventListener('click', function() {
                        console.log('点击了关闭反馈按钮');
                        feedbackPanel.style.display = 'none';
                        quickFeedbackBtn.style.display = 'flex';
                    });
                }
            }
            
            // 初始化五星评分功能
            console.log('初始化五星评分功能');
            initStarRating();
            
            // 初始化快速反馈按钮
            console.log('初始化快速反馈按钮');
            initQuickFeedback();
            
            // 初始化提交按钮
            console.log('初始化提交按钮');
            initSubmitFeedback();
            
            console.log('用户反馈功能初始化完成');
        }

        document.addEventListener('DOMContentLoaded', () => {
            initUserFeedback();
        });
        
        // 初始化五星评分功能
        function initStarRating() {
            const stars = document.querySelectorAll('.star');
            const ratingText = document.getElementById('rating-text');
            
            stars.forEach(star => {
                star.addEventListener('click', function() {
                    const rating = parseInt(this.dataset.rating);
                    updateStarRating(rating);
                    updateRatingText(rating);
                });
                
                // 鼠标悬停效果
                star.addEventListener('mouseenter', function() {
                    const rating = parseInt(this.dataset.rating);
                    highlightStars(rating);
                });
                
                // 鼠标离开效果
                star.addEventListener('mouseleave', function() {
                    const selectedRating = document.querySelector('.star.active') ? 
                        parseInt(document.querySelector('.star.active').dataset.rating) : 0;
                    updateStarRating(selectedRating);
                });
            });
            
            // 更新星星显示
            function updateStarRating(rating) {
                stars.forEach(star => {
                    const starRating = parseInt(star.dataset.rating);
                    const starIcon = star.querySelector('i');
                    
                    if (starRating <= rating) {
                        star.classList.add('active');
                        starIcon.classList.remove('fa-star-o');
                        starIcon.classList.add('fa-star');
                        starIcon.classList.remove('text-muted');
                        starIcon.classList.add('text-warning');
                    } else {
                        star.classList.remove('active');
                        starIcon.classList.add('fa-star-o');
                        starIcon.classList.remove('fa-star');
                        starIcon.classList.add('text-muted');
                        starIcon.classList.remove('text-warning');
                    }
                });
            }
            
            // 高亮星星（鼠标悬停时）
            function highlightStars(rating) {
                stars.forEach(star => {
                    const starRating = parseInt(star.dataset.rating);
                    const starIcon = star.querySelector('i');
                    
                    if (starRating <= rating) {
                        starIcon.classList.remove('fa-star-o');
                        starIcon.classList.add('fa-star');
                        starIcon.classList.remove('text-muted');
                        starIcon.classList.add('text-warning');
                    } else if (!star.classList.contains('active')) {
                        starIcon.classList.add('fa-star-o');
                        starIcon.classList.remove('fa-star');
                        starIcon.classList.add('text-muted');
                        starIcon.classList.remove('text-warning');
                    }
                });
            }
            
            // 更新评分文本
            function updateRatingText(rating) {
                if (ratingText) {
                    const ratingTexts = [
                        '请选择评分',
                        '不满意',
                        '基本满意',
                        '满意',
                        '很满意',
                        '非常满意'
                    ];
                    ratingText.textContent = ratingTexts[rating];
                    
                    // 根据评分更新文本颜色
                    if (rating <= 2) {
                        ratingText.classList.remove('text-success', 'text-primary', 'text-warning');
                        ratingText.classList.add('text-danger');
                    } else if (rating <= 3) {
                        ratingText.classList.remove('text-success', 'text-primary', 'text-danger');
                        ratingText.classList.add('text-warning');
                    } else {
                        ratingText.classList.remove('text-warning', 'text-danger', 'text-primary');
                        ratingText.classList.add('text-success');
                    }
                }
            }
        }
        
        // 初始化快速反馈按钮
        function initQuickFeedback() {
            const quickFeedbackBtns = document.querySelectorAll('.quick-feedback-btn');
            
            quickFeedbackBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const feedbackType = this.textContent.trim();
                    const feedbackContent = this.dataset.content || feedbackType;
                    
                    // 这里可以添加实际的反馈提交逻辑
                    console.log('快速反馈:', feedbackContent);
                    alert(`已提交反馈：${feedbackType}`);
                    
                    // 提交后可以选择关闭反馈面板
                    const feedbackPanel = document.getElementById('user-feedback');
                    const quickFeedbackBtn = document.getElementById('quick-feedback-btn');
                    
                    if (feedbackPanel && quickFeedbackBtn) {
                        feedbackPanel.style.display = 'none';
                        quickFeedbackBtn.style.display = 'flex';
                    }
                });
            });
        }
        
        // 初始化提交按钮
        function initSubmitFeedback() {
            const submitBtn = document.getElementById('submit-feedback');
            
            if (submitBtn) {
                submitBtn.addEventListener('click', function() {
                    // 获取评分
                    const selectedStar = document.querySelector('.star.active');
                    const rating = selectedStar ? parseInt(selectedStar.dataset.rating) : 0;
                    
                    // 获取详细反馈内容
                    const feedbackContent = document.getElementById('feedback-content');
                    const content = feedbackContent ? feedbackContent.value.trim() : '';
                    
                    // 验证评分
                    if (rating === 0) {
                        alert('请先为知识质量评分');
                        return;
                    }
                    
                    // 提交反馈
                    const feedback = {
                        rating: rating,
                        content: content,
                        timestamp: new Date().toISOString(),
                        author: '当前用户',
                        knowledgeId: 'current-knowledge'
                    };
                    
                    // 保存反馈
                    saveFeedback(feedback);
                    
                    // 计算并更新质量动态评估
                    calculateDynamicQuality();
                    
                    alert(`感谢您的反馈！\n评分：${rating}星\n反馈内容：${content || '无'}`);
                    
                    // 重置表单
                    resetFeedbackForm();
                    
                    // 关闭反馈面板
                    const feedbackPanel = document.getElementById('user-feedback');
                    const quickFeedbackBtn = document.getElementById('quick-feedback-btn');
                    
                    if (feedbackPanel && quickFeedbackBtn) {
                        feedbackPanel.style.display = 'none';
                        quickFeedbackBtn.style.display = 'flex';
                    }
                });
            }
        }
        
        // 重置反馈表单
        function resetFeedbackForm() {
            // 重置星星评分
            const stars = document.querySelectorAll('.star');
            stars.forEach(star => {
                star.classList.remove('active');
                const starIcon = star.querySelector('i');
                starIcon.classList.add('fa-star-o');
                starIcon.classList.remove('fa-star');
                starIcon.classList.add('text-muted');
                starIcon.classList.remove('text-warning');
            });
            
            // 重置评分文本
            const ratingText = document.getElementById('rating-text');
            if (ratingText) {
                ratingText.textContent = '请选择评分';
                ratingText.classList.remove('text-success', 'text-warning', 'text-danger');
                ratingText.classList.add('text-muted');
            }
            
            // 重置详细反馈内容
            const feedbackContent = document.getElementById('feedback-content');
            if (feedbackContent) {
                feedbackContent.value = '';
            }
        }
        
        // 保存反馈数据
        function saveFeedback(feedback) {
            // 获取现有反馈
            let feedbacks = JSON.parse(localStorage.getItem('knowledgeFeedbacks')) || {};
            
            // 按知识ID分组
            if (!feedbacks[feedback.knowledgeId]) {
                feedbacks[feedback.knowledgeId] = [];
            }
            
            // 添加新反馈
            feedbacks[feedback.knowledgeId].push(feedback);
            
            // 保存到localStorage
            localStorage.setItem('knowledgeFeedbacks', JSON.stringify(feedbacks));
            
            console.log('反馈已保存:', feedback);
        }
        
        // 计算动态质量评分
        function calculateDynamicQuality() {
            // 获取所有反馈
            const feedbacks = JSON.parse(localStorage.getItem('knowledgeFeedbacks')) || {};
            const knowledgeFeedbacks = feedbacks['current-knowledge'] || [];
            
            if (knowledgeFeedbacks.length === 0) return;
            
            // 计算平均评分
            const totalRating = knowledgeFeedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
            const averageRating = totalRating / knowledgeFeedbacks.length;
            
            // 分类反馈
            const positiveFeedbacks = knowledgeFeedbacks.filter(f => f.rating >= 4).length;
            const neutralFeedbacks = knowledgeFeedbacks.filter(f => f.rating === 3).length;
            const negativeFeedbacks = knowledgeFeedbacks.filter(f => f.rating <= 2).length;
            
            // 计算质量分数（1-100）
            const qualityScore = Math.round(averageRating * 20);
            
            // 保存质量评估结果
            const qualityAssessment = {
                averageRating: averageRating,
                qualityScore: qualityScore,
                feedbackCount: knowledgeFeedbacks.length,
                positiveRatio: positiveFeedbacks / knowledgeFeedbacks.length,
                negativeRatio: negativeFeedbacks / knowledgeFeedbacks.length,
                lastUpdated: new Date().toISOString()
            };
            
            localStorage.setItem('knowledgeQuality', JSON.stringify(qualityAssessment));
            
            // 更新质量显示
            updateQualityDisplay(qualityScore);
            
            // 触发自动质量治理
            autoQualityGovernance(qualityAssessment);
            
            console.log('动态质量评估完成:', qualityAssessment);
        }
        
        // 更新质量显示
        function updateQualityDisplay(qualityScore) {
            // 查找质量显示元素
            const qualityElements = document.querySelectorAll('.quality-score, .maturity-score');
            
            qualityElements.forEach(element => {
                // 根据质量分数更新颜色
                let colorClass = '';
                if (qualityScore >= 80) {
                    colorClass = 'text-success';
                } else if (qualityScore >= 60) {
                    colorClass = 'text-primary';
                } else if (qualityScore >= 40) {
                    colorClass = 'text-warning';
                } else {
                    colorClass = 'text-danger';
                }
                
                // 更新分数显示
                element.textContent = qualityScore;
                
                // 更新颜色类
                element.classList.remove('text-success', 'text-primary', 'text-warning', 'text-danger');
                element.classList.add(colorClass);
            });
        }
        
        // 自动质量治理
        function autoQualityGovernance(assessment) {
            // 获取自动治理配置
            const governanceConfig = JSON.parse(localStorage.getItem('qualityGovernanceConfig')) || {
                autoRemove: true,
                lowQualityThreshold: 40,
                warningThreshold: 60,
                qualityInspection: true
            };
            
            // 低质量自动处理
            if (governanceConfig.autoRemove && assessment.qualityScore < governanceConfig.lowQualityThreshold) {
                // 这里可以添加实际的下架逻辑
                console.log('触发低质量自动处理');
                showQualityAlert('当前知识质量较低，已自动标记为待优化', 'warning');
            }
            
            // 质量警告
            if (assessment.qualityScore < governanceConfig.warningThreshold && assessment.qualityScore >= governanceConfig.lowQualityThreshold) {
                console.log('触发质量警告');
                showQualityAlert('当前知识质量需要提升', 'info');
            }
            
            // 高质量推荐
            if (assessment.qualityScore >= 90 && assessment.feedbackCount >= 10) {
                console.log('触发高质量推荐');
                showQualityAlert('当前知识质量优秀，建议申请精品认证', 'success');
            }
        }
        
        // 显示质量警报
        function showQualityAlert(message, type = 'info') {
            // 创建警报元素
            const alert = document.createElement('div');
            alert.className = `fixed top-6 right-6 px-4 py-3 rounded-lg shadow-lg z-50 text-sm ${getAlertClass(type)}`;
            alert.innerHTML = `
                <div class="flex items-center gap-2">
                    <i class="fa ${getAlertIcon(type)}"></i>
                    <span>${message}</span>
                </div>
            `;
            
            // 添加到页面
            document.body.appendChild(alert);
            
            // 3秒后自动消失
            setTimeout(() => {
                alert.remove();
            }, 3000);
        }
        
        // 获取警报样式类
        function getAlertClass(type) {
            const classes = {
                success: 'bg-success text-white',
                warning: 'bg-warning text-white',
                danger: 'bg-danger text-white',
                info: 'bg-primary text-white'
            };
            return classes[type] || classes.info;
        }
        
        // 获取警报图标
        function getAlertIcon(type) {
            const icons = {
                success: 'fa-check-circle',
                warning: 'fa-exclamation-triangle',
                danger: 'fa-times-circle',
                info: 'fa-info-circle'
            };
            return icons[type] || icons.info;
        }

        summaryToggle.addEventListener('click', () => {
            summaryContent.classList.toggle('hidden');
            summaryToggle.querySelector('i').classList.toggle('fa-chevron-up');
            summaryToggle.querySelector('i').classList.toggle('fa-chevron-down');
        });

        function getCurrentTime() {
            const now = new Date();
            return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        }

        function sendMessage() {
            const message = messageInput.value.trim();
            if (!message) return;
            const userMessage = `
                <div class="flex items-start justify-end gap-3">
                    <div class="bg-primary/10 rounded-xl p-4 shadow-soft max-w-2xl">
                        <p class="text-sm">${message}</p>
                    </div>
                    <img src="https://p3-doubao-search-sign.byteimg.com/pgc-image/6323b43dac9b41db978bffd8c580ac63~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783481830&x-signature=E%2BA4UNzvvjJgdRQb3RrhhengBCo%3D" class="w-9 h-9 rounded-full" alt="用户">
                </div>
            `;
            chatHistory.insertAdjacentHTML('beforeend', userMessage);
            messageInput.value = '';
            messageInput.style.height = 'auto';
            chatHistory.scrollTop = chatHistory.scrollHeight;
            setTimeout(() => {
                const systemMessage = `
                    <div class="flex items-start gap-3">
                        <div class="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center"><i class="fa fa-robot"></i></div>
                        <div class="bg-white rounded-xl p-4 shadow-soft max-w-2xl">
                            <p class="text-sm">已接收“${message}”，正在调用智能体处理并生成初稿。</p>
                            <p class="text-xs text-muted mt-2">${getCurrentTime()}</p>
                        </div>
                    </div>
                `;
                chatHistory.insertAdjacentHTML('beforeend', systemMessage);
                chatHistory.scrollTop = chatHistory.scrollHeight;
            }, 600);
        }

        sendMessageBtn.addEventListener('click', sendMessage);
        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        messageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = `${this.scrollHeight}px`;
        });

        quickCommands.forEach(btn => {
            btn.addEventListener('click', () => {
                messageInput.value = `${btn.dataset.command} `;
                messageInput.focus();
            });
        });

        fillMessages.forEach(btn => {
            btn.addEventListener('click', () => {
                messageInput.value = btn.textContent.trim();
                messageInput.focus();
            });
        });

        searchInput.addEventListener('focus', () => {
            if (searchSuggestions) {
                searchSuggestions.classList.remove('hidden');
            }
        });
        searchInput.addEventListener('blur', () => {
            if (searchSuggestions) {
                setTimeout(() => searchSuggestions.classList.add('hidden'), 200);
            }
        });
        closeSearch.addEventListener('click', () => searchModal.classList.add('hidden'));
        if (searchSuggestions) {
            searchSuggestions.querySelectorAll('li, span').forEach(item => {
                item.addEventListener('click', () => {
                    searchInput.value = item.textContent.trim();
                    searchSuggestions.classList.add('hidden');
                });
            });
        }
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                searchModal.classList.remove('hidden');
            }
            if (e.key === 'Escape') {
                searchModal.classList.add('hidden');
                taskBoardModal.classList.add('hidden');
                versionModal.classList.add('hidden');
                agentModal.classList.add('hidden');
                discussionModal.classList.add('hidden');
                publishModal.classList.add('hidden');
                captureDrawer.classList.add('hidden');
            }
        });


        // 初始化任务数据
        projectTaskManager.renderTasks();
        
        closeTaskBoard.addEventListener('click', () => taskBoardModal.classList.add('hidden'));
        taskBoardModal.addEventListener('click', (e) => {
            if (e.target === taskBoardModal) taskBoardModal.classList.add('hidden');
        });
        summaryTaskButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                taskBoardModal.classList.remove('hidden');
                // 每次打开任务看板时重新渲染任务数据
                projectTaskManager.renderTasks();
            });
        });
        
        // 视图切换按钮
        const listViewBtn = document.getElementById('list-view-btn');
        const boardViewBtn = document.getElementById('board-view-btn');
        const calendarViewBtn = document.getElementById('calendar-view-btn');
        
        // 视图容器
        const listView = document.getElementById('list-view');
        const boardView = document.getElementById('board-view');
        const calendarView = document.getElementById('calendar-view');
        
        // 视图切换功能
        const switchView = (viewName) => {
            // 隐藏所有视图
            listView.classList.add('hidden');
            boardView.classList.add('hidden');
            calendarView.classList.add('hidden');
            
            // 重置按钮状态
            listViewBtn.className = 'px-3 py-1 rounded-full bg-white border border-line';
            boardViewBtn.className = 'px-3 py-1 rounded-full bg-white border border-line';
            calendarViewBtn.className = 'px-3 py-1 rounded-full bg-white border border-line';
            
            // 显示选择的视图
            if (viewName === 'list') {
                listView.classList.remove('hidden');
                listViewBtn.className = 'px-3 py-1 rounded-full bg-primary text-white';
            } else if (viewName === 'board') {
                boardView.classList.remove('hidden');
                boardViewBtn.className = 'px-3 py-1 rounded-full bg-primary text-white';
            } else if (viewName === 'calendar') {
                calendarView.classList.remove('hidden');
                calendarViewBtn.className = 'px-3 py-1 rounded-full bg-primary text-white';
            }
        };
        
        // 视图切换事件
        if (listViewBtn) listViewBtn.addEventListener('click', () => switchView('list'));
        if (boardViewBtn) boardViewBtn.addEventListener('click', () => switchView('board'));
        if (calendarViewBtn) calendarViewBtn.addEventListener('click', () => switchView('calendar'));
        
        // 新建任务相关
        const createTaskModal = document.getElementById('create-task-modal');
        const createTaskBtn = document.getElementById('create-task-btn');
        const closeCreateTask = document.getElementById('close-create-task');
        const cancelTask = document.getElementById('cancel-task');
        const saveTask = document.getElementById('save-task');
        
        // 打开新建任务模态框
        if (createTaskBtn) createTaskBtn.addEventListener('click', () => {
            if (createTaskModal) createTaskModal.classList.remove('hidden');
        });
        
        // 关闭新建任务模态框
        const closeCreateTaskModal = () => {
            if (createTaskModal) createTaskModal.classList.add('hidden');
            // 清空表单
            const taskTitle = document.getElementById('task-title');
            const taskAssignee = document.getElementById('task-assignee');
            const taskDeadline = document.getElementById('task-deadline');
            const taskPriority = document.getElementById('task-priority');
            const taskDescription = document.getElementById('task-description');
            
            if (taskTitle) taskTitle.value = '';
            if (taskAssignee) taskAssignee.value = '';
            if (taskDeadline) taskDeadline.value = '';
            if (taskPriority) taskPriority.value = '高';
            if (taskDescription) taskDescription.value = '';
        };
        
        if (closeCreateTask) closeCreateTask.addEventListener('click', closeCreateTaskModal);
        if (cancelTask) cancelTask.addEventListener('click', closeCreateTaskModal);
        
        // 点击模态框外部关闭
        if (createTaskModal) {
            createTaskModal.addEventListener('click', (e) => {
                if (e.target === createTaskModal) {
                    closeCreateTaskModal();
                }
            });
        }
        
        // 保存新任务
        if (saveTask) saveTask.addEventListener('click', () => {
            const taskTitle = document.getElementById('task-title');
            const taskAssignee = document.getElementById('task-assignee');
            const taskDeadline = document.getElementById('task-deadline');
            const taskPriority = document.getElementById('task-priority');
            const taskDescription = document.getElementById('task-description');
            
            if (!taskTitle || !taskAssignee || !taskDeadline || !taskPriority || !taskDescription) {
                showToast('表单元素缺失', 'error');
                return;
            }
            
            const title = taskTitle.value.trim();
            const assignee = taskAssignee.value;
            const deadline = taskDeadline.value;
            const priority = taskPriority.value;
            const description = taskDescription.value.trim();
            
            if (!title) {
                showToast('请输入任务标题', 'error');
                return;
            }
            
            if (!assignee) {
                showToast('请选择负责人', 'error');
                return;
            }
            
            if (!deadline) {
                showToast('请选择截止日期', 'error');
                return;
            }
            
            const newTask = {
                title,
                assignee,
                deadline,
                priority,
                status: '待开始',
                description
            };
            
            projectTaskManager.addTask(newTask);
            closeCreateTaskModal();
            showToast('任务创建成功');
        });

        openVersion.addEventListener('click', () => versionModal.classList.remove('hidden'));
        closeVersion.addEventListener('click', () => versionModal.classList.add('hidden'));

        // 文档协作系统
        const documentCollaborationSystem = {
            // 文档数据
            documents: [
                {
                    id: 'doc-001',
                    title: '华东区市场趋势分析.docx',
                    path: '📊 市场分析/华东区市场趋势分析.docx',
                    type: 'document',
                    size: '2.4 MB',
                    lastModified: '2024-07-12',
                    lastModifier: '张明',
                    version: '2.1',
                    versions: [
                        { version: '2.1', date: '2024-07-12', author: '张明', description: '新增竞品分析章节' },
                        { version: '2.0', date: '2024-07-10', author: '李华', description: '更新2024年Q2数据' },
                        { version: '1.0', date: '2024-07-05', author: '王五', description: '初始版本' }
                    ],
                    permissions: [
                        { user: '张明', role: '编辑者' },
                        { user: '李华', role: '查看者' },
                        { user: '王五', role: '管理者' }
                    ],
                    status: '已发布'
                },
                {
                    id: 'doc-002',
                    title: '竞品对比报告.pdf',
                    path: '📊 市场分析/竞品对比报告.pdf',
                    type: 'document',
                    size: '1.8 MB',
                    lastModified: '2024-07-10',
                    lastModifier: '李华',
                    version: '1.0',
                    versions: [
                        { version: '1.0', date: '2024-07-10', author: '李华', description: '初始版本' }
                    ],
                    permissions: [
                        { user: '李华', role: '编辑者' },
                        { user: '张明', role: '查看者' },
                        { user: '王五', role: '管理者' }
                    ],
                    status: '已发布'
                },
                {
                    id: 'doc-003',
                    title: 'Q3销售计划.docx',
                    path: '💼 销售管理/Q3销售计划.docx',
                    type: 'document',
                    size: '3.2 MB',
                    lastModified: '2024-07-15',
                    lastModifier: '王五',
                    version: '1.2',
                    versions: [
                        { version: '1.2', date: '2024-07-15', author: '王五', description: '调整销售目标' },
                        { version: '1.1', date: '2024-07-12', author: '张明', description: '添加区域分配' },
                        { version: '1.0', date: '2024-07-10', author: '王五', description: '初始版本' }
                    ],
                    permissions: [
                        { user: '王五', role: '管理者' },
                        { user: '张明', role: '编辑者' },
                        { user: '李华', role: '查看者' }
                    ],
                    status: '进行中'
                }
            ],
            
            // 获取文档版本历史
            getDocumentVersions: (docId) => {
                const doc = documentCollaborationSystem.documents.find(d => d.id === docId);
                return doc ? doc.versions : [];
            },
            
            // 创建新版本
            createNewVersion: (docId, description, author = '当前用户') => {
                const doc = documentCollaborationSystem.documents.find(d => d.id === docId);
                if (doc) {
                    const versionParts = doc.version.split('.').map(Number);
                    versionParts[1] += 1;
                    const newVersion = versionParts.join('.');
                    
                    doc.versions.unshift({
                        version: newVersion,
                        date: new Date().toISOString().split('T')[0],
                        author,
                        description
                    });
                    
                    doc.version = newVersion;
                    doc.lastModified = new Date().toISOString().split('T')[0];
                    doc.lastModifier = author;
                    
                    showToast(`文档 ${doc.title} 已创建新版本 ${newVersion}`);
                    return newVersion;
                }
                return null;
            },
            
            // 共享文档
            shareDocument: (docId, user, role) => {
                const doc = documentCollaborationSystem.documents.find(d => d.id === docId);
                if (doc) {
                    const existingPermission = doc.permissions.find(p => p.user === user);
                    if (existingPermission) {
                        existingPermission.role = role;
                    } else {
                        doc.permissions.push({ user, role });
                    }
                    showToast(`文档 ${doc.title} 已共享给 ${user}（${role}）`);
                    return true;
                }
                return false;
            },
            
            // 设置文档权限
            setDocumentPermission: (docId, user, role) => {
                return documentCollaborationSystem.shareDocument(docId, user, role);
            },
            
            // 获取文档权限
            getDocumentPermissions: (docId) => {
                const doc = documentCollaborationSystem.documents.find(d => d.id === docId);
                return doc ? doc.permissions : [];
            },
            
            // 检查文档权限
            checkDocumentPermission: (docId, user, requiredRole) => {
                const permissions = documentCollaborationSystem.getDocumentPermissions(docId);
                const userPermission = permissions.find(p => p.user === user);
                
                if (!userPermission) return false;
                
                const roleHierarchy = { '查看者': 1, '编辑者': 2, '管理者': 3 };
                return roleHierarchy[userPermission.role] >= roleHierarchy[requiredRole];
            }
        };
        
        // 文档树交互
        const docTreeList = document.getElementById('doc-tree-list');
        if (docTreeList) {
            // 文件夹展开/折叠
            const folderToggles = docTreeList.querySelectorAll('.folder-toggle');
            folderToggles.forEach(toggle => {
                toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const folderItem = toggle.closest('.folder-item');
                    const folderChildren = folderItem.querySelector('.folder-children');
                    
                    if (folderChildren) {
                        folderChildren.classList.toggle('hidden');
                        toggle.classList.toggle('fa-angle-right');
                        toggle.classList.toggle('fa-angle-down');
                    }
                });
            });
            
            // 文档项点击事件
            const docItems = docTreeList.querySelectorAll('li:not(.folder-item)');
            docItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // 移除其他选中状态
                    docTreeList.querySelectorAll('li').forEach(li => li.classList.remove('bg-mist'));
                    // 添加当前选中状态
                    item.classList.add('bg-mist');
                    
                    const docTitle = item.querySelector('span').textContent;
                    showToast(`正在打开文档: ${docTitle}`);
                });
            });
        }
        
        // 增强版本对比功能
        openVersion.addEventListener('click', () => {
            versionModal.classList.remove('hidden');
            // 这里可以添加版本对比的逻辑
            showToast('版本对比功能已打开');
        });
        
        // 增强版本对比模态框
        if (versionModal) {
            // 这里可以添加更多版本对比的功能
        }
        
        // 添加文档共享功能
        const shareButtons = document.querySelectorAll('[title="分享"], .fa-share');
        shareButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const shareBtn = e.target.closest('button');
                if (shareBtn) {
                    showToast('文档分享功能已打开');
                    // 这里可以打开文档分享模态框
                }
            });
        });

        if (agentCards) {
            agentCards.forEach(card => {
                card.addEventListener('click', () => {
                    if (agentTitle && agentDesc && agentModal) {
                        agentTitle.textContent = card.dataset.agent;
                        agentDesc.textContent = `${card.dataset.agent} 将根据企业知识图谱与智能体工厂能力提供专项服务。`;
                        agentModal.classList.remove('hidden');
                    }
                });
            });
        }
        if (closeAgent && agentModal) {
            closeAgent.addEventListener('click', () => agentModal.classList.add('hidden'));
        }
        subscribeAgent.addEventListener('click', () => {
            subscribeAgent.textContent = '已订阅';
            subscribeAgent.classList.add('bg-success');
        });

        // 沟通协作系统
        const communicationCollaborationSystem = {
            // 讨论数据
            discussions: [
                {
                    id: 'disc-001',
                    title: '关于Q3产品定价策略的讨论',
                    content: '大家好，我想和大家讨论一下Q3的产品定价策略。根据市场调研数据，我们的主要竞争对手已经调整了定价，我们需要考虑如何应对...',
                    author: '张明',
                    avatar: 'https://ui-avatars.com/api/?name=张明&background=random&color=fff',
                    createdAt: '2024-07-15T14:30:00',
                    likes: 8,
                    comments: [
                        {
                            id: 'com-001',
                            content: '我认为我们应该采用差异化定价策略，突出我们产品的独特价值...',
                            author: '李华',
                            avatar: 'https://ui-avatars.com/api/?name=李华&background=random&color=fff',
                            createdAt: '2024-07-15T14:45:00',
                            likes: 5
                        },
                        {
                            id: 'com-002',
                            content: '同意李华的观点，我们需要强调我们的服务优势和技术创新...',
                            author: '王五',
                            avatar: 'https://ui-avatars.com/api/?name=王五&background=random&color=fff',
                            createdAt: '2024-07-15T15:10:00',
                            likes: 3
                        }
                    ],
                    tags: ['定价', '市场', '策略'],
                    spaceId: 'project-space'
                },
                {
                    id: 'disc-002',
                    title: '华东区销售目标达成情况分析',
                    content: '各位同事，华东区Q2的销售目标完成率为85%，距离目标还有一定差距。我们需要分析原因并制定改进措施...',
                    author: '李华',
                    avatar: 'https://ui-avatars.com/api/?name=李华&background=random&color=fff',
                    createdAt: '2024-07-14T09:15:00',
                    likes: 12,
                    comments: [
                        {
                            id: 'com-003',
                            content: '主要问题是新客户开发不足，我们需要加强渠道建设...',
                            author: '张明',
                            avatar: 'https://ui-avatars.com/api/?name=张明&background=random&color=fff',
                            createdAt: '2024-07-14T10:30:00',
                            likes: 7
                        }
                    ],
                    tags: ['销售', '目标', '分析'],
                    spaceId: 'team-space'
                },
                {
                    id: 'disc-003',
                    title: '技术团队招聘需求讨论',
                    content: '随着业务的发展，我们需要扩大技术团队规模。目前计划招聘前端开发、后端开发和测试工程师各2名...',
                    author: '王五',
                    avatar: 'https://ui-avatars.com/api/?name=王五&background=random&color=fff',
                    createdAt: '2024-07-13T16:20:00',
                    likes: 5,
                    comments: [],
                    tags: ['招聘', '技术', '团队'],
                    spaceId: 'theme-space'
                }
            ],
            
            // 通知数据
            notifications: [
                {
                    id: 'notif-001',
                    type: 'discussion',
                    title: '您有新的讨论回复',
                    content: '李华回复了您的讨论"关于Q3产品定价策略的讨论"',
                    createdAt: '2024-07-15T14:45:00',
                    isRead: false,
                    link: '#disc-001'
                },
                {
                    id: 'notif-002',
                    type: 'task',
                    title: '新任务分配',
                    content: '张明分配给您一个新任务："竞品分析报告撰写"',
                    createdAt: '2024-07-15T10:00:00',
                    isRead: false,
                    link: '#task-001'
                },
                {
                    id: 'notif-003',
                    type: 'document',
                    title: '文档更新通知',
                    content: '王五更新了文档"华东区市场趋势分析.docx"',
                    createdAt: '2024-07-14T16:30:00',
                    isRead: true,
                    link: '#doc-001'
                }
            ],
            
            // 创建新讨论
            createDiscussion: (title, content, author = '当前用户') => {
                // 获取当前选中的空间
                const currentSpaceId = typeof teamSpaceManager !== 'undefined' ? teamSpaceManager.currentSpace : 'project-space';
                
                const newDiscussion = {
                    id: `disc-${Date.now()}`,
                    title,
                    content,
                    author,
                    avatar: `https://ui-avatars.com/api/?name=${author}&background=random&color=fff`,
                    createdAt: new Date().toISOString(),
                    likes: 0,
                    comments: [],
                    tags: [],
                    spaceId: currentSpaceId
                };
                
                communicationCollaborationSystem.discussions.unshift(newDiscussion);
                communicationCollaborationSystem.renderDiscussions();
                
                // 发送通知给相关人员
                communicationCollaborationSystem.sendNotification({
                    type: 'discussion',
                    title: '新讨论发起',
                    content: `${author}发起了新讨论：${title}`,
                    link: `#${newDiscussion.id}`
                });
                
                return newDiscussion;
            },
            
            // 回复讨论
            replyToDiscussion: (discussionId, content, author = '当前用户') => {
                const discussion = communicationCollaborationSystem.discussions.find(d => d.id === discussionId);
                if (discussion) {
                    const newComment = {
                        id: `com-${Date.now()}`,
                        content,
                        author,
                        avatar: `https://ui-avatars.com/api/?name=${author}&background=random&color=fff`,
                        createdAt: new Date().toISOString(),
                        likes: 0
                    };
                    
                    discussion.comments.push(newComment);
                    communicationCollaborationSystem.renderDiscussions();
                    
                    // 发送通知给讨论发起者
                    if (author !== discussion.author) {
                        communicationCollaborationSystem.sendNotification({
                            type: 'discussion',
                            title: '您的讨论有新回复',
                            content: `${author}回复了您的讨论：${discussion.title}`,
                            link: `#${discussion.id}`
                        });
                    }
                    
                    return newComment;
                }
                return null;
            },
            
            // 点赞讨论
            likeDiscussion: (discussionId) => {
                const discussion = communicationCollaborationSystem.discussions.find(d => d.id === discussionId);
                if (discussion) {
                    discussion.likes++;
                    communicationCollaborationSystem.renderDiscussions();
                    return true;
                }
                return false;
            },
            
            // 点赞评论
            likeComment: (discussionId, commentId) => {
                const discussion = communicationCollaborationSystem.discussions.find(d => d.id === discussionId);
                if (discussion) {
                    const comment = discussion.comments.find(c => c.id === commentId);
                    if (comment) {
                        comment.likes++;
                        communicationCollaborationSystem.renderDiscussions();
                        return true;
                    }
                }
                return false;
            },
            
            // 发送通知
            sendNotification: (notificationData) => {
                const newNotification = {
                    id: `notif-${Date.now()}`,
                    ...notificationData,
                    createdAt: new Date().toISOString(),
                    isRead: false
                };
                
                communicationCollaborationSystem.notifications.unshift(newNotification);
                
                // 显示通知
                communicationCollaborationSystem.showNotification(newNotification);
                
                return newNotification;
            },
            
            // 显示通知
            showNotification: (notification) => {
                const notificationEl = document.createElement('div');
                notificationEl.className = 'notification fixed top-4 right-4 bg-white border border-line rounded-lg shadow-lg p-4 flex items-start gap-3 z-50 animate-slide-in';
                
                const iconMap = {
                    'discussion': 'fa-comments',
                    'task': 'fa-tasks',
                    'document': 'fa-file-text-o',
                    'system': 'fa-bell'
                };
                
                notificationEl.innerHTML = `
                    <div class="p-2 rounded-full bg-primary/10 text-primary">
                        <i class="fa ${iconMap[notification.type] || 'fa-bell'}"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="font-medium text-sm">${notification.title}</p>
                        <p class="text-xs text-muted truncate">${notification.content}</p>
                    </div>
                    <button class="close-notification text-muted hover:text-ink">
                        <i class="fa fa-times"></i>
                    </button>
                `;
                
                document.body.appendChild(notificationEl);
                
                // 自动关闭通知
                setTimeout(() => {
                    if (notificationEl.parentNode) {
                        notificationEl.classList.add('animate-slide-out');
                        setTimeout(() => notificationEl.remove(), 300);
                    }
                }, 5000);
                
                // 关闭按钮事件
                const closeBtn = notificationEl.querySelector('.close-notification');
                closeBtn.addEventListener('click', () => notificationEl.remove());
            },
            
            // 渲染讨论列表
            renderDiscussions: () => {
                const discussionList = document.getElementById('discussion-list');
                if (!discussionList) return;
                
                // 获取当前选中的空间
                const currentSpaceId = typeof teamSpaceManager !== 'undefined' ? teamSpaceManager.currentSpace : 'project-space';
                
                // 过滤出当前空间的讨论
                const currentSpaceDiscussions = communicationCollaborationSystem.discussions.filter(discussion => discussion.spaceId === currentSpaceId);
                
                discussionList.innerHTML = currentSpaceDiscussions.map(discussion => {
                    const date = new Date(discussion.createdAt).toLocaleString('zh-CN');
                    
                    return `
                        <div class="discussion-item rounded-xl border border-line p-4" id="${discussion.id}">
                            <div class="flex items-start gap-3">
                                <img src="${discussion.avatar}" alt="${discussion.author}" class="w-8 h-8 rounded-full object-cover">
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-2">
                                        <h4 class="font-medium text-sm">${discussion.title}</h4>
                                        <span class="text-xs text-muted">${date}</span>
                                    </div>
                                    <p class="text-sm mt-1 text-muted">${discussion.author}</p>
                                    <p class="text-sm mt-2">${discussion.content}</p>
                                    
                                    <!-- 标签 -->
                                    ${discussion.tags.length > 0 ? `
                                        <div class="flex gap-2 mt-2 flex-wrap">
                                            ${discussion.tags.map(tag => `<span class="text-xs px-2 py-0.5 bg-mist rounded-full">${tag}</span>`).join('')}
                                        </div>
                                    ` : ''}
                                    
                                    <!-- 互动按钮 -->
                                    <div class="flex items-center gap-4 mt-3 text-sm">
                                        <button class="like-discussion flex items-center gap-1 text-muted hover:text-primary" data-discussion-id="${discussion.id}">
                                            <i class="fa fa-thumbs-o-up"></i>
                                            <span>${discussion.likes}</span>
                                        </button>
                                        <button class="comment-discussion flex items-center gap-1 text-muted hover:text-primary" data-discussion-id="${discussion.id}">
                                            <i class="fa fa-comment-o"></i>
                                            <span>${discussion.comments.length}</span>
                                        </button>
                                        <button class="share-discussion flex items-center gap-1 text-muted hover:text-primary">
                                            <i class="fa fa-share"></i>
                                            <span>分享</span>
                                        </button>
                                    </div>
                                    
                                    <!-- 评论列表 -->
                                    ${discussion.comments.length > 0 ? `
                                        <div class="mt-4 space-y-3">
                                            ${discussion.comments.map(comment => {
                                                const commentDate = new Date(comment.createdAt).toLocaleString('zh-CN');
                                                return `
                                                    <div class="comment-item pl-4 border-l-2 border-line py-2">
                                                        <div class="flex items-start gap-2">
                                                            <img src="${comment.avatar}" alt="${comment.author}" class="w-6 h-6 rounded-full object-cover">
                                                            <div class="flex-1 min-w-0">
                                                                <div class="flex items-center gap-2">
                                                                    <p class="text-sm font-medium">${comment.author}</p>
                                                                    <span class="text-xs text-muted">${commentDate}</span>
                                                                </div>
                                                                <p class="text-sm mt-1">${comment.content}</p>
                                                                <div class="flex items-center gap-3 mt-2 text-xs">
                                                                    <button class="like-comment flex items-center gap-1 text-muted hover:text-primary" data-discussion-id="${discussion.id}" data-comment-id="${comment.id}">
                                                                        <i class="fa fa-thumbs-o-up"></i>
                                                                        <span>${comment.likes}</span>
                                                                    </button>
                                                                    <button class="reply-comment flex items-center gap-1 text-muted hover:text-primary">
                                                                        <i class="fa fa-reply"></i>
                                                                        <span>回复</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                `;
                                            }).join('')}
                                        </div>
                                    ` : ''}
                                    
                                    <!-- 评论输入框 -->
                                    <div class="mt-3">
                                        <textarea class="w-full border border-line rounded-lg px-3 py-2 text-sm" rows="2" placeholder="写下你的回复..." data-discussion-id="${discussion.id}"></textarea>
                                        <div class="flex justify-end mt-2">
                                            <button class="send-comment px-3 py-1.5 bg-primary text-white rounded-lg text-sm" data-discussion-id="${discussion.id}">发送</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
                
                // 绑定事件
                communicationCollaborationSystem.bindDiscussionEvents();
            },
            
            // 绑定讨论事件
            bindDiscussionEvents: () => {
                // 点赞讨论
                document.querySelectorAll('.like-discussion').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const discussionId = btn.dataset.discussionId;
                        communicationCollaborationSystem.likeDiscussion(discussionId);
                    });
                });
                
                // 点赞评论
                document.querySelectorAll('.like-comment').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const discussionId = btn.dataset.discussionId;
                        const commentId = btn.dataset.commentId;
                        communicationCollaborationSystem.likeComment(discussionId, commentId);
                    });
                });
                
                // 发送评论
                document.querySelectorAll('.send-comment').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const discussionId = btn.dataset.discussionId;
                        const textarea = btn.closest('.mt-3').querySelector('textarea');
                        const content = textarea.value.trim();
                        
                        if (content) {
                            communicationCollaborationSystem.replyToDiscussion(discussionId, content);
                            textarea.value = '';
                        }
                    });
                });
            }
        };
        
        // 讨论区相关元素
        const discussionList = document.getElementById('discussion-list');
        const discussionForm = document.getElementById('discussion-form');
        const createDiscussionBtn = document.getElementById('create-discussion-btn');
        const cancelDiscussion = document.getElementById('cancel-discussion');
        const publishDiscussion = document.getElementById('publish-discussion');
        const discussionTitle = document.getElementById('discussion-title');
        const discussionContent = document.getElementById('discussion-content');
        
        // 打开讨论区
        openDiscussion.addEventListener('click', () => {
            discussionModal.classList.remove('hidden');
            // 渲染讨论列表
            communicationCollaborationSystem.renderDiscussions();
            // 关闭表单
            discussionForm.classList.add('hidden');
        });
        
        // 关闭讨论区
        closeDiscussion.addEventListener('click', () => {
            discussionModal.classList.add('hidden');
        });
        
        // 点击模态框外部关闭
        discussionModal.addEventListener('click', (e) => {
            if (e.target === discussionModal) {
                discussionModal.classList.add('hidden');
            }
        });
        
        // 显示创建讨论表单
        createDiscussionBtn.addEventListener('click', () => {
            discussionForm.classList.toggle('hidden');
            if (!discussionForm.classList.contains('hidden')) {
                discussionTitle.focus();
            }
        });
        
        // 取消创建讨论
        cancelDiscussion.addEventListener('click', () => {
            discussionForm.classList.add('hidden');
            // 清空表单
            discussionTitle.value = '';
            discussionContent.value = '';
        });
        
        // 发布讨论
        publishDiscussion.addEventListener('click', () => {
            const title = discussionTitle.value.trim();
            const content = discussionContent.value.trim();
            
            if (!title) {
                showToast('请输入讨论主题', 'error');
                return;
            }
            
            if (!content) {
                showToast('请输入讨论内容', 'error');
                return;
            }
            
            communicationCollaborationSystem.createDiscussion(title, content);
            
            // 清空并关闭表单
            discussionTitle.value = '';
            discussionContent.value = '';
            discussionForm.classList.add('hidden');
            
            showToast('讨论发布成功');
        });

        openPublish.addEventListener('click', () => publishModal.classList.remove('hidden'));
        closePublish.addEventListener('click', () => publishModal.classList.add('hidden'));

        openCapture.addEventListener('click', () => captureDrawer.classList.remove('hidden'));
        closeCapture.addEventListener('click', () => captureDrawer.classList.add('hidden'));

        sectionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                sectionButtons.forEach(b => b.classList.remove('bg-primary', 'text-white'));
                sectionButtons.forEach(b => b.classList.add('bg-white', 'border', 'border-line'));
                btn.classList.add('bg-primary', 'text-white');
                btn.classList.remove('bg-white', 'border', 'border-line');
                sectionPanels.forEach(panel => panel.classList.remove('active'));
                document.getElementById(`knowledge-${btn.dataset.section}`).classList.add('active');
            });
        });

        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                viewButtons.forEach(b => b.classList.remove('bg-primary', 'text-white'));
                viewButtons.forEach(b => b.classList.add('bg-white', 'border', 'border-line'));
                btn.classList.add('bg-primary', 'text-white');
                btn.classList.remove('bg-white', 'border', 'border-line');
                viewPanels.forEach(panel => panel.classList.remove('active'));
                document.getElementById(`knowledge-${btn.dataset.view}`).classList.add('active');
            });
        });

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // 获取所有同组的tab按钮和面板
                const buttons = btn.closest('[class*="bg-surface"]').querySelectorAll('.tab-btn');
                const panels = btn.closest('[class*="bg-surface"]').querySelectorAll('.tab-panel');
                
                // 移除所有按钮的活动状态
                buttons.forEach(b => {
                    b.classList.remove('bg-primary', 'text-white');
                    b.classList.add('bg-white', 'border', 'border-line');
                });
                
                // 移除所有面板的活动状态
                panels.forEach(panel => panel.classList.remove('active'));
                
                // 设置当前按钮和面板为活动状态
                btn.classList.add('bg-primary', 'text-white');
                btn.classList.remove('bg-white', 'border', 'border-line');
                
                const targetPanel = document.getElementById(`tab-${btn.dataset.tab}`);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });

        saveQuickNote.addEventListener('click', () => {
            const value = quickNoteInput.value.trim();
            if (!value) return;
            const item = document.createElement('li');
            item.className = 'p-3 rounded-lg bg-mist';
            item.textContent = value;
            quickNoteList.prepend(item);
            quickNoteInput.value = '';
        });

        if (saveClip && clipList && clipUrl) {
            saveClip.addEventListener('click', () => {
                const value = clipUrl.value.trim();
                if (!value) return;
                const item = document.createElement('li');
                item.className = 'p-3 rounded-lg bg-mist';
                item.textContent = value;
                clipList.prepend(item);
                clipUrl.value = '';
            });
        }

        let recordingInitial = false;
        let recordIntervalInitial = null;
        let recordSecondsInitial = 0;
        if (recordToggle) {
            recordToggle.addEventListener('click', () => {
                recordingInitial = !recordingInitial;
                if (recordingInitial) {
                    recordToggle.textContent = '暂停录音';
                    recordToggle.classList.remove('bg-danger');
                    recordToggle.classList.add('bg-secondary');
                    recordIntervalInitial = setInterval(() => {
                        recordSecondsInitial += 1;
                        const mins = String(Math.floor(recordSecondsInitial / 60)).padStart(2, '0');
                        const secs = String(recordSecondsInitial % 60).padStart(2, '0');
                        if (recordTimer) {
                            recordTimer.textContent = `${mins}:${secs}`;
                        }
                    }, 1000);
                } else {
                    recordToggle.textContent = '开始录音';
                    recordToggle.classList.remove('bg-secondary');
                    recordToggle.classList.add('bg-danger');
                    clearInterval(recordIntervalInitial);
                }
            });
        }

        // 术语定义数据
        const termDefinitions = {
            '客户续约率': {
                definition: '客户在合同到期后选择继续使用产品或服务的比例，是衡量客户忠诚度和产品价值的关键指标。',
                domain: '销售与客户关系管理',
                related: ['客户满意度', '流失率', '客户生命周期价值'],
                properties: ['月度续约率', '年度续约率', '合同金额加权续约率']
            },
            '风险等级': {
                definition: '基于客户行为、财务状况和合作历史评估的风险程度，用于指导销售和服务策略。',
                domain: '风险管理与客户关系管理',
                related: ['信用评级', '逾期率', '投诉记录'],
                properties: ['高风险', '中风险', '低风险', '无风险']
            },
            '项目里程碑': {
                definition: '项目执行过程中的关键节点，标志着特定阶段工作的完成，用于跟踪项目进度。',
                domain: '项目管理',
                related: ['项目计划', '进度跟踪', '交付物'],
                properties: ['启动阶段', '规划阶段', '执行阶段', '收尾阶段']
            },
            '投诉处理': {
                definition: '对客户投诉的接收、记录、调查、解决和跟踪的全过程管理，旨在提升客户满意度。',
                domain: '客户服务与质量管理',
                related: ['客户满意度', '问题解决率', '响应时间'],
                properties: ['投诉类型', '解决时间', '客户反馈']
            }
        };

        // 术语气泡卡片
        const createTermBubble = (term, x, y) => {
            const bubble = document.createElement('div');
            bubble.className = 'term-bubble fixed z-50 bg-white rounded-lg shadow-lg border border-line p-4 max-w-xs text-sm';
            bubble.style.left = `${x}px`;
            bubble.style.top = `${y}px`;
            
            const termData = termDefinitions[term] || {
                definition: '该术语在企业本体中尚未定义',
                domain: '未知',
                related: [],
                properties: []
            };
            
            bubble.innerHTML = `
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-semibold text-primary">${term}</h4>
                    <button class="close-bubble text-muted hover:text-ink"><i class="fa fa-times"></i></button>
                </div>
                <p class="text-xs mb-3">${termData.definition}</p>
                <div class="text-xs space-y-2">
                    <div>
                        <span class="font-medium">业务域：</span>
                        <span class="text-muted">${termData.domain}</span>
                    </div>
                    ${termData.properties.length > 0 ? `<div>
                        <span class="font-medium">属性：</span>
                        <span class="text-muted">${termData.properties.join(', ')}</span>
                    </div>` : ''}
                    ${termData.related.length > 0 ? `<div>
                        <span class="font-medium">关联术语：</span>
                        <span class="text-muted">${termData.related.join(', ')}</span>
                    </div>` : ''}
                </div>
                <div class="mt-3 flex gap-2">
                    <button class="px-2 py-1 rounded bg-primary/10 text-primary text-xs">查看更多</button>
                    <button class="px-2 py-1 rounded bg-primary/10 text-primary text-xs">添加到知识卡片</button>
                </div>
            `;
            
            return bubble;
        };

        // 术语按钮点击事件
        if (termButtons) {
            termButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const term = btn.dataset.term;
                    const termData = termDefinitions[term];
                    if (termData && termDefinition) {
                        termDefinition.innerHTML = `
                            <p class="font-medium">${term}</p>
                            <p class="text-xs text-muted mt-1">${termData.definition}</p>
                            <p class="text-xs text-muted mt-1">业务域：${termData.domain}</p>
                        `;
                    }
                });
            });
        }

        // 术语高亮点击事件
        const termHighlights = document.querySelectorAll('.term-highlight');
        termHighlights.forEach(highlight => {
            highlight.addEventListener('click', (e) => {
                const term = highlight.textContent;
                const rect = highlight.getBoundingClientRect();
                
                // 移除现有气泡
                const existingBubble = document.querySelector('.term-bubble');
                if (existingBubble) {
                    existingBubble.remove();
                }
                
                // 创建新气泡
                const bubble = createTermBubble(term, rect.right + 10, rect.top);
                document.body.appendChild(bubble);
                
                // 点击关闭按钮
                const closeBtn = bubble.querySelector('.close-bubble');
                closeBtn.addEventListener('click', () => {
                    bubble.remove();
                });
                
                // 点击页面其他地方关闭气泡
                document.addEventListener('click', (e) => {
                    if (!bubble.contains(e.target) && e.target !== highlight) {
                        bubble.remove();
                    }
                });
            });
        });

        // 解释按钮点击事件
        const explainBtns = document.querySelectorAll('.explain-btn');
        explainBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 模拟解释所有高亮术语
                const firstHighlight = document.querySelector('.term-highlight');
                if (firstHighlight) {
                    firstHighlight.click();
                }
            });
        });

        // 情境智能伴读面板功能
        // 关联知识数据
        const contextKnowledge = {
            'XX科技公司': {
                summary: {
                    industry: '智能制造',
                    cooperationYears: 3,
                    responsiblePerson: '李强',
                    position: '销售总监'
                },
                relatedKnowledge: [
                    { title: '客户投诉处理方案', type: '文档', date: '2024/06' },
                    { title: '续约策略模板', type: '文档', date: '2024/05' },
                    { title: '竞争对手动态', type: '报告', date: '2024/04' },
                    { title: '智能制造行业分析', type: '报告', date: '2024/03' },
                    { title: '客户服务流程优化', type: '文档', date: '2024/02' }
                ],
                recentActivities: [
                    { type: '投诉', content: '产品功能问题投诉', date: '2024-07-15' },
                    { type: '会议', content: '季度业务回顾会议', date: '2024-07-10' },
                    { type: '合同', content: '年度合同续签', date: '2024-06-20' },
                    { type: '反馈', content: '新产品功能建议', date: '2024-06-15' }
                ]
            }
        };

        // 情境识别功能
        const contextRecognition = () => {
            // 模拟情境识别
            const clientName = 'XX科技公司';
            const contextData = contextKnowledge[clientName];
            
            if (contextData) {
                // 更新情境面板信息
                updateContextPanel(contextData);
                return contextData;
            }
            return null;
        };

        // 更新情境面板
        const updateContextPanel = (contextData) => {
            // 这里可以更新情境面板的内容
            // 由于HTML结构中没有具体的情境面板ID，我们可以模拟这个功能
            console.log('情境面板已更新:', contextData);
        };

        // 快速操作功能
        const quickActionBtns = document.querySelectorAll('.quick-action-btn');
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.textContent.trim();
                switch (action) {
                    case '发起会议':
                        showToast('正在创建会议...');
                        setTimeout(() => {
                            showToast('会议创建成功，已邀请相关人员');
                        }, 1000);
                        break;
                    case '发送邮件':
                        showToast('正在打开邮件客户端...');
                        setTimeout(() => {
                            showToast('邮件模板已加载');
                        }, 1000);
                        break;
                    case '创建任务':
                        showToast('正在打开任务管理...');
                        setTimeout(() => {
                            showToast('任务创建界面已打开');
                        }, 1000);
                        break;
                    case '查看详情':
                        showToast('正在加载详细信息...');
                        setTimeout(() => {
                            showToast('详细信息已显示');
                        }, 1000);
                        break;
                }
            });
        });

        // 页面加载时进行情境识别
        document.addEventListener('DOMContentLoaded', () => {
            const pageContext = document.getElementById('page-context');
            if (pageContext) {
                contextRecognition();
            }
        });

        // 快速捕获工具功能
        // 保存按钮点击事件
        const saveBtns = document.querySelectorAll('.save-btn');
        saveBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 模拟快速捕获
                showToast('正在捕获当前内容...');
                
                // 模拟智能标注
                setTimeout(() => {
                    showToast('内容已捕获，正在进行智能标注...');
                    
                    // 模拟入库流程
                    setTimeout(() => {
                        showToast('已保存到知识熔炉待处理队列');
                    }, 1000);
                }, 1000);
            });
        });

        // 搜索按钮点击事件
        const searchBtns = document.querySelectorAll('.search-btn');
        searchBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 模拟知识搜索
                showToast('正在搜索相关知识...');
                
                // 模拟搜索结果展示
                setTimeout(() => {
                    showToast('搜索完成，已显示相关知识');
                }, 1000);
            });
        });

        // 快速捕获工具 - 网页剪藏功能
        const captureTool = {
            // 全页保存
            saveFullPage: () => {
                showToast('正在保存完整网页...');
                setTimeout(() => {
                    showToast('网页已保存为HTML格式');
                }, 1500);
            },
            
            // 区域截图
            captureSelection: () => {
                showToast('请选择要截图的区域...');
                // 这里可以实现实际的区域选择功能
                setTimeout(() => {
                    showToast('区域已截图并保存');
                }, 2000);
            },
            
            // 文本摘录
            extractText: () => {
                showToast('正在提取选中的文本...');
                setTimeout(() => {
                    showToast('文本已提取并保存');
                }, 1000);
            }
        };

        // 智能标注功能
        const smartAnnotate = (content) => {
            // 模拟智能标注
            return {
                title: content.substring(0, 20) + '...',
                summary: content.substring(0, 100) + '...',
                keywords: ['客户', '合同', '风险', '续约'],
                contentType: '客户信息'
            };
        };

        // 入库流程
        const submitToKnowledgeFurnace = (capturedContent, annotations) => {
            // 模拟入库流程
            showToast('正在提交到知识熔炉...');
            setTimeout(() => {
                showToast('已提交到知识熔炉待处理队列');
            }, 1500);
        };

        // 智能提醒与主动推送功能
        // 提醒数据结构
        const reminders = [
            {
                id: 1,
                type: '情境触发',
                title: 'XX科技公司合同到期提醒',
                content: 'XX科技公司的年度合同将于30天后到期，请提前准备续约事宜。',
                time: '2024-07-20 10:30',
                read: false
            },
            {
                id: 2,
                type: '定期推送',
                title: '智能制造行业动态更新',
                content: '本周智能制造行业有3篇重要报告已更新，点击查看详情。',
                time: '2024-07-20 14:00',
                read: false
            },
            {
                id: 3,
                type: '任务提醒',
                title: 'XX科技公司投诉处理跟进',
                content: '请跟进XX科技公司的产品功能问题投诉，预计今天下午完成。',
                time: '2024-07-20 16:00',
                read: false
            }
        ];

        // 智能提醒系统
        const reminderSystem = {
            // 发送提醒
            sendReminder: (reminder) => {
                // 创建提醒通知
                const notification = document.createElement('div');
                notification.className = 'notification fixed top-4 right-4 bg-white border border-line rounded-lg shadow-lg p-4 flex items-start gap-3 z-50 animate-slide-in';
                
                notification.innerHTML = `
                    <div class="text-yellow-500 text-xl"><i class="fa fa-bell"></i></div>
                    <div class="flex-1">
                        <h4 class="font-medium">${reminder.title}</h4>
                        <p class="text-xs text-muted mt-1">${reminder.content}</p>
                        <p class="text-xs text-muted mt-1">${reminder.time}</p>
                    </div>
                    <button class="close-notification text-muted hover:text-ink"><i class="fa fa-times"></i></button>
                `;
                
                // 添加到页面
                document.body.appendChild(notification);
                
                // 点击关闭按钮
                const closeBtn = notification.querySelector('.close-notification');
                closeBtn.addEventListener('click', () => {
                    notification.remove();
                });
                
                // 3秒后自动关闭
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.classList.add('animate-slide-out');
                        setTimeout(() => {
                            notification.remove();
                        }, 300);
                    }
                }, 3000);
            },
            
            // 情境触发提醒
            contextTrigger: (context) => {
                // 模拟情境触发
                const contextReminders = reminders.filter(r => r.type === '情境触发');
                contextReminders.forEach(reminder => {
                    reminderSystem.sendReminder(reminder);
                });
            },
            
            // 定期推送
            schedulePush: () => {
                // 模拟定期推送
                const scheduledReminders = reminders.filter(r => r.type === '定期推送');
                scheduledReminders.forEach(reminder => {
                    reminderSystem.sendReminder(reminder);
                });
            }
        };

        // 提醒管理功能
        const reminderManagement = {
            // 标记已读
            markAsRead: (reminderId) => {
                const reminder = reminders.find(r => r.id === reminderId);
                if (reminder) {
                    reminder.read = true;
                    showToast('提醒已标记为已读');
                }
            },
            
            // 删除提醒
            deleteReminder: (reminderId) => {
                const index = reminders.findIndex(r => r.id === reminderId);
                if (index > -1) {
                    reminders.splice(index, 1);
                    showToast('提醒已删除');
                }
            },
            
            // 获取未读提醒
            getUnreadReminders: () => {
                return reminders.filter(r => !r.read);
            },
            
            // 查看所有提醒
            viewAllReminders: () => {
                return reminders;
            }
        };

        // 模拟定期推送（每10秒）
        setInterval(() => {
            reminderSystem.schedulePush();
        }, 10000);

        // 模拟情境触发提醒
        setTimeout(() => {
            reminderSystem.contextTrigger('XX科技公司');
        }, 5000);

        // 查看提醒按钮点击事件
        const viewRemindersBtns = document.querySelectorAll('.view-reminders-btn');
        viewRemindersBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const unreadCount = reminderManagement.getUnreadReminders().length;
                showToast(`您有 ${unreadCount} 条未读提醒`);
                
                // 模拟打开提醒管理界面
                setTimeout(() => {
                    showToast('提醒管理界面已打开');
                }, 500);
            });
        });

        // 团队空间管理功能
        const teamSpaceManager = {
            // 空间数据
            spaces: [
                {
                    id: 'project-space',
                    name: 'Q1新产品开发',
                    type: '项目空间',
                    description: '2024年第一季度新产品开发项目',
                    members: 8,
                    status: '活跃',
                    healthScore: 82
                },
                {
                    id: 'team-space',
                    name: '研发中心',
                    type: '团队空间',
                    description: '公司研发中心团队协作空间',
                    members: 24,
                    status: '活跃',
                    healthScore: 79
                },
                {
                    id: 'theme-space',
                    name: '技术创新小组',
                    type: '主题空间',
                    description: '跨部门技术创新协作小组',
                    members: 12,
                    status: '活跃',
                    healthScore: 85
                }
            ],
            
            // 当前选中的空间
            currentSpace: 'project-space',
            
            // 切换空间
            switchSpace: (spaceId) => {
                const space = teamSpaceManager.spaces.find(s => s.id === spaceId);
                if (space) {
                    teamSpaceManager.currentSpace = spaceId;
                    showToast(`正在切换到 ${space.name}...`);
                    // 这里可以添加实际的空间切换逻辑
                    setTimeout(() => {
                        showToast('空间切换成功');
                        // 更新讨论区显示当前空间的讨论
                        if (typeof communicationCollaborationSystem !== 'undefined' && communicationCollaborationSystem.renderDiscussions) {
                            communicationCollaborationSystem.renderDiscussions();
                        }
                    }, 1000);
                }
            },
            
            // 创建新空间
            createSpace: (spaceData) => {
                teamSpaceManager.spaces.push(spaceData);
                showToast(`空间 ${spaceData.name} 创建成功`);
                // 更新空间选择器
                const spaceSelector = document.getElementById('space-selector');
                if (spaceSelector) {
                    const option = document.createElement('option');
                    option.value = spaceData.id;
                    option.textContent = `${spaceData.name} (${spaceData.type})`;
                    spaceSelector.appendChild(option);
                }
                
                // 更新空间统计信息
                teamSpaceManager.updateSpaceStatistics();
            },
            
            // 获取空间健康度
            getSpaceHealth: (spaceId) => {
                const space = teamSpaceManager.spaces.find(s => s.id === spaceId);
                return space ? space.healthScore : 0;
            },
            
            // 更新空间统计信息
            updateSpaceStatistics: () => {
                // 计算不同类型空间的数量
                const projectSpaces = teamSpaceManager.spaces.filter(space => space.type === '项目空间').length;
                const teamSpaces = teamSpaceManager.spaces.filter(space => space.type === '团队空间').length;
                const themeSpaces = teamSpaceManager.spaces.filter(space => space.type === '主题空间').length;
                
                // 更新项目空间统计
                const projectSpaceStat = document.querySelector('.bg-ocean p:nth-child(2)');
                if (projectSpaceStat) {
                    projectSpaceStat.textContent = `${projectSpaces}个活跃项目`;
                }
                
                // 更新团队空间统计
                const teamSpaceStat = document.querySelector('.bg-coral p:nth-child(2)');
                if (teamSpaceStat) {
                    teamSpaceStat.textContent = `${teamSpaces}个部门团队`;
                }
                
                // 更新主题空间统计
                const themeSpaceStat = document.querySelector('.bg-mist p:nth-child(2)');
                if (themeSpaceStat) {
                    themeSpaceStat.textContent = `${themeSpaces}个跨部门主题`;
                }
            }
        };

        // 空间选择器事件
        const spaceSelector = document.getElementById('space-selector');
        if (spaceSelector) {
            spaceSelector.addEventListener('change', (e) => {
                teamSpaceManager.switchSpace(e.target.value);
            });
        }

        // 创建空间按钮事件
        const createSpaceBtn = document.getElementById('create-space');
        if (createSpaceBtn) {
            createSpaceBtn.addEventListener('click', () => {
                // 打开创建空间模态框
                createSpaceModal.classList.remove('hidden');
                // 重置表单
                createSpaceForm.reset();
            });
        }
        
        // 关闭创建空间模态框
        const closeCreateSpaceModal = () => {
            createSpaceModal.classList.add('hidden');
        };
        
        // 关闭按钮事件
        if (closeCreateSpace) {
            closeCreateSpace.addEventListener('click', closeCreateSpaceModal);
        }
        
        // 取消按钮事件
        if (cancelCreateSpace) {
            cancelCreateSpace.addEventListener('click', closeCreateSpaceModal);
        }
        
        // 创建空间表单提交事件
        if (createSpaceForm) {
            createSpaceForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // 获取表单数据
                const spaceData = {
                    id: 'space-' + Date.now(),
                    name: newSpaceName.value.trim(),
                    type: newSpaceType.value,
                    description: newSpaceDescription.value.trim(),
                    members: 1, // 默认只有创建者
                    status: '新建',
                    healthScore: 0
                };
                
                // 创建空间
                teamSpaceManager.createSpace(spaceData);
                
                // 关闭模态框
                closeCreateSpaceModal();
            });
        }

        // 空间设置按钮事件
        const spaceSettingsBtn = document.getElementById('space-settings');
        if (spaceSettingsBtn) {
            spaceSettingsBtn.addEventListener('click', () => {
                showToast('正在打开空间设置...');
                setTimeout(() => {
                    showToast('空间设置界面已打开');
                }, 1000);
            });
        }

        if (runQualityCheckBtn) {
            runQualityCheckBtn.addEventListener('click', () => {
                if (maturityLevel && qualityScore) {
                    maturityLevel.textContent = '成熟';
                    qualityScore.textContent = '86 / 100';
                }
            });
        }

        // 轻量生产工具 - 速记功能增强
        const quickNoteTitle = document.getElementById('quick-note-title');
        const voiceInputBtn = document.getElementById('voice-input-btn');
        const photoOcrBtn = document.getElementById('photo-ocr-btn');
        const scanDocBtn = document.getElementById('scan-doc-btn');
        const setReminderBtn = document.getElementById('set-reminder-btn');
        const autoTitle = document.getElementById('auto-title');
        const autoTag = document.getElementById('auto-tag');

        // 语音输入功能
        voiceInputBtn.addEventListener('click', () => {
            voiceInputBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i><span>正在录音...</span>';
            voiceInputBtn.disabled = true;
            
            setTimeout(() => {
                const sampleVoiceText = '今天的会议讨论了产品发布计划，需要在下周五前完成所有准备工作，包括市场推广材料和销售培训。';
                quickNoteInput.value = quickNoteInput.value + (quickNoteInput.value ? '\n' : '') + sampleVoiceText;
                voiceInputBtn.innerHTML = '<i class="fa fa-microphone mr-2"></i><span>语音输入</span>';
                voiceInputBtn.disabled = false;
                
                if (autoTitle.checked && !quickNoteTitle.value) {
                    quickNoteTitle.value = '会议记录 - ' + new Date().toLocaleDateString();
                }
            }, 2000);
        });

        // 拍照OCR功能
        photoOcrBtn.addEventListener('click', () => {
            photoOcrBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i><span>识别中...</span>';
            photoOcrBtn.disabled = true;
            
            setTimeout(() => {
                const sampleOcrText = '产品规格\n型号：ZH-2024\n尺寸：120x80x20mm\n重量：250g\n材质：铝合金';
                quickNoteInput.value = quickNoteInput.value + (quickNoteInput.value ? '\n\n' : '') + '【图片识别结果】\n' + sampleOcrText;
                photoOcrBtn.innerHTML = '<i class="fa fa-camera mr-2"></i><span>拍照OCR</span>';
                photoOcrBtn.disabled = false;
            }, 1500);
        });

        // 扫描文档功能
        scanDocBtn.addEventListener('click', () => {
            scanDocBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i><span>扫描中...</span>';
            scanDocBtn.disabled = true;
            
            setTimeout(() => {
                const sampleDocText = '【文档扫描】\n客户合同编号：CON-2024-001\n签约日期：2024-07-15\n合同金额：¥500,000\n有效期：12个月';
                quickNoteInput.value = quickNoteInput.value + (quickNoteInput.value ? '\n\n' : '') + sampleDocText;
                scanDocBtn.innerHTML = '<i class="fa fa-file-text-o mr-2"></i><span>扫描文档</span>';
                scanDocBtn.disabled = false;
            }, 2000);
        });

        // 设置提醒功能
        setReminderBtn.addEventListener('click', () => {
            const reminderText = prompt('请输入提醒内容：', '跟进客户合同审批');
            if (reminderText) {
                const reminderTime = prompt('请输入提醒时间（如：明天 10:00）：', '明天 10:00');
                if (reminderTime) {
                    alert(`提醒已设置：\n内容：${reminderText}\n时间：${reminderTime}`);
                }
            }
        });

        // AI自动生成标题
        autoTitle.addEventListener('change', () => {
            if (autoTitle.checked && quickNoteInput.value && !quickNoteTitle.value) {
                quickNoteTitle.value = '速记 - ' + new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
            }
        });

        // 保存速记增强功能
        const saveQuickNoteBtn = document.getElementById('save-quick-note');
        saveQuickNoteBtn.addEventListener('click', () => {
            const title = quickNoteTitle.value || (autoTitle.checked ? '速记 - ' + new Date().toLocaleString() : '未命名速记');
            const content = quickNoteInput.value.trim();
            
            if (!content) return;
            
            const item = document.createElement('li');
            item.className = 'p-3 rounded-lg bg-ocean/30 border border-primary/10 transition-all hover:shadow-sm';
            item.innerHTML = `
                <div class="flex items-center justify-between mb-1">
                    <span class="font-medium">${title}</span>
                    <span class="text-xs text-muted">刚刚</span>
                </div>
                <p class="text-sm text-muted">${content.length > 50 ? content.substring(0, 50) + '...' : content}</p>
                <div class="mt-2 flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">${autoTag.checked ? '已加标签' : '待分类'}</span>
                    <button class="text-xs text-secondary hover:text-primary">编辑</button>
                </div>
            `;
            
            const quickNoteList = document.getElementById('quick-note-list');
            quickNoteList.prepend(item);
            
            // 清空输入
            quickNoteTitle.value = '';
            quickNoteInput.value = '';
        });

        // 轻量生产工具 - 录音功能增强
        const recordPauseBtn = document.getElementById('record-pause');
        const recordMarkBtn = document.getElementById('record-mark');
        const quickVoiceNoteBtn = document.getElementById('quick-voice-note');
        const transcriptDisplay = document.getElementById('transcript-display');
        const transcriptStats = document.getElementById('transcript-stats');
        const speakerChangeBtn = document.getElementById('speaker-change-btn');
        const exportTranscriptBtn = document.getElementById('export-transcript-btn');
        const generateSummaryBtn = document.getElementById('generate-summary-btn');
        let recordingEnhanced = false;
        let paused = false;
        let recordIntervalEnhanced = null;
        let recordSecondsEnhanced = 0;
        let currentSpeaker = 1;
        let transcriptLines = [];
        
        const recordToggleBtn = document.getElementById('record-toggle');
        const recordTimerEnhanced = document.getElementById('record-timer');
        
        // 开始/停止录音
        recordToggleBtn.addEventListener('click', () => {
            recordingEnhanced = !recordingEnhanced;
            
            if (recordingEnhanced) {
                recordToggleBtn.innerHTML = '<i class="fa fa-stop"></i>';
                recordToggleBtn.classList.remove('bg-danger');
                recordToggleBtn.classList.add('bg-success');
                recordPauseBtn.disabled = false;
                recordPauseBtn.style.opacity = '1';
                recordMarkBtn.disabled = false;
                recordMarkBtn.style.opacity = '1';
                speakerChangeBtn.disabled = false;
                speakerChangeBtn.style.opacity = '1';
                transcriptDisplay.innerHTML = '';
                transcriptLines = [];
                currentSpeaker = 1;
                
                // 开始计时
                recordIntervalEnhanced = setInterval(() => {
                    if (!paused) {
                        recordSecondsEnhanced += 1;
                        const mins = String(Math.floor(recordSecondsEnhanced / 60)).padStart(2, '0');
                        const secs = String(recordSecondsEnhanced % 60).padStart(2, '0');
                        if (recordTimerEnhanced) {
                            recordTimerEnhanced.textContent = `${mins}:${secs}`;
                        }
                        updateTranscriptStats();
                    }
                }, 1000);
                
                // 模拟实时转写
                simulateTranscript();
            } else {
                recordToggleBtn.innerHTML = '<i class="fa fa-microphone"></i>';
                recordToggleBtn.classList.remove('bg-success');
                recordToggleBtn.classList.add('bg-danger');
                recordPauseBtn.disabled = true;
                recordPauseBtn.style.opacity = '0.5';
                recordMarkBtn.disabled = true;
                recordMarkBtn.style.opacity = '0.5';
                speakerChangeBtn.disabled = true;
                speakerChangeBtn.style.opacity = '0.5';
                
                clearInterval(recordIntervalEnhanced);
                
                // 重置录音状态
                setTimeout(() => {
                    recordSecondsEnhanced = 0;
                    if (recordTimerEnhanced) {
                        recordTimerEnhanced.textContent = '00:00';
                    }
                    paused = false;
                    recordPauseBtn.innerHTML = '<i class="fa fa-pause"></i><span>暂停</span>';
                    updateTranscriptStats();
                }, 1000);
            }
        });
        
        // 暂停/继续录音
        recordPauseBtn.addEventListener('click', () => {
            paused = !paused;
            
            if (paused) {
                recordPauseBtn.innerHTML = '<i class="fa fa-play"></i><span>继续</span>';
            } else {
                recordPauseBtn.innerHTML = '<i class="fa fa-pause"></i><span>暂停</span>';
            }
        });
        
        // 标记关键点
        recordMarkBtn.addEventListener('click', () => {
            const markTime = recordTimer.textContent;
            const markItem = document.createElement('div');
            markItem.className = 'flex items-center gap-2 mt-2 text-xs text-muted bg-primary/5 p-2 rounded-lg';
            markItem.innerHTML = `
                <i class="fa fa-flag text-warning"></i>
                <span>关键点标记 - ${markTime}</span>
                <button class="ml-auto text-primary hover:text-primary-dark" onclick="editMark(this)">
                    <i class="fa fa-pencil"></i>
                </button>
            `;
            transcriptDisplay.appendChild(markItem);
        });
        
        // 快速语音备忘
        quickVoiceNoteBtn.addEventListener('click', () => {
            quickVoiceNoteBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i><span>录音中...</span>';
            quickVoiceNoteBtn.disabled = true;
            
            setTimeout(() => {
                quickVoiceNoteBtn.innerHTML = '<i class="fa fa-plus mr-2"></i><span>新建语音备忘</span>';
                quickVoiceNoteBtn.disabled = false;
                
                alert('语音备忘已创建！\n内容：下周一跟进供应商报价\n时长：30秒');
            }, 2000);
        });
        
        // 切换说话人
        if (speakerChangeBtn) {
            speakerChangeBtn.addEventListener('click', () => {
                currentSpeaker = currentSpeaker + 1 > 3 ? 1 : currentSpeaker + 1;
                const speakers = ['张', '李', '王'];
                alert(`已切换到说话人：${speakers[currentSpeaker-1]}`);
            });
        }
        
        // 导出转写文本
        if (exportTranscriptBtn) {
            exportTranscriptBtn.addEventListener('click', () => {
                if (transcriptLines.length === 0) {
                    alert('没有可导出的转写内容！');
                    return;
                }
                
                const transcriptText = transcriptLines.map(line => `${line.speaker}: ${line.text}`).join('\n');
                const blob = new Blob([transcriptText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `transcript_${new Date().toISOString().slice(0, 10)}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        }
        
        // 生成会议摘要
        if (generateSummaryBtn) {
            generateSummaryBtn.addEventListener('click', () => {
                if (transcriptLines.length === 0) {
                    alert('没有可生成摘要的内容！');
                    return;
                }
                
                const summary = `会议摘要：\n\n1. 讨论了Q3产品规划\n2. 重点关注用户增长和留存\n3. 计划优化产品体验，特别是注册流程\n4. 将制定具体的实施计划\n\n总字数：${transcriptLines.reduce((sum, line) => sum + line.text.length, 0)}字`;
                alert(summary);
            });
        }
        
        // 更新转写统计信息
        function updateTranscriptStats() {
            if (!transcriptStats) return;
            
            const totalWords = transcriptLines.reduce((sum, line) => sum + line.text.split(' ').length, 0);
            const totalSpeakers = new Set(transcriptLines.map(line => line.speaker)).size;
            
            transcriptStats.innerHTML = `
                <div class="text-center">
                    <div class="grid grid-cols-3 gap-2">
                        <div>
                            <span class="text-lg font-medium">${transcriptLines.length}</span>
                            <p class="text-xs text-muted">转写行数</p>
                        </div>
                        <div>
                            <span class="text-lg font-medium">${totalWords}</span>
                            <p class="text-xs text-muted">总字数</p>
                        </div>
                        <div>
                            <span class="text-lg font-medium">${totalSpeakers}</span>
                            <p class="text-xs text-muted">说话人数</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // 模拟实时转写
        function simulateTranscript() {
            const transcriptData = [
                { speaker: '张', text: '大家好，今天我们来讨论Q3的产品规划。' },
                { speaker: '李', text: '我认为我们需要重点关注用户增长和留存。' },
                { speaker: '王', text: '是的，我们应该优化产品体验，特别是注册流程。' },
                { speaker: '张', text: '好的，那我们接下来讨论具体的实施计划。' },
                { speaker: '李', text: '首先，我们需要完成用户调研，了解他们的需求。' },
                { speaker: '王', text: '然后我们可以根据调研结果制定产品功能列表。' },
                { speaker: '张', text: '最后，我们需要设定明确的时间线和里程碑。' }
            ];
            
            let lineIndex = 0;
            const transcriptInterval = setInterval(() => {
                if (lineIndex < transcriptData.length && recording && !paused) {
                    const line = transcriptData[lineIndex];
                    addTranscriptLine(line.speaker, line.text);
                    lineIndex++;
                } else if (lineIndex >= transcriptData.length) {
                    clearInterval(transcriptInterval);
                }
            }, 3000);
        }
        
        // 添加转写行
        function addTranscriptLine(speaker, text) {
            const transcriptItem = document.createElement('div');
            transcriptItem.className = 'flex items-start gap-2 p-2 rounded-lg hover:bg-primary/5 transition-colors';
            const speakerColor = speaker === '张' ? 'primary' : speaker === '李' ? 'secondary' : 'accent';
            transcriptItem.innerHTML = `
                <span class="w-6 h-6 rounded-full bg-${speakerColor} text-white text-xs flex items-center justify-center mt-0.5">${speaker}</span>
                <div class="flex-1">
                    <span class="block">${text}</span>
                    <div class="mt-1 text-xs text-muted flex items-center justify-between">
                        <span>${recordTimer.textContent}</span>
                        <div class="flex gap-2">
                            <button class="text-primary hover:text-primary-dark" onclick="editTranscriptLine(this)">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="text-danger hover:text-danger-dark" onclick="deleteTranscriptLine(this)">
                                <i class="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            transcriptDisplay.appendChild(transcriptItem);
            transcriptDisplay.scrollTop = transcriptDisplay.scrollHeight;
            
            // 保存到转写数组
            transcriptLines.push({ speaker, text });
            updateTranscriptStats();
        }
        
        // 编辑标记
        function editMark(btn) {
            const markItem = btn.closest('div');
            const currentText = markItem.querySelector('span').textContent;
            const newText = prompt('修改标记内容：', currentText);
            if (newText) {
                markItem.querySelector('span').textContent = newText;
            }
        }
        
        // 编辑转写行
        function editTranscriptLine(btn) {
            const transcriptItem = btn.closest('div');
            const currentText = transcriptItem.querySelector('span').textContent;
            const newText = prompt('修改转写内容：', currentText);
            if (newText) {
                transcriptItem.querySelector('span').textContent = newText;
                // 更新数组中的内容
                const index = Array.from(transcriptDisplay.children).indexOf(transcriptItem.closest('div'));
                if (index > -1) {
                    transcriptLines[index].text = newText;
                }
            }
        }
        
        // 删除转写行
        function deleteTranscriptLine(btn) {
            const transcriptItem = btn.closest('div');
            const index = Array.from(transcriptDisplay.children).indexOf(transcriptItem.closest('div'));
            if (index > -1) {
                transcriptDisplay.removeChild(transcriptItem.closest('div'));
                transcriptLines.splice(index, 1);
                updateTranscriptStats();
            }
        }

        // 轻量生产工具 - 剪藏功能增强
        const clipModeRadios = document.querySelectorAll('input[name="clip-mode"]');
        const clipFullPageBtn = document.getElementById('clip-full-page');
        const clipSelectionBtn = document.getElementById('clip-selection');
        const clipScreenshotBtn = document.getElementById('clip-screenshot');
        const clipUrlEnhanced = document.getElementById('clip-url');
        const aiSuggestionsContainer = document.getElementById('ai-suggestions-container');
        const clipPreview = document.getElementById('clip-preview');
        const contentAnalysis = document.getElementById('content-analysis');
        
        // 选择剪藏方式
        clipModeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                const selectedMode = radio.value;
                updateClipPreview(selectedMode);
                updateClipButtons(selectedMode);
            });
        });
        
        // URL输入实时预览
        clipUrlEnhanced.addEventListener('input', debounce(() => {
            const url = clipUrlEnhanced.value.trim();
            if (url && isValidUrl(url)) {
                generateContentAnalysis(url);
                updateClipPreview(document.querySelector('input[name="clip-mode"]:checked').value);
                generateAIClipSuggestions(url);
            } else {
                clearClipPreview();
                clearContentAnalysis();
                clearAIClipSuggestions();
            }
        }, 500));
        
        // 保存剪藏增强功能
        const saveClipBtn = document.getElementById('save-clip');
        saveClipBtn.addEventListener('click', () => {
            const url = clipUrl.value.trim();
            if (!url) return;
            
            const selectedMode = document.querySelector('input[name="clip-mode"]:checked').value;
            const modes = { read: '阅读模式', full: '完整页面', pdf: 'PDF快照' };
            
            // 模拟AI处理
            saveClipBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i><span>保存中...</span>';
            saveClipBtn.disabled = true;
            
            setTimeout(() => {
                const item = document.createElement('li');
                item.className = 'p-3 rounded-lg bg-ocean/30 border border-primary/10 hover:shadow-sm cursor-pointer transition-all';
                const siteName = url.split('/')[2] || '网页剪藏';
                item.innerHTML = `
                    <div class="flex items-center justify-between mb-1">
                        <div class="flex items-center gap-2">
                            <i class="fa fa-link text-primary"></i>
                            <span class="font-medium text-sm">${siteName}</span>
                        </div>
                        <span class="text-xs text-muted">刚刚</span>
                    </div>
                    <p class="text-xs text-muted truncate">${url}</p>
                    <div class="mt-1 flex items-center gap-2 text-xs">
                        <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary">${modes[selectedMode]}</span>
                        <span class="px-2 py-0.5 rounded-full bg-success/10 text-success">已入库</span>
                    </div>
                    <div class="mt-2 flex items-center justify-between">
                        <div class="text-xs text-muted flex gap-2">
                            <span><i class="fa fa-eye mr-1"></i>12</span>
                            <span><i class="fa fa-tag mr-1"></i>3</span>
                        </div>
                        <div class="flex gap-1">
                            <button class="p-1 rounded-full hover:bg-primary/5 text-primary" onclick="editClip(this)">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="p-1 rounded-full hover:bg-danger/5 text-danger" onclick="deleteClip(this)">
                                <i class="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                
                const clipList = document.getElementById('clip-list');
                clipList.prepend(item);
                
                // 清空输入
                clipUrl.value = '';
                clearClipPreview();
                clearContentAnalysis();
                clearAIClipSuggestions();
                
                saveClipBtn.innerHTML = '<i class="fa fa-save mr-2"></i><span>保存</span>';
                saveClipBtn.disabled = false;
                
                // 更新统计数据
                updateClipStats();
            }, 1500);
        });
        
        // 完整页面剪藏
        clipFullPageBtn.addEventListener('click', () => {
            clipFullPageBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i><span>剪藏中...</span>';
            clipFullPageBtn.disabled = true;
            
            setTimeout(() => {
                clipFullPageBtn.innerHTML = '<i class="fa fa-file-text-o mr-2"></i><span>完整页面</span>';
                clipFullPageBtn.disabled = false;
                alert('完整页面剪藏功能已启动！');
            }, 1500);
        });
        
        // 选择区域剪藏
        clipSelectionBtn.addEventListener('click', () => {
            clipSelectionBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i><span>选择中...</span>';
            clipSelectionBtn.disabled = true;
            
            setTimeout(() => {
                clipSelectionBtn.innerHTML = '<i class="fa fa-mouse-pointer mr-2"></i><span>选择区域</span>';
                clipSelectionBtn.disabled = false;
                alert('选择区域剪藏功能已启动！');
            }, 1500);
        });
        
        // 截图剪藏
        clipScreenshotBtn.addEventListener('click', () => {
            clipScreenshotBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i><span>截图中...</span>';
            clipScreenshotBtn.disabled = true;
            
            setTimeout(() => {
                clipScreenshotBtn.innerHTML = '<i class="fa fa-camera mr-2"></i><span>截图</span>';
                clipScreenshotBtn.disabled = false;
                alert('截图剪藏功能已启动！');
            }, 1500);
        });
        
        // 更新剪藏预览
        function updateClipPreview(mode) {
            if (!clipPreview) return;
            
            const url = clipUrl.value.trim();
            if (!url) return;
            
            const previews = {
                read: '<div class="p-4 rounded-lg border border-line bg-white"><h4 class="font-medium mb-2">阅读模式预览</h4><p class="text-sm text-muted">去除广告和干扰元素，专注阅读内容</p></div>',
                full: '<div class="p-4 rounded-lg border border-line bg-white"><h4 class="font-medium mb-2">完整页面预览</h4><p class="text-sm text-muted">保存整个网页的完整内容</p></div>',
                pdf: '<div class="p-4 rounded-lg border border-line bg-white"><h4 class="font-medium mb-2">PDF快照预览</h4><p class="text-sm text-muted">将网页保存为PDF文档</p></div>'
            };
            
            clipPreview.innerHTML = previews[mode] || previews.read;
        }
        
        // 清空剪藏预览
        function clearClipPreview() {
            if (clipPreview) {
                clipPreview.innerHTML = '<div class="p-4 rounded-lg border border-line bg-white text-center text-sm text-muted">输入URL查看预览</div>';
            }
        }
        
        // 更新剪藏按钮
        function updateClipButtons(mode) {
            const buttons = { clipFullPageBtn, clipSelectionBtn, clipScreenshotBtn };
            
            Object.values(buttons).forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-primary/10', 'text-primary');
            });
            
            // 根据模式高亮不同按钮
            if (mode === 'full') {
                clipFullPageBtn.classList.remove('bg-primary/10', 'text-primary');
                clipFullPageBtn.classList.add('bg-primary', 'text-white');
            }
        }
        
        // 生成内容分析
        function generateContentAnalysis(url) {
            if (!contentAnalysis) return;
            
            // 模拟AI内容分析
            const analysis = {
                title: '智能内容分析结果',
                type: '文章',
                length: '约1500字',
                readTime: '5分钟',
                tags: ['技术', '产品', '设计'],
                sentiment: '积极'
            };
            
            contentAnalysis.innerHTML = `
                <div class="p-3 rounded-lg border border-line bg-white">
                    <h4 class="font-medium mb-3 flex items-center gap-2">
                        <i class="fa fa-bar-chart text-primary"></i>
                        ${analysis.title}
                    </h4>
                    <div class="grid grid-cols-2 gap-3 text-xs">
                        <div class="flex items-center gap-2">
                            <i class="fa fa-file-text-o text-muted"></i>
                            <span>类型：${analysis.type}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="fa fa-clock-o text-muted"></i>
                            <span>阅读时间：${analysis.readTime}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="fa fa-align-left text-muted"></i>
                            <span>字数：${analysis.length}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="fa fa-smile-o text-muted"></i>
                            <span>情感：${analysis.sentiment}</span>
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="text-xs font-medium mb-1">AI推荐标签：</p>
                        <div class="flex flex-wrap gap-1.5">
                            ${analysis.tags.map(tag => `<span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
        
        // 清空内容分析
        function clearContentAnalysis() {
            if (contentAnalysis) {
                contentAnalysis.innerHTML = '';
            }
        }
        
        // 生成AI剪藏建议
        function generateAIClipSuggestions(url) {
            if (!aiSuggestionsContainer) return;
            
            const suggestions = [
                { text: '保存为知识库文章', icon: 'fa-book' },
                { text: '提取关键信息', icon: 'fa-info-circle' },
                { text: '生成摘要', icon: 'fa-file-text-o' },
                { text: '翻译成中文', icon: 'fa-language' }
            ];
            
            aiSuggestionsContainer.innerHTML = suggestions.map(suggestion => `
                <div class="p-2 rounded-lg hover:bg-primary/5 cursor-pointer transition-colors flex items-center gap-2" onclick="executeClipSuggestion('${suggestion.text}')">
                    <i class="fa ${suggestion.icon} text-primary"></i>
                    <span class="text-sm">${suggestion.text}</span>
                </div>
            `).join('');
        }
        
        // 清空AI剪藏建议
        function clearAIClipSuggestions() {
            if (aiSuggestionsContainer) {
                aiSuggestionsContainer.innerHTML = '';
            }
        }
        
        // 执行剪藏建议
        function executeClipSuggestion(suggestion) {
            const url = clipUrl.value.trim();
            if (!url) return;
            
            switch (suggestion) {
                case '保存为知识库文章':
                    alert('正在将内容保存为知识库文章...');
                    break;
                case '提取关键信息':
                    alert('正在提取关键信息...');
                    break;
                case '生成摘要':
                    alert('正在生成摘要...');
                    break;
                case '翻译成中文':
                    alert('正在翻译成中文...');
                    break;
            }
        }
        
        // 更新剪藏统计
        function updateClipStats() {
            const clipCount = document.getElementById('clip-count');
            if (clipCount) {
                const currentCount = parseInt(clipCount.textContent) || 0;
                clipCount.textContent = currentCount + 1;
            }
        }
        
        // 编辑剪藏
        function editClip(btn) {
            const clipItem = btn.closest('li');
            const url = clipItem.querySelector('.text-muted').textContent;
            clipUrl.value = url;
            clipList.removeChild(clipItem);
        }
        
        // 删除剪藏
        function deleteClip(btn) {
            const clipItem = btn.closest('li');
            if (confirm('确定要删除这条剪藏吗？')) {
                clipList.removeChild(clipItem);
                updateClipStats();
            }
        }
        
        // 防抖函数
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
        
        // URL验证
        function isValidUrl(string) {
            try {
                new URL(string);
                return true;
            } catch (_) {
                return false;
            }
        }

        // 轻量生产工具 - 待处理队列增强
        const queueSelectAll = document.getElementById('queue-select-all');
        const queueItemCheckboxes = document.querySelectorAll('.queue-item-checkbox');
        const queueFilter = document.getElementById('queue-filter');
        const queueSort = document.getElementById('queue-sort');
        const loadMoreQueue = document.getElementById('load-more-queue');
        const queueList = document.getElementById('queue-list');
        
        // 全选/取消全选
        if (queueSelectAll) {
            queueSelectAll.addEventListener('change', () => {
                const isChecked = queueSelectAll.checked;
                updateQueueItemCheckboxes(isChecked);
                updateBatchActions(isChecked ? queueItemCheckboxes.length > 0 : false);
            });
        }
        
        // 单个选择
        if (queueItemCheckboxes) {
            queueItemCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    const checkedCount = document.querySelectorAll('.queue-item-checkbox:checked').length;
                    if (queueSelectAll) {
                        queueSelectAll.checked = checkedCount === queueItemCheckboxes.length;
                    }
                    updateBatchActions(checkedCount > 0);
                });
            });
        }
        
        // 队列过滤
        if (queueFilter) {
            queueFilter.addEventListener('change', () => {
                const filterValue = queueFilter.value;
                filterQueueItems(filterValue);
            });
        }
        
        // 队列排序
        if (queueSort) {
            queueSort.addEventListener('change', () => {
                const sortValue = queueSort.value;
                sortQueueItems(sortValue);
            });
        }
        
        // 加载更多
        if (loadMoreQueue) {
            loadMoreQueue.addEventListener('click', () => {
                loadMoreQueue.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i><span>加载中...</span>';
                loadMoreQueue.disabled = true;
                
                setTimeout(() => {
                    loadMoreQueue.innerHTML = '<i class="fa fa-chevron-down mr-2"></i><span>加载更多</span>';
                    loadMoreQueue.disabled = false;
                    
                    // 模拟加载更多数据
                    loadMoreQueueItems();
                }, 1500);
            });
        }
        
        // 更新队列项复选框
        function updateQueueItemCheckboxes(checked) {
            const checkboxes = document.querySelectorAll('.queue-item-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = checked;
            });
        }
        
        // 更新批量操作按钮
        function updateBatchActions(hasSelection) {
            const actionButtons = document.querySelectorAll('#batch-actions button');
            actionButtons.forEach(btn => {
                if (hasSelection) {
                    btn.classList.remove('opacity-50', 'cursor-not-allowed');
                    btn.disabled = false;
                } else {
                    btn.classList.add('opacity-50', 'cursor-not-allowed');
                    btn.disabled = true;
                }
            });
        }
        
        // 过滤队列项
        function filterQueueItems(filterValue) {
            const queueItems = document.querySelectorAll('#queue-list > div');
            
            queueItems.forEach(item => {
                const itemType = item.dataset.type || 'all';
                
                if (filterValue === '全部类型' || filterValue === itemType) {
                    item.style.display = 'block';
                    // 添加淡入动画
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.3s ease';
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        }
        
        // 排序队列项
        function sortQueueItems(sortValue) {
            const queueItems = Array.from(document.querySelectorAll('#queue-list > div'));
            const queueListContainer = document.getElementById('queue-list');
            
            // 移除所有子元素
            queueItems.forEach(item => queueListContainer.removeChild(item));
            
            // 根据排序条件排序
            let sortedItems = queueItems;
            
            switch (sortValue) {
                case '按类型排序':
                    sortedItems = queueItems.sort((a, b) => {
                        const typeA = a.dataset.type || '';
                        const typeB = b.dataset.type || '';
                        return typeA.localeCompare(typeB);
                    });
                    break;
                case '按状态排序':
                    sortedItems = queueItems.sort((a, b) => {
                        const statusA = a.dataset.status || '';
                        const statusB = b.dataset.status || '';
                        return statusA.localeCompare(statusB);
                    });
                    break;
                case '按时间排序':
                default:
                    // 默认按时间排序（保持原顺序）
                    break;
            }
            
            // 重新添加排序后的元素
            sortedItems.forEach((item, index) => {
                queueListContainer.appendChild(item);
                // 添加淡入动画
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }
        
        // 加载更多队列项
        function loadMoreQueueItems() {
            const newItems = [
                {
                    type: '录音',
                    status: '已完成',
                    title: '市场分析会议',
                    description: '分析Q3市场趋势和竞争对手',
                    time: '3小时前',
                    user: '张三',
                    tags: ['会议', '市场分析'],
                    actions: ['查看转写', '分享']
                },
                {
                    type: '速记',
                    status: '待确认',
                    title: '产品需求讨论',
                    description: '新功能需求收集和讨论',
                    time: '4小时前',
                    user: '李四',
                    tags: ['产品', '需求'],
                    actions: ['编辑', '分享']
                }
            ];
            
            // 添加新的队列项
            newItems.forEach(item => {
                addQueueItem(item);
            });
            
            alert(`已加载${newItems.length}条新的队列项！`);
        }
        
        // 添加队列项
        function addQueueItem(item) {
            const queueItem = document.createElement('div');
            queueItem.className = 'p-4 rounded-lg border border-line bg-white shadow-sm hover:shadow-md transition-all';
            queueItem.dataset.type = item.type;
            queueItem.dataset.status = item.status;
            
            // 设置状态样式
            let statusClass = '';
            let statusText = '';
            
            switch (item.status) {
                case '处理中':
                    statusClass = 'bg-secondary/10 text-secondary';
                    statusText = '处理中';
                    break;
                case '已入库':
                    statusClass = 'bg-success/10 text-success';
                    statusText = '已入库';
                    break;
                case '待确认':
                    statusClass = 'bg-warning/10 text-warning';
                    statusText = '待确认';
                    break;
                case '已完成':
                    statusClass = 'bg-primary/10 text-primary';
                    statusText = '已完成';
                    break;
            }
            
            // 设置类型图标
            const typeIcons = {
                '录音': 'fa-file-audio-o',
                '速记': 'fa-pencil',
                '剪藏': 'fa-link'
            };
            
            queueItem.innerHTML = `
                <div class="flex items-start justify-between">
                    <div class="flex items-center gap-2">
                        <input type="checkbox" class="queue-item-checkbox rounded border-line text-primary focus:ring-primary mt-0.5">
                        <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <i class="fa ${typeIcons[item.type] || 'fa-file-text-o'} text-primary"></i>
                        </div>
                        <div>
                            <p class="font-medium">${item.title}</p>
                            <p class="text-xs text-muted">${item.description}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 rounded-full ${statusClass} text-xs">${statusText}</span>
                        <button class="p-2 rounded-full hover:bg-primary/5 transition-colors">
                            <i class="fa fa-ellipsis-h text-muted"></i>
                        </button>
                    </div>
                </div>
                <div class="mt-3 grid grid-cols-2 gap-3 text-xs">
                    <div class="flex items-center gap-2">
                        <i class="fa fa-clock-o text-muted"></i>
                        <span class="text-muted">${item.time}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-user-o text-muted"></i>
                        <span class="text-muted">${item.user}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-tags text-muted"></i>
                        <span class="text-muted">${item.tags.join(', ')}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-check-circle text-success"></i>
                        <span class="text-success">已完成</span>
                    </div>
                </div>
                <div class="mt-3 pt-3 border-t border-line flex items-center justify-between">
                    ${item.actions.map(action => {
                        let actionIcon = '';
                        switch (action) {
                            case '查看转写':
                                actionIcon = 'fa-file-text-o';
                                break;
                            case '编辑':
                                actionIcon = 'fa-edit';
                                break;
                            case '分享':
                                actionIcon = 'fa-share';
                                break;
                        }
                        return `<button class="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs hover:bg-primary/20 transition-colors">
                            <i class="fa ${actionIcon} mr-1"></i>
                            <span>${action}</span>
                        </button>`;
                    }).join('')}
                </div>
            `;
            
            // 添加到队列列表
            const queueListContainer = document.getElementById('queue-list');
            queueListContainer.appendChild(queueItem);
            
            // 添加淡入动画
            queueItem.style.opacity = '0';
            queueItem.style.transform = 'translateY(10px)';
            setTimeout(() => {
                queueItem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                queueItem.style.opacity = '1';
                queueItem.style.transform = 'translateY(0)';
            }, 100);
            
            // 重新绑定事件
            const newCheckbox = queueItem.querySelector('.queue-item-checkbox');
            newCheckbox.addEventListener('change', () => {
                const checkedCount = document.querySelectorAll('.queue-item-checkbox:checked').length;
                queueSelectAll.checked = checkedCount === document.querySelectorAll('.queue-item-checkbox').length;
                updateBatchActions(checkedCount > 0);
            });
        }
        
        // 初始化队列项数据属性
        function initQueueItemsData() {
            const queueItems = document.querySelectorAll('#queue-list > div');
            
            queueItems.forEach((item, index) => {
                // 为每个队列项添加数据属性
                const types = ['录音', '速记', '剪藏'];
                const statuses = ['处理中', '已入库', '待确认', '已完成'];
                
                item.dataset.type = types[index % types.length];
                item.dataset.status = statuses[index % statuses.length];
            });
        }
        
        // 页面加载完成后初始化
        document.addEventListener('DOMContentLoaded', () => {
            initQueueItemsData();
        });

        // 轻量生产工具 - 桌面工具增强
        const startScreenshotBtn = document.getElementById('start-screenshot');
        const startScreenRecordingBtn = document.getElementById('start-screen-recording');
        const viewClipboardHistoryBtn = document.getElementById('view-clipboard-history');
        
        // 智能截图
        startScreenshotBtn.addEventListener('click', () => {
            startScreenshotBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i><span>启动中...</span>';
            startScreenshotBtn.disabled = true;
            
            setTimeout(() => {
                startScreenshotBtn.innerHTML = '<i class="fa fa-play mr-2"></i><span>启动截图</span>';
                startScreenshotBtn.disabled = false;
                
                alert('智能截图工具已启动！\n支持：区域截图、窗口截图、滚动截图');
            }, 1500);
        });
        
        // 录屏与标注
        startScreenRecordingBtn.addEventListener('click', () => {
            startScreenRecordingBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i><span>准备中...</span>';
            startScreenRecordingBtn.disabled = true;
            
            setTimeout(() => {
                startScreenRecordingBtn.innerHTML = '<i class="fa fa-play mr-2"></i><span>开始录屏</span>';
                startScreenRecordingBtn.disabled = false;
                
                alert('录屏工具已启动！\n支持：实时标注、系统声音录制、AI视频摘要');
            }, 2000);
        });
        
        // 剪贴板历史
        viewClipboardHistoryBtn.addEventListener('click', () => {
            viewClipboardHistoryBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i><span>加载中...</span>';
            viewClipboardHistoryBtn.disabled = true;
            
            setTimeout(() => {
                viewClipboardHistoryBtn.innerHTML = '<i class="fa fa-eye mr-2"></i><span>查看历史</span>';
                viewClipboardHistoryBtn.disabled = false;
                
                alert('剪贴板历史已打开！\n包含：文本、图片、代码片段等内容');
            }, 1500);
        });

        // 优化用户交互体验和动画效果
        
        // 1. 页面加载动画
        document.addEventListener('DOMContentLoaded', () => {
            const pageElements = document.querySelectorAll('.page, .tab-panel');
            pageElements.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    if (element.classList.contains('active')) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                }, 100 + (index * 50));
            });
        });
        
        // 2. 标签页切换动画
        const tabButtonsEnhanced = document.querySelectorAll('.tab-btn');
        tabButtonsEnhanced.forEach(btn => {
            btn.addEventListener('click', () => {
                // 添加按钮点击反馈
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 100);
                
                // 标签页面板切换动画
                const tabPanelsEnhanced = document.querySelectorAll('.tab-panel');
                tabPanelsEnhanced.forEach(panel => {
                    panel.style.opacity = '0';
                    panel.style.transform = 'translateY(10px)';
                    panel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                });
                
                setTimeout(() => {
                    const activePanel = document.querySelector('.tab-panel.active');
                    if (activePanel) {
                        activePanel.style.opacity = '1';
                        activePanel.style.transform = 'translateY(0)';
                    }
                }, 150);
            });
        });
        
        // 3. 按钮和交互元素的悬停效果增强
        const interactiveElements = document.querySelectorAll('button, .tab-btn, .ai-suggestion-item, .queue-item-checkbox, .term-btn');
        interactiveElements.forEach(element => {
            // 添加悬停效果
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'all 0.2s ease';
            });
            
            // 添加点击效果
            element.addEventListener('mousedown', () => {
                if (element.tagName === 'BUTTON') {
                    element.style.transform = 'scale(0.97)';
                }
            });
            
            element.addEventListener('mouseup', () => {
                if (element.tagName === 'BUTTON') {
                    element.style.transform = 'scale(1)';
                }
            });
        });
        
        // 4. 输入框和表单元素的交互效果
        const formElements = document.querySelectorAll('input, textarea, select');
        formElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.transition = 'all 0.2s ease';
                element.style.boxShadow = '0 0 0 2px rgba(0, 123, 255, 0.25)';
            });
            
            element.addEventListener('blur', () => {
                element.style.boxShadow = 'none';
            });
        });
        
        // 5. 滚动动画效果
        const scrollableElements = document.querySelectorAll('.tab-panel, #queue-list, #transcript-display');
        scrollableElements.forEach(element => {
            element.addEventListener('scroll', () => {
                // 可以在这里添加滚动相关的动画效果
            });
        });
        
        // 6. 列表项的添加和删除动画
        const addListItemAnimation = (item) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-10px)';
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        };
        
        const removeListItemAnimation = (item, callback) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-10px)';
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            setTimeout(() => {
                if (callback) callback();
            }, 300);
        };
        
        // 7. 模态框和抽屉的动画效果
        const modalElements = document.querySelectorAll('.modal, #capture-drawer');
        modalElements.forEach(modal => {
            const openButtons = document.querySelectorAll(`[onclick*="${modal.id}"], [data-modal="${modal.id}"]`);
            const closeButtons = modal.querySelectorAll('.close-modal, .close-drawer');
            
            openButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    modal.style.display = 'block';
                    modal.style.opacity = '0';
                    modal.style.transform = 'scale(0.95)';
                    modal.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    
                    setTimeout(() => {
                        modal.style.opacity = '1';
                        modal.style.transform = 'scale(1)';
                    }, 50);
                });
            });
            
            closeButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    modal.style.opacity = '0';
                    modal.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        modal.style.display = 'none';
                    }, 300);
                });
            });
            
            // 点击模态框外部关闭
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.opacity = '0';
                    modal.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        modal.style.display = 'none';
                    }, 300);
                }
            });
        
        // 8. 平滑滚动效果
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // 9. 数据加载状态动画
        const loadingStates = document.querySelectorAll('.loading, [id*="-loading"]');
        loadingStates.forEach(element => {
            // 添加加载动画样式
            element.style.position = 'relative';
            element.innerHTML += '<div class="loading-spinner"></div>';
        });
        
        // 10. 进度条和状态指示器动画
        const progressElements = document.querySelectorAll('.progress-bar, .status-indicator');
        progressElements.forEach(element => {
            const width = element.dataset.progress || '0%';
            element.style.width = '0%';
            element.style.transition = 'width 0.8s ease';
            
            setTimeout(() => {
                element.style.width = width;
            }, 300);
        });
        
        // 重写之前的函数以支持动画
        const originalAddTranscriptLine = addTranscriptLine;
        window.addTranscriptLine = function(speaker, text) {
            originalAddTranscriptLine.call(this, speaker, text);
            // 获取最新添加的转写行元素并添加动画
            const transcriptItems = document.querySelectorAll('#transcript-display > div');
            if (transcriptItems.length > 0) {
                const newItem = transcriptItems[transcriptItems.length - 1];
                addListItemAnimation(newItem);
            }
        };
        
        const originalAddQueueItem = addQueueItem;
        window.addQueueItem = function(item) {
            originalAddQueueItem.call(this, item);
            // 获取最新添加的队列项元素并添加动画
            const queueItems = document.querySelectorAll('#queue-list > div');
            if (queueItems.length > 0) {
                const newItem = queueItems[queueItems.length - 1];
                addListItemAnimation(newItem);
            }
        };
        
        window.deleteTranscriptLine = function(btn) {
            const transcriptItem = btn.closest('div');
            removeListItemAnimation(transcriptItem, () => {
                transcriptItem.remove();
                // 更新转写统计
                transcriptLines = transcriptLines.filter(line => line !== transcriptItem);
                updateTranscriptStats();
            });
        };
        
        window.deleteClip = function(btn) {
            const clipItem = btn.closest('li');
            if (confirm('确定要删除这条剪藏吗？')) {
                removeListItemAnimation(clipItem, () => {
                    clipItem.remove();
                    updateClipStats();
                });
            }
        };

        function showToast(message) {
            if (!toast) return;
            toast.textContent = message;
            toast.classList.remove('hidden');
            setTimeout(() => toast.classList.add('hidden'), 2000);
        }

        if (saveSettings) {
            saveSettings.addEventListener('click', () => {
                showToast('设置已保存');
            });
        }

        if (actionButtons) {
            actionButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const message = btn.dataset.action || '操作已完成';
                    showToast(message);
                });
            });
        }

        if (addFlowStep) {
            addFlowStep.addEventListener('click', () => {
                const step = document.createElement('li');
                step.className = 'p-2 rounded-lg bg-mist';
                step.textContent = '新智能体步骤';
                if (agentFlow) {
                    agentFlow.appendChild(step);
                }
            });
        }

        function initSalesChart() {
            if (!salesChartCanvas) return;
            const parent = salesChartCanvas.parentElement;
            const fallbackWidth = 520;
            const fallbackHeight = 180;
            if (parent) {
                const width = parent.clientWidth || parent.offsetWidth || fallbackWidth;
                const height = parent.clientHeight || parent.offsetHeight || fallbackHeight;
                salesChartCanvas.width = width;
                salesChartCanvas.height = height;
            } else {
                salesChartCanvas.width = fallbackWidth;
                salesChartCanvas.height = fallbackHeight;
            }
            const data = {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                valuesA: [120, 150, 180, 170, 210, 240],
                valuesB: [100, 120, 140, 160, 180, 200]
            };
            const ctx = salesChartCanvas.getContext('2d');
            const padding = 24;
            const maxVal = Math.max(...data.valuesA, ...data.valuesB);
            const minVal = 0;
            const chartW = salesChartCanvas.width - padding * 2;
            const chartH = salesChartCanvas.height - padding * 2;
            ctx.clearRect(0, 0, salesChartCanvas.width, salesChartCanvas.height);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, salesChartCanvas.width, salesChartCanvas.height);
            ctx.strokeStyle = 'rgba(15, 23, 42, 0.08)';
            for (let i = 0; i <= 4; i += 1) {
                const y = padding + (chartH / 4) * i;
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(padding + chartW, y);
                ctx.stroke();
            }
            ctx.strokeStyle = 'rgba(15, 23, 42, 0.15)';
            ctx.beginPath();
            ctx.moveTo(padding, padding);
            ctx.lineTo(padding, padding + chartH);
            ctx.lineTo(padding + chartW, padding + chartH);
            ctx.stroke();
            function drawSeries(values, color, fillColor) {
                ctx.fillStyle = fillColor;
                ctx.beginPath();
                values.forEach((val, idx) => {
                    const x = padding + (chartW / (values.length - 1)) * idx;
                    const y = padding + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
                    if (idx === 0) {
                        ctx.moveTo(x, padding + chartH);
                        ctx.lineTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                });
                ctx.lineTo(padding + chartW, padding + chartH);
                ctx.closePath();
                ctx.fill();

                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.beginPath();
                values.forEach((val, idx) => {
                    const x = padding + (chartW / (values.length - 1)) * idx;
                    const y = padding + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
                    if (idx === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                });
                ctx.stroke();
                ctx.fillStyle = color;
                values.forEach((val, idx) => {
                    const x = padding + (chartW / (values.length - 1)) * idx;
                    const y = padding + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
                    ctx.beginPath();
                    ctx.arc(x, y, 3, 0, Math.PI * 2);
                    ctx.fill();
                });
            }
            drawSeries(data.valuesA, '#1b2a4e', 'rgba(27, 42, 78, 0.12)');
            drawSeries(data.valuesB, '#00807f', 'rgba(0, 128, 127, 0.12)');
        }

        window.addEventListener('load', () => {
            initSalesChart();
            // 初始化空间统计信息
            if (typeof teamSpaceManager !== 'undefined' && teamSpaceManager.updateSpaceStatistics) {
                teamSpaceManager.updateSpaceStatistics();
            }
        });

        // 新增交互逻辑 - 文档树批量选择
        const toggleSelectMode = document.getElementById('toggle-select-mode');
        const batchActions = document.getElementById('batch-actions');
        const docCheckboxes = document.querySelectorAll('.doc-checkbox');
        const selectedCount = document.getElementById('selected-count');

        if (toggleSelectMode) {
            toggleSelectMode.addEventListener('click', () => {
                const isActive = toggleSelectMode.classList.contains('bg-primary');
                if (isActive) {
                    toggleSelectMode.classList.remove('bg-primary', 'text-white');
                    toggleSelectMode.classList.add('bg-mist');
                    docCheckboxes.forEach(cb => cb.classList.add('hidden'));
                    batchActions.classList.add('hidden');
                } else {
                    toggleSelectMode.classList.add('bg-primary', 'text-white');
                    toggleSelectMode.classList.remove('bg-mist');
                    docCheckboxes.forEach(cb => cb.classList.remove('hidden'));
                }
            });
        }

        docCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const checkedCount = document.querySelectorAll('.doc-checkbox:checked').length;
                if (selectedCount) selectedCount.textContent = checkedCount;
                if (batchActions) {
                    batchActions.classList.toggle('hidden', checkedCount === 0);
                }
            });
        });

        // 文件夹折叠展开
        const folderToggles = document.querySelectorAll('.folder-toggle');
        folderToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const folderItem = toggle.closest('.folder-item');
                const children = folderItem.querySelector('.folder-children');
                if (children) {
                    children.classList.toggle('hidden');
                    toggle.classList.toggle('fa-angle-right');
                    toggle.classList.toggle('fa-angle-down');
                }
            });
        });

        // 树内搜索
        const treeSearchInput = document.getElementById('tree-search-input');
        if (treeSearchInput) {
            treeSearchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const folderItems = document.querySelectorAll('.folder-item, .folder-children li');
                folderItems.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    if (text.includes(searchTerm) || searchTerm === '') {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }

        // AI助手面板切换
        const toggleAiPanel = document.getElementById('toggle-ai-panel');
        if (toggleAiPanel) {
            toggleAiPanel.addEventListener('click', () => {
                showToast('AI助手侧边栏已打开');
            });
        }

        // 知识图谱交互
        const graphNodes = document.querySelectorAll('.graph-node');
        const graphTooltip = document.getElementById('graph-tooltip');
        const selectedNodeInfo = document.getElementById('selected-node-info');

        graphNodes.forEach(node => {
            node.addEventListener('mouseenter', (e) => {
                if (graphTooltip) {
                    const nodeType = node.dataset.type;
                    const nodeText = node.textContent.trim();
                    graphTooltip.innerHTML = `
                        <p class="font-medium text-sm">${nodeText}</p>
                        <p class="text-muted mt-1">这是一个${nodeType}节点的详细信息...</p>
                        <div class="mt-2 flex gap-2">
                            <span class="px-2 py-1 bg-mist rounded">类型: ${nodeType}</span>
                            <span class="px-2 py-1 bg-mist rounded">关联: 5</span>
                        </div>
                    `;
                    graphTooltip.classList.remove('hidden');
                    graphTooltip.style.left = '50%';
                    graphTooltip.style.top = '20px';
                }
            });

            node.addEventListener('mouseleave', () => {
                if (graphTooltip) graphTooltip.classList.add('hidden');
            });

            node.addEventListener('click', () => {
                const nodeText = node.textContent.trim();
                const nodeType = node.dataset.type;
                if (selectedNodeInfo) {
                    selectedNodeInfo.innerHTML = `
                        <p class="font-medium">${nodeText}</p>
                        <p class="text-muted mt-1">类型: ${nodeType}</p>
                        <p class="text-muted">关联节点: 5个</p>
                        <button class="mt-2 px-2 py-1 rounded-full bg-primary text-white w-full text-xs">查看详情</button>
                    `;
                }
                graphNodes.forEach(n => n.querySelector('.node-circle').setAttribute('stroke', 'none'));
                node.querySelector('.node-circle').setAttribute('stroke', '#3b82f6');
                node.querySelector('.node-circle').setAttribute('stroke-width', '3');
                showToast(`已选中节点: ${nodeText}`);
            });
        });

        // 关系筛选
        const relationFilters = document.querySelectorAll('.relation-filter');
        relationFilters.forEach(filter => {
            filter.addEventListener('change', () => {
                const type = filter.dataset.type;
                const checked = filter.checked;
                const edges = document.querySelectorAll(`.graph-edge[data-type="${type}"]`);
                edges.forEach(edge => {
                    edge.style.display = checked ? '' : 'none';
                });
                showToast(`${checked ? '显示' : '隐藏'}了"${type}"关系`);
            });
        });

        // 图谱布局切换
        const graphLayout = document.getElementById('graph-layout');
        if (graphLayout) {
            graphLayout.addEventListener('change', (e) => {
                showToast(`图谱布局已切换为${e.target.selectedOptions[0].text}`);
            });
        }

        // 图谱全屏
        const graphFullscreen = document.getElementById('graph-fullscreen');
        if (graphFullscreen) {
            graphFullscreen.addEventListener('click', () => {
                showToast('图谱全屏模式已启用');
            });
        }

        // 展开节点
        const expandOneHop = document.getElementById('expand-one-hop');
        const expandTwoHop = document.getElementById('expand-two-hop');
        if (expandOneHop) {
            expandOneHop.addEventListener('click', () => {
                showToast('已展开1度关联节点(模拟)');
            });
        }
        if (expandTwoHop) {
            expandTwoHop.addEventListener('click', () => {
                showToast('已展开2度关联节点(模拟)');
            });
        }

        // 时间轴对比
        const timelineCompare = document.getElementById('timeline-compare');
        const timelineComparison = document.getElementById('timeline-comparison');
        if (timelineCompare && timelineComparison) {
            timelineCompare.addEventListener('click', () => {
                timelineComparison.classList.toggle('hidden');
            });
        }

        // 拖拽功能模拟(简单实现)
        const folderItems = document.querySelectorAll('.folder-item[draggable="true"]');
        folderItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                item.style.opacity = '0.5';
                e.dataTransfer.effectAllowed = 'move';
            });

            item.addEventListener('dragend', () => {
                item.style.opacity = '1';
                showToast('文件已移动(模拟)');
            });

            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            });
        });

        // 收藏功能
        document.addEventListener('click', (e) => {
            if (e.target.closest('.fa-star-o')) {
                const star = e.target.closest('.fa-star-o') || e.target;
                star.classList.remove('fa-star-o');
                star.classList.add('fa-star');
                star.style.color = '#f59e0b';
                showToast('已添加到收藏');
            }
        });

        console.log('智能知识库全部交互功能已加载完成');
    });
