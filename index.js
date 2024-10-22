/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

 const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }
}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

// Function to clear the contact form
const clearForm = () => {
  const form = document.getElementById("contactForm");
  if (form) {
      form.reset();
  }
};

// Adding event listener to form submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevent default form submission behavior
      
      const formData = new FormData(contactForm);

      // Submit the form data using Fetch API
      try {
          const response = await fetch("https://formspree.io/f/mrgnwjoo", {
              method: "POST",
              body: formData,
              headers: {
                  Accept: "application/json"
              }
          });

          if (response.ok) {
              // Clear the form fields
              clearForm();
              // Optionally display a success message
              alert("Message sent successfully!");
          } else {
              // Handle errors
              alert("There was a problem sending your message.");
          }
      } catch (error) {
          console.error("Error:", error);
          alert("There was a problem sending your message.");
      }
  });
}

