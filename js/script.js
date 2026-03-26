// EMO视界 - 主要JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
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
    const scrollSpeed = 0.5;

    function scrollTestimonials() {
        const trackWidth = testimonialsTrack.scrollWidth;
        const wrapperWidth = testimonialsTrack.parentElement.offsetWidth;

        scrollPosition += scrollSpeed * scrollDirection;

        if (scrollPosition >= trackWidth - wrapperWidth) {
            scrollDirection = -1;
        } else if (scrollPosition <= 0) {
            scrollDirection = 1;
        }

        testimonialsTrack.style.transform = `translateX(-${scrollPosition}px)`;
        requestAnimationFrame(scrollTestimonials);
    }

    scrollTestimonials();

    // 悬停暂停
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    let isPaused = false;

    testimonialsWrapper.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    testimonialsWrapper.addEventListener('mouseleave', () => {
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