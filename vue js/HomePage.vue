<template>
  <div class="home-page">
    <div id="vanta-bg"></div>
    <div class="particles" id="particles"></div>

    <div class="floating-elements">
      <div class="floating-element element-1"></div>
      <div class="floating-element element-2"></div>
      <div class="floating-element element-3"></div>
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>

    <header id="header">
      <div class="container">
        <nav>
          <!-- Logo -->
          <router-link to="/" class="logo-img-container">
            <img src="../assets/Pictures/logo.jpg" alt="Saiyem Raiyan" class="nav-logo" />
          </router-link>

          <!-- Navigation Links -->
          <ul class="nav-links">
            <li>
              <router-link to="/" class="active"
                ><i class="fas fa-home"></i> Home</router-link
              >
            </li>
            <li>
              <router-link to="/about"><i class="fas fa-user"></i> About</router-link>
            </li>
            <li>
              <router-link to="/about"><i class="fas fa-code"></i> Projects</router-link>
            </li>
            <li>
              <router-link to="/about"
                ><i class="fas fa-briefcase"></i> Experience</router-link
              >
            </li>
            <li>
              <router-link to="/about"
                ><i class="fas fa-graduation-cap"></i> Education</router-link
              >
            </li>
            <li>
              <router-link to="/about"><i class="fas fa-envelope"></i> Contact</router-link>
            </li>
          </ul>

          <!-- Mobile Menu Button -->
          <div class="hamburger" id="hamburger" @click="toggleMenu">
            <div :class="{ 'active': isMenuActive }"></div>
            <div :class="{ 'active': isMenuActive }"></div>
            <div :class="{ 'active': isMenuActive }"></div>
          </div>
        </nav>
      </div>
    </header>

    <section id="home" class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text" :style="heroTextStyle">
            <h1>Md Saiyem Raiyan</h1>
            <h2>AI Engineer & Frontend Developer</h2>
            <p>
              Passionate about Artificial Intelligence, Machine Learning, and
              creating innovative solutions that make a difference. I combine
              technical expertise with creative problem-solving to build
              impactful applications.
            </p>
            <div class="hero-buttons">
              <a href="https://github.com/SaiyemRaiyan" class="btn"
                >View My Work</a
              >
            </div>
          </div>
          <div class="hero-image" @mousemove="handleHeroImageMove" @mouseleave="resetHeroImagePosition">
            <div class="hero-image-container" ref="heroImageContainer">
              <img
                src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Saiyem Raiyan"
                ref="heroImage"
              />
            </div>

            <div class="journey-btn-container">
              <router-link to="/about" class="journey-btn">
                <span class="journey-btn-text">
                  <i class="fas fa-user-astronaut journey-icon"></i>
                  About Me & My Journey
                  <i class="fas fa-rocket journey-icon"></i>
                </span>
                <span class="journey-btn-gradient"></span>
                <span class="journey-btn-shine"></span>
                <span class="journey-btn-sparkles" ref="sparklesContainer">
                  <span v-for="(sparkle, index) in sparkles" :key="index" class="sparkle" :style="sparkle.style"></span>
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import * as THREE from 'three';
import VANTA from 'vanta/dist/vanta.net.min';

