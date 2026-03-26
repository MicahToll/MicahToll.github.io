  /*const subjects = ["Chemistry", "Algebra", "Biology", "Calculus", "Physics", "Pre-Calc", "Biochemistry", "Geometry", "Genetics"];
  const subjectText = document.getElementById("subject-text");
  let subjectIndex = 0;
  let charIndex = 0;
  let typing = true;

  function typeEffect() {
    const currentSubject = subjects[subjectIndex];

    if (typing) {
      if (charIndex <= currentSubject.length) {
        subjectText.textContent = currentSubject.substring(0, charIndex);
        charIndex++;
      } else {
        typing = false;
        setTimeout(typeEffect, 1000); // Pause before deleting
        return;
      }
    } else {
      if (charIndex > 0) {
        subjectText.textContent = currentSubject.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typing = true;
        subjectIndex = (subjectIndex + 1) % subjects.length;
      }
    }

    setTimeout(typeEffect, typing ? 100 : 50); // Speed: type fast, delete faster
  }

  typeEffect();
*/

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
        console.log("1")
        e.preventDefault();
        const formData = new FormData(form);
console.log("2")
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
        console.log("3")
    });

    // slider js code start

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
}