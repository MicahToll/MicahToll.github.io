function onload() {
    document.getElementById('referral').addEventListener('change', function () {
        const otherContainer = document.getElementById('other-container');
        if (this.value === 'other') {
            otherContainer.style.display = 'block';
            document.getElementById('other-text').required = true;
        } else {
            otherContainer.style.display = 'none';
            document.getElementById('other-text').required = false;
        }
    });

    document.getElementById("form-overlay").addEventListener("click", () => {
        document.getElementById("form-overlay").style.display = "none";
    });

    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (e) {

        e.preventDefault();
        const formData = new FormData(form);

        fetch("https://script.google.com/macros/s/AKfycbybwJsbd76QjBticnI89BOi0-zTQXfEdVETWK4wNmLz192WDD9e7My7Z7RDkscT3Icp2g/exec", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.ok) {
                document.getElementById("form-overlay").style.display = "flex";
                form.reset();
                document.getElementById("other-container").style.display = "none";
            } else {
                alert("Submission failed. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error!", error.message);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".custom-image-slider");
    const afterImage = document.querySelector(".slider-after");
    const handle = document.querySelector(".slider-handle");

    // Set initial handle position and clipPath
    const initialPercentage = 50;
    handle.style.left = `${initialPercentage}%`;
    afterImage.style.clipPath = `inset(0 ${100 - initialPercentage}% 0 0)`;

    let dragging = false;
    let lastX = 0;

    //me messing around
    container.addEventListener("mousedown", (e) => {
        console.log("1")
        if (dragging) return;

        const rect = container.getBoundingClientRect();
        console.log(rect);
        console.log(e);
        const x = e.clientX - rect.left;
        let widthPercentage = (x / rect.width) * 100;

        // Add constraint to keep the handle within 1% of either edge
        widthPercentage = Math.max(0, Math.min(widthPercentage, 100));

        // Update handle position using requestAnimationFrame
        window.requestAnimationFrame(() => {
            handle.style.left = `${widthPercentage}%`;
            afterImage.style.clipPath = `inset(0 ${100 - widthPercentage}% 0 0)`;
        });

        lastX = x;
    });

    container.addEventListener("touchstart", (e) => {
        console.log("1")
        if (dragging) return;

        const rect = container.getBoundingClientRect();
        console.log(rect);
        console.log(e);
        const x = e.clientX - rect.left;
        let widthPercentage = (x / rect.width) * 100;

        // Add constraint to keep the handle within 1% of either edge
        widthPercentage = Math.max(0, Math.min(widthPercentage, 100));

        // Update handle position using requestAnimationFrame
        window.requestAnimationFrame(() => {
            handle.style.left = `${widthPercentage}%`;
            afterImage.style.clipPath = `inset(0 ${100 - widthPercentage}% 0 0)`;
        });

        lastX = x;
    });
    //me done messing around


    // Add mouse event listeners
    handle.addEventListener("mousedown", (e) => {
        dragging = true;
        lastX = e.clientX;
        e.preventDefault();
    });

    document.addEventListener("mouseup", () => {
        dragging = false;
    });

    document.addEventListener("mouseleave", () => {
        dragging = false;
    });

    document.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        let widthPercentage = (x / rect.width) * 100;

        // Add constraint to keep the handle within 1% of either edge
        widthPercentage = Math.max(0, Math.min(widthPercentage, 100));

        // Update handle position using requestAnimationFrame
        window.requestAnimationFrame(() => {
        handle.style.left = `${widthPercentage}%`;
        afterImage.style.clipPath = `inset(0 ${100 - widthPercentage}% 0 0)`;
        });

        lastX = x;
    });

    // Add touch event listeners
    handle.addEventListener("touchstart", (e) => {
        dragging = true;
        lastX = e.touches[0].clientX;
        e.preventDefault();
    });

    document.addEventListener("touchend", () => {
        dragging = false;
    });

    container.addEventListener("touchcancel", () => {
        dragging = false;
    });

    container.addEventListener("touchmove", (e) => {
        if (!dragging) return;

        const rect = container.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        let widthPercentage = (x / rect.width) * 100;

        // Add constraint to keep the handle within 1% of either edge
        widthPercentage = Math.max(0, Math.min(widthPercentage, 100));

        // Update handle position using requestAnimationFrame
        window.requestAnimationFrame(() => {
            handle.style.left = `${widthPercentage}%`;
            afterImage.style.clipPath = `inset(0 ${100 - widthPercentage}% 0 0)`;
        });

        lastX = x;
    });
});


//more code for arrows
let totalSlides = 4;
let currentIndex = 0;
let prevBtn;
let nextBtn;
let track;
let slides;

document.addEventListener('DOMContentLoaded', () => {
    track = document.querySelector('.carousel-track');
    prevBtn = document.querySelector('.carousel-prev');
    nextBtn = document.querySelector('.carousel-next');
    const slideWidth = document.querySelector('.carousel-slide').offsetWidth;

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: slideWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    });
    

  prevBtn.addEventListener('click', () => {
    const slidesPerView = getSlidesPerView();
    currentIndex = Math.max(0, currentIndex - slidesPerView);
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    const slidesPerView = getSlidesPerView();
    currentIndex += slidesPerView;
    if (currentIndex >= totalSlides) {
      currentIndex = 0;
    }
    updateCarousel();
  });


//Auto scrolls through cards
  slides = document.querySelectorAll('.carousel-slide');



  function getSlidesPerView() {
    const width = window.innerWidth;
    if (width <= 600) return 1;
    if (width <= 1024) return 2;
    return 3;
  }

  function updateCarousel() {
    const slideWidth = slides[0].offsetWidth;
    const gap = 24; // matches CSS gap
    const moveX = (slideWidth + gap) * currentIndex;
    track.style.transform = `translateX(-${moveX}px)`;
  }

  function rotateCarousel() {
    const slidesPerView = getSlidesPerView();
    currentIndex += slidesPerView;

    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }

    updateCarousel();
  }

  setInterval(rotateCarousel, 7000);

  window.addEventListener('load', updateCarousel);
  window.addEventListener('resize', () => {
    currentIndex = 0; // reset on resize to avoid weird jumps
    updateCarousel();
  });
});

