<script>
export default {
  name: 'AboutPage',
  mounted() {
    this.init3DTiltEffects();
    this.initSkillsCarousel();
    this.initThemeToggle();
    this.initMobileNavigation();
    this.initHeaderScrollEffect();
    this.initSmoothScrolling();
    this.initFormHandling();
    this.init3DCardEffects();
    this.initEducationBubbles();
    this.initTimelineEffects();
    this.initProfileImageEffects();
    this.initScrollAnimations();
    this.initContactFormEffects();
    this.initFooterEffects();
    this.initScrollToTop();
  },
  methods: {
    init3DTiltEffects() {
      // Enhanced 3D Tilt Effect for Projects
      document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const x = e.clientX - card.getBoundingClientRect().left;
          const y = e.clientY - card.getBoundingClientRect().top;
          
          const centerX = card.offsetWidth / 2;
          const centerY = card.offsetHeight / 2;
          
          const angleX = (y - centerY) / 20;
          const angleY = (centerX - x) / 20;
          
          card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.03)`;
          card.style.boxShadow = `0 30px 60px rgba(0,0,0,0.3)`;
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
          card.style.boxShadow = '0 20px 50px rgba(0,0,0,0.15)';
        });
      });

      // Animation on scroll for projects
      const animateProjects = () => {
        const projects = document.querySelectorAll('.project-card');
        projects.forEach((project, index) => {
          const projectPosition = project.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.3;
          
          if(projectPosition < screenPosition) {
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
            project.style.transition = `all 0.5s ease ${index * 0.1}s`;
          }
        });
      };

      // Set initial state
      document.querySelectorAll('.project-card').forEach(project => {
        project.style.opacity = '0';
        project.style.transform = 'translateY(30px)';
      });

      window.addEventListener('scroll', animateProjects);
      window.addEventListener('load', animateProjects);
    },

    initSkillsCarousel() {
      const track = document.querySelector('.carousel-track');
      if (!track) return;
      
      const slides = Array.from(document.querySelectorAll('.carousel-slide'));
      const dots = Array.from(document.querySelectorAll('.dot'));
      const prevBtn = document.querySelector('.carousel-arrow.prev');
      const nextBtn = document.querySelector('.carousel-arrow.next');
      
      let currentIndex = 0;
      const slideCount = slides.length;
      
      // Set initial positions
      const setSlidePosition = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, index) => {
          slide.style.left = `${slideWidth * index}px`;
        });
      };
      
      // Move to slide
      const moveToSlide = (index) => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${slideWidth * index}px)`;
        currentIndex = index;
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
      };
      
      // Next slide
      const nextSlide = () => {
        if (currentIndex === slideCount - 1) {
          moveToSlide(0);
        } else {
          moveToSlide(currentIndex + 1);
        }
      };
      
      // Previous slide
      const prevSlide = () => {
        if (currentIndex === 0) {
          moveToSlide(slideCount - 1);
        } else {
          moveToSlide(currentIndex - 1);
        }
      };
      
      // Dot click
      dots.forEach(dot => {
        dot.addEventListener('click', function() {
          const slideIndex = dots.indexOf(this);
          moveToSlide(slideIndex);
        });
      });
      
      // Button events
      nextBtn.addEventListener('click', nextSlide);
      prevBtn.addEventListener('click', prevSlide);
      
      // Auto-rotate every 5 seconds
      let slideInterval = setInterval(nextSlide, 5000);
      
      // Pause on hover
      track.addEventListener('mouseenter', () => clearInterval(slideInterval));
      track.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
      });
      
      // Initialize
      setSlidePosition();
      window.addEventListener('resize', setSlidePosition);
    },

    initThemeToggle() {
      const themeToggle = document.getElementById('themeToggle');
      if (!themeToggle) return;
      
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Check for saved theme preference or use system preference
      const currentTheme = localStorage.getItem('theme');
      if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        document.body.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
      
      // Toggle theme on button click
      themeToggle.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'light') {
          document.body.setAttribute('data-theme', 'dark');
          themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
          localStorage.setItem('theme', 'dark');
        } else {
          document.body.setAttribute('data-theme', 'light');
          themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
          localStorage.setItem('theme', 'light');
        }
      });
    },

    initMobileNavigation() {
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      if (!hamburger || !navLinks) return;
      
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
      });
      
      // Close mobile menu when clicking a link
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
        });
      });
    },

    initHeaderScrollEffect() {
      const header = document.getElementById('header');
      if (!header) return;
      
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    },

    initSmoothScrolling() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          if (!targetElement) return;
          
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        });
      });
    },

    initFormHandling() {
      const contactForm = document.getElementById('contactForm');
      if (!contactForm) return;
      
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.form-submit-btn');
        submitBtn.disabled = true;
        
        // Animation while "sending"
        submitBtn.querySelector('span').textContent = 'Opening Email...';
        submitBtn.querySelector('.submit-icon').innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        // Let the form submit naturally to the mailto: handler
        setTimeout(() => {
          submitBtn.querySelector('span').textContent = 'Send Message';
          submitBtn.querySelector('.submit-icon').innerHTML = '<i class="fas fa-paper-plane"></i>';
          submitBtn.disabled = false;
        }, 2000);
        
        // Submit the form to mailto
        this.submit();
      });
    },

    init3DCardEffects() {
      const cards = document.querySelectorAll('.card-3d');
      
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
          const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
          card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
      });
    },

    initEducationBubbles() {
      const educationItems = document.querySelectorAll('.education-item');
      
      // Create bubbles for each education item
      educationItems.forEach(item => {
        // Create 8-12 bubbles per item
        const bubbleCount = 8 + Math.floor(Math.random() * 5);
        
        for (let i = 0; i < bubbleCount; i++) {
          this.createBubble(item);
        }
        
        // Add mouse move effect for 3D tilt
        item.addEventListener('mousemove', (e) => {
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateY = (x - centerX) / 20;
          const rotateX = (centerY - y) / 20;
          
          item.style.transform = `translateY(-10px) rotateY(${rotateY}deg) rotateX(${-rotateX}deg)`;
        });
        
        item.addEventListener('mouseleave', () => {
          item.style.transform = 'translateY(0) rotateY(0) rotateX(0)';
        });
      });
      
      // Animation on scroll for education items
      const animateEducationOnScroll = () => {
        const educationItems = document.querySelectorAll('.education-item');
        educationItems.forEach((item, index) => {
          const itemTop = item.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if(itemTop < windowHeight * 0.8) {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateX(0) rotateY(0deg)';
            }, index * 300);
          }
        });
      };
      
      // Initialize education items
      document.querySelectorAll('.education-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      });
      
      // First check on load
      animateEducationOnScroll();
      
      // Then check on scroll
      window.addEventListener('scroll', animateEducationOnScroll);
    },

    createBubble(container) {
      const bubble = document.createElement('div');
      bubble.className = 'education-bubble';
      
      // Random size between 15px and 60px
      const size = 15 + Math.random() * 45;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      
      // Random position
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.top = `${Math.random() * 100}%`;
      
      // Random animation duration and delay
      const duration = 15 + Math.random() * 15;
      bubble.style.animation = `floatBubble ${duration}s infinite ease-in-out`;
      bubble.style.animationDelay = `${Math.random() * 5}s`;
      
      // Random opacity and color based on theme
      const opacity = 0.05 + Math.random() * 0.1;
      bubble.style.opacity = opacity;
      bubble.style.backgroundColor = `var(--bubble-color)`;
      
      // Random z-index within container
      bubble.style.zIndex = -1;
      
      container.appendChild(bubble);
    },

    initTimelineEffects() {
      const timelineItems = document.querySelectorAll('.timeline-item');
      
      timelineItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
          const x = e.clientX - item.getBoundingClientRect().left;
          const y = e.clientY - item.getBoundingClientRect().top;
          
          const centerX = item.offsetWidth / 2;
          const centerY = item.offsetHeight / 2;
          
          const angleX = (y - centerY) / 20;
          const angleY = (centerX - x) / 20;
          
          item.querySelector('.timeline-content').style.transform = 
            `rotateY(${angleY}deg) rotateX(${angleX}deg) translateZ(20px)`;
          item.querySelector('.timeline-dot').style.transform = 
            `scale(1.3) translateX(${angleY * 2}px) translateY(${angleX * 2}px)`;
        });
        
        item.addEventListener('mouseleave', () => {
          item.querySelector('.timeline-content').style.transform = 
            'rotateY(0) rotateX(0) translateZ(0)';
          item.querySelector('.timeline-dot').style.transform = 'scale(1)';
        });
      });
      
      // Animate timeline items on scroll
      const animateTimeline = () => {
        timelineItems.forEach((item, index) => {
          const itemPosition = item.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.5;
          
          if(itemPosition < screenPosition) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transition = `all 0.6s ease ${index * 0.1}s`;
          }
        });
      };
      
      // Set initial state
      timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
      });
      
      window.addEventListener('scroll', animateTimeline);
      window.addEventListener('load', animateTimeline);
    },

    initProfileImageEffects() {
      const aboutImage = document.querySelector('.about-image img');
      const aboutImageContainer = document.querySelector('.about-image');
      
      if (aboutImage && aboutImageContainer) {
        aboutImageContainer.addEventListener('mousemove', (e) => {
          const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
          const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
          aboutImage.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        aboutImageContainer.addEventListener('mouseleave', () => {
          aboutImage.style.transform = 'perspective(1000px) rotateY(15deg) rotateX(0deg)';
        });
      }

      const border = document.querySelector('.animated-border');
      const profilePic = document.querySelector('.profile-picture');
      if (!border || !profilePic) return;
      
      // Add mouse interaction effects
      border.addEventListener('mouseenter', function() {
        this.style.animationDuration = '1.5s';
        this.style.filter = 'blur(2px)';
      });
      
      border.addEventListener('mouseleave', function() {
        this.style.animationDuration = '3s';
        this.style.filter = 'blur(5px)';
      });
      
      // Add click effect for fun
      profilePic.addEventListener('click', function() {
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 300);
      });
    },

    initScrollAnimations() {
      const animateOnScroll = () => {
        const elements = document.querySelectorAll('.project-card, .timeline-item, .education-item, .skill-card');
        
        elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.3;
          
          if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }
        });
      };
      
      // Set initial state for animation
      document.querySelectorAll('.project-card, .timeline-item, .education-item, .skill-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
      });
      
      // Animate progress bars on load
      document.querySelectorAll('.skill-progress-bar').forEach(bar => {
        const percent = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = percent;
        }, 500);
      });
      
      window.addEventListener('scroll', animateOnScroll);
      window.addEventListener('load', animateOnScroll);
    },

    initContactFormEffects() {
      const contactFormContainer = document.querySelector('.contact-form-container');
      const contactForm = document.querySelector('.contact-form');
      if (!contactFormContainer || !contactForm) return;
      
      // 3D tilt effect on mouse move
      contactFormContainer.addEventListener('mousemove', (e) => {
        const x = e.clientX - contactFormContainer.getBoundingClientRect().left;
        const y = e.clientY - contactFormContainer.getBoundingClientRect().top;
        
        const centerX = contactFormContainer.offsetWidth / 2;
        const centerY = contactFormContainer.offsetHeight / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        contactForm.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(20px)`;
      });
      
      contactFormContainer.addEventListener('mouseleave', () => {
        contactForm.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
      
      // Floating label animation
      document.querySelectorAll('.floating-label input, .floating-label textarea').forEach(input => {
        input.addEventListener('focus', function() {
          this.parentNode.querySelector('label').classList.add('active');
        });
        
        input.addEventListener('blur', function() {
          if (this.value === '') {
            this.parentNode.querySelector('label').classList.remove('active');
          }
        });
        
        // Check on load if inputs have values
        if (input.value !== '') {
          input.parentNode.querySelector('label').classList.add('active');
        }
      });
      
      // Animate contact section elements on scroll
      const animateContactOnScroll = () => {
        const contactItems = document.querySelectorAll('.contact-item, .contact-form, .contact-info h3, .contact-info p');
        
        contactItems.forEach((item, index) => {
          const itemTop = item.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if(itemTop < windowHeight * 0.8) {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0) translateZ(0)';
            }, index * 100);
          }
        });
      };
      
      // Initialize contact items
      document.querySelectorAll('.contact-item, .contact-form, .contact-info h3, .contact-info p').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      });
      
      // First check on load
      animateContactOnScroll();
      
      // Then check on scroll
      window.addEventListener('scroll', animateContactOnScroll);
    },

    initFooterEffects() {
      // Create bubbles - UPDATED to ensure they don't block clicks
      const bubbleField = document.querySelector('.bubble-field');
      if (bubbleField) {
        for (let i = 0; i < 20; i++) {
          const bubble = document.createElement('div');
          bubble.className = 'bubble';
          
          const size = Math.random() * 20 + 10;
          const left = Math.random() * 100;
          const delay = Math.random() * 8;
          const duration = Math.random() * 10 + 10;
          const zDepth = Math.random() * 100 - 50;
          
          bubble.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            bottom: -${size}px;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            transform: translateZ(${zDepth}px);
            pointer-events: none;
          `;
          
          bubbleField.appendChild(bubble);
        }
      }
      
      // Create floating dots - UPDATED to ensure they don't block clicks
      const dotContainer = document.querySelector('.floating-dots');
      if (dotContainer) {
        for (let i = 0; i < 30; i++) {
          const dot = document.createElement('div');
          dot.className = 'dot';
          
          const size = Math.random() * 8 + 2;
          const left = Math.random() * 100;
          const delay = Math.random() * 15;
          const duration = Math.random() * 20 + 20;
          const zDepth = Math.random() * 100;
          
          dot.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            top: 100%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            transform: translateZ(${zDepth}px);
            pointer-events: none;
          `;
          
          dotContainer.appendChild(dot);
        }
      }
      
      // Add SVG gradient definition
      const svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgDefs.setAttribute('class', 'defs-only');
      const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
      gradient.setAttribute('id', 'social-gradient');
      gradient.setAttribute('x1', '0%');
      gradient.setAttribute('y1', '0%');
      gradient.setAttribute('x2', '100%');
      gradient.setAttribute('y2', '100%');
      
      const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop1.setAttribute('offset', '0%');
      stop1.setAttribute('stop-color', '#6c63ff');
      gradient.appendChild(stop1);
      
      const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop2.setAttribute('offset', '100%');
      stop2.setAttribute('stop-color', '#ff6584');
      gradient.appendChild(stop2);
      
      svgDefs.appendChild(gradient);
      document.body.appendChild(svgDefs);

      // Ensure all links work properly
      document.querySelectorAll('a').forEach(anchor => {
        anchor.style.position = 'relative';
        anchor.style.zIndex = '10';
      });
    },

    initScrollToTop() {
      const scrollToTopBtn = document.getElementById('scrollToTopBtn');
      if (!scrollToTopBtn) return;
      
      // Show/hide button based on scroll position
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
          scrollToTopBtn.classList.add('visible');
        } else {
          scrollToTopBtn.classList.remove('visible');
        }
      });
      
      // Scroll to top when clicked
      scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }
};
</script>