export default {
  name: 'HomePage',
  data() {
    return {
      vantaEffect: null,
      isMenuActive: false,
      darkMode: localStorage.getItem('darkMode') !== 'false',
      animationFrameId: null,
      sparkles: [],
      heroTextStyle: {
        opacity: '0',
        transform: 'translateY(20px)'
      }
    };
  },
  mounted() {
    this.initVantaBackground();
    this.createParticles();
    this.initScrollEffects();
    this.initTheme();
    this.initHeroImageEffects();
    this.initHeroTextAnimation();
    this.createSparkles();

    window.addEventListener('resize', this.handleResize);
    window.addEventListener('beforeunload', this.cleanup);
  },
  beforeDestroy() {
    this.cleanup();
  },
  methods: {
    initVantaBackground() {
      this.vantaEffect = VANTA.NET({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x6c63ff,
        backgroundColor: this.darkMode ? 0x0a0a12 : 0xf8f9fa,
        points: 15.0,
        maxDistance: 22.0,
        spacing: 20.0,
        showDots: false,
      });
    },
    createParticles() {
      const particlesContainer = document.getElementById("particles");
      const particleCount = Math.floor(window.innerWidth / 20);

      particlesContainer.innerHTML = "";

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        const size = Math.random() * 6 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 20 + 10;
        const opacity = Math.random() * 0.5 + 0.3;

        Object.assign(particle.style, {
          width: `${size}px`,
          height: `${size}px`,
          left: `${posX}%`,
          top: `${posY}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          opacity: opacity,
        });

        const colors = [
          "var(--neon-pink)",
          "var(--neon-blue)",
          "var(--neon-purple)",
          "var(--neon-green)",
          "var(--neon-orange)",
          "var(--neon-yellow)",
        ];
        const color1 = colors[Math.floor(Math.random() * colors.length)];
        let color2 = colors[Math.floor(Math.random() * colors.length)];
        while (color2 === color1) {
          color2 = colors[Math.floor(Math.random() * colors.length)];
        }

        particle.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
        particlesContainer.appendChild(particle);
      }
    },
    initScrollEffects() {
      let lastScroll = 0;
      const header = document.getElementById("header");
      
      const handleScroll = () => {
        const currentScroll = window.scrollY;
        if (Math.abs(currentScroll - lastScroll) > 5) {
          if (currentScroll > 50) {
            header.classList.add("scrolled");
          } else {
            header.classList.remove("scrolled");
          }
          lastScroll = currentScroll;
        }
      };
      
      window.addEventListener("scroll", handleScroll);
    },
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
      const navLinks = document.querySelector(".nav-links");
      navLinks.classList.toggle("active");

      if (navLinks.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
    initTheme() {
      const applyTheme = () => {
        if (this.darkMode) {
          document.body.setAttribute("data-theme", "dark");
          this.vantaEffect.setOptions({ backgroundColor: 0x0a0a12 });
        } else {
          document.body.removeAttribute("data-theme");
          this.vantaEffect.setOptions({ backgroundColor: 0xf8f9fa });
        }
        localStorage.setItem("darkMode", this.darkMode);
      };

      applyTheme();
    },
    handleHeroImageMove(e) {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }

      this.animationFrameId = requestAnimationFrame(() => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

        this.$refs.heroImageContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        this.$refs.heroImage.style.transform = `perspective(1000px) rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`;

        const shadowX = xAxis * -1;
        const shadowY = yAxis * -1;
        this.$refs.heroImage.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.6)`;
      });
    },
    resetHeroImagePosition() {
      this.$refs.heroImageContainer.style.transform = "rotateY(-10deg) rotateX(0deg)";
      this.$refs.heroImage.style.transform =
        "perspective(1000px) rotateY(-10deg) rotateX(0deg)";
      this.$refs.heroImage.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.5)";
    },
    initHeroTextAnimation() {
      setTimeout(() => {
        this.heroTextStyle = {
          transition: "opacity 0.8s ease, transform 0.8s ease",
          opacity: "1",
          transform: "translateY(0)"
        };
      }, 300);
    },
    createSparkles() {
      const sparkleCount = 15;
      this.sparkles = [];

      for (let i = 0; i < sparkleCount; i++) {
        const size = Math.random() * 5 + 2;
        const delay = Math.random() * 2;
        const duration = Math.random() * 1 + 1;
        const tx = (Math.random() - 0.5) * 150;
        const ty = (Math.random() - 0.5) * 80;

        const colors = [
          { color: "var(--neon-pink)", weight: 0.3 },
          { color: "var(--neon-blue)", weight: 0.3 },
          { color: "var(--neon-purple)", weight: 0.2 },
          { color: "var(--neon-green)", weight: 0.1 },
          { color: "white", weight: 0.1 },
        ];

        let random = Math.random();
        let cumulativeWeight = 0;
        let selectedColor = colors[0].color;

        for (const colorObj of colors) {
          cumulativeWeight += colorObj.weight;
          if (random <= cumulativeWeight) {
            selectedColor = colorObj.color;
            break;
          }
        }

        this.sparkles.push({
          style: {
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            '--tx': `${tx}px`,
            '--ty': `${ty}px`,
            backgroundColor: selectedColor
          }
        });
      }
    },
    addHoverSparkles() {
      for (let i = 0; i < 5; i++) {
        const size = Math.random() * 6 + 3;
        const delay = 0;
        const duration = Math.random() * 0.5 + 0.5;
        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 100;

        const newSparkle = {
          style: {
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            '--tx': `${tx}px`,
            '--ty': `${ty}px`,
            backgroundColor: [
              "var(--neon-pink)",
              "var(--neon-blue)",
              "var(--neon-purple)",
              "var(--neon-green)",
              "white",
            ][Math.floor(Math.random() * 5)],
          }
        };

        this.sparkles.push(newSparkle);

        setTimeout(() => {
          this.sparkles = this.sparkles.filter(s => s !== newSparkle);
        }, duration * 1000);
      }
    },
    handleResize() {
      this.debounce(() => {
        this.createParticles();
      }, 200)();
    },
    debounce(func, wait) {
      let timeout;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(context, args);
        }, wait);
      };
    },
    cleanup() {
      if (this.vantaEffect) this.vantaEffect.destroy();
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('beforeunload', this.cleanup);
    }
  }
};
</script>

