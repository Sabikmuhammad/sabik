// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Function to set the theme
function setTheme(theme) {
  if (theme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    body.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  localStorage.setItem('theme', theme);
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Load saved theme on page load
const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme || 'light');
// Debugging: Check if the script is loaded
console.log("Script is running!");

// Get all "View Project" buttons
const viewProjectButtons = document.querySelectorAll('.project-link.demo');
const modal = document.getElementById('maintenance-modal');
const closeBtn = document.querySelector('.close');

// Show the modal when any "View Project" button is clicked
viewProjectButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    modal.style.display = 'flex'; // Show the modal
  });
});

// Close the modal when the close button is clicked
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none'; // Hide the modal
});

// Close the modal when clicking outside the modal
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none'; // Hide the modal
  }
}); 
// JavaScript
document.addEventListener('DOMContentLoaded', () => {
  const scroller = document.getElementById('projectsScroller');
  const cards = document.querySelectorAll('.project-card');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const dotsContainer = document.querySelector('.scroll-dots');
  
  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
      scrollToCard(i);
    });
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.dot');
  dots[0].classList.add('active');
  
  // Scroll to card
  function scrollToCard(index) {
    const card = cards[index];
    const scrollerRect = scroller.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    
    scroller.scrollTo({
      left: card.offsetLeft - (scroller.offsetWidth / 2 - card.offsetWidth / 2),
      behavior: 'smooth'
    });
    
    updateDots(index);
  }
  
  // Update dots
  function updateDots(activeIndex) {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });
  }
  
  // Navigation buttons
  prevBtn.addEventListener('click', () => {
    const currentScroll = scroller.scrollLeft;
    const cardWidth = cards[0].offsetWidth + 24; // Include gap
    
    let targetIndex = 0;
    cards.forEach((card, i) => {
      if (card.offsetLeft < currentScroll - 50) {
        targetIndex = i;
      }
    });
    
    scrollToCard(targetIndex);
  });
  
  nextBtn.addEventListener('click', () => {
    const currentScroll = scroller.scrollLeft;
    const scrollerWidth = scroller.offsetWidth;
    
    let targetIndex = cards.length - 1;
    cards.forEach((card, i) => {
      if (card.offsetLeft > currentScroll + scrollerWidth - card.offsetWidth - 50) {
        targetIndex = Math.min(i, targetIndex);
      }
    });
    
    scrollToCard(targetIndex);
  });
  
  // Auto-update dots on scroll
  scroller.addEventListener('scroll', () => {
    const scrollPosition = scroller.scrollLeft + (scroller.offsetWidth / 2);
    
    cards.forEach((card, i) => {
      if (card.offsetLeft <= scrollPosition && 
          card.offsetLeft + card.offsetWidth > scrollPosition) {
        updateDots(i);
      }
    });
  });
  
  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  scroller.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});
  
  scroller.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});
  
  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
      nextBtn.click(); // Swipe left
    } else if (touchEndX > touchStartX + threshold) {
      prevBtn.click(); // Swipe right
    }
  }
  
  // Initialize first card position
  scrollToCard(0);
});



document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  const themeToggle = document.querySelector('.theme-toggle');
  
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    nav.classList.toggle('active');
    
    // Prevent scrolling when menu is open
    if (nav.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && 
        !mobileMenuBtn.contains(e.target) && 
        nav.classList.contains('active')) {
      mobileMenuBtn.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// Carousel Functionality
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.banner-slide');
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'block' : 'none';
    });
}

function nextSlide() {
    const slides = document.querySelectorAll('.banner-slide');
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    const slides = document.querySelectorAll('.banner-slide');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Initial display
showSlide(currentSlide);

// Set automatic slide change
setInterval(nextSlide, 3000);
