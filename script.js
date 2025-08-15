// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Get the target section
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calculate offset for fixed header
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Active navigation highlighting
  function updateActiveNav() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    let current = "";
    const headerHeight = document.querySelector("header").offsetHeight;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 50;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  // Update active nav on scroll
  window.addEventListener("scroll", updateActiveNav);

  // Contact form handling
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const subject = formData.get("subject");
      const message = formData.get("message");

      // Simple validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields before submitting.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Show success message
      showSuccessMessage(name);

      // Reset form
      this.reset();
    });
  }

  // Function to show success message
  function showSuccessMessage(name) {
    // Create success message element
    const successMessage = document.createElement("div");
    successMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #27ae60;
                color: white;
                padding: 20px 30px;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                z-index: 10000;
                text-align: center;
                max-width: 90%;
                animation: slideIn 0.3s ease-out;
            ">
                <h3 style="margin: 0 0 10px 0;">Thank You, ${name}!</h3>
                <p style="margin: 0;">Your message has been sent successfully. I'll get back to you soon!</p>
            </div>
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
                z-index: 9999;
            "></div>
        `;

    // Add CSS animation
    const style = document.createElement("style");
    style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        `;
    document.head.appendChild(style);

    // Add to page
    document.body.appendChild(successMessage);

    // Remove after 3 seconds
    setTimeout(() => {
      successMessage.remove();
      style.remove();
    }, 3000);

    // Allow clicking overlay to close
    successMessage.addEventListener("click", function (e) {
      if (e.target === successMessage.children[1]) {
        successMessage.remove();
        style.remove();
      }
    });
  }

  // Add typing effect to hero section
  const heroText = document.querySelector(".hero p");
  if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = "";
    heroText.style.borderRight = "2px solid white";

    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        // Remove cursor after typing is complete
        setTimeout(() => {
          heroText.style.borderRight = "none";
        }, 1000);
      }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
  }

  // Add scroll-to-top button
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.innerHTML = "↑";
  scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #3498db;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    `;

  document.body.appendChild(scrollTopBtn);

  // Show/hide scroll-to-top button
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollTopBtn.style.opacity = "1";
    } else {
      scrollTopBtn.style.opacity = "0";
    }
  });

  // Scroll to top when clicked
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Add hover effect to project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Mobile menu toggle (if needed for smaller screens)
  function createMobileMenu() {
    const nav = document.querySelector("nav");
    const navUl = document.querySelector("nav ul");

    // Create hamburger button
    const hamburger = document.createElement("button");
    hamburger.innerHTML = "☰";
    hamburger.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        `;

    nav.insertBefore(hamburger, navUl);

    // Toggle menu on mobile
    hamburger.addEventListener("click", function () {
      navUl.style.display = navUl.style.display === "none" ? "flex" : "none";
    });

    // Show hamburger on mobile
    function checkScreenSize() {
      if (window.innerWidth <= 768) {
        hamburger.style.display = "block";
        navUl.style.display = "none";
        navUl.style.flexDirection = "column";
        navUl.style.position = "absolute";
        navUl.style.top = "100%";
        navUl.style.left = "0";
        navUl.style.width = "100%";
        navUl.style.backgroundColor = "#2c3e50";
        navUl.style.padding = "1rem";
      } else {
        hamburger.style.display = "none";
        navUl.style.display = "flex";
        navUl.style.flexDirection = "row";
        navUl.style.position = "static";
        navUl.style.backgroundColor = "transparent";
      }
    }

    window.addEventListener("resize", checkScreenSize);
    checkScreenSize();
  }

  createMobileMenu();
});

// Console message for developers
console.log("Portfolio website loaded successfully! 🚀");
console.log("Made with ❤️ by Waqar Ahmad");
