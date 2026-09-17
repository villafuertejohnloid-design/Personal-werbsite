// Mobile navigation menu
const menuButton = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector("#site-navigation");

if (menuButton && siteNavigation) {
  const menuText = menuButton.querySelector(".menu-text");

  function setMenuState(isOpen) {
    siteNavigation.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    if (menuText) {
      menuText.textContent = isOpen ? "Close navigation" : "Open navigation";
    }
  }

  menuButton.addEventListener("click", () => {
    const isOpen = !siteNavigation.classList.contains("open");
    setMenuState(isOpen);
  });

  siteNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  document.addEventListener("click", (event) => {
    const clickedOutsideMenu =
      !siteNavigation.contains(event.target) &&
      !menuButton.contains(event.target);

    if (
      window.innerWidth <= 720 &&
      siteNavigation.classList.contains("open") &&
      clickedOutsideMenu
    ) {
      setMenuState(false);
    }
  });
}

// Upload and display two student pictures
const photoInputs = document.querySelectorAll(".photo-input");
const maximumFileSize = 5 * 1024 * 1024; // 5 MB

photoInputs.forEach((input) => {
  input.addEventListener("change", () => {
    const file = input.files[0];
    const preview = document.getElementById(input.dataset.preview);
    const status = document.getElementById(input.dataset.status);
    const studentName = input.dataset.student;

    if (!file || !preview || !status) return;

    if (!file.type.startsWith("image/")) {
      status.textContent = "Please choose a valid image file.";
      status.classList.add("error");
      input.value = "";
      return;
    }

    if (file.size > maximumFileSize) {
      status.textContent = "Image is too large. Please choose a file below 5 MB.";
      status.classList.add("error");
      input.value = "";
      return;
    }

    // Remove previous temporary image URL if one exists
    if (preview.dataset.objectUrl) {
      URL.revokeObjectURL(preview.dataset.objectUrl);
    }

    const imageUrl = URL.createObjectURL(file);

    preview.src = imageUrl;
    preview.alt = `${studentName}'s uploaded profile photo`;
    preview.dataset.objectUrl = imageUrl;

    status.textContent = `${file.name} is now displayed.`;
    status.classList.remove("error");
  });
});

// Demo contact form message
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const visitorName = contactForm.elements["name"].value.trim();

    formMessage.textContent = visitorName
      ? `Thanks, ${visitorName}! This demo form is ready to be connected to a real email service.`
      : "Thanks! This demo form is ready to be connected to a real email service.";

    contactForm.reset();
  });
}

// Automatically show the current year in the footer
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}
