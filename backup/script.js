// EMO视界 - 主要JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // 关闭移动端菜单
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // 滚动动画观察器
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    document.querySelectorAll('.feature-card, .download-card, .screenshot-item, .stat').forEach(el => {
        observer.observe(el);
    });

    // 返回顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        transition: all 0.3s ease;
        z-index: 999;
    `;

    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // 鼠标悬停效果
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.5)';
    });

    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.4)';
    });

    // 数字计数动画
    function animateNumbers() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const text = stat.textContent;
            if (text.includes('%')) {
                animateNumber(stat, 0, 100, '%');
            } else if (text.includes('K')) {
                animateNumber(stat, 0, 4, 'K');
            }
        });
    }

    function animateNumber(element, start, end, suffix) {
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // 页面加载完成后执行数字动画
    setTimeout(animateNumbers, 1000);

    // 添加动态样式
    const style = document.createElement('style');
    style.textContent = `
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(15, 23, 42, 0.98);
            padding: 20px;
            border-bottom: 1px solid #334155;
        }

        .navbar.scrolled {
            background: rgba(15, 23, 42, 0.98);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .feature-card.animate,
        .download-card.animate,
        .screenshot-item.animate,
        .stat.animate {
            opacity: 1;
            transform: translateY(0);
        }

        .mobile-menu-btn.active i::before {
            content: '\\f00d';
        }
    `;
    document.head.appendChild(style);

    // 控制台输出
    console.log('%c EMO视界 ', 'background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
    console.log('%c 完全免费的TV影视软件 ', 'color: #10b981; font-size: 14px;');
});