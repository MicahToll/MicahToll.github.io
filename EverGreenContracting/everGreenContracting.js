  const subjects = ["Chemistry", "Algebra", "Biology", "Calculus", "Physics", "Pre-Calc", "Biochemistry", "Geometry", "Genetics"];
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

    fetch("https://script.google.com/macros/s/AKfycbz7tocHeQqiqyvHNKaJ0h9kZcjAec1Lq1uVtF3xzOLBV0X5vgT2qxkIzzOlkIwm0pY_/exec", {
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



