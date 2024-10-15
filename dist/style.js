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
