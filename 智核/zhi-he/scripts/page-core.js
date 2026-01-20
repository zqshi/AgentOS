// 全局导航函数，处理所有页面切换
        function showPage(pageName) {
            console.log('showPage函数被调用:', pageName);
            
            // 1. 隐藏所有页面
            const allPages = document.querySelectorAll('.page');
            allPages.forEach(page => {
                page.classList.remove('active');
                page.style.display = 'none';
                page.style.opacity = '0';
                page.style.transform = 'translateY(20px)';
                console.log('隐藏页面:', page.id);
            });
            
            // 2. 显示目标页面
            const targetPageId = `page-${pageName}`;
            const targetPage = document.getElementById(targetPageId);
            
            if (targetPage) {
                console.log('显示目标页面:', targetPageId);
                targetPage.classList.add('active');
                targetPage.style.display = 'flex';
                targetPage.style.minHeight = 'calc(100vh - 120px)';
                targetPage.style.height = 'auto';
                targetPage.style.overflow = 'auto';
                targetPage.style.opacity = '1';
                targetPage.style.transform = 'translateY(0)';
                
                console.log('目标页面样式:', window.getComputedStyle(targetPage).display);
            } else {
                console.error('未找到目标页面:', targetPageId);
                alert('未找到目标页面: ' + targetPageId);
            }
            
            // 3. 更新导航按钮样式
            const navButtons = document.querySelectorAll('.nav-btn');
            navButtons.forEach(btn => {
                btn.classList.remove('bg-primary/10', 'text-primary');
                btn.classList.add('text-muted');
            });
            
            const currentBtn = document.querySelector(`[data-page="${pageName}"]`);
            if (currentBtn) {
                currentBtn.classList.add('bg-primary/10', 'text-primary');
                currentBtn.classList.remove('text-muted');
            }
            
            console.log('导航按钮样式已更新');
            
            // 4. 滚动到顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            console.log('showPage函数执行完成');
        }
        
        // 批注系统功能
        function openCommentForm(paragraphId) {
            // 先移除已存在的批注表单
            const existingForm = document.querySelector('.comment-form-container');
            if (existingForm) {
                existingForm.remove();
            }

            // 获取当前段落
            const paragraph = document.querySelector(`[data-paragraph-id="${paragraphId}"]`);
            if (!paragraph) return;

            // 创建批注表单容器
            const formContainer = document.createElement('div');
            formContainer.className = 'comment-form-container absolute z-10 bg-white rounded-xl shadow-lg p-4 border border-line w-96 max-w-full mt-2';
            formContainer.innerHTML = `
                <div class="flex items-center justify-between mb-3">
                    <h4 class="font-medium">添加批注</h4>
                    <button class="p-1 text-muted hover:text-primary rounded" onclick="this.closest('.comment-form-container').remove()">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
                
                <!-- 批注类型选择 -->
                <div class="mb-3">
                    <label class="block text-sm text-muted mb-2">批注类型</label>
                    <div class="flex gap-2 flex-wrap">
                        <button type="button" class="comment-type-btn px-3 py-1 rounded-full text-xs bg-danger/20 text-danger border border-danger/30 active" data-type="error">
                            <i class="fa fa-times-circle mr-1"></i>错误
                        </button>
                        <button type="button" class="comment-type-btn px-3 py-1 rounded-full text-xs bg-warning/20 text-warning border border-warning/30" data-type="suggestion">
                            <i class="fa fa-lightbulb-o mr-1"></i>建议
                        </button>
                        <button type="button" class="comment-type-btn px-3 py-1 rounded-full text-xs bg-info/20 text-info border border-info/30" data-type="question">
                            <i class="fa fa-question-circle mr-1"></i>疑问
                        </button>
                        <button type="button" class="comment-type-btn px-3 py-1 rounded-full text-xs bg-primary/20 text-primary border border-primary/30" data-type="info">
                            <i class="fa fa-info-circle mr-1"></i>信息
                        </button>
                    </div>
                </div>

                <!-- 批注内容 -->
                <div class="mb-3">
                    <label class="block text-sm text-muted mb-2">批注内容</label>
                    <textarea id="comment-content" rows="3" class="w-full border border-line rounded-lg p-2 text-sm resize-none" placeholder="请输入您的批注..."></textarea>
                </div>

                <!-- 建议编辑模式 -->
                <div class="mb-3">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" id="suggest-edit-mode" class="w-4 h-4 text-primary">
                        <span class="text-sm">建议编辑</span>
                    </label>
                    <div id="edit-suggestion-container" class="hidden mt-2">
                        <textarea id="edit-suggestion" rows="3" class="w-full border border-line rounded-lg p-2 text-sm resize-none" placeholder="请输入您的建议编辑内容..."></textarea>
                    </div>
                </div>

                <!-- 操作按钮 -->
                <div class="flex justify-end gap-2">
                    <button type="button" class="px-4 py-2 text-sm border border-line rounded-lg hover:bg-mist" onclick="this.closest('.comment-form-container').remove()">
                        取消
                    </button>
                    <button type="button" class="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90" onclick="saveComment(${paragraphId})">
                        保存批注
                    </button>
                </div>
            `;

            // 添加到页面并定位
            document.body.appendChild(formContainer);
            const paragraphRect = paragraph.getBoundingClientRect();
            formContainer.style.left = `${paragraphRect.left + window.scrollX}px`;
            formContainer.style.top = `${paragraphRect.bottom + window.scrollY}px`;

            // 绑定批注类型选择事件
            const typeButtons = formContainer.querySelectorAll('.comment-type-btn');
            typeButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    typeButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
            });

            // 绑定建议编辑模式切换事件
            const suggestEditCheckbox = formContainer.querySelector('#suggest-edit-mode');
            const editSuggestionContainer = formContainer.querySelector('#edit-suggestion-container');
            suggestEditCheckbox.addEventListener('change', () => {
                if (suggestEditCheckbox.checked) {
                    editSuggestionContainer.classList.remove('hidden');
                } else {
                    editSuggestionContainer.classList.add('hidden');
                }
            });

            // 点击外部关闭
            document.addEventListener('click', function closeCommentForm(e) {
                if (!formContainer.contains(e.target) && !e.target.closest('[data-paragraph-id]')) {
                    formContainer.remove();
                    document.removeEventListener('click', closeCommentForm);
                }
            });
        }
        
        function mentionUser(paragraphId) {
            alert(`在段落 ${paragraphId} 中@提及用户`);
        }
        
        function openNewCommentForm() {
            alert('打开新批注表单');
        }
        
        function updateCommentStatus(btn, status) {
            const commentItem = btn.closest('.comment-item');
            const statusSpan = commentItem.querySelector('[data-status]');
            commentItem.dataset.status = status;
            
            // 更新状态显示
            const statusText = commentItem.querySelector('.flex.items-center.gap-1 span:last-child');
            const statusColors = {
                accepted: { bg: 'bg-success/20', text: 'text-success', label: '已采纳' },
                rejected: { bg: 'bg-danger/20', text: 'text-danger', label: '不采纳' },
                pending: { bg: 'bg-danger/20', text: 'text-danger', label: '待处理' },
                processing: { bg: 'bg-warning/20', text: 'text-warning', label: '处理中' }
            };
            
            const newStatus = statusColors[status];
            statusText.className = `px-2 py-1 rounded-full ${newStatus.bg} ${newStatus.text} text-[10px]`;
            statusText.textContent = newStatus.label;
            
            // 如果是已采纳或不采纳，隐藏操作按钮
            if (status === 'accepted' || status === 'rejected') {
                const actionButtons = commentItem.querySelectorAll('.mt-2.flex.gap-2 button');
                actionButtons.forEach(btn => {
                    if (btn.title === '采纳' || btn.title === '不采纳') {
                        btn.remove();
                    }
                });
            }
            
            alert(`批注状态已更新为：${newStatus.label}`);
        }

        function saveComment(paragraphId) {
            // 获取批注表单数据
            const formContainer = document.querySelector('.comment-form-container');
            if (!formContainer) return;

            const selectedTypeBtn = formContainer.querySelector('.comment-type-btn.active');
            const commentType = selectedTypeBtn ? selectedTypeBtn.dataset.type : 'suggestion';
            const commentContent = formContainer.querySelector('#comment-content').value.trim();
            const suggestEditMode = formContainer.querySelector('#suggest-edit-mode').checked;
            const editSuggestion = suggestEditMode ? formContainer.querySelector('#edit-suggestion').value.trim() : '';

            // 验证内容
            if (!commentContent) {
                alert('请输入批注内容');
                return;
            }

            // 模拟生成批注ID
            const commentId = 'comment_' + Date.now();

            // 创建新批注数据
            const newComment = {
                id: commentId,
                paragraphId: paragraphId,
                type: commentType,
                content: commentContent,
                editSuggestion: editSuggestion,
                status: 'pending',
                author: '当前用户',
                avatar: 'https://p3-doubao-search-sign.byteimg.com/pgc-image/6323b43dac9b41db978bffd8c580ac63~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783481830&x-signature=E%2BA4UNzvvjJgdRQb3RrhhengBCo%3D',
                createTime: new Date().toISOString(),
                likes: 0,
                replies: []
            };

            // 更新段落的批注标记
            updateCommentMarkers(paragraphId, commentType);

            // 添加到批注列表
            addCommentToList(newComment);

            // 关闭表单
            formContainer.remove();

            // 显示成功提示
            alert('批注添加成功');
        }

        function updateCommentMarkers(paragraphId, commentType) {
            const paragraph = document.querySelector(`[data-paragraph-id="${paragraphId}"]`);
            if (!paragraph) return;

            const markersContainer = paragraph.querySelector('.comment-markers');
            if (!markersContainer) return;

            // 添加新的批注标记
            const newMarker = document.createElement('span');
            newMarker.className = `w-2 h-2 rounded-full ${getCommentTypeColor(commentType)}`;
            newMarker.title = getCommentTypeLabel(commentType);
            markersContainer.appendChild(newMarker);
        }

        function addCommentToList(comment) {
            // 获取批注列表容器
            const commentsList = document.querySelector('.comments-list');
            if (!commentsList) return;

            // 创建批注项
            const commentItem = document.createElement('div');
            commentItem.className = `comment-item p-3 rounded-xl bg-white border border-line mb-2`;
            commentItem.dataset.type = comment.type;
            commentItem.dataset.status = comment.status;

            // 获取当前段落标题
            const paragraph = document.querySelector(`[data-paragraph-id="${comment.paragraphId}"]`);
            const paragraphTitle = paragraph ? paragraph.querySelector('h3')?.textContent || `段落 ${comment.paragraphId}` : `段落 ${comment.paragraphId}`;

            commentItem.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <img src="${comment.avatar}" alt="用户头像" class="w-6 h-6 rounded-full">
                        <div>
                            <p class="font-medium">${comment.author}</p>
                            <p class="text-muted">${formatCommentTime(comment.createTime)}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="px-2 py-1 rounded-full ${getCommentTypeColor(comment.type, true)} ${getCommentTypeTextColor(comment.type)} text-[10px]">
                            ${getCommentTypeIcon(comment.type)} ${getCommentTypeLabel(comment.type)}
                        </span>
                        <span class="px-2 py-1 rounded-full bg-danger/20 text-danger text-[10px]">待处理</span>
                    </div>
                </div>
                <div class="mt-2 text-sm">
                    <p class="text-muted mb-1"><i class="fa fa-file-text-o mr-1"></i>${paragraphTitle}</p>
                    <p>${comment.content}</p>
                </div>
                ${comment.editSuggestion ? `
                <div class="mt-3 p-2 bg-mist rounded-lg border border-line">
                    <p class="text-xs text-muted mb-1"><i class="fa fa-pencil mr-1"></i>建议编辑：</p>
                    <p class="text-sm">${comment.editSuggestion}</p>
                    <button class="mt-2 text-xs text-primary hover:underline" onclick="applyEditSuggestion('${comment.id}', ${comment.paragraphId}, '${comment.editSuggestion.replace(/'/g, "\\'")}')">
                        采纳建议编辑
                    </button>
                </div>
                ` : ''}
                <div class="mt-2 flex gap-2">
                    <button class="px-3 py-1 text-xs bg-success/20 text-success rounded-full hover:bg-success/30 border border-success/30" title="采纳" onclick="updateCommentStatus(this, 'accepted')">
                        <i class="fa fa-check mr-1"></i>采纳
                    </button>
                    <button class="px-3 py-1 text-xs bg-danger/20 text-danger rounded-full hover:bg-danger/30 border border-danger/30" title="不采纳" onclick="updateCommentStatus(this, 'rejected')">
                        <i class="fa fa-times mr-1"></i>不采纳
                    </button>
                    <button class="px-3 py-1 text-xs bg-secondary/20 text-secondary rounded-full hover:bg-secondary/30 border border-secondary/30" title="回复" onclick="replyToComment('${comment.id}')">
                        <i class="fa fa-reply mr-1"></i>回复
                    </button>
                    <button class="px-3 py-1 text-xs bg-info/20 text-info rounded-full hover:bg-info/30 border border-info/30" title="点赞" onclick="likeComment('${comment.id}')">
                        <i class="fa fa-thumbs-up mr-1"></i>点赞
                    </button>
                </div>
            `;

            // 添加到批注列表
            commentsList.insertBefore(commentItem, commentsList.firstChild);
        }

        function getCommentTypeColor(type, isBg = false) {
            const colors = {
                error: isBg ? 'bg-danger/20' : 'bg-danger',
                suggestion: isBg ? 'bg-warning/20' : 'bg-warning',
                question: isBg ? 'bg-info/20' : 'bg-info',
                info: isBg ? 'bg-primary/20' : 'bg-primary'
            };
            return colors[type] || colors.suggestion;
        }

        function getCommentTypeTextColor(type) {
            const colors = {
                error: 'text-danger',
                suggestion: 'text-warning',
                question: 'text-info',
                info: 'text-primary'
            };
            return colors[type] || colors.suggestion;
        }

        function getCommentTypeIcon(type) {
            const icons = {
                error: '<i class="fa fa-times-circle"></i>',
                suggestion: '<i class="fa fa-lightbulb-o"></i>',
                question: '<i class="fa fa-question-circle"></i>',
                info: '<i class="fa fa-info-circle"></i>'
            };
            return icons[type] || icons.suggestion;
        }

        function getCommentTypeLabel(type) {
            const labels = {
                error: '错误',
                suggestion: '建议',
                question: '疑问',
                info: '信息'
            };
            return labels[type] || labels.suggestion;
        }

        function formatCommentTime(timestamp) {
            const now = new Date();
            const commentDate = new Date(timestamp);
            const diffMs = now - commentDate;
            const diffMins = Math.floor(diffMs / (1000 * 60));
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            if (diffMins < 1) return '刚刚';
            if (diffMins < 60) return `${diffMins}分钟前`;
            if (diffHours < 24) return `${diffHours}小时前`;
            if (diffDays < 7) return `${diffDays}天前`;
            
            return commentDate.toLocaleDateString();
        }

        function applyEditSuggestion(commentId, paragraphId, suggestion) {
            // 获取段落内容
            const paragraph = document.querySelector(`[data-paragraph-id="${paragraphId}"]`);
            if (!paragraph) return;

            const editableContent = paragraph.querySelector('.editable-content');
            if (!editableContent) return;

            // 应用建议编辑
            editableContent.innerHTML = suggestion;

            // 更新批注状态为已采纳
            const commentItem = document.querySelector(`.comment-item[data-comment-id="${commentId}"]`);
            if (commentItem) {
                const acceptBtn = commentItem.querySelector('button[title="采纳"]');
                if (acceptBtn) {
                    updateCommentStatus(acceptBtn, 'accepted');
                }
            }

            alert('已采纳建议编辑');
        }

        function replyToComment(commentId) {
            alert(`回复批注 ${commentId}`);
        }

        function likeComment(commentId) {
            const commentItem = document.querySelector(`[data-comment-id="${commentId}"]`);
            if (!commentItem) return;

            const likeBtn = commentItem.querySelector('button[title="点赞"]');
            const likeIcon = likeBtn.querySelector('i');
            const likeCount = likeBtn.querySelector('span:last-child');

            if (likeBtn.classList.contains('active')) {
                // 取消点赞
                likeBtn.classList.remove('active', 'bg-primary/20', 'text-primary');
                likeBtn.classList.add('bg-info/20', 'text-info');
                likeIcon.classList.remove('fa-thumbs-up');
                likeIcon.classList.add('fa-thumbs-o-up');
                if (likeCount) {
                    likeCount.textContent = Math.max(0, parseInt(likeCount.textContent) - 1);
                }
            } else {
                // 点赞
                likeBtn.classList.remove('bg-info/20', 'text-info');
                likeBtn.classList.add('active', 'bg-primary/20', 'text-primary');
                likeIcon.classList.remove('fa-thumbs-o-up');
                likeIcon.classList.add('fa-thumbs-up');
                if (likeCount) {
                    likeCount.textContent = parseInt(likeCount.textContent || '0') + 1;
                }
            }
        }
        
        function replyToComment(btn) {
            const commentItem = btn.closest('.comment-item');
            alert(`回复此批注`);
        }
        
        // 筛选批注
        document.addEventListener('DOMContentLoaded', function() {
            // 批注类型筛选
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // 移除所有激活状态
                    filterBtns.forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));
                    filterBtns.forEach(b => b.classList.add('bg-white', 'border', 'border-line'));
                    
                    // 添加当前按钮的激活状态
                    this.classList.add('active', 'bg-primary', 'text-white');
                    this.classList.remove('bg-white', 'border', 'border-line');
                    
                    const filterType = this.dataset.type;
                    filterComments(filterType, null);
                });
            });
            
            // 批注状态筛选
            const statusBtns = document.querySelectorAll('.status-btn');
            statusBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // 移除所有激活状态
                    statusBtns.forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));
                    statusBtns.forEach(b => b.classList.add('bg-white', 'border', 'border-line'));
                    
                    // 添加当前按钮的激活状态
                    this.classList.add('active', 'bg-primary', 'text-white');
                    this.classList.remove('bg-white', 'border', 'border-line');
                    
                    const filterStatus = this.dataset.status;
                    filterComments(null, filterStatus);
                });
            });
            
            // 显示所有批注按钮
            const showAllBtn = document.getElementById('show-all-comments');
            if (showAllBtn) {
                showAllBtn.addEventListener('click', function() {
                    toggleAllComments();
                });
            }
            
            // 运行AI质量检查按钮
            const qualityCheckBtn = document.getElementById('run-quality-check');
            if (qualityCheckBtn) {
                qualityCheckBtn.addEventListener('click', function() {
                    runQualityCheck();
                });
            }
        });
        
        function filterComments(type, status) {
            const commentItems = document.querySelectorAll('.comment-item');
            commentItems.forEach(item => {
                let show = true;
                
                // 按类型筛选
                if (type && item.dataset.type !== type) {
                    show = false;
                }
                
                // 按状态筛选
                if (status && item.dataset.status !== status) {
                    show = false;
                }
                
                item.style.display = show ? 'block' : 'none';
            });
        }
        
        function toggleAllComments() {
            alert('切换显示所有批注');
        }
        
        function runQualityCheck() {
            // 模拟AI检查过程
            const checkBtn = document.getElementById('run-quality-check');
            const originalText = checkBtn.textContent;
            checkBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-1"></i>检查中...';
            checkBtn.disabled = true;
            
            // 模拟1秒检查时间
            setTimeout(function() {
                // 生成随机质量得分（70-95之间）
                const qualityScore = Math.floor(Math.random() * 26) + 70;
                
                // 更新结果面板
                const resultsPanel = document.getElementById('ai-check-results');
                const aiQualityScore = document.getElementById('ai-quality-score');
                const qualityProgress = document.getElementById('quality-progress');
                const qualityScoreDisplay = document.getElementById('quality-score');
                const checkTime = document.getElementById('check-time');
                
                // 更新质量得分
                aiQualityScore.textContent = `${qualityScore} / 100`;
                qualityProgress.style.width = `${qualityScore}%`;
                qualityScoreDisplay.textContent = `${qualityScore} / 100`;
                
                // 更新检查时间
                const now = new Date();
                const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
                checkTime.textContent = `${timeStr} 检查`;
                
                // 显示结果面板
                resultsPanel.style.display = 'block';
                
                // 恢复按钮状态
                checkBtn.textContent = originalText;
                checkBtn.disabled = false;
                
                alert(`AI智能预检完成！综合质量得分：${qualityScore} / 100`);
            }, 1000);
        }
        
        // 应用所有建议
        document.addEventListener('DOMContentLoaded', function() {
            // 应用所有建议
            const applyBtn = document.getElementById('apply-all-suggestions');
            if (applyBtn) {
                applyBtn.addEventListener('click', function() {
                    alert('已一键应用所有AI建议');
                });
            }
            
            // 关闭结果
            const dismissBtn = document.getElementById('dismiss-results');
            if (dismissBtn) {
                dismissBtn.addEventListener('click', function() {
                    document.getElementById('ai-check-results').style.display = 'none';
                });
            }
            
            // 发布设置面板
            const openPublishBtn = document.getElementById('open-publish');
            const closePublishBtn = document.getElementById('close-publish');
            const cancelPublishBtn = document.getElementById('cancel-publish');
            const publishSettings = document.getElementById('publish-settings');
            
            if (openPublishBtn) {
                openPublishBtn.addEventListener('click', function() {
                    publishSettings.style.display = 'block';
                });
            }
            
            if (closePublishBtn) {
                closePublishBtn.addEventListener('click', function() {
                    publishSettings.style.display = 'none';
                });
            }
            
            if (cancelPublishBtn) {
                cancelPublishBtn.addEventListener('click', function() {
                    publishSettings.style.display = 'none';
                });
            }
            
            // 保存发布设置
            const savePublishBtn = document.getElementById('save-publish-settings');
            if (savePublishBtn) {
                savePublishBtn.addEventListener('click', function() {
                    const selectedVisibility = document.querySelector('input[name="visibility"]:checked').value;
                    const visibilityLabels = {
                        personal: '仅我可见',
                        team: '团队空间',
                        department: '部门空间',
                        company: '全员空间',
                        external: '对外发布'
                    };
                    
                    // 更新可见范围显示
                    document.getElementById('visibility-scope').textContent = visibilityLabels[selectedVisibility];
                    
                    // 关闭面板
                    publishSettings.style.display = 'none';
                    
                    alert(`发布设置已保存！可见范围已更新为：${visibilityLabels[selectedVisibility]}`);
                });
            }
            
            // 可见范围选项变化
            const visibilityOptions = document.querySelectorAll('.visibility-option');
            visibilityOptions.forEach(option => {
                option.addEventListener('change', function() {
                    const selectedValue = this.value;
                    const publishBtn = document.getElementById('save-publish-settings');
                    
                    // 根据选择的可见范围，检查是否满足条件
                    if (selectedValue === 'company') {
                        // 检查AI质量得分是否≥80
                        const qualityScore = parseInt(document.getElementById('quality-score').textContent);
                        if (qualityScore < 80) {
                            publishBtn.disabled = true;
                            publishBtn.style.opacity = '0.5';
                            alert('发布到全员空间需要AI质量得分≥80分');
                            // 自动回退到团队空间
                            document.querySelector('input[name="visibility"][value="team"]').checked = true;
                        } else {
                            publishBtn.disabled = false;
                            publishBtn.style.opacity = '1';
                        }
                    } else if (selectedValue === 'external') {
                        publishBtn.disabled = true;
                        publishBtn.style.opacity = '0.5';
                        alert('对外发布需要通过合规审核流程');
                    } else {
                        publishBtn.disabled = false;
                        publishBtn.style.opacity = '1';
                    }
                });
            });
            
            // 模拟知识成熟度自动计算
            function updateMaturityLevel() {
                // 这里可以根据实际数据计算成熟度
                // 模拟根据批注解决率、质量得分等因素更新成熟度
                // 知识成熟度系统升级：完善自动评分、分层可见性和质量标准配置
                
                // 成熟度等级定义
                const maturityLevels = ['草稿', '初稿', '协作中', '成熟', '精品'];
                const maturityThresholds = [20, 40, 60, 80, 100]; // 对应各等级的阈值分数
                
                // 计算综合成熟度分数
                function calculateMaturityScore() {
                    // 获取各评分因子的分数
                    const aiQuality = parseInt(document.getElementById('quality-score').textContent) || 85;
                    const commentResolution = 70; // 批注解决率 (示例值)
                    const reviewerCount = 3; // 评审人数 (示例值)
                    const updateFrequency = 90; // 更新频率评分 (示例值)
                    const usageScore = 60; // 使用量和评分 (示例值)
                    
                    // 权重配置
                    const weights = {
                        aiQuality: 0.3,
                        commentResolution: 0.25,
                        reviewerCount: 0.2,
                        updateFrequency: 0.15,
                        usageScore: 0.1
                    };
                    
                    // 计算加权平均分
                    const totalScore = 
                        aiQuality * weights.aiQuality +
                        commentResolution * weights.commentResolution +
                        (Math.min(reviewerCount, 5) / 5 * 100) * weights.reviewerCount +
                        updateFrequency * weights.updateFrequency +
                        usageScore * weights.usageScore;
                    
                    return Math.round(totalScore);
                }
                
                // 根据分数确定成熟度等级
                function getMaturityLevel(score) {
                    for (let i = maturityThresholds.length - 1; i >= 0; i--) {
                        if (score >= maturityThresholds[i]) {
                            return maturityLevels[i];
                        }
                    }
                    return maturityLevels[0];
                }
                
                // 获取成熟度等级对应的颜色
                function getMaturityLevelColors(level) {
                    const levelColors = {
                        '草稿': { bg: 'bg-danger/20', text: 'text-danger' },
                        '初稿': { bg: 'bg-warning/20', text: 'text-warning' },
                        '协作中': { bg: 'bg-warning/20', text: 'text-warning' },
                        '成熟': { bg: 'bg-primary/20', text: 'text-primary' },
                        '精品': { bg: 'bg-success/20', text: 'text-success' }
                    };
                    return levelColors[level] || levelColors['草稿'];
                }
                
                // 更新成熟度显示
                function updateMaturityDisplay() {
                    const totalScore = calculateMaturityScore();
                    const newLevel = getMaturityLevel(totalScore);
                    const levelColors = getMaturityLevelColors(newLevel);
                    
                    // 更新成熟度信息
                    document.getElementById('maturity-level').textContent = newLevel;
                    document.getElementById('maturity-badge').textContent = newLevel;
                    document.getElementById('maturity-progress').style.width = `${totalScore}%`;
                    
                    // 更新成熟度徽章样式
                    const badge = document.getElementById('maturity-badge');
                    badge.className = `px-3 py-1 rounded-full ${levelColors.bg} ${levelColors.text} text-xs`;
                    
                    // 更新各评分因子的显示
                    updateScoreFactorsDisplay(totalScore);
                    
                    return totalScore;
                }
                
                // 更新评分因子显示
                function updateScoreFactorsDisplay(totalScore) {
                    // AI质量检查得分
                    const aiQuality = parseInt(document.getElementById('quality-score').textContent) || 85;
                    const aiQualityElement = document.querySelector('.space-y-3 > div:nth-child(1) .font-medium');
                    if (aiQualityElement) {
                        aiQualityElement.textContent = `${aiQuality}分 (30%)`;
                        aiQualityElement.parentElement.nextElementSibling.firstElementChild.style.width = `${aiQuality}%`;
                    }
                    
                    // 其他评分因子可根据实际数据更新
                    // ...
                }
                
                // 分层可见性控制
                function updateVisibilityByMaturity(score, level) {
                    const visibilityOptions = document.querySelectorAll('input[name="visibility"]');
                    const visibilityLabels = document.querySelectorAll('.visibility-options label');
                    
                    // 根据成熟度等级限制可见范围选项
                    visibilityOptions.forEach((option, index) => {
                        const visibilityLabel = visibilityLabels[index];
                        if (level === '草稿' || level === '初稿') {
                            // 草稿和初稿只能在个人空间可见
                            if (option.value !== 'personal') {
                                option.disabled = true;
                                visibilityLabel.classList.add('opacity-50', 'cursor-not-allowed');
                            } else {
                                option.disabled = false;
                                visibilityLabel.classList.remove('opacity-50', 'cursor-not-allowed');
                                option.checked = true;
                            }
                        } else if (level === '协作中') {
                            // 协作中可以在团队空间可见
                            if (['personal', 'team'].includes(option.value)) {
                                option.disabled = false;
                                visibilityLabel.classList.remove('opacity-50', 'cursor-not-allowed');
                            } else {
                                option.disabled = true;
                                visibilityLabel.classList.add('opacity-50', 'cursor-not-allowed');
                            }
                        } else {
                            // 成熟和精品可以在全空间可见
                            option.disabled = false;
                            visibilityLabel.classList.remove('opacity-50', 'cursor-not-allowed');
                        }
                    });
                    
                    // 更新可见范围显示
                    const selectedVisibility = document.querySelector('input[name="visibility"]:checked').value;
                    const visibilityText = {
                        personal: '个人空间',
                        team: '团队空间',
                        org: '组织空间',
                        all: '全员空间'
                    };
                    document.getElementById('visibility-scope').textContent = visibilityText[selectedVisibility] || '个人空间';
                }
                
                // 质量标准配置
                function openQualityStandardConfig() {
                    // 创建质量标准配置模态框
                    const modal = document.createElement('div');
                    modal.className = 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4';
                    modal.innerHTML = `
                        <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="font-medium">质量标准配置</h3>
                                <button class="p-1 text-muted hover:text-primary rounded" onclick="this.closest('.fixed').remove()">
                                    <i class="fa fa-times"></i>
                                </button>
                            </div>
                            
                            <div class="space-y-4">
                                <!-- AI质量检查权重 -->
                                <div>
                                    <div class="flex items-center justify-between mb-2">
                                        <label class="text-sm">AI质量检查</label>
                                        <span class="text-sm font-medium" id="ai-quality-weight">30%</span>
                                    </div>
                                    <input type="range" min="0" max="100" value="30" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" id="ai-quality-slider">
                                </div>
                                
                                <!-- 批注解决率权重 -->
                                <div>
                                    <div class="flex items-center justify-between mb-2">
                                        <label class="text-sm">批注解决率</label>
                                        <span class="text-sm font-medium" id="comment-resolution-weight">25%</span>
                                    </div>
                                    <input type="range" min="0" max="100" value="25" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" id="comment-resolution-slider">
                                </div>
                                
                                <!-- 评审人数权重 -->
                                <div>
                                    <div class="flex items-center justify-between mb-2">
                                        <label class="text-sm">评审人数</label>
                                        <span class="text-sm font-medium" id="reviewer-count-weight">20%</span>
                                    </div>
                                    <input type="range" min="0" max="100" value="20" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" id="reviewer-count-slider">
                                </div>
                                
                                <!-- 更新频率权重 -->
                                <div>
                                    <div class="flex items-center justify-between mb-2">
                                        <label class="text-sm">更新频率</label>
                                        <span class="text-sm font-medium" id="update-frequency-weight">15%</span>
                                    </div>
                                    <input type="range" min="0" max="100" value="15" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" id="update-frequency-slider">
                                </div>
                                
                                <!-- 使用量和评分权重 -->
                                <div>
                                    <div class="flex items-center justify-between mb-2">
                                        <label class="text-sm">使用量和评分</label>
                                        <span class="text-sm font-medium" id="usage-score-weight">10%</span>
                                    </div>
                                    <input type="range" min="0" max="100" value="10" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" id="usage-score-slider">
                                </div>
                            </div>
                            
                            <div class="flex justify-end gap-2 mt-6">
                                <button class="px-4 py-2 text-sm border border-line rounded-lg hover:bg-mist" onclick="this.closest('.fixed').remove()">
                                    取消
                                </button>
                                <button class="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90" onclick="saveQualityStandardConfig()">
                                    保存配置
                                </button>
                            </div>
                        </div>
                    `;
                    
                    document.body.appendChild(modal);
                    
                    // 绑定滑块事件
                    const sliders = modal.querySelectorAll('input[type="range"]');
                    sliders.forEach(slider => {
                        slider.addEventListener('input', function() {
                            const weightDisplay = document.getElementById(this.id.replace('-slider', '-weight'));
                            if (weightDisplay) {
                                weightDisplay.textContent = `${this.value}%`;
                            }
                        });
                    });
                }
                
                function saveQualityStandardConfig() {
                    // 获取配置值
                    const aiQualityWeight = document.getElementById('ai-quality-slider').value;
                    const commentResolutionWeight = document.getElementById('comment-resolution-slider').value;
                    const reviewerCountWeight = document.getElementById('reviewer-count-slider').value;
                    const updateFrequencyWeight = document.getElementById('update-frequency-slider').value;
                    const usageScoreWeight = document.getElementById('usage-score-slider').value;
                    
                    // 验证权重总和为100%
                    const totalWeight = parseInt(aiQualityWeight) + parseInt(commentResolutionWeight) + parseInt(reviewerCountWeight) + parseInt(updateFrequencyWeight) + parseInt(usageScoreWeight);
                    if (totalWeight !== 100) {
                        alert('所有权重之和必须为100%');
                        return;
                    }
                    
                    // 保存配置（模拟）
                    console.log('保存质量标准配置:', {
                        aiQualityWeight,
                        commentResolutionWeight,
                        reviewerCountWeight,
                        updateFrequencyWeight,
                        usageScoreWeight
                    });
                    
                    // 关闭模态框
                    document.querySelector('.fixed').remove();
                    
                    // 重新计算成熟度
                    updateMaturityDisplay();
                    alert('质量标准配置已保存');
                }
                
                // 运行成熟度更新
                const totalScore = updateMaturityDisplay();
                const currentLevel = getMaturityLevel(totalScore);
                
                // 更新可见性控制
                updateVisibilityByMaturity(totalScore, currentLevel);
                
                // 添加质量标准配置按钮
                const qualityStandardBtn = document.createElement('button');
                qualityStandardBtn.className = 'px-3 py-1 text-xs bg-secondary text-white rounded-lg hover:bg-secondary/90';
                qualityStandardBtn.innerHTML = '<i class="fa fa-cog mr-1"></i>配置标准';
                qualityStandardBtn.onclick = openQualityStandardConfig;
                
                const maturityConfigContainer = document.querySelector('.mt-4.p-4.rounded-xl.border.border-line.bg-white.text-sm .flex.items-center.justify-between');
                if (maturityConfigContainer) {
                    maturityConfigContainer.appendChild(qualityStandardBtn);
                }
            }
            
            // 每30秒模拟更新一次成熟度（实际项目中根据实际操作触发）
            // setInterval(updateMaturityLevel, 30000);
            
            // 版本历史功能
            // 查看版本历史按钮
            // 寻找包含特定文本的按钮
            const buttons = document.querySelectorAll('button');
            let viewVersionBtn;
            buttons.forEach(button => {
                if (button.textContent.includes('查看版本历史')) {
                    viewVersionBtn = button;
                }
            });
            
            if (viewVersionBtn) {
                viewVersionBtn.addEventListener('click', function() {
                    // 隐藏其他面板
                    document.getElementById('publish-settings').style.display = 'none';
                    document.getElementById('version-compare').style.display = 'none';
                    document.getElementById('ai-check-results').style.display = 'none';
                    
                    // 显示版本历史面板
                    document.getElementById('version-history').style.display = 'block';
                });
            }
            
            // 关闭版本历史面板
            const closeVersionBtn = document.getElementById('close-version');
            if (closeVersionBtn) {
                closeVersionBtn.addEventListener('click', function() {
                    document.getElementById('version-history').style.display = 'none';
                });
            }
            
            // 版本管理系统升级：完善自动版本记录、可视化对比和责任追溯
            
            // 版本数据结构
            let versionHistory = [];
            
            // 初始化版本历史
            function initVersionHistory() {
                // 从现有DOM中读取版本数据
                const versionItems = document.querySelectorAll('.version-item');
                versionItems.forEach(item => {
                    const version = item.dataset.version;
                    const isCurrent = item.querySelector('span.text-white') !== null;
                    const typeSpan = item.querySelector('span:not(.text-white)');
                    const type = typeSpan ? typeSpan.textContent : '';
                    const infoText = item.querySelector('.text-muted').textContent;
                    const author = infoText.split(' · ')[0];
                    const time = infoText.split(' · ')[1];
                    const description = item.querySelector('.mt-1.text-sm')?.textContent || '';
                    
                    versionHistory.push({
                        version,
                        isCurrent,
                        type,
                        author,
                        time,
                        description
                    });
                });
            }
            
            // 版本筛选功能
            function initVersionFilter() {
                const versionFilterBtns = document.querySelectorAll('.version-filter-btn');
                versionFilterBtns.forEach(btn => {
                    btn.addEventListener('click', function() {
                        // 更新按钮状态
                        versionFilterBtns.forEach(b => b.classList.remove('bg-primary', 'text-white'));
                        versionFilterBtns.forEach(b => b.classList.add('bg-white', 'border', 'border-line'));
                        this.classList.add('bg-primary', 'text-white');
                        this.classList.remove('bg-white', 'border', 'border-line');
                        
                        // 筛选版本
                        const filterType = this.dataset.type;
                        const versionItems = document.querySelectorAll('.version-item');
                        
                        versionItems.forEach(item => {
                            if (filterType === undefined) {
                                // 显示全部
                                item.style.display = 'flex';
                            } else {
                                const typeSpan = item.querySelector('span:not(.text-white)');
                                const itemType = typeSpan ? typeSpan.textContent : '';
                                
                                if (
                                    (filterType === 'publish' && itemType.includes('发布版本')) ||
                                    (filterType === 'save' && itemType.includes('自动保存')) ||
                                    (filterType === 'major' && itemType.includes('重大修订'))
                                ) {
                                    item.style.display = 'flex';
                                } else {
                                    item.style.display = 'none';
                                }
                            }
                        });
                    });
                });
            }
            
            // 版本选择和操作功能
            function initVersionActions() {
                const versionCheckboxes = document.querySelectorAll('.version-checkbox');
                const compareBtn = document.getElementById('compare-versions');
                const rollbackBtn = document.getElementById('rollback-version');
                
                // 更新操作按钮状态
                function updateActionButtons() {
                    const checkedCount = document.querySelectorAll('.version-checkbox:checked').length;
                    
                    // 回滚按钮：需要选择一个版本
                    if (checkedCount >= 1) {
                        rollbackBtn.disabled = false;
                        rollbackBtn.style.opacity = '1';
                    } else {
                        rollbackBtn.disabled = true;
                        rollbackBtn.style.opacity = '0.5';
                    }
                    
                    // 对比按钮：需要选择两个版本
                    if (checkedCount === 2) {
                        compareBtn.disabled = false;
                        compareBtn.style.opacity = '1';
                    } else {
                        compareBtn.disabled = true;
                        compareBtn.style.opacity = '0.5';
                    }
                }
                
                // 版本选择事件
                versionCheckboxes.forEach(checkbox => {
                    checkbox.addEventListener('change', updateActionButtons);
                });
                
                // 对比版本功能
                if (compareBtn) {
                    compareBtn.addEventListener('click', function() {
                        const checkedVersions = document.querySelectorAll('.version-checkbox:checked');
                        const versions = Array.from(checkedVersions).map(checkbox => {
                            return checkbox.closest('.version-item').dataset.version;
                        });
                        
                        if (versions.length === 2) {
                            // 隐藏版本历史面板
                            document.getElementById('version-history').style.display = 'none';
                            
                            // 显示版本对比面板
                            document.getElementById('version-compare').style.display = 'block';
                            
                            // 更新版本选择
                            document.getElementById('version-from').value = versions[0];
                            document.getElementById('version-to').value = versions[1];
                            
                            // 执行版本对比
                            compareVersions(versions[0], versions[1]);
                        }
                    });
                }
                
                // 回滚版本功能
                if (rollbackBtn) {
                    rollbackBtn.addEventListener('click', function() {
                        const checkedVersion = document.querySelector('.version-checkbox:checked');
                        if (checkedVersion) {
                            const versionItem = checkedVersion.closest('.version-item');
                            const version = versionItem.dataset.version;
                            const versionData = versionHistory.find(v => v.version === version);
                            
                            if (confirm(`确定要回滚到版本 V${version} 吗？\n\n修改者: ${versionData.author}\n时间: ${versionData.time}\n描述: ${versionData.description}\n\n此操作不可撤销。`)) {
                                // 执行回滚操作
                                rollbackToVersion(version);
                                alert(`已回滚到版本 V${version}`);
                            }
                        }
                    });
                }
            }
            
            // 版本对比功能
            function compareVersions(versionFrom, versionTo) {
                // 获取版本数据
                const fromVersion = versionHistory.find(v => v.version === versionFrom);
                const toVersion = versionHistory.find(v => v.version === versionTo);
                
                // 模拟AI变更摘要
                const aiSummary = `\n1. **新增内容**：添加了"智能协作批注"章节\n2. **修改内容**：优化了文档结构，将"核心功能"移至前面\n3. **删除内容**：移除了过时的"审批流程"说明\n4. **质量提升**：AI质量得分从80提升至85\n`;
                
                // 模拟差异对比
                const diffContent = `\n<div class="diff-container">\n  <div class="diff-item added">+ 智能协作批注系统支持多种批注类型和建议编辑模式</div>\n  <div class="diff-item modified">- 传统审批流程</div>\n  <div class="diff-item modified">+ 协作进化模式</div>\n  <div class="diff-item added">+ 知识成熟度自动评分机制</div>\n</div>`;
                
                // 更新对比面板
                const aiSummaryElement = document.querySelector('.p-3.rounded-lg.bg-primary/10 .mt-1.text-sm');
                if (aiSummaryElement) {
                    aiSummaryElement.textContent = aiSummary;
                }
                
                const diffElement = document.querySelector('.mt-4.p-4.rounded-xl.border.border-line.bg-white.text-sm .mt-1.text-sm');
                if (diffElement) {
                    diffElement.innerHTML = diffContent;
                }
            }
            
            // 回滚版本功能
            function rollbackToVersion(version) {
                // 更新版本历史
                versionHistory.forEach(v => v.isCurrent = false);
                const targetVersion = versionHistory.find(v => v.version === version);
                if (targetVersion) {
                    targetVersion.isCurrent = true;
                }
                
                // 更新DOM
                const versionItems = document.querySelectorAll('.version-item');
                versionItems.forEach(item => {
                    const itemVersion = item.dataset.version;
                    const isCurrent = itemVersion === version;
                    
                    // 更新当前版本标记
                    const currentTag = item.querySelector('span.text-white');
                    if (isCurrent) {
                        if (!currentTag) {
                            const versionInfo = item.querySelector('.flex.items-center.gap-2');
                            const newTag = document.createElement('span');
                            newTag.className = 'px-2 py-1 rounded-full bg-primary text-white text-xs';
                            newTag.textContent = '当前版本';
                            versionInfo.appendChild(newTag);
                        }
                        item.classList.remove('bg-white', 'border-line');
                        item.classList.add('bg-primary/10', 'border-primary');
                    } else {
                        if (currentTag) {
                            currentTag.remove();
                        }
                        item.classList.remove('bg-primary/10', 'border-primary');
                        item.classList.add('bg-white', 'border-line');
                    }
                });
            }
            
            // 自动版本记录功能
            function initAutoVersioning() {
                // 监听内容变化
                const editableContents = document.querySelectorAll('.editable-content');
                let autoSaveTimer = null;
                
                editableContents.forEach(content => {
                    content.addEventListener('input', function() {
                        // 清除之前的定时器
                        if (autoSaveTimer) {
                            clearTimeout(autoSaveTimer);
                        }
                        
                        // 设置新的定时器，30秒后自动保存
                        autoSaveTimer = setTimeout(() => {
                            autoSaveVersion();
                        }, 30000);
                    });
                });
            }
            
            // 自动保存版本
            function autoSaveVersion() {
                // 检查是否有未保存的更改
                const hasChanges = document.querySelectorAll('.editable-content').some(content => {
                    // 这里应该与原始内容比较，这里简化处理
                    return true;
                });
                
                if (hasChanges) {
                    // 生成自动保存版本
                    const currentVersion = versionHistory[0].version;
                    const newVersion = currentVersion + '-auto-' + Date.now();
                    
                    const autoSavedVersion = {
                        version: newVersion,
                        isCurrent: false,
                        type: '自动保存',
                        author: '系统',
                        time: '刚刚',
                        description: '自动保存版本'
                    };
                    
                    // 更新版本历史
                    versionHistory.push(autoSavedVersion);
                    
                    // 更新DOM
                    addVersionToHistory(autoSavedVersion);
                    
                    console.log('自动保存版本:', newVersion);
                }
            }
            
            // 将新版本添加到历史记录
            function addVersionToHistory(versionData) {
                const versionsContainer = document.querySelector('.space-y-3.max-h-[500px].overflow-y-auto.scrollbar-hide');
                if (!versionsContainer) return;
                
                // 创建新版本项
                const versionItem = document.createElement('div');
                versionItem.className = `version-item p-3 rounded-lg ${versionData.isCurrent ? 'bg-primary/10 border-primary' : 'bg-white border-line'} flex items-start gap-3`;
                versionItem.dataset.version = versionData.version;
                
                versionItem.innerHTML = `
                    <input type="checkbox" class="version-checkbox mt-1">
                    <div class="flex-1">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <p class="font-medium">V${versionData.version}</p>
                                ${versionData.isCurrent ? `<span class="px-2 py-1 rounded-full bg-primary text-white text-xs">当前版本</span>` : ''}
                                <span class="px-2 py-1 rounded-full bg-ocean text-primary text-xs">${versionData.type}</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 text-xs text-muted">
                            <span>${versionData.author}</span>
                            <span>·</span>
                            <span>${versionData.time}</span>
                        </div>
                        <p class="mt-1 text-sm">${versionData.description}</p>
                        
                        <!-- 责任追溯信息 -->
                        <div class="mt-2 flex items-center gap-2 text-xs text-muted">
                            <i class="fa fa-history"></i>
                            <span>包含 ${Math.floor(Math.random() * 5) + 1} 处修改</span>
                            <span>·</span>
                            <i class="fa fa-users"></i>
                            <span>涉及 ${Math.floor(Math.random() * 3) + 1} 位协作者</span>
                        </div>
                    </div>
                `;
                
                // 添加到版本列表
                versionsContainer.appendChild(versionItem);
                
                // 重新绑定事件
                const newCheckbox = versionItem.querySelector('.version-checkbox');
                if (newCheckbox) {
                    newCheckbox.addEventListener('change', function() {
                        const checkedCount = document.querySelectorAll('.version-checkbox:checked').length;
                        const compareBtn = document.getElementById('compare-versions');
                        const rollbackBtn = document.getElementById('rollback-version');
                        
                        if (checkedCount >= 1) {
                            rollbackBtn.disabled = false;
                            rollbackBtn.style.opacity = '1';
                        } else {
                            rollbackBtn.disabled = true;
                            rollbackBtn.style.opacity = '0.5';
                        }
                        
                        if (checkedCount === 2) {
                            compareBtn.disabled = false;
                            compareBtn.style.opacity = '1';
                        } else {
                            compareBtn.disabled = true;
                            compareBtn.style.opacity = '0.5';
                        }
                    });
                }
            }
            
            // 初始化版本对比功能
            function initVersionCompare() {
                const startCompareBtn = document.getElementById('start-compare');
                if (startCompareBtn) {
                    startCompareBtn.addEventListener('click', function() {
                        const versionFrom = document.getElementById('version-from').value;
                        const versionTo = document.getElementById('version-to').value;
                        compareVersions(versionFrom, versionTo);
                    });
                }
            }
            
            // 初始化所有版本管理功能
            initVersionHistory();
            initVersionFilter();
            initVersionActions();
            initVersionCompare();
            initAutoVersioning();
            
            // 导出版本历史生成审计报告
            const exportVersionBtn = document.getElementById('export-version');
            if (exportVersionBtn) {
                exportVersionBtn.addEventListener('click', function() {
                    generateAuditReport();
                });
            }
            
            // 生成审计报告
            function generateAuditReport() {
                // 准备报告数据
                const reportData = {
                    documentName: '智能协作平台项目文档',
                    reportDate: new Date().toLocaleString(),
                    totalVersions: versionHistory.length,
                    versionHistory: versionHistory.map(version => ({
                        version: version.version,
                        type: version.type,
                        author: version.author,
                        time: version.time,
                        description: version.description,
                        isCurrent: version.isCurrent
                    })),
                    summary: {
                        totalChanges: versionHistory.length - 1,
                        majorRevisions: versionHistory.filter(v => v.type.includes('重大修订')).length,
                        publishVersions: versionHistory.filter(v => v.type.includes('发布版本')).length,
                        autoSaves: versionHistory.filter(v => v.type.includes('自动保存')).length
                    }
                };
                
                // 创建HTML报告
                const reportHTML = `
                    <!DOCTYPE html>
                    <html lang="zh-CN">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>版本历史审计报告</title>
                        <style>
                            body {
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                                line-height: 1.6;
                                color: #333;
                                max-width: 1200px;
                                margin: 0 auto;
                                padding: 20px;
                            }
                            h1 {
                                color: #2563eb;
                                border-bottom: 2px solid #e5e7eb;
                                padding-bottom: 10px;
                            }
                            h2 {
                                color: #1f2937;
                                margin-top: 30px;
                                border-bottom: 1px solid #e5e7eb;
                                padding-bottom: 8px;
                            }
                            .report-header {
                                background-color: #f3f4f6;
                                padding: 20px;
                                border-radius: 8px;
                                margin-bottom: 30px;
                            }
                            .summary-grid {
                                display: grid;
                                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                                gap: 20px;
                                margin-bottom: 30px;
                            }
                            .summary-card {
                                background-color: #f9fafb;
                                padding: 20px;
                                border-radius: 8px;
                                border-left: 4px solid #2563eb;
                            }
                            .summary-card h3 {
                                margin-top: 0;
                                color: #2563eb;
                            }
                            .version-table {
                                width: 100%;
                                border-collapse: collapse;
                                margin-bottom: 30px;
                            }
                            .version-table th,
                            .version-table td {
                                padding: 12px;
                                text-align: left;
                                border-bottom: 1px solid #e5e7eb;
                            }
                            .version-table th {
                                background-color: #f3f4f6;
                                font-weight: 600;
                            }
                            .current-version {
                                background-color: #dbeafe;
                                font-weight: 600;
                            }
                            .version-type {
                                display: inline-block;
                                padding: 4px 8px;
                                border-radius: 12px;
                                font-size: 12px;
                                font-weight: 500;
                            }
                            .type-publish {
                                background-color: #dbeafe;
                                color: #2563eb;
                            }
                            .type-major {
                                background-color: #fef3c7;
                                color: #d97706;
                            }
                            .type-save {
                                background-color: #d1fae5;
                                color: #059669;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>版本历史审计报告</h1>
                        
                        <div class="report-header">
                            <p><strong>文档名称：</strong>${reportData.documentName}</p>
                            <p><strong>报告生成时间：</strong>${reportData.reportDate}</p>
                            <p><strong>总版本数：</strong>${reportData.totalVersions}</p>
                        </div>
                        
                        <h2>版本统计摘要</h2>
                        <div class="summary-grid">
                            <div class="summary-card">
                                <h3>总变更次数</h3>
                                <p>${reportData.summary.totalChanges}</p>
                            </div>
                            <div class="summary-card">
                                <h3>重大修订</h3>
                                <p>${reportData.summary.majorRevisions}</p>
                            </div>
                            <div class="summary-card">
                                <h3>发布版本</h3>
                                <p>${reportData.summary.publishVersions}</p>
                            </div>
                            <div class="summary-card">
                                <h3>自动保存</h3>
                                <p>${reportData.summary.autoSaves}</p>
                            </div>
                        </div>
                        
                        <h2>完整版本历史</h2>
                        <table class="version-table">
                            <thead>
                                <tr>
                                    <th>版本号</th>
                                    <th>版本类型</th>
                                    <th>修改者</th>
                                    <th>修改时间</th>
                                    <th>版本描述</th>
                                    <th>状态</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${reportData.versionHistory.map(version => `
                                    <tr class="${version.isCurrent ? 'current-version' : ''}">
                                        <td>V${version.version}</td>
                                        <td>
                                            <span class="version-type ${version.type.includes('发布版本') ? 'type-publish' : version.type.includes('重大修订') ? 'type-major' : 'type-save'}">
                                                ${version.type}
                                            </span>
                                        </td>
                                        <td>${version.author}</td>
                                        <td>${version.time}</td>
                                        <td>${version.description}</td>
                                        <td>${version.isCurrent ? '当前版本' : '历史版本'}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </body>
                    </html>
                `;
                
                // 创建下载链接
                const blob = new Blob([reportHTML], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `版本审计报告_${new Date().getTime()}.html`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                alert('审计报告已生成并下载');
            }
            
            // 版本对比功能
            // 关闭版本对比面板
            const closeCompareBtn = document.getElementById('close-compare');
            if (closeCompareBtn) {
                closeCompareBtn.addEventListener('click', function() {
                    document.getElementById('version-compare').style.display = 'none';
                });
            }
            
            // 开始对比
            const startCompareBtn = document.getElementById('start-compare');
            if (startCompareBtn) {
                startCompareBtn.addEventListener('click', function() {
                    const versionFrom = document.getElementById('version-from').value;
                    const versionTo = document.getElementById('version-to').value;
                    
                    // 模拟对比过程
                    startCompareBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-1"></i>对比中...';
                    startCompareBtn.disabled = true;
                    
                    setTimeout(function() {
                        // 更新AI变更摘要
                        const aiSummary = document.getElementById('ai-change-summary');
                        aiSummary.textContent = `V${versionTo}相比V${versionFrom}：进行了多处内容更新和优化，整体质量提升。`;
                        
                        startCompareBtn.innerHTML = '开始对比';
                        startCompareBtn.disabled = false;
                        
                        alert(`版本对比完成：V${versionFrom} → V${versionTo}`);
                    }, 1000);
                });
            }
            
            // 导出对比报告
            const exportCompareBtn = document.getElementById('export-compare');
            if (exportCompareBtn) {
                exportCompareBtn.addEventListener('click', function() {
                    alert('对比报告导出功能已触发');
                });
            }
            
            // 接受所有变更
            const acceptChangesBtn = document.getElementById('accept-changes');
            if (acceptChangesBtn) {
                acceptChangesBtn.addEventListener('click', function() {
                    alert('已接受所有变更');
                });
            }
            

            
            // 自动质量治理功能
            // 页面加载完成后初始化质量治理功能
            document.addEventListener('DOMContentLoaded', function() {
                initQualityGovernance();
            });
            
            // 初始化质量治理功能
            function initQualityGovernance() {
                // 立即更新按钮
                const updateBtn = document.getElementById('update-knowledge');
                if (updateBtn) {
                    updateBtn.addEventListener('click', function() {
                        // 触发质量更新
                        const updatedQuality = prompt('请输入更新后的质量分数（1-100）', '85');
                        if (updatedQuality && !isNaN(updatedQuality) && updatedQuality >= 1 && updatedQuality <= 100) {
                            // 更新质量显示
                            updateQualityDisplay(parseInt(updatedQuality));
                            alert('知识质量已更新');
                            
                            // 重新计算动态质量
                            calculateDynamicQuality();
                        } else {
                            alert('请输入有效的质量分数（1-100）');
                        }
                    });
                }
                
                // 延长有效期按钮
                const extendBtn = document.getElementById('extend-expiry');
                if (extendBtn) {
                    extendBtn.addEventListener('click', function() {
                        const newExpiryDate = prompt('请输入新的有效期（格式：YYYY-MM-DD）', '2024-12-31');
                        if (newExpiryDate) {
                            // 验证日期格式
                            if (isValidDate(newExpiryDate)) {
                                alert(`有效期已延长至 ${newExpiryDate}`);
                                
                                // 更新有效期
                                localStorage.setItem('knowledgeExpiryDate', newExpiryDate);
                            } else {
                                alert('日期格式错误，请使用YYYY-MM-DD格式');
                            }
                        }
                    });
                }
                
                // 低质量自动下架开关
                const autoRemoveCheckbox = document.getElementById('auto-remove');
                if (autoRemoveCheckbox) {
                    // 从配置加载状态
                    const governanceConfig = JSON.parse(localStorage.getItem('qualityGovernanceConfig')) || {};
                    autoRemoveCheckbox.checked = governanceConfig.autoRemove !== false;
                    
                    autoRemoveCheckbox.addEventListener('change', function() {
                        const isEnabled = this.checked;
                        
                        // 更新配置
                        updateGovernanceConfig({ autoRemove: isEnabled });
                        
                        alert(`低质量自动下架功能已${isEnabled ? '启用' : '禁用'}`);
                    });
                }
                
                // 申请精品认证按钮
                const applyCertBtn = document.getElementById('apply-certification');
                if (applyCertBtn) {
                    applyCertBtn.addEventListener('click', function() {
                        // 检查质量是否符合要求
                        const qualityAssessment = JSON.parse(localStorage.getItem('knowledgeQuality')) || {};
                        
                        if (qualityAssessment.qualityScore < 90) {
                            alert('精品认证要求质量分数达到90分以上，当前分数：' + qualityAssessment.qualityScore);
                            return;
                        }
                        
                        // 模拟精品认证申请过程
                        this.innerHTML = '<i class="fa fa-spinner fa-spin mr-1"></i>申请中...';
                        this.disabled = true;
                        
                        setTimeout(() => {
                            const result = confirm('精品认证申请成功！\n是否立即发布为精品知识？');
                            if (result) {
                                // 标记为精品知识
                                localStorage.setItem('knowledgeIsPremium', 'true');
                                alert('已发布为精品知识');
                            } else {
                                alert('已保存为草稿');
                            }
                            
                            // 恢复按钮状态
                            applyCertBtn.innerHTML = '申请精品认证';
                            applyCertBtn.disabled = false;
                        }, 1500);
                    });
                }
                
                // 质量标准配置按钮
                const configBtn = document.getElementById('quality-config');
                if (configBtn) {
                    configBtn.addEventListener('click', function() {
                        openQualityConfigPanel();
                    });
                }
                
                // 质量统计按钮
                const statsBtn = document.getElementById('quality-stats');
                if (statsBtn) {
                    statsBtn.addEventListener('click', function() {
                        showQualityStatistics();
                    });
                }
                
                // 初始计算质量
                calculateDynamicQuality();
            }
            
            // 更新质量治理配置
            function updateGovernanceConfig(newConfig) {
                const currentConfig = JSON.parse(localStorage.getItem('qualityGovernanceConfig')) || {};
                const updatedConfig = { ...currentConfig, ...newConfig };
                
                localStorage.setItem('qualityGovernanceConfig', JSON.stringify(updatedConfig));
                
                console.log('质量治理配置已更新:', updatedConfig);
            }
            
            // 打开质量标准配置面板
            function openQualityConfigPanel() {
                const config = JSON.parse(localStorage.getItem('qualityGovernanceConfig')) || {
                    autoRemove: true,
                    lowQualityThreshold: 40,
                    warningThreshold: 60,
                    qualityInspection: true
                };
                
                const panel = document.createElement('div');
                panel.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
                panel.innerHTML = `
                    <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-medium">质量标准配置</h3>
                            <button id="close-config" class="text-muted"><i class="fa fa-times"></i></button>
                        </div>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" id="config-auto-remove" ${config.autoRemove ? 'checked' : ''} class="rounded border-line">
                                    <span class="text-sm">低质量自动下架</span>
                                </label>
                            </div>
                            
                            <div>
                                <label class="block text-sm mb-1">低质量阈值 (1-100)</label>
                                <input type="number" id="config-low-threshold" value="${config.lowQualityThreshold}" 
                                       class="w-full border border-line rounded-lg px-3 py-2 text-sm" min="1" max="100">
                            </div>
                            
                            <div>
                                <label class="block text-sm mb-1">警告阈值 (1-100)</label>
                                <input type="number" id="config-warning-threshold" value="${config.warningThreshold}" 
                                       class="w-full border border-line rounded-lg px-3 py-2 text-sm" min="1" max="100">
                            </div>
                            
                            <div>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" id="config-quality-inspection" ${config.qualityInspection ? 'checked' : ''} class="rounded border-line">
                                    <span class="text-sm">质量检查提醒</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="flex gap-3 mt-6">
                            <button id="cancel-config" class="flex-1 px-4 py-2 rounded-lg border border-line text-sm">取消</button>
                            <button id="save-config" class="flex-1 px-4 py-2 rounded-lg bg-primary text-white text-sm">保存配置</button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(panel);
                
                // 关闭按钮
                const closeBtn = panel.querySelector('#close-config');
                const cancelBtn = panel.querySelector('#cancel-config');
                const saveBtn = panel.querySelector('#save-config');
                
                function closePanel() {
                    document.body.removeChild(panel);
                }
                
                closeBtn.addEventListener('click', closePanel);
                cancelBtn.addEventListener('click', closePanel);
                
                // 保存配置
                saveBtn.addEventListener('click', function() {
                    const autoRemove = panel.querySelector('#config-auto-remove').checked;
                    const lowThreshold = parseInt(panel.querySelector('#config-low-threshold').value);
                    const warningThreshold = parseInt(panel.querySelector('#config-warning-threshold').value);
                    const qualityInspection = panel.querySelector('#config-quality-inspection').checked;
                    
                    // 验证阈值
                    if (lowThreshold >= warningThreshold) {
                        alert('低质量阈值必须小于警告阈值');
                        return;
                    }
                    
                    // 更新配置
                    updateGovernanceConfig({
                        autoRemove: autoRemove,
                        lowQualityThreshold: lowThreshold,
                        warningThreshold: warningThreshold,
                        qualityInspection: qualityInspection
                    });
                    
                    alert('质量标准配置已保存');
                    closePanel();
                });
            }
            
            // 显示质量统计信息
            function showQualityStatistics() {
                const feedbacks = JSON.parse(localStorage.getItem('knowledgeFeedbacks')) || {};
                const knowledgeFeedbacks = feedbacks['current-knowledge'] || [];
                const quality = JSON.parse(localStorage.getItem('knowledgeQuality')) || {};
                
                const stats = {
                    totalFeedback: knowledgeFeedbacks.length,
                    averageRating: quality.averageRating || 0,
                    qualityScore: quality.qualityScore || 0,
                    positiveFeedbacks: knowledgeFeedbacks.filter(f => f.rating >= 4).length,
                    neutralFeedbacks: knowledgeFeedbacks.filter(f => f.rating === 3).length,
                    negativeFeedbacks: knowledgeFeedbacks.filter(f => f.rating <= 2).length
                };
                
                // 创建统计面板
                const panel = document.createElement('div');
                panel.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
                panel.innerHTML = `
                    <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-medium">质量统计信息</h3>
                            <button id="close-stats" class="text-muted"><i class="fa fa-times"></i></button>
                        </div>
                        
                        <div class="space-y-4">
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-muted">总反馈数</span>
                                <span class="text-lg font-medium">${stats.totalFeedback}</span>
                            </div>
                            
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-muted">平均评分</span>
                                <span class="text-lg font-medium">${stats.averageRating.toFixed(1)}</span>
                            </div>
                            
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-muted">质量分数</span>
                                <span class="text-lg font-medium ${getQualityColorClass(stats.qualityScore)}">${stats.qualityScore}</span>
                            </div>
                            
                            <div class="mt-4">
                                <h4 class="text-sm font-medium mb-2">反馈分布</h4>
                                <div class="space-y-2">
                                    <div class="flex justify-between items-center">
                                        <span class="text-sm text-success">正面反馈</span>
                                        <span class="text-sm">${stats.positiveFeedbacks} (${Math.round((stats.positiveFeedbacks / stats.totalFeedback || 0) * 100)}%)</span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="text-sm text-warning">中性反馈</span>
                                        <span class="text-sm">${stats.neutralFeedbacks} (${Math.round((stats.neutralFeedbacks / stats.totalFeedback || 0) * 100)}%)</span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="text-sm text-danger">负面反馈</span>
                                        <span class="text-sm">${stats.negativeFeedbacks} (${Math.round((stats.negativeFeedbacks / stats.totalFeedback || 0) * 100)}%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <button id="close-stats-btn" class="w-full mt-6 px-4 py-2 rounded-lg bg-primary text-white text-sm">关闭</button>
                    </div>
                `;
                
                document.body.appendChild(panel);
                
                // 关闭按钮
                const closeBtn = panel.querySelector('#close-stats');
                const closeStatsBtn = panel.querySelector('#close-stats-btn');
                
                function closePanel() {
                    document.body.removeChild(panel);
                }
                
                closeBtn.addEventListener('click', closePanel);
                closeStatsBtn.addEventListener('click', closePanel);
            }
            
            // 获取质量颜色类
            function getQualityColorClass(score) {
                if (score >= 80) return 'text-success';
                if (score >= 60) return 'text-primary';
                if (score >= 40) return 'text-warning';
                return 'text-danger';
            }
            
            // 日期格式验证函数
            function isValidDate(dateString) {
                const regEx = /^\d{4}-\d{2}-\d{2}$/;
                if (!dateString.match(regEx)) return false;
                const d = new Date(dateString);
                const dNum = d.getTime();
                if (!dNum && dNum !== 0) return false;
                return d.toISOString().slice(0, 10) === dateString;
            }
            
            // 协同编辑功能
            // 页面加载完成后初始化协同编辑功能
            document.addEventListener('DOMContentLoaded', function() {
                initCollaborativeEditing();
            });
            
            // 初始化协同编辑功能
            function initCollaborativeEditing() {
                // 为所有可编辑内容添加事件监听
                const editableContents = document.querySelectorAll('.editable-content');
                editableContents.forEach(content => {
                    content.addEventListener('focus', handleContentFocus);
                    content.addEventListener('blur', handleContentBlur);
                    content.addEventListener('input', function(e) {
                        const paragraphId = parseInt(this.closest('.document-paragraph').dataset.paragraphId);
                        handleContentChange(this, paragraphId);
                    });
                });
            }
            
            // 内容获得焦点时的处理
            function handleContentFocus(e) {
                const paragraph = this.closest('.document-paragraph');
                paragraph.dataset.editing = 'true';
                paragraph.classList.add('bg-primary/5');
                
                // 显示编辑指示器
                const editIndicator = paragraph.querySelector('.edit-indicator');
                if (editIndicator) {
                    editIndicator.style.opacity = '1';
                }
            }
            
            // 内容失去焦点时的处理
            function handleContentBlur(e) {
                const paragraph = this.closest('.document-paragraph');
                paragraph.dataset.editing = 'false';
                paragraph.classList.remove('bg-primary/5');
                
                // 隐藏编辑指示器
                const editIndicator = paragraph.querySelector('.edit-indicator');
                if (editIndicator) {
                    editIndicator.style.opacity = '0';
                }
            }
            
            // 内容变更处理
            function handleContentChange(element, paragraphId) {
                const content = element.innerHTML;
                const paragraph = element.closest('.document-paragraph');
                
                // 模拟内容变更通知服务器
                simulateServerNotification(paragraphId, content);
                
                // 检查冲突
                checkForConflicts(paragraphId, content);
            }
            
            // 模拟服务器通知
            function simulateServerNotification(paragraphId, content) {
                // 这里可以添加实际的WebSocket通信逻辑
                console.log(`段落 ${paragraphId} 内容已变更:`, content);
                
                // 模拟其他用户看到的更新
                setTimeout(() => {
                    // 这里可以添加其他用户界面更新逻辑
                }, 100);
            }
            
            // 冲突检测
            function checkForConflicts(paragraphId, content) {
                // 模拟冲突检测逻辑
                // 在实际应用中，这里会与服务器进行版本比对
                const hasConflict = Math.random() < 0.05; // 5%的概率模拟冲突
                
                if (hasConflict) {
                    showConflictWarning(paragraphId);
                }
            }
            
            // 显示冲突警告
            function showConflictWarning(paragraphId) {
                const paragraph = document.querySelector(`[data-paragraph-id="${paragraphId}"]`);
                if (!paragraph) return;
                
                // 检查是否已存在冲突警告
                let conflictWarning = paragraph.querySelector('.conflict-warning');
                if (conflictWarning) {
                    return;
                }
                
                // 创建冲突警告元素
                conflictWarning = document.createElement('div');
                conflictWarning.className = 'conflict-warning absolute top-full left-0 right-0 bg-danger/10 text-danger text-xs px-3 py-2 rounded-b-lg border-l border-r border-b border-danger';
                conflictWarning.innerHTML = `
                    <div class="flex items-center gap-2">
                        <i class="fa fa-exclamation-triangle"></i>
                        <span>检测到冲突！其他用户也在编辑此段落</span>
                        <button onclick="resolveConflict(${paragraphId})" class="ml-auto px-2 py-1 bg-danger text-white rounded text-xs">解决冲突</button>
                    </div>
                `;
                
                paragraph.appendChild(conflictWarning);
                paragraph.classList.add('border-danger');
            }
            
            // 解决冲突
            function resolveConflict(paragraphId) {
                const paragraph = document.querySelector(`[data-paragraph-id="${paragraphId}"]`);
                if (!paragraph) return;
                
                // 这里可以添加实际的冲突解决逻辑
                // 例如，显示冲突的两个版本，让用户选择
                const currentContent = paragraph.querySelector('.editable-content').innerHTML;
                const serverContent = "服务器上的版本内容...";
                
                const userChoice = confirm(`检测到内容冲突！\n\n您的版本：${currentContent.substring(0, 50)}...\n\n服务器版本：${serverContent.substring(0, 50)}...\n\n是否保留您的修改？`);
                
                if (userChoice) {
                    // 保留用户的修改
                    alert('您的修改已保存');
                } else {
                    // 使用服务器版本
                    alert('已使用服务器版本');
                    // 这里可以添加实际的服务器版本同步逻辑
                }
                
                // 移除冲突警告
                const conflictWarning = paragraph.querySelector('.conflict-warning');
                if (conflictWarning) {
                    conflictWarning.remove();
                }
                
                paragraph.classList.remove('border-danger');
            }
            
            // 合规审核功能
            // 页面加载完成后初始化合规审核功能
            document.addEventListener('DOMContentLoaded', function() {
                initComplianceCheck();
            });
            
            // 初始化合规审核功能
            function initComplianceCheck() {
                // 在运行AI预检时同时运行合规审核
                const runQualityCheckBtn = document.getElementById('run-quality-check');
                if (runQualityCheckBtn) {
                    runQualityCheckBtn.addEventListener('click', function() {
                        runComplianceCheck();
                    });
                }
                
                // 关闭合规审核结果
                const dismissComplianceBtn = document.getElementById('dismiss-compliance-results');
                if (dismissComplianceBtn) {
                    dismissComplianceBtn.addEventListener('click', function() {
                        const resultsPanel = document.getElementById('compliance-check-results');
                        if (resultsPanel) {
                            resultsPanel.style.display = 'none';
                        }
                    });
                }
                
                // 查看详细报告
                const viewReportBtn = document.getElementById('view-compliance-report');
                if (viewReportBtn) {
                    viewReportBtn.addEventListener('click', function() {
                        // 生成合规审计报告
                        generateComplianceReport();
                    });
                }
            }
            
            // 运行合规审核
            function runComplianceCheck() {
                // 显示加载状态
                const runQualityCheckBtn = document.getElementById('run-quality-check');
                if (runQualityCheckBtn) {
                    runQualityCheckBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-1"></i>运行中...';
                    runQualityCheckBtn.disabled = true;
                }
                
                // 执行AI风险扫描
                const riskResults = performAIRiskScan();
                
                // 模拟合规审核过程
                setTimeout(function() {
                    // 显示合规审核结果
                    const resultsPanel = document.getElementById('compliance-check-results');
                    if (resultsPanel) {
                        resultsPanel.style.display = 'block';
                        
                        // 更新风险等级
                        updateRiskLevelDisplay(riskResults);
                        
                        // 更新风险列表
                        updateRiskListDisplay(riskResults);
                    }
                    
                    // 更新检查时间
                    const checkTimeEl = document.getElementById('compliance-check-time');
                    if (checkTimeEl) {
                        checkTimeEl.textContent = '刚刚检查';
                    }
                    
                    // 保存审核结果
                    saveComplianceResults(riskResults);
                    
                    // 恢复按钮状态
                    if (runQualityCheckBtn) {
                        runQualityCheckBtn.innerHTML = '运行AI预检';
                        runQualityCheckBtn.disabled = false;
                    }
                }, 1500);
            }
            
            // 执行AI风险扫描
            function performAIRiskScan() {
                // 获取文档内容
                const documentContent = document.querySelector('#annotatable-document')?.textContent || '';
                
                // 模拟AI风险扫描
                const riskTypes = [
                    { id: 1, type: '敏感词', text: '敏感信息泄露风险', severity: 'high', category: '合规风险' },
                    { id: 2, type: '数据隐私', text: '个人数据处理不规范', severity: 'medium', category: '数据合规' },
                    { id: 3, type: '知识产权', text: '可能存在版权问题', severity: 'medium', category: '知识产权' },
                    { id: 4, type: '内容合规', text: '内容可能违反平台规范', severity: 'low', category: '内容合规' }
                ];
                
                // 根据内容生成风险结果
                const detectedRisks = [];
                
                // 模拟检测到的风险
                if (documentContent.length > 0) {
                    // 随机选择2-3个风险
                    const riskCount = Math.floor(Math.random() * 2) + 2;
                    for (let i = 0; i < riskCount; i++) {
                        detectedRisks.push(riskTypes[Math.floor(Math.random() * riskTypes.length)]);
                    }
                }
                
                // 计算综合风险等级
                const highRiskCount = detectedRisks.filter(r => r.severity === 'high').length;
                const mediumRiskCount = detectedRisks.filter(r => r.severity === 'medium').length;
                
                let overallRisk = 'low';
                if (highRiskCount > 0) {
                    overallRisk = 'high';
                } else if (mediumRiskCount > 0) {
                    overallRisk = 'medium';
                }
                
                return {
                    timestamp: new Date().toISOString(),
                    overallRisk: overallRisk,
                    totalRisks: detectedRisks.length,
                    risks: detectedRisks,
                    scanDetails: {
                        documentLength: documentContent.length,
                        scanTime: new Date().toLocaleString(),
                        aiModel: '智核AI合规检测模型 v1.0'
                    }
                };
            }
            
            // 更新风险等级显示
            function updateRiskLevelDisplay(results) {
                const riskLevelEl = document.getElementById('compliance-risk-level');
                if (!riskLevelEl) return;
                
                // 设置风险等级文本和样式
                const riskLevels = {
                    high: { text: '高风险', class: 'bg-danger/20 text-danger' },
                    medium: { text: '中风险', class: 'bg-warning/20 text-warning' },
                    low: { text: '低风险', class: 'bg-success/20 text-success' }
                };
                
                const level = riskLevels[results.overallRisk] || riskLevels.low;
                riskLevelEl.textContent = level.text;
                riskLevelEl.className = `px-3 py-1 rounded-full text-xs ${level.class}`;
            }
            
            // 更新风险列表显示
            function updateRiskListDisplay(results) {
                const riskListEl = document.querySelector('#compliance-check-results .space-y-3');
                if (!riskListEl) return;
                
                // 找到风险识别结果部分
                let riskItemsSection = riskListEl.querySelector('.space-y-2');
                if (!riskItemsSection) {
                    // 如果不存在，创建一个
                    riskItemsSection = document.createElement('div');
                    riskItemsSection.className = 'space-y-2';
                    riskListEl.appendChild(riskItemsSection);
                }
                
                // 清空现有风险列表
                riskItemsSection.innerHTML = '';
                
                // 添加新的风险列表
                results.risks.forEach(risk => {
                    const riskItem = document.createElement('div');
                    riskItem.className = `p-2 bg-white rounded border-l-4 ${getSeverityBorderClass(risk.severity)}`;
                    
                    const severityText = {
                        high: '高风险',
                        medium: '中风险',
                        low: '低风险'
                    }[risk.severity] || '低风险';
                    
                    riskItem.innerHTML = `
                        <div class="flex items-start justify-between">
                            <div>
                                <strong>${risk.category}</strong><span>: ${risk.text}</span>
                                <span class="ml-2 text-xs ${getSeverityTextClass(risk.severity)}">${severityText}</span>
                            </div>
                            <div class="flex gap-1">
                                <button class="text-xs px-2 py-1 rounded bg-primary text-white">立即修改</button>
                                <button class="text-xs px-2 py-1 rounded bg-white border border-line">标记为已处理</button>
                            </div>
                        </div>
                    `;
                    
                    riskItemsSection.appendChild(riskItem);
                });
                
                // 如果没有风险，显示无风险信息
                if (results.risks.length === 0) {
                    const noRiskItem = document.createElement('div');
                    noRiskItem.className = 'p-3 rounded bg-white text-center text-success';
                    noRiskItem.textContent = '未检测到合规风险';
                    riskItemsSection.appendChild(noRiskItem);
                }
            }
            
            // 获取风险等级样式类
            function getSeverityBorderClass(severity) {
                const classes = {
                    high: 'border-danger',
                    medium: 'border-warning',
                    low: 'border-success'
                };
                return classes[severity] || 'border-success';
            }
            
            // 获取风险等级文本样式类
            function getSeverityTextClass(severity) {
                const classes = {
                    high: 'text-danger',
                    medium: 'text-warning',
                    low: 'text-success'
                };
                return classes[severity] || 'text-success';
            }
            
            // 保存合规审核结果
            function saveComplianceResults(results) {
                // 获取现有审核记录
                let complianceHistory = JSON.parse(localStorage.getItem('complianceHistory')) || [];
                
                // 添加新的审核记录
                complianceHistory.push({
                    ...results,
                    id: Date.now()
                });
                
                // 只保留最近10条记录
                if (complianceHistory.length > 10) {
                    complianceHistory = complianceHistory.slice(-10);
                }
                
                // 保存到localStorage
                localStorage.setItem('complianceHistory', JSON.stringify(complianceHistory));
                localStorage.setItem('lastComplianceCheck', JSON.stringify(results));
                
                console.log('合规审核结果已保存:', results);
            }
            
            // 生成合规审计报告
            function generateComplianceReport() {
                // 获取最新的合规审核结果
                const lastComplianceCheck = JSON.parse(localStorage.getItem('lastComplianceCheck'));
                const complianceHistory = JSON.parse(localStorage.getItem('complianceHistory')) || [];
                
                if (!lastComplianceCheck) {
                    alert('请先运行合规审核');
                    return;
                }
                
                // 准备报告数据
                const reportData = {
                    reportTitle: '合规审计报告',
                    documentName: '智能协作平台项目文档',
                    reportDate: new Date().toLocaleString(),
                    scanTime: new Date(lastComplianceCheck.timestamp).toLocaleString(),
                    aiModel: lastComplianceCheck.scanDetails.aiModel,
                    overallRisk: lastComplianceCheck.overallRisk,
                    totalRisks: lastComplianceCheck.totalRisks,
                    risks: lastComplianceCheck.risks,
                    history: complianceHistory.slice(-5) // 显示最近5次审核记录
                };
                
                // 风险等级文本映射
                const riskLevelText = {
                    high: '高风险',
                    medium: '中风险',
                    low: '低风险'
                };
                
                // 风险严重程度文本映射
                const severityText = {
                    high: '高',
                    medium: '中',
                    low: '低'
                };
                
                // 创建HTML报告
                const reportHTML = `
                    <!DOCTYPE html>
                    <html lang="zh-CN">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${reportData.reportTitle}</title>
                        <style>
                            body {
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                                line-height: 1.6;
                                color: #333;
                                max-width: 1200px;
                                margin: 0 auto;
                                padding: 20px;
                            }
                            h1 {
                                color: #111827;
                                border-bottom: 2px solid #e5e7eb;
                                padding-bottom: 10px;
                                margin-bottom: 20px;
                            }
                            h2 {
                                color: #1f2937;
                                margin-top: 30px;
                                border-bottom: 1px solid #e5e7eb;
                                padding-bottom: 8px;
                            }
                            .report-header {
                                background-color: #f3f4f6;
                                padding: 20px;
                                border-radius: 8px;
                                margin-bottom: 30px;
                            }
                            .report-meta {
                                display: grid;
                                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                                gap: 15px;
                                margin-bottom: 20px;
                            }
                            .meta-item {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                            }
                            .meta-label {
                                font-weight: 500;
                                color: #6b7280;
                            }
                            .risk-badge {
                                display: inline-block;
                                padding: 4px 12px;
                                border-radius: 12px;
                                font-size: 14px;
                                font-weight: 500;
                            }
                            .risk-high {
                                background-color: #fee2e2;
                                color: #dc2626;
                            }
                            .risk-medium {
                                background-color: #fef3c7;
                                color: #d97706;
                            }
                            .risk-low {
                                background-color: #d1fae5;
                                color: #059669;
                            }
                            .risk-list {
                                list-style: none;
                                padding: 0;
                                margin: 0;
                            }
                            .risk-item {
                                background-color: #ffffff;
                                border: 1px solid #e5e7eb;
                                border-radius: 8px;
                                padding: 16px;
                                margin-bottom: 12px;
                                border-left: 4px solid #dc2626;
                            }
                            .risk-item.medium {
                                border-left-color: #d97706;
                            }
                            .risk-item.low {
                                border-left-color: #059669;
                            }
                            .risk-header {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                margin-bottom: 8px;
                            }
                            .risk-category {
                                font-weight: 600;
                                color: #1f2937;
                            }
                            .history-table {
                                width: 100%;
                                border-collapse: collapse;
                                margin-top: 20px;
                            }
                            .history-table th,
                            .history-table td {
                                padding: 12px;
                                text-align: left;
                                border-bottom: 1px solid #e5e7eb;
                            }
                            .history-table th {
                                background-color: #f3f4f6;
                                font-weight: 600;
                            }
                            .suggestions {
                                background-color: #eff6ff;
                                border: 1px solid #bfdbfe;
                                border-radius: 8px;
                                padding: 16px;
                                margin-top: 20px;
                            }
                            .suggestions h3 {
                                color: #2563eb;
                                margin-top: 0;
                                margin-bottom: 12px;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>${reportData.reportTitle}</h1>
                        
                        <div class="report-header">
                            <div class="report-meta">
                                <div class="meta-item">
                                    <span class="meta-label">文档名称:</span>
                                    <span>${reportData.documentName}</span>
                                </div>
                                <div class="meta-item">
                                    <span class="meta-label">报告生成时间:</span>
                                    <span>${reportData.reportDate}</span>
                                </div>
                                <div class="meta-item">
                                    <span class="meta-label">最后审核时间:</span>
                                    <span>${reportData.scanTime}</span>
                                </div>
                                <div class="meta-item">
                                    <span class="meta-label">AI模型:</span>
                                    <span>${reportData.aiModel}</span>
                                </div>
                                <div class="meta-item">
                                    <span class="meta-label">综合风险等级:</span>
                                    <span class="risk-badge risk-${reportData.overallRisk}">${riskLevelText[reportData.overallRisk]}</span>
                                </div>
                                <div class="meta-item">
                                    <span class="meta-label">风险总数:</span>
                                    <span>${reportData.totalRisks}</span>
                                </div>
                            </div>
                        </div>
                        
                        <h2>详细风险列表</h2>
                        <ul class="risk-list">
                            ${reportData.risks.map(risk => `
                                <li class="risk-item ${risk.severity}">
                                    <div class="risk-header">
                                        <span class="risk-category">${risk.category}</span>
                                        <span class="risk-badge risk-${risk.severity}">${severityText[risk.severity]}风险</span>
                                    </div>
                                    <div class="risk-description">${risk.text}</div>
                                    <div class="risk-type">风险类型: ${risk.type}</div>
                                </li>
                            `).join('')}
                        </ul>
                        
                        <h2>历史审核记录</h2>
                        <table class="history-table">
                            <thead>
                                <tr>
                                    <th>审核时间</th>
                                    <th>风险等级</th>
                                    <th>风险数量</th>
                                    <th>AI模型</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${reportData.history.map(record => `
                                    <tr>
                                        <td>${new Date(record.timestamp).toLocaleString()}</td>
                                        <td><span class="risk-badge risk-${record.overallRisk}">${riskLevelText[record.overallRisk]}</span></td>
                                        <td>${record.totalRisks}</td>
                                        <td>${record.scanDetails.aiModel}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        
                        <div class="suggestions">
                            <h3>合规建议</h3>
                            <ul>
                                <li>定期进行合规审核，建议每周至少一次</li>
                                <li>对高风险问题立即进行整改</li>
                                <li>建立合规问题跟踪机制，确保所有问题得到处理</li>
                                <li>定期更新合规检查规则，适应新的法规要求</li>
                                <li>对团队成员进行合规培训，提高合规意识</li>
                            </ul>
                        </div>
                    </body>
                    </html>
                `;
                
                // 创建下载链接
                const blob = new Blob([reportHTML], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `合规审计报告_${new Date().getTime()}.html`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                alert('合规审计报告已生成并下载');
            }
            
            // 处理立即修改按钮点击
            document.addEventListener('click', function(e) {
                if (e.target && e.target.textContent === '立即修改') {
                    const riskItem = e.target.closest('.p-2.bg-white.rounded.border-l-4.border-danger');
                    if (riskItem) {
                        const riskText = riskItem.querySelector('strong').nextSibling.textContent.trim();
                        alert(`正在处理：${riskText}`);
                        // 这里可以添加实际的修改逻辑
                    }
                }
            });
            
            // 处理标记为已处理按钮点击
            document.addEventListener('click', function(e) {
                if (e.target && e.target.textContent === '标记为已处理') {
                    const riskItem = e.target.closest('.p-2.bg-white.rounded.border-l-4.border-danger');
                    if (riskItem) {
                        riskItem.classList.remove('border-danger');
                        riskItem.classList.add('border-success');
                        e.target.textContent = '已处理';
                        e.target.disabled = true;
                        e.target.classList.add('opacity-50');
                        alert('该风险已标记为已处理');
                        // 这里可以添加实际的标记处理逻辑
                    }
                }
            });
        });
        
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        ink: '#111827',
                        primary: '#3b82f6',
                        secondary: '#8b5cf6',
                        accent: '#f59e0b',
                        success: '#10b981',
                        warning: '#f59e0b',
                        danger: '#ef4444',
                        card: '#ffffff',
                        'purple-light': '#ede9fe',
                        'blue-light': '#dbeafe',
                        'pink-light': '#fce7f3',
                        dark: '#1f2937',
                        paper: '#ffffff',
                        surface: '#f8fafc',
                        muted: '#6b7280',
                        line: '#e5e7eb',
                        mist: '#f3f4f6',
                        ocean: '#dbeafe',
                        coral: '#fde68a'
                    },
                    fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                        display: ['Inter', 'system-ui', 'sans-serif'],
                    },
                    boxShadow: {
                        card: '0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
                        soft: '0 4px 8px rgba(0, 0, 0, 0.08)',
                        float: '0 8px 20px rgba(0, 0, 0, 0.12)'
                    },
                    animation: {
                        float: 'float 5s ease-in-out infinite',
                        fadeUp: 'fadeUp 0.6s ease forwards',
                        pulseSoft: 'pulse 3s ease-in-out infinite'
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-6px)' }
                        },
                        fadeUp: {
                            '0%': { opacity: 0, transform: 'translateY(18px)' },
                            '100%': { opacity: 1, transform: 'translateY(0)' }
                        }
                    }
                }
            }
        }
