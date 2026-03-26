// EMO视界 - 主要JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // ==================== 加载动画 ====================
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2200);

    // ==================== 主题切换 ====================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // 检查本地存储的主题
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }

    // ==================== 粒子背景 ====================
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        };
    }

    function initParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
            ctx.fill();

            // 连线效果
            particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 150)})`;
                    ctx.stroke();
                }
            });
        });

        animationId = requestAnimationFrame(drawParticles);
    }

    resizeCanvas();
    initParticles();
    drawParticles();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    // ==================== 截图灯箱 ====================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const screenshotImgs = document.querySelectorAll('.screenshot-img');
    
    let currentImageIndex = 0;
    const images = Array.from(screenshotImgs);
    const captions = ['主界面', '播放界面', '搜索界面'];

    screenshotImgs.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        lightbox.classList.add('active');
        lightboxImg.src = images[index].src;
        lightboxCaption.textContent = captions[index];
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        openLightbox(currentImageIndex);
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        openLightbox(currentImageIndex);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    // ==================== 打字机效果 ====================
    const typewriterElement = document.querySelector('.typewriter');
    const text = 'EMO视界';
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < text.length) {
            typewriterElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 150);
        }
    }

    setTimeout(typeWriter, 500);

    // ==================== 在线人数计数器 ====================
    const webCountElement = document.getElementById('web-count');
    const appCountElement = document.getElementById('app-count');

    // 网页在线人数：2000-3500之间随机
    let webCount = Math.floor(Math.random() * 1500) + 2000;
    // APP观看人数：3000-5000之间随机
    let appCount = Math.floor(Math.random() * 2000) + 3000;

    function updateOnlineCount() {
        // 网页人数波动 ±15
        const webChange = Math.floor(Math.random() * 30) - 15;
        webCount = Math.max(1800, Math.min(4000, webCount + webChange));
        webCountElement.textContent = webCount.toLocaleString();

        // APP人数波动 ±20
        const appChange = Math.floor(Math.random() * 40) - 20;
        appCount = Math.max(2500, Math.min(6000, appCount + appChange));
        appCountElement.textContent = appCount.toLocaleString();
    }

    updateOnlineCount();
    setInterval(updateOnlineCount, 2500);

    // ==================== FAQ手风琴 ====================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(faq => faq.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ==================== 好评滚动 ====================
    const testimonialsTrack = document.querySelector('.testimonials-track');
    let scrollPosition = 0;
    let scrollDirection = 1;
    const scrollSpeed = 0.8;
    let isPaused = false;

    function scrollTestimonials() {
        if (!isPaused) {
            const trackWidth = testimonialsTrack.scrollWidth;
            const wrapperWidth = testimonialsTrack.parentElement.offsetWidth;

            scrollPosition += scrollSpeed * scrollDirection;

            if (scrollPosition >= trackWidth - wrapperWidth) {
                scrollDirection = -1;
            } else if (scrollPosition <= 0) {
                scrollDirection = 1;
            }

            testimonialsTrack.style.transform = `translateX(-${scrollPosition}px)`;
        }
        requestAnimationFrame(scrollTestimonials);
    }

    scrollTestimonials();

    // 悬停暂停
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');

    testimonialsWrapper.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    testimonialsWrapper.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    // 触摸设备支持
    testimonialsWrapper.addEventListener('touchstart', () => {
        isPaused = true;
    });

    testimonialsWrapper.addEventListener('touchend', () => {
        isPaused = false;
    });

    // ==================== 移动端菜单 ====================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // ==================== 平滑滚动 ====================
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

                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // ==================== 导航栏滚动效果 ====================
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

    // ==================== 滚动动画 ====================
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

    document.querySelectorAll('.feature-card, .download-card, .screenshot-item, .stat, .timeline-item, .faq-item, .testimonial-card').forEach(el => {
        observer.observe(el);
    });

    // ==================== 返回顶部按钮 ====================
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
        background: var(--gradient-1);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
        transition: all 0.3s ease;
        z-index: 999;
        opacity: 0.9;
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

    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.6)';
    });

    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.4)';
    });

    // ==================== 动态样式 ====================
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
        .stat.animate,
        .timeline-item.animate,
        .faq-item.animate,
        .testimonial-card.animate {
            opacity: 1;
            transform: translateY(0);
        }

        .mobile-menu-btn.active i::before {
            content: '\\f00d';
        }
    `;
    document.head.appendChild(style);

    // ==================== 控制台输出 ====================
    console.log('%c EMO视界 ', 'background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
    console.log('%c 完全免费的TV影视软件 ', 'color: #10b981; font-size: 14px;');
});