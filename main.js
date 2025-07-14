const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".about__container .section__header", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".about__container .section__description", {
  ...scrollRevealOption,
  delay: 500,
  interval: 500,
});
ScrollReveal().reveal(".about__container img", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".service__container .section__header", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".service__container .section__description", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".service__card", {
  duration: 1000,
  delay: 1000,
  interval: 500,
});

ScrollReveal().reveal(".blog__content .section__header", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".blog__content h4", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".blog__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".blog__content .blog__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

// Book Now section reveal
ScrollReveal().reveal("#book .section__header", {
  ...scrollRevealOption,
});
ScrollReveal().reveal("#book .section__description", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".booking__form", {
  ...scrollRevealOption,
  delay: 1000,
});

// Location section reveal
ScrollReveal().reveal("#location .section__header", {
  ...scrollRevealOption,
});
ScrollReveal().reveal("#location .section__description", {
  ...scrollRevealOption,
  delay: 500,
});

// Modal logic for portfolio
document.addEventListener("DOMContentLoaded", function () { // Fixed typo here
  const bookingForm = document.getElementById("bookingForm");
  const successModal = document.getElementById("successModal");
  const closeSuccessBtn = document.querySelector("#successModal .btn");

  // Ensure modal starts hidden
  successModal.classList.remove("show");

  // Add event listener for close button
  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener("click", () => {
      successModal.classList.remove("show"); // Hide the modal
    });
  } else {
    console.error("Close button not found!");
  }

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === successModal) {
      successModal.classList.remove("show"); // Refresh on outside click
    }
  });
  // ✅ Booking form submission logic
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(bookingForm);
    formData.append("_captcha", "false");

    // ✅ Send to FormSubmit (email)
    fetch("https://formsubmit.co/ajax/rkpweddingphotography@gmail.com", {
      method: "POST",
      headers: { 'Accept': 'application/json' },
      body: formData
    })
    .then(response => {
      if (response.ok) {
        successModal.classList.add("show"); // ✅ Correct way // ✅ Show confirmation popup
        bookingForm.reset();

        // OPTIONAL: Send WhatsApp alert via webhook here
        sendWhatsAppNotification(formData);
      } else {
        alert("Booking failed. Please try again.");
      }
    })
    .catch(() => {
      alert("Error occurred. Please try again later.");
    });
  });

  // ✅ Optional: Send WhatsApp alert to yourself (backend or 3rd-party API)
    // ✅ Send to Flask backend for WhatsApp alert
  function sendWhatsAppNotification(formData) {
    const data = {
      name: formData.get("Name"),
      phone: formData.get("Phone"),
      email: formData.get("Email"),
      event_type: formData.get("Event Type"),
      event_date: formData.get("Event Date"),
      message: formData.get("Message")
    };

    fetch("https://rkp-form.onrender.com/send-whatsapp", {  // 🔁 replace with your real backend URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(() => {
      console.log("✅ WhatsApp notification sent");
    }).catch((err) => {
      console.error("⚠️ WhatsApp notification failed", err);
    });
  }


// =================== SERVICE MODAL LOGIC ===================

  const serviceData = {
    wedding: {
      title: "Wedding Photography",
      description: "Capture every detail of your big day with our wedding photography package.",
      pricing: ["Pre-Wedding Shoot – ₹10,000", "Wedding Day Coverage – ₹25,000", "Album Design – ₹8,000"]
    },
    portrait: {
      title: "Portrait Photography",
      description: "Professional portrait sessions in-studio or outdoors.",
      pricing: ["1-Hour Session – ₹5,000", "High-Res Edits – ₹2,000"]
    },
    babyshower: {
      title: "Baby Shower Photography",
      description: "Cherish motherhood and joy with our baby shower sessions.",
      pricing: ["2-Hour Event Coverage – ₹8,000", "Custom Album – ₹4,000"]
    },
    framing: {
      title: "Framing & Editing",
      description: "High-quality frames and retouches for your favorite shots.",
      pricing: ["Basic Editing – ₹1,500", "Premium Framing – ₹3,000"]
    }
  };

  function openModal(serviceKey) {
    const modal = document.getElementById("serviceModal");
    const title = document.getElementById("modalTitle");
    const description = document.getElementById("modalDescription");
    const pricingList = document.getElementById("modalPricing");

    const service = serviceData[serviceKey];
    if (!service) return;

    title.textContent = service.title;
    description.textContent = service.description;
    pricingList.innerHTML = "";

    service.pricing.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      pricingList.appendChild(li);
    });

    modal.classList.add("show");
  }

  function closeModal() {
    document.getElementById("serviceModal").classList.remove("show");
  }

  // ✅ Set up click listener for each service card
  const cards = document.querySelectorAll(".service__card");
  cards.forEach((card) => {
    const key = card.dataset.service;
    card.addEventListener("click", () => {
      openModal(key);
    });
  });

  // ✅ Close button listener
  const closeBtn = document.querySelector(".modal__close");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }
});


// =================== BOOKING FORM SUCCESS MODAL LOGIC ===================

// =================== END BOOKING FORM SUCCESS MODAL LOGIC ===================


document.addEventListener("DOMContentLoaded", function () {
  const bookingForm = document.getElementById("bookingForm");
  const successModal = document.getElementById("successModal");
  const closeBtn = successModal?.querySelector(".btn");

  if (successModal) {
    successModal.classList.remove("show");
    successModal.style.display = "none";
  }

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(bookingForm);
      formData.append("_captcha", "false");

      fetch("https://formsubmit.co/ajax/rkpweddingphotography@gmail.com", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            successModal.classList.add("show");
            successModal.style.display = "flex";
            bookingForm.reset();
          } else {
            alert("Booking failed. Please try again.");
          }
        })
        .catch(() => {
          alert("Error occurred. Please try again later.");
        });
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      successModal.classList.remove("show");
      successModal.style.display = "none";
    });
  }

  window.addEventListener("click", (event) => {
    if (event.target === successModal) {
      successModal.classList.remove("show");
      successModal.style.display = "none";
    }
  });
});
