gsap.registerPlugin(ScrollTrigger);

function toggleMenu() {
  const navMenu = document.getElementById("web-menu");
  navMenu.classList.toggle("active");
}

function socialAcc() {
  window.location.href =
    "https://www.linkedin.com/in/aditya-suryawanshi-20b60930a/";
}
function socialAcc2() {
  window.location.href = "https://github.com/Aditya00038";
}

const tl = gsap.timeline({ delay: 1 });

tl.from("header", {
  x: -200,
  opacity: 0,
  duration: 0.1,
});

const elements = [
  ".sec1 .left-h1",
  ".sec1 .left-h1-2",
  ".sec1 .auto-type",
  ".sec1 p",
  ".sec1 .cv-btn",
  ".sec1 .social-links",
];

elements.forEach((selector) => {
  tl.from(selector, {
    x: -200,
    opacity: 0,
    duration: 0.1,
  });
});

tl.from(".design", {
  opacity: 0,
  y: 50,
  duration: 0.8,
  ease: "power2.out"
});

tl.from(".right img", {
  clipPath: "inset(0% 0% 100% 0%)", 
  scale: 1.1, 
  duration: 1.2,
  ease: "power3.out"
}, "-=0.6");

const phrases = ["Web Developer", "Designer", "Frontend Developer"];
const typedText = document.getElementById("typed-text");
const cursor = document.getElementById("cursor");

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[currentPhraseIndex];

  if (isDeleting) {
    currentCharIndex--;
  } else {
    currentCharIndex++;
  }

  typedText.textContent = currentPhrase.substring(0, currentCharIndex);

  if (!isDeleting && currentCharIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1000); 
    return;
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
  }

  const delay = isDeleting ? 50 : 100;
  setTimeout(typeEffect, delay);
}

typeEffect();


// 
// 

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Create a timeline for the project section animation
const projectTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".sec3", // The main section is the trigger
    start: "top 90%", // Animation starts when the top of the section is 80% from the top of the viewport
    toggleActions: "play none none none"
  }
});

// Animate the black `project-overlap` to slide up and reveal the content
projectTimeline.from(".project-overlap", {
  y: "100%", // Starts completely below its final position
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
});

// Animate the left-side content (text)
projectTimeline.from(".project-content", {
  x: -100, // Starts 100px to the left
  opacity: 0,
  duration: 1,
  ease: "power2.out"
}, "<0.5"); // Starts 0.5 seconds into the previous animation

// Animate the right-side image
projectTimeline.from(".project-img", {
  x: 100, // Starts 100px to the right
  opacity: 0,
  duration: 1,
  ease: "power2.out"
}, "<"); // Starts at the same time as the project-content animation






// 

document.addEventListener('DOMContentLoaded', () => {
    // --- Video Hover Functionality (remains the same) ---
    const mediaContainers = document.querySelectorAll('.project-media-v2');

    mediaContainers.forEach(container => {
        const image = container.querySelector('img');
        const video = container.querySelector('video');
        const videoSrc = container.getAttribute('data-video-src');

        if (videoSrc) {
            video.src = videoSrc;
        }

        container.addEventListener('mouseenter', () => {
            if (videoSrc) {
                image.style.opacity = '0';
                video.style.display = 'block';
                video.play();
            }
        });

        container.addEventListener('mouseleave', () => {
            if (videoSrc) {
                video.pause();
                video.currentTime = 0;
                video.style.display = 'none';
                image.style.opacity = '1';
            }
        });
    });

    // --- New Load More/Less Functionality ---
    const viewMoreBtn = document.getElementById('view-more-btn');
    const viewLessBtn = document.getElementById('view-less-btn');
    const moreProjectsContainer = document.getElementById('more-projects');

    if (viewMoreBtn && viewLessBtn && moreProjectsContainer) {
        viewMoreBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevents the link from jumping to the top of the page

            // Show the hidden projects
            moreProjectsContainer.style.display = 'grid';

            // Hide the "View More" button
            viewMoreBtn.style.display = 'none';
            
            // Show the "View Less" button
            viewLessBtn.style.display = 'inline-block';
        });

        viewLessBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevents the link from jumping to the top of the page

            // Hide the additional projects
            moreProjectsContainer.style.display = 'none';

            // Show the "View More" button
            viewMoreBtn.style.display = 'inline-block';

            // Hide the "View Less" button
            viewLessBtn.style.display = 'none';
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // --- Certifications Slider Functionality ---
    const slider = document.querySelector('.certifications-slider');
    const leftArrow = document.querySelector('.slider-btn.left-arrow');
    const rightArrow = document.querySelector('.slider-btn.right-arrow');

    if (slider && leftArrow && rightArrow) {
        let slideTimer;
        // Get the card width including the gap (20px) for accurate scrolling
        const cardWidth = slider.querySelector('.certification-card').offsetWidth + 20;

        // Function to scroll the slider automatically
        const autoScroll = () => {
            // Check if we have reached the end of the scroll
            if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
                // If so, instantly jump back to the beginning to create a seamless loop
                slider.scrollLeft = 0;
            } else {
                // Otherwise, scroll to the next card
                slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        };

        // Start automatic scrolling
        const startAutoScroll = () => {
            slideTimer = setInterval(autoScroll, 1000); // Scrolls every 4 seconds
        };

        // Stop automatic scrolling
        const stopAutoScroll = () => {
            clearInterval(slideTimer);
        };

        // Event listeners for manual scrolling
        leftArrow.addEventListener('click', () => {
            stopAutoScroll();
            slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            startAutoScroll();
        });

        rightArrow.addEventListener('click', () => {
            stopAutoScroll();
            slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
            startAutoScroll();
        });

        // Pause auto-scroll on hover for a better user experience
        slider.addEventListener('mouseenter', stopAutoScroll);
        slider.addEventListener('mouseleave', startAutoScroll);

        // Start the automatic scrolling when the page loads
        startAutoScroll();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const toastNotification = document.getElementById('toastNotification');
    const toastCloseBtn = document.querySelector('.toast-close');

    if (contactForm && toastNotification) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Simulate form submission
            setTimeout(() => {
                toastNotification.classList.add('show');
                
                // Hide the toast after 5 seconds
                setTimeout(() => {
                    toastNotification.classList.remove('show');
                }, 5000); 

                // Reset the form
                contactForm.reset();
            }, 1000); // Simulates a 1-second submission delay
        });

        // Event listener to close the toast manually
        toastCloseBtn.addEventListener('click', () => {
            toastNotification.classList.remove('show');
        });
    }
});