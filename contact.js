document.getElementById("contactForm").addEventListener("submit", function(event) {
      event.preventDefault();
      let form = event.target;
      let valid = true;

      // Full Name
      if (!form.fullName.value.trim()) valid = false;

      // Phone Number
      let phone = form.phoneNumber.value.trim();
      if (!/^[0-9]{10,15}$/.test(phone)) {
        form.phoneNumber.classList.add("is-invalid");
        valid = false;
      } else {
        form.phoneNumber.classList.remove("is-invalid");
      }

      // Email
      let email = form.email.value.trim();
      let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        form.email.classList.add("is-invalid");
        valid = false;
      } else {
        form.email.classList.remove("is-invalid");
      }

      // NIN (optional but must be 11 digits if entered)
      let nin = form.nin.value.trim();
      if (nin && !/^\d{11}$/.test(nin)) {
        form.nin.classList.add("is-invalid");
        valid = false;
      } else {
        form.nin.classList.remove("is-invalid");
      }

      if (valid) {
        alert("Form submitted successfully!");
        form.reset();
      }
    });