// ==================== 主要交互逻辑 ====================

// 显示报名弹窗
function showRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// 关闭弹窗
function closeModal() {
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 显示作品详情弹窗
function showWorkModal(workData) {
    const modal = document.getElementById('workModal');
    if (modal) {
        document.getElementById('workName').textContent = workData.name;
        document.getElementById('workTeam').textContent = workData.team;
        document.getElementById('workDesc').textContent = workData.description;

        // 更新赛道标签和获奖情况
        const workTags = modal.querySelector('.work-tags');
        workTags.innerHTML = `
            <span class="tag">${workData.categoryName}</span>
            <span class="tag">${workData.award}</span>
        `;

        // 更新视频（如果有）
        const video = document.getElementById('workVideo');
        if (workData.video) {
            video.src = workData.video;
            video.style.display = 'block';
            // 加载视频并自动播放
            video.load();
            video.play().catch(error => {
                console.log('自动播放失败，可能需要用户交互:', error);
            });
        } else {
            video.style.display = 'none';
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// 关闭作品详情弹窗
function closeWorkModal() {
    const modal = document.getElementById('workModal');
    if (modal) {
        // 停止视频播放
        const video = document.getElementById('workVideo');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }

        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 滚动到指定区域
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 80; // 导航栏高度
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// 下载赛事手册
function downloadHandbook() {
    // 模拟下载
    alert('赛事手册下载功能即将上线！');
}

// ==================== 移动端菜单 ====================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        
        // 切换汉堡图标
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
    
    // 点击菜单项后关闭菜单
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        });
    });
}

// ==================== 平滑滚动 ====================

// 为所有导航链接添加平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const offset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== 作品展示详情 ====================

// 为作品卡片添加点击事件
document.querySelectorAll('.showcase-card').forEach(card => {
    card.addEventListener('click', () => {
        const name = card.getAttribute('data-name');
        const team = card.getAttribute('data-team');
        const desc = card.getAttribute('data-desc');
        const categoryName = card.getAttribute('data-category-name');
        const award = card.getAttribute('data-award');
        const video = card.getAttribute('data-video');

        showWorkModal({
            name: name,
            team: team,
            description: desc,
            categoryName: categoryName,
            award: award,
            video: video
        });
    });
});

// ==================== 资源按钮点击 ====================

document.querySelectorAll('.resource-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('资源获取方式请联系组委会！');
    });
});

// ==================== 赛道详情按钮 ====================

document.querySelectorAll('.track-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        alert('详细技术要求请下载赛事手册！');
    });
});

// ==================== FAQ搜索 ====================

const faqSearchInput = document.querySelector('.faq-search-input');
if (faqSearchInput) {
    faqSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const faqItems = document.querySelectorAll('.faq-item');
        const faqList = document.querySelector('.faq-list');

        // 如果搜索框为空，隐藏问题列表
        if (searchTerm === '') {
            faqList.classList.add('hidden');
            return;
        }

        // 显示问题列表
        faqList.classList.remove('hidden');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h4').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// ==================== 咨询提交 ====================

const contactBtn = document.querySelector('.contact-btn');
if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        showRegisterModal();
    });
}

// ==================== 弹窗点击外部关闭 ====================

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ==================== ESC键关闭弹窗 ====================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

// ==================== 导航栏高亮当前区域 ====================

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// ==================== 页面加载动画 ====================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==================== 性能优化：防抖函数 ====================

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

// ==================== 性能优化：节流函数 ====================

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== 窗口大小变化事件（防抖） ====================

const handleResize = debounce(() => {
    // 重新计算需要响应式调整的元素
    console.log('Window resized');
}, 250);

window.addEventListener('resize', handleResize);

// ==================== 滚动事件（节流） ====================

const handleScroll = throttle(() => {
    // 滚动相关操作
    highlightActiveSection();
}, 100);

window.addEventListener('scroll', handleScroll);

// ==================== 页面可见性变化 ====================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 页面隐藏时暂停动画
        document.body.classList.add('page-hidden');
    } else {
        // 页面显示时恢复动画
        document.body.classList.remove('page-hidden');
    }
});

// ==================== 控制台欢迎信息 ====================

console.log('%c第二届Unity中国开发挑战赛', 'color: #0066ff; font-size: 24px; font-weight: bold;');
console.log('%c团结游AI，智引未来', 'color: #00ffff; font-size: 16px;');
console.log('%c🎮 欢迎访问赛事官网！', 'color: #ff00ff; font-size: 14px;');

// ==================== 新闻轮播Banner ====================

class NewsBanner {
    constructor() {
        this.banner = document.getElementById('newsBanner');
        if (!this.banner) return;

        this.slides = this.banner.querySelectorAll('.news-banner-slide');
        this.dots = this.banner.querySelectorAll('.news-banner-dot');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5秒自动切换
        this.isPlaying = true;

        this.init();
    }

    init() {
        // 绑定圆点点击事件
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // 鼠标悬停停止轮播
        this.banner.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });

        // 鼠标离开继续轮播
        this.banner.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });

        // 开始自动轮播
        this.startAutoPlay();
    }

    goToSlide(index) {
        // 移除当前激活状态
        this.slides[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');

        // 更新索引
        this.currentIndex = index;

        // 添加新的激活状态
        this.slides[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
        this.isPlaying = true;
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        this.isPlaying = false;
    }
}

// 初始化新闻轮播
document.addEventListener('DOMContentLoaded', () => {
    new NewsBanner();
    initFloatingWidget();
});

// ==================== 悬浮窗交互 ====================

function initFloatingWidget() {
    const widget = document.getElementById('floatingWidget');
    const widgetToggle = document.getElementById('floatingWidgetToggle');
    const widgetClose = document.getElementById('widgetClose');
    const copyBtns = document.querySelectorAll('.widget-btn.primary');

    if (!widget || !widgetToggle || !widgetClose) return;

    // 点击切换按钮打开/关闭悬浮窗
    widgetToggle.addEventListener('click', () => {
        widget.classList.toggle('active');
    });

    // 点击关闭按钮关闭悬浮窗
    widgetClose.addEventListener('click', () => {
        widget.classList.remove('active');
    });

    // 点击外部区域关闭悬浮窗
    document.addEventListener('click', (e) => {
        if (!widget.contains(e.target)) {
            widget.classList.remove('active');
        }
    });

    // 复制群号功能
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const groupNumber = '123456789';
            navigator.clipboard.writeText(groupNumber).then(() => {
                const originalText = btn.textContent;
                btn.textContent = '已复制！';
                btn.style.background = 'var(--accent-cyan)';
                btn.style.color = 'var(--bg-dark)';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('复制失败:', err);
                alert('复制失败，请手动复制群号：' + groupNumber);
            });
        });
    });
}
