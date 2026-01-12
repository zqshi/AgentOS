// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化图表
    initCharts();
    
    // 初始化导航切换
    initNavigation();
    
    // 初始化时间范围下拉菜单
    initTimeRangeDropdown();
    
    // 初始化背景动画
    initBackgroundAnimation();
    
    // 初始化通知系统
    initNotificationSystem();
    
    // 初始化按钮事件
    initButtonEvents();
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
}

// 初始化导航切换
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section-content');
    
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
            
            // 更新面包屑
            const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');
            if (breadcrumbItems.length > 1) {
                breadcrumbItems[1].textContent = this.querySelector('span').textContent;
            }
            
            // 显示通知
            showNotification('已切换到 ' + this.querySelector('span').textContent, 'success');
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
        
        // 根据按钮所在的模块和文本执行相应操作
        const sectionId = button.closest('.section-content')?.id || '';
        
        // 通用按钮处理
        if (buttonText.includes('新建') || buttonText.includes('添加')) {
            showNotification(`正在创建新${buttonText.replace('新建', '').replace('添加', '')}...`, 'success');
            setTimeout(() => {
                showNotification('创建成功！', 'success');
            }, 1000);
        }
        else if (buttonText.includes('编辑')) {
            showNotification('进入编辑模式', 'info');
        }
        else if (buttonText.includes('查看')) {
            showNotification('正在加载详情...', 'info');
        }
        else if (buttonText.includes('删除')) {
            if (confirm('确定要删除吗？')) {
                showNotification('删除成功', 'success');
            }
        }
        else if (buttonText.includes('刷新')) {
            showNotification('正在刷新数据...', 'info');
            setTimeout(() => {
                showNotification('数据已更新', 'success');
            }, 800);
        }
        else if (buttonText.includes('导出')) {
            showNotification('正在准备导出...', 'info');
            setTimeout(() => {
                showNotification('导出成功，文件已下载', 'success');
            }, 1000);
        }
        else if (buttonText.includes('搜索')) {
            showNotification('正在搜索...', 'info');
            setTimeout(() => {
                showNotification('搜索完成', 'success');
            }, 500);
        }
        else if (buttonText.includes('仲裁')) {
            showNotification('正在处理冲突仲裁...', 'warning');
            setTimeout(() => {
                showNotification('仲裁完成', 'success');
            }, 1500);
        }
        else if (buttonText.includes('保存')) {
            showNotification('正在保存设置...', 'info');
            setTimeout(() => {
                showNotification('保存成功', 'success');
            }, 800);
        }
        else if (buttonText.includes('恢复')) {
            if (confirm('确定要恢复默认设置吗？')) {
                showNotification('正在恢复默认设置...', 'warning');
                setTimeout(() => {
                    showNotification('恢复完成', 'success');
                }, 1000);
            }
        }
        else if (buttonText.includes('对话')) {
            showNotification('正在连接智能体...', 'info');
            setTimeout(() => {
                showNotification('连接成功，开始对话', 'success');
            }, 1200);
        }
        else if (buttonText.includes('探索') || buttonText.includes('加载图谱')) {
            showNotification('正在加载知识图谱...', 'info');
            setTimeout(() => {
                showNotification('图谱加载完成', 'success');
            }, 2000);
        }
        else if (buttonText.includes('处理')) {
            showNotification('正在处理数据...', 'info');
            setTimeout(() => {
                showNotification('处理完成', 'success');
            }, 1000);
        }
        else if (buttonText.includes('详情') || buttonText.includes('报告')) {
            showNotification('正在生成详细报告...', 'info');
            setTimeout(() => {
                showNotification('报告生成完成', 'success');
            }, 1200);
        }
        else if (buttonText.includes('全部')) {
            showNotification('正在加载全部数据...', 'info');
            setTimeout(() => {
                showNotification('数据加载完成', 'success');
            }, 1000);
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