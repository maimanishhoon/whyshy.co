// document.addEventListener('DOMContentLoaded', function() {
//     const line1 = document.getElementById('line1');
//     let lastScrollTop = 0;
//     const maxTranslation = 200; // Maximum translation in pixels
//     const scrollSensitivity = 0.1; // Adjust this value to change scroll sensitivity

//     function handleScroll() {
//         const st = window.pageYOffset || document.documentElement.scrollTop;
//         const scrollDirection = st > lastScrollTop ? 1 : -1;
        
//         // Get the current transform value
//         const currentTransform = window.getComputedStyle(line1).getPropertyValue('transform');
//         const matrix = new DOMMatrix(currentTransform);
//         let currentTranslateX = matrix.m41;

//         // Calculate new translation
//         let newTranslateX = currentTranslateX + (scrollDirection * scrollSensitivity * maxTranslation);

//         // Clamp the translation between -maxTranslation and 0
//         newTranslateX = Math.max(-maxTranslation, Math.min(newTranslateX, 0));

//         // Apply the new translation
//         line1.style.transform = `translateX(${newTranslateX}px)`;

//         lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
//     }

//     // Throttle function to limit how often the scroll event fires
//     function throttle(callback, limit) {
//         let waiting = false;
//         return function() {
//             if (!waiting) {
//                 callback.apply(this, arguments);
//                 waiting = true;
//                 setTimeout(function() {
//                     waiting = false;
//                 }, limit);
//             }
//         }
//     }

//     // Add scroll event listener with throttling
//     window.addEventListener('scroll', throttle(handleScroll, 10));
// });
//
// youtube
const initialTranslateLTR = -48*4;
const initialTranslateRTL = 36*4;

function setUpintersectionObserver(element ,isLTR ,speed) {
    const intersectioncallBack = (entries) => {
        const isIntersecting = entries[0].isIntersecting;
        if(isIntersecting) {
            document.addEventListener('scroll', ScrollHandler)
        } else{
            document.removeEventListener('scroll', ScrollHandler)
        }
    }    
    const intersectionObserver = new IntersectionObserver(intersectioncallBack);
    intersectionObserver.observe(element);
    function ScrollHandler() {
        const translateX =(window.innerHeight - element.getBoundingClientRect().top) * speed;
        let totalTranslate = 0;
        if(isLTR) {
            totalTranslate = translateX + initialTranslateLTR;
        }else {
            totalTranslate = -(translateX + initialTranslateRTL);
        }
        element.style.transform = `translateX(${totalTranslate}px)`;
    }
    
}

const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');

setUpintersectionObserver(line1, true, 0.15);
setUpintersectionObserver(line2, false, 0.15);
setUpintersectionObserver(line3, true, 0.15);


document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    const navbar = document.querySelector('#nav');
    const heroSection = document.getElementById('#hero-section');
    const heroElements = document.querySelectorAll('#hero-element');

    console.log('Navbar:', navbar);
    console.log('Hero section:', heroSection);
    console.log('Hero elements:', heroElements);

    function checkHeroPosition() {
        const navbarBottom = navbar.getBoundingClientRect().bottom;
        const heroTop = heroSection.getBoundingClientRect().top;
        console.log('Navbar bottom:', navbarBottom, 'Hero top:', heroTop);

        if (heroTop <= navbarBottom) {
            console.log('Hiding hero elements');
            // ... rest of the function
        } else {
            console.log('Showing hero elements');
            // ... rest of the function
        }
    }

    // ... rest of your code
});
//line conatiner
//sticky div

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    
    const stickyElement = document.getElementById('sticky');
    const lineContainers = document.querySelectorAll('.line-container');

    console.log('Sticky element:', stickyElement);
    console.log('Line containers:', lineContainers);

    function checkLineContainerPosition() {
        const stickyBottom = stickyElement.getBoundingClientRect().bottom;
        console.log('Sticky bottom:', stickyBottom);

        lineContainers.forEach(container => {
            const containerTop = container.getBoundingClientRect().top;
            console.log('Container top:', containerTop);

            if (containerTop <= stickyBottom) {
                console.log('Hiding line container:', container);
                container.classList.add('opacity-0'); // TailwindCSS opacity-0
                container.classList.add('invisible'); // TailwindCSS invisible (to hide it fully)
            } else {
                console.log('Showing line container:', container);
                container.classList.remove('opacity-0');
                container.classList.remove('invisible');
            }
        });
    }

    // Throttle function
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Listen to scroll and resize events and throttle the function
    window.addEventListener('scroll', throttle(checkLineContainerPosition, 200));
    window.addEventListener('resize', throttle(checkLineContainerPosition, 200));

    // Call once on load to handle initial position
    checkLineContainerPosition();
});

// carousel 
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const slides = carousel.querySelectorAll('.slide');
    const indicators = carousel.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    let interval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('bg-white', i === index);
            indicator.classList.toggle('bg-opacity-50', i !== index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    function startAutoplay() {
        interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoplay() {
        clearInterval(interval);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        startAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
            stopAutoplay();
            startAutoplay();
        });
    });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Initialize
    showSlide(currentIndex);
    startAutoplay();
});

document.addEventListener('scroll', () => {
    const counter = document.getElementById('counter');
    const targetValue = 60;
    const scrollPosition = window.scrollY + window.innerHeight;
    const triggerPosition = counter.offsetTop;

    // Check if the counter is in view
    if (scrollPosition >= triggerPosition) {
        let start = 0;
        let duration = 2000; // 2 seconds for the full animation
        let startTime = null;

        const countUp = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * targetValue);
            counter.innerText = value;

            if (progress < 1) {
                requestAnimationFrame(countUp);
            }
        };

        // Trigger the animation
        requestAnimationFrame(countUp);
    }
});
