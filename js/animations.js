// ==================== 滚动动画 ====================

class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        // 初始化AOS
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100,
                delay: 0
            });
        }
        
        // 数字计数动画
        this.initCountAnimations();
        
        // 滚动触发动画
        this.initScrollReveal();
        
        // 视差效果
        this.initParallax();
    }
    
    // 数字计数动画
    initCountAnimations() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const fullText = element.getAttribute('data-count');
                    // 提取数字部分进行动画
                    const numericMatch = fullText.match(/(\d+)/);
                    if (numericMatch) {
                        const target = parseInt(numericMatch[1]);
                        const suffix = fullText.replace(numericMatch[1], '');
                        this.animateCount(element, 0, target, 2000, suffix);
                    } else {
                        // 如果没有数字，直接显示完整文本
                        element.textContent = fullText;
                    }
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(num => observer.observe(num));
    }

    animateCount(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 使用缓动函数
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = end + suffix;
            }
        };
        
        requestAnimationFrame(update);
    }
    
    // 滚动触发动画
    initScrollReveal() {
        const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(el => observer.observe(el));
    }
    
    // 视差效果
    initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// ==================== 鼠标跟随效果 ====================

class MouseFollower {
    constructor() {
        this.cursor = null;
        this.follower = null;
        this.init();
    }
    
    init() {
        // 创建自定义光标
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
        
        // 创建跟随元素
        this.follower = document.createElement('div');
        this.follower.className = 'cursor-follower';
        document.body.appendChild(this.follower);
        
        // 添加样式
        this.addStyles();
        
        // 监听鼠标移动
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            
            // 延迟跟随
            setTimeout(() => {
                this.follower.style.left = e.clientX + 'px';
                this.follower.style.top = e.clientY + 'px';
            }, 50);
        });
        
        // 悬停效果
        document.querySelectorAll('a, button, .glass-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.follower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                this.follower.classList.remove('active');
            });
        });
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor {
                position: fixed;
                width: 10px;
                height: 10px;
                background: var(--accent-cyan);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease;
            }
            
            .cursor-follower {
                position: fixed;
                width: 30px;
                height: 30px;
                border: 2px solid var(--accent-cyan);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                transition: all 0.3s ease;
                opacity: 0.5;
            }
            
            .cursor-follower.active {
                transform: scale(1.5);
                opacity: 0.8;
                border-color: var(--accent-pink);
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== 磁性按钮效果 ====================

class MagneticButtons {
    constructor() {
        this.init();
    }
    
    init() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// ==================== 文字打字机效果 ====================

class Typewriter {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.init();
    }
    
    init() {
        this.type();
    }
    
    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// ==================== 渐进式加载 ====================

class ProgressiveLoader {
    constructor() {
        this.init();
    }
    
    init() {
        // 图片懒加载
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // 背景图片懒加载
        const backgrounds = document.querySelectorAll('[data-bg]');
        
        const bgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.style.backgroundImage = `url(${el.dataset.bg})`;
                    bgObserver.unobserve(el);
                }
            });
        });
        
        backgrounds.forEach(el => bgObserver.observe(el));
    }
}

// ==================== 导航栏滚动效果 ====================

class NavbarScroll {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.lastScrollY = 0;
        this.init();
    }
    
    init() {
        if (!this.navbar) return;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.pageYOffset;
            
            // 添加滚动样式
            if (currentScrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            // 隐藏/显示导航栏
            if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            this.lastScrollY = currentScrollY;
        });
    }
}

// ==================== 回到顶部按钮 ====================

class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.init();
    }
    
    init() {
        if (!this.button) return;
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        });
        
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==================== 滤镜功能 ====================

class FilterSystem {
    constructor() {
        this.init();
    }
    
    init() {
        // 作品展示滤镜
        const filterBtns = document.querySelectorAll('.filter-btn');
        const showcaseCards = document.querySelectorAll('.showcase-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // 更新按钮状态
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // 过滤卡片
                showcaseCards.forEach(card => {
                    const category = card.dataset.category;
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // FAQ分类滤镜
        const faqCatBtns = document.querySelectorAll('.faq-cat-btn');
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqCatBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                
                // 更新按钮状态
                faqCatBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // 过滤问题
                faqItems.forEach(item => {
                    const itemCategory = item.dataset.category;
                    
                    if (category === 'all' || itemCategory === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// ==================== FAQ展开/收起 ====================

class FAQAccordion {
    constructor() {
        this.init();
    }
    
    init() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                const isActive = item.classList.contains('active');
                
                // 关闭所有其他项
                document.querySelectorAll('.faq-item').forEach(i => {
                    i.classList.remove('active');
                });
                
                // 切换当前项
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
}

// ==================== 新闻标签切换 ====================

class NewsTabSwitcher {
    constructor() {
        this.init();
    }
    
    init() {
        const tabBtns = document.querySelectorAll('.news-tab-btn');
        const newsCards = document.querySelectorAll('.news-card');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.textContent;
                
                // 更新按钮状态
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // 过滤新闻
                newsCards.forEach(card => {
                    const tag = card.querySelector('.news-tag').textContent;
                    
                    if (tab === '全部' || tag.includes(tab.replace('新闻', '').replace('回顾', '').replace('报道', ''))) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// ==================== 表单验证 ====================

class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validate()) {
                this.submit();
            }
        });
        
        // 实时验证
        const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }
    
    validateField(input) {
        const value = input.value.trim();
        let isValid = true;
        
        // 必填验证
        if (input.required && !value) {
            isValid = false;
        }
        
        // 邮箱验证
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
            }
        }
        
        // 手机号验证
        if (input.type === 'tel' && value) {
            const phoneRegex = /^1[3-9]\d{9}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
            }
        }
        
        // 更新UI
        if (isValid) {
            input.classList.remove('error');
            input.classList.add('valid');
            this.removeError(input);
        } else {
            input.classList.add('error');
            input.classList.remove('valid');
            this.showError(input, this.getErrorMessage(input));
        }
        
        return isValid;
    }
    
    getErrorMessage(input) {
        if (input.required && !input.value.trim()) {
            return '此字段为必填项';
        }
        
        if (input.type === 'email') {
            return '请输入有效的邮箱地址';
        }
        
        if (input.type === 'tel') {
            return '请输入有效的手机号码';
        }
        
        return '输入有误';
    }
    
    showError(input, message) {
        let error = input.parentElement.querySelector('.error-message');
        if (!error) {
            error = document.createElement('span');
            error.className = 'error-message';
            input.parentElement.appendChild(error);
        }
        error.textContent = message;
    }
    
    removeError(input) {
        const error = input.parentElement.querySelector('.error-message');
        if (error) {
            error.remove();
        }
    }
    
    validate() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    submit() {
        // 模拟提交
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '提交中...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = '提交成功！';
            submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                this.form.reset();
            }, 2000);
        }, 1500);
    }
}

// ==================== 初始化 ====================

document.addEventListener('DOMContentLoaded', () => {
    // 初始化滚动动画
    new ScrollAnimations();
    
    // 初始化鼠标跟随效果
    if (window.innerWidth > 768) {
        new MouseFollower();
    }
    
    // 初始化磁性按钮
    new MagneticButtons();
    
    // 初始化渐进式加载
    new ProgressiveLoader();
    
    // 初始化导航栏滚动
    new NavbarScroll();
    
    // 初始化回到顶部
    new BackToTop();
    
    // 初始化滤镜系统
    new FilterSystem();
    
    // 初始化FAQ手风琴
    new FAQAccordion();
    
    // 初始化新闻标签
    new NewsTabSwitcher();
    
    // 初始化表单验证
    new FormValidator('registerForm');
});