<style scoped>
      :root {
        --primary: #6c63ff;
        --secondary: #ff6584;
        --accent: #20c997;
        --dark: #2d3748;
        --light: #f8f9fa;
        --neon-pink: #ff2d75;
        --neon-blue: #00f2ff;
        --neon-purple: #b300ff;
        --neon-green: #00ff9d;
        --neon-orange: #ff7b25;
        --neon-yellow: #ffd700;

        /* Dark mode colors */
        --bg-color: #0a0a12;
        --text-color: #e1e1e1;
        --card-bg: rgba(30, 30, 40, 0.8);
        --header-bg: rgba(20, 20, 30, 0.9);
        --header-scrolled: rgba(15, 15, 25, 0.95);
        --shadow-color: rgba(0, 0, 0, 0.5);
        --skill-tag-bg: rgba(40, 40, 50, 0.8);
        --skill-tag-border: #333;
        --project-tag-bg: #2d2d2d;
        --project-tag-color: #ccc;
        --section-text: #aaa;
        --contact-form-bg: rgba(40, 40, 50, 0.8);
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        scroll-behavior: smooth;
      }

      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: var(--bg-color);
        color: var(--text-color);
        overflow-x: hidden;
        position: relative;
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      .particle {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--neon-pink), var(--neon-blue));
        opacity: 0.7;
        filter: blur(5px);
        animation: float 15s infinite ease-in-out;
      }

      .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 30px;
      }

      /* Simplified Navbar */
      header {
        padding: 10px 20px;
        position: fixed;
        width: 100%;
        max-width: 1100px;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        background: rgba(10, 10, 20, 0.3);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(10px);
        border-radius: 25px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 5px 20px rgba(59, 54, 54, 0.1);
        transition: all 0.3s ease;
        height: 60px;
        display: flex;
        justify-content: center;
      }

      header.scrolled {
        top: 10px;
        background: rgba(5, 5, 15, 0.5);
      }

      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
      }

      /* Logo */
      .logo-img-container {
        position: absolute;
        left: 15px;
        height: 100%;
        display: flex;
        align-items: center;
        z-index: 1;
      }

      .nav-logo {
        height: 40px;
        transition: transform 0.3s ease;
      }

      .logo-img-container:hover .nav-logo {
        transform: scale(1.05);
      }

      /* Navigation Links */
      .nav-links {
        position: relative;
        left: 35px;
        display: flex;
        list-style: none;
        margin: 0 auto;
        padding: 0;
      }

      @media (max-width: 992px) {
        .logo-img-container {
          position: static;
          left: auto;
        }
        .nav-links {
          left: 0;
        }
      }

      .nav-links li {
        margin: 0 5px;
      }

      .nav-links a {
        text-decoration: none;
        color: #e1e1e1;
        font-weight: 500;
        font-size: 0.9rem;
        padding: 8px 15px;
        border-radius: 20px;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .nav-links a i {
        margin-right: 8px;
        transition: all 0.3s ease;
      }

      /* Colorful Hover Effects */
      .nav-links li:nth-child(1) a:hover {
        color: var(--neon-pink);
      }
      .nav-links li:nth-child(2) a:hover {
        color: var(--neon-blue);
      }
      .nav-links li:nth-child(3) a:hover {
        color: var(--neon-purple);
      }
      .nav-links li:nth-child(4) a:hover {
        color: var(--neon-orange);
      }
      .nav-links li:nth-child(5) a:hover {
        color: var(--neon-green);
      }
      .nav-links li:nth-child(6) a:hover {
        color: var(--neon-yellow);
      }

      .nav-links a:hover i {
        transform: scale(1.2);
      }

      .nav-links a.active {
        font-weight: 600;
        color: white;
      }

      /* Mobile Menu */
      .hamburger {
        display: none;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(5px);
        padding: 10px;
        z-index: 1001;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .hamburger div {
        width: 24px;
        height: 2px;
        background: linear-gradient(90deg, #ff2d75, #00f2ff);
        margin: 4px 0;
        transition: all 0.3s ease;
        border-radius: 2px;
      }

      /* Responsive Design */
      @media (max-width: 992px) {
        .nav-links {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(15, 15, 25, 0.98);
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transform: translateX(100%);
          transition: transform 0.4s ease;
        }

        .nav-links.active {
          transform: translateX(0);
        }

        .nav-links li {
          margin: 15px 0;
        }

        .nav-links a {
          padding: 15px 30px;
          font-size: 1.1rem;
        }

        .hamburger {
          display: flex;
        }
      }

      @media (max-width: 576px) {
        header {
          padding: 10px 15px;
          width: calc(100% - 30px);
        }

        .nav-logo {
          height: 35px;
        }
      }

      section {
        padding: 100px 0;
      }

      .hero {
        min-height: 100vh;
        padding-bottom: 1px;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
        padding-top: 80px;
      }

      .hero-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        position: relative;
        z-index: 1;
      }

      .hero-text {
        flex: 1;
        min-width: 300px;
        padding-right: 40px;
        position: relative;
      }

      .hero-text::before {
        content: "";
        position: absolute;
        top: -50px;
        left: -50px;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, var(--neon-pink), transparent 70%);
        opacity: 0.3;
        filter: blur(50px);
        z-index: -1;
        animation: pulseGlow 4s infinite alternate;
      }

      .hero-text::after {
        content: "";
        position: absolute;
        bottom: -50px;
        right: -50px;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, var(--neon-blue), transparent 70%);
        opacity: 0.3;
        filter: blur(50px);
        z-index: -1;
        animation: pulseGlow 4s infinite alternate-reverse;
      }

      @keyframes gradientShift {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      @keyframes pulseGlow {
        0% {
          transform: scale(0.8);
          opacity: 0.2;
        }
        100% {
          transform: scale(1.2);
          opacity: 0.4;
        }
      }

      .hero-text h1 {
        font-size: 3.5rem;
        font-weight: 800;
        margin-bottom: 15px;
        line-height: 1.1;
        background: linear-gradient(
          135deg,
          var(--neon-pink),
          var(--neon-green),
          var(--neon-yellow)
        );
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        text-shadow: 0 0 20px rgba(108, 99, 255, 0.3);
        animation: gradientShift 8s ease infinite;
        background-size: 300% 300%;
        position: relative;
        display: inline-block;
        transition: all 0.5s ease;
      }

      .hero-text h1::after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(
          90deg,
          var(--neon-pink),
          var(--neon-blue),
          var(--neon-purple)
        );
        border-radius: 5px;
        animation: gradientShift 8s ease infinite;
        background-size: 300% 300%;
        transition: all 0.5s ease;
      }

      .hero-text p {
        font-size: 1.2rem;
        line-height: 1.8;
        margin-bottom: 35px;
        color: var(--text-color);
        max-width: 550px;
        position: relative;
        transition: all 0.5s ease;
        background: rgba(30, 30, 40, 0.5);
        padding: 20px;
        border-radius: 10px;
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .hero-text p::before {
        content: "";
        position: absolute;
        top: -15px;
        left: 0;
        width: 40px;
        height: 3px;
        background: linear-gradient(
          90deg,
          var(--neon-pink),
          var(--neon-purple)
        );
        border-radius: 3px;
        transition: all 0.5s ease;
      }

      .btn {
        display: inline-block;
        padding: 14px 35px;
        background: linear-gradient(
          135deg,
          var(--neon-blue),
          var(--shadow-color),
          var(--header-scrolled)
        );
        color: white;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border: none;
        cursor: pointer;
        box-shadow: 0 10px 30px rgba(108, 99, 255, 0.5);
        position: relative;
        overflow: hidden;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 0.9rem;
        z-index: 1;
      }

      .btn::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          var(--neon-blue),
          var(--shadow-color)
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
      }

      .btn:hover {
        transform: translateY(-5px) scale(1.05);
        box-shadow: 0 15px 40px rgba(108, 99, 255, 0.7);
      }

      .btn:hover::before {
        opacity: 1;
      }

      .hero-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        margin-bottom: 30px;
      }

      .hero-image {
        flex: 1;
        min-width: 300px;
        position: relative;
        text-align: center;
        perspective: 1000px;
        padding-bottom: 50px;
        max-width: 500px;
        margin: 0 auto;
      }

      .hero-image-container {
        position: relative;
        display: inline-block;
        transform-style: preserve-3d;
        animation: floatRotate 8s ease-in-out infinite;
        transition: transform 0.5s ease;
      }

      @keyframes floatRotate {
        0%,
        100% {
          transform: rotateY(-10deg) translateY(0) rotateX(0deg);
        }
        50% {
          transform: rotateY(10deg) translateY(-15px) rotateX(5deg);
        }
      }

      .hero-image img {
        max-width: 80%;
        height: auto;
        border-radius: 15px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        border: 3px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(5px);
        transform: perspective(1000px) rotateY(-10deg);
        transition: all 0.5s ease;
      }

      @media (max-width: 992px) {
        .hero-image img {
          max-width: 70%;
        }
      }

      @media (max-width: 768px) {
        .hero-image img {
          max-width: 80%;
        }
      }

      @media (max-width: 576px) {
        .hero-image img {
          max-width: 90%;
        }
      }

      .hero-image::before {
        content: "";
        position: absolute;
        top: -50px;
        left: -50px;
        width: 200px;
        height: 200px;
        background: radial-gradient(
          circle,
          var(--neon-purple),
          transparent 70%
        );
        opacity: 0.3;
        filter: blur(50px);
        z-index: -1;
        animation: pulseGlow 5s infinite alternate;
      }

      .hero-image::after {
        content: "";
        position: absolute;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, var(--neon-green), transparent 70%);
        opacity: 0.3;
        filter: blur(50px);
        z-index: -1;
        animation: pulseGlow 5s infinite alternate-reverse;
      }

      .social-icons {
        display: flex;
        margin-top: 40px;
        gap: 15px;
      }

      .social-icons a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 1.3rem;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }


      .social-icons a:hover {
        transform: translateY(-5px) scale(1.1);
        box-shadow: 0 10px 25px rgba(108, 99, 255, 0.5);
      }

      .social-icons a:hover::before {
        opacity: 1;
      }

      .social-icons a:nth-child(1):hover {
        color: #0077b5;
      }
      .social-icons a:nth-child(2):hover {
        color: #333;
      }
      .social-icons a:nth-child(3):hover {
        color: #ea4335;
      }
      .social-icons a:nth-child(4):hover {
        color: #34a853;
      }

      /* 3D Floating Elements */
      .floating-elements {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
      }

      .floating-element {
        position: absolute;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        transform-style: preserve-3d;
        animation: floatElement 15s infinite ease-in-out;
        transition: all 0.5s ease;
      }

      /* New 3D Shapes */
      .floating-shape {
        position: absolute;
        pointer-events: none;
        z-index: -1;
        opacity: 0.7;
        filter: blur(1px);
        animation: floatShape 20s infinite ease-in-out;
      }

      .shape-1 {
        width: 100px;
        height: 100px;
        top: 20%;
        left: 15%;
        background: conic-gradient(
          from 45deg,
          var(--neon-pink),
          var(--neon-blue),
          var(--neon-purple)
        );
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        animation-delay: 0s;
      }

      .shape-2 {
        width: 150px;
        height: 150px;
        bottom: 25%;
        right: 10%;
        background: radial-gradient(
          circle,
          var(--neon-green),
          var(--neon-blue)
        );
        border-radius: 50%;
        animation-delay: 3s;
      }

      .shape-3 {
        width: 80px;
        height: 80px;
        top: 70%;
        left: 10%;
        background: linear-gradient(
          45deg,
          var(--neon-purple),
          var(--neon-pink)
        );
        clip-path: polygon(
          30% 0%,
          70% 0%,
          100% 30%,
          100% 70%,
          70% 100%,
          30% 100%,
          0% 70%,
          0% 30%
        );
        animation-delay: 6s;
      }

      .shape-4 {
        width: 120px;
        height: 120px;
        top: 10%;
        right: 20%;
        background: linear-gradient(
          135deg,
          var(--neon-yellow),
          var(--neon-orange)
        );
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        animation-delay: 9s;
      }

      @keyframes floatShape {
        0%,
        100% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(-50px) rotate(20deg);
        }
      }

      @keyframes floatElement {
        0%,
        100% {
          transform: translateY(0) rotateX(0) rotateY(0);
        }
        50% {
          transform: translateY(-40px) rotateX(10deg) rotateY(10deg);
        }
      }

      .element-1 {
        width: 80px;
        height: 80px;
        top: 20%;
        left: 10%;
        animation-delay: 0s;
        background: linear-gradient(
          45deg,
          rgba(108, 99, 255, 0.2),
          rgba(255, 101, 132, 0.2)
        );
      }

      .element-2 {
        width: 120px;
        height: 120px;
        top: 60%;
        left: 70%;
        animation-delay: 2s;
        background: linear-gradient(
          45deg,
          rgba(32, 201, 151, 0.2),
          rgba(108, 99, 255, 0.2)
        );
      }

      .element-3 {
        width: 60px;
        height: 60px;
        top: 30%;
        left: 80%;
        animation-delay: 4s;
        background: linear-gradient(
          45deg,
          rgba(255, 101, 132, 0.2),
          rgba(32, 201, 151, 0.2)
        );
      }

      /* Responsive Design */
      @media (max-width: 992px) {
        .hero-content {
          flex-direction: column;
          text-align: center;
        }

        .hero-text {
          padding-right: 0;
          margin-bottom: 40px;
        }

        .hero-text p::before {
          left: 50%;
          transform: translateX(-50%);
        }

        .hero-buttons {
          justify-content: center;
        }

        .social-icons {
          justify-content: center;
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hamburger.active div:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active div:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active div:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -8px);
        }
      }

      @media (max-width: 768px) {
        .hero-text h1 {
          font-size: 2.8rem;
        }

        .hero-text h2 {
          font-size: 1.6rem;
        }

        .hero-text p {
          font-size: 1.1rem;
        }

        .btn {
          padding: 12px 30px;
          font-size: 0.8rem;
        }
      }

      @media (max-width: 576px) {
        .hero-text h1 {
          font-size: 2.3rem;
        }

        .hero-text h2 {
          font-size: 1.4rem;
        }

        .hero-buttons {
          flex-direction: column;
          align-items: center;
        }

        .btn-outline {
          margin-left: 0;
          margin-top: 15px;
        }

        .social-icons a {
          width: 45px;
          height: 45px;
          font-size: 1.1rem;
        }
      }

      .journey-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        padding: 20px 50px;
        font-size: 1.3rem;
        font-weight: 700;
        text-decoration: none;
        letter-spacing: 1px;
        color: #edeaea;
        border-radius: 0;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        box-shadow: 0 0 15px rgba(24, 91, 113, 0.88),
          0 0 25px rgba(35, 129, 35, 0.722), 0 0 35px rgba(255, 255, 153, 0.3);
        border: 2px var(--neon-purple);
        background: rgba(255, 255, 255, 0.15);
      }

      .journey-btn-text {
        position: relative;
        z-index: 3;
        display: flex;
        align-items: center;
        gap: 15px;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      }

      .journey-icon {
        font-size: 1.4rem;
        transition: all 0.3s ease;
      }

      .journey-icon:nth-child(1) {
        color: #7ec8e3;
        animation: float 3s ease-in-out infinite;
      }

      .journey-icon:nth-child(2) {
        color: #ffd166;
        animation: float 3s ease-in-out infinite 0.5s;
      }

      @keyframes float {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-8px);
        }
      }

      .journey-btn-gradient {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          45deg,
          #112455,
          #1094b6,
          #ba6af0,
          #24134d,
          #96325a
        );
        background-size: 300% 300%;
        z-index: 1;
        opacity: 0.7;
        animation: gradientShift 8s ease infinite;
        mix-blend-mode: soft-light;
      }

      .journey-btn-shine {
        position: absolute;
        top: 0;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(233, 140, 235, 0.928),
          transparent
        );
        z-index: 2;
        transition: all 0.8s ease;
      }

      .journey-btn-bubbles {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
      }

      .bubble {
        position: absolute;
        border-radius: 50%;
        opacity: 0.7;
        pointer-events: none;
        animation: bubble-float 5s infinite ease-in-out;
        filter: blur(1px);
      }

      @keyframes bubble-float {
        0% {
          transform: translateY(0) scale(0.6);
          opacity: 0;
        }
        50% {
          opacity: 0.8;
        }
        100% {
          transform: translateY(-120px) scale(1);
          opacity: 0;
        }
      }

      .journey-btn:hover {
        transform: translateY(-5px);
        box-shadow: 0 0 20px rgba(150, 222, 246, 0.8),
          0 0 30px rgba(142, 254, 142, 0.6), 0 0 40px rgba(255, 255, 153, 0.5);
      }

      .journey-btn:hover .journey-btn-shine {
        left: 100%;
      }

      .journey-btn:hover .journey-icon:nth-child(1) {
        transform: translateY(-5px) rotate(-5deg);
        color: #5db8e3;
      }

      .journey-btn:hover .journey-icon:nth-child(2) {
        transform: translateY(-5px) rotate(5deg);
        color: #d1f266;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        .journey-btn {
          padding: 16px 40px;
          font-size: 1.1rem;
        }

        .journey-icon {
          font-size: 1.2rem;
        }

        .journey-btn-text {
          gap: 10px;
        }
      }
    </style>