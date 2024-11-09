const SlideShowTracker = new Map();
let intervalId;
const heroContent = [
    {
        heading: "Empowering Healthcare, Simplifying Management",
        tagline: "Your all-in-one solution for seamless hospital operations and exceptional patient care."
    },
    {
        heading: "Transforming Hospital Management for Better Care",
        tagline: "Focused on efficiency, dedicated to patient well-being."
    },
    {
        heading: "Where Care Meets Efficiency",
        tagline: "Streamlined hospital management for improved patient experiences."
    },
    {
        heading: "Connecting Care, Elevating Operations",
        tagline: "Optimizing workflows to let healthcare professionals focus on what matters most."
    },
    {
        heading: "Smart Solutions for a Healthier Tomorrow",
        tagline: "Innovative hospital management tools to support care and enhance productivity."
    },
    {
        heading: "Seamless Hospital Management, Better Patient Outcomes",
        tagline: "Ensuring efficient healthcare delivery at every step."
    },
    {
        heading: "Simplify Operations, Enhance Care",
        tagline: "Bringing precision, control, and compassion to hospital management."
    },
    {
        heading: "Efficient Management for Exceptional Care",
        tagline: "Designed to empower healthcare teams, one patient at a time."
    },
    {
        heading: "Streamlined Operations, Compassionate Care",
        tagline: "Making hospital management easy so you can focus on what matters—patients."
    },
    {
        heading: "Hospital Management Made Simple",
        tagline: "Integrated solutions for smoother workflows and quality care delivery."
    }
];

function fetchTotalSlideHSowing(containerId) {

    switch (containerId) {
        case 'gallery-container-2':
        case 'gallery-container-4':
        case 'gallery-container-5':
        case 'gallery-container-6':
            if (window.innerWidth <= 768) {
                return { totalSideShowing: 1 }; // Show 1 slide on mobile screens
            } else {
                return { totalSideShowing: 3 };
            }
        case 'gallery-container-100':
            if (window.innerWidth <= 768) {
                return { totalSideShowing: 2 }; // Show 1 slide on mobile screens
            } else {
                return { totalSideShowing: 4 };
            }
        case 'gallery-container-3':
            if (window.innerWidth <= 768) {
                return { totalSideShowing: 1 }; // Show 1 slide on mobile screens
            } else {
                return { totalSideShowing: 2 };
            }
        default:
            break;
    }
}

function showNavigationDot(containerId) {
    switch (containerId) {
        default:
            return false;
    }
}

function heroContentAnimation(slideShowContent, index) {
    // first removing the text and animation
    slideShowContent[0].children[0].classList.remove('active-hero-content-p');
    slideShowContent[0].children[1].classList.remove('active-hero-content-h1');
    slideShowContent[0].children[2].classList.remove('active-hero-content-p');
    slideShowContent[0].children[3].classList.remove('active-hero-content-btn');
    // adding the new text and animation together after 1 second (removing animation time is also 1 second)
    setTimeout(() => {
        slideShowContent[0].children[1].innerText = heroContent[index]["heading"].toUpperCase();
        slideShowContent[0].children[2].innerText = heroContent[index]["tagline"].toUpperCase();
        slideShowContent[0].children[0].classList.add('active-hero-content-p');
        slideShowContent[0].children[1].classList.add('active-hero-content-h1');
        slideShowContent[0].children[2].classList.add('active-hero-content-p');
        slideShowContent[0].children[3].classList.add('active-hero-content-btn');
    }, 1000);

}

function restartSlideShow(containerId) {
    if (intervalId) {
        clearTimeout(intervalId);
    } // Clear the current timeout to prevent conflict with automatic slideshow
    intervalId = setTimeout(() => showSlides(containerId), 6000); // Restart the slideshow after manual control
}

function dotNavigation(containerClass, maxSlides, currentSlide) {
    const dots = containerClass.querySelectorAll('.dot');
    for (let i = 0; i < maxSlides; i++) {
        dots[i].classList.remove('active');
    }
    dots[currentSlide - 1].classList.add('active');
}

async function slideShowFunctionality(containerClass, translate = null) {
    if(!containerClass){
        return;
    }
    
    const slides = containerClass.querySelectorAll('.slide');
    const slideShowContent = containerClass.querySelectorAll('.hero-content');
    const maxSlides = translate ? (slides.length - translate.totalSideShowing + 1) : (slides.length);
    let currentSlide = SlideShowTracker.has(containerClass.id) ? SlideShowTracker.get(containerClass.id) : 1;

    for (let i = 0; i < maxSlides; i++) {
        slides[i].classList.remove('active');
    }

    currentSlide += 1;
    currentSlide %= (maxSlides + 1);
    currentSlide = currentSlide === 0 ? 1 : currentSlide;
    SlideShowTracker.set(containerClass.id, currentSlide);
    if (slideShowContent.length) {
        heroContentAnimation(slideShowContent, currentSlide - 1);
    }

    if (translate) {
        const slideshowContainer = containerClass.querySelector(`.slideshow`);
        slideshowContainer.style.transform = `translate3d(-${(currentSlide - 1) * (100 / translate.totalSideShowing)}%,0px,0px )`;
    } else {
        slides[currentSlide - 1].classList.add('active');
    }
    if (showNavigationDot(containerClass.id)) {
        dotNavigation(containerClass, maxSlides, currentSlide);
    }

    intervalId = setTimeout(() => showSlides(containerClass.id), 6000); //automatic slideshow
}

export async function showSlides(containerId) {
    //for all gallery containers insitially show slides
    let translate;
    if (!containerId) {
        const containers = document.querySelectorAll(`.gallery-container`);
        if (containers) {
            containers.forEach(async (containerClass) => {
                const slides = containerClass.querySelectorAll('.slide');
                translate = fetchTotalSlideHSowing(containerClass.id);
                const maxSlides = translate ? (slides.length - translate.totalSideShowing + 1) : (slides.length);
                const dotsNeeded = showNavigationDot(containerClass.id)
                if (dotsNeeded) generateNavigationDots(maxSlides, containerClass);
                slideShowFunctionality(containerClass, translate);// Change slide every 5 seconds
            });
        }
    } else {
        //for particular gallery containers insitially show slides
        translate = fetchTotalSlideHSowing(containerId);
        const container = document.getElementById(containerId);
        slideShowFunctionality(container, translate)// Change slide every 5 seconds
    }
}
function generateNavigationDots(howMany, container) {
    const dotsContainer = container.querySelector('.gallery-navigation');
    for (let i = 0; i < howMany; i++) {
        const dot = document.createElement('span');
        dot.setAttribute('data-index', i + 1);
        dot.setAttribute('class', "dot");
        dot.setAttribute('onclick', `triggerParticularSlide(${i + 1}, '${container.id}')`);
        dotsContainer.appendChild(dot);
    }
}

export function changeSlide(direction, containerId) {
    const container = document.getElementById(containerId);
    const slides = container.querySelectorAll('.slide');
    const translate = fetchTotalSlideHSowing(containerId);
    const slideShowContent = container.querySelectorAll('.hero-content');
    const maxSlides = translate ? (slides.length - translate.totalSideShowing + 1) : (slides.length);
    let currentSlide = SlideShowTracker.has(containerId) ? SlideShowTracker.get(containerId) + direction : 1;
    if (currentSlide < 1) {
        currentSlide = maxSlides;
    }
    currentSlide %= (maxSlides + 1);
    currentSlide = currentSlide == 0 ? 1 : currentSlide;

    SlideShowTracker.set(containerId, currentSlide);

    for (let i = 0; i < maxSlides; i++) {
        slides[i].classList.remove('active');
    }

    if (slideShowContent.length) {
        heroContentAnimation(slideShowContent, currentSlide - 1);
    }

    // Apply the wiper effect by shifting the container
    if (translate) {
        const slideshowContainer = container.querySelector(`.slideshow`);
        slideshowContainer.style.transform = `translate3d(-${(currentSlide - 1) * (100 / translate.totalSideShowing)}%,0px,0px )`;
    } else {
        slides[currentSlide - 1].classList.add('active');
    }

    if (showNavigationDot(containerId)) {
        dotNavigation(container, maxSlides, currentSlide);
    }

    restartSlideShow(containerId);
}

export function triggerParticularSlide(newSlide, containerId) {
    let translate;
    translate = fetchTotalSlideHSowing(containerId);
    const container = document.getElementById(containerId);
    const slides = container.querySelectorAll('.slide');
    const dots = container.querySelectorAll('.dot');
    const slideShowContent = container.querySelectorAll('.hero-content');
    const maxSlides = translate ? (slides.length - translate.totalSideShowing + 1) : (slides.length);
    for (let i = 0; i < maxSlides; i++) {
        slides[i].classList.remove('active');
        dots[i].classList.remove('active');
    }
    SlideShowTracker[containerId] = newSlide;
    // Apply the wiper effect by shifting the container
    if (slideShowContent.length) {
        heroContentAnimation(slideShowContent, newSlide - 1);
    }
    if (translate) {
        const slideshowContainer = container.querySelector(`.slideshow`);
        slideshowContainer.style.transform = `translate3d(-${(newSlide - 1) * (100 / translate.totalSideShowing)}%,0px,0px )`;
    } else {
        slides[newSlide - 1].classList.add('active');
    }
    dots[newSlide - 1].classList.add('active');

    restartSlideShow(containerId);
}


