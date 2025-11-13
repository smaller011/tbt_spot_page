/* script.js
   JS logic for TBT Spot menu page
   Handles horizontal scrolling for Event Packages & Specials,
   adds arrow controls (no auto-scroll),
   and sends order details to WhatsApp from the modal form.
*/

document.addEventListener("DOMContentLoaded", () => {
  // ===== HORIZONTAL SCROLLING WITH ARROWS =====
  function makeScrollable(containerSelector, leftBtnSelector, rightBtnSelector) {
    const container = document.querySelector(containerSelector);
    const leftBtn = document.querySelector(leftBtnSelector);
    const rightBtn = document.querySelector(rightBtnSelector);

    if (!container) return;

    const cardWidth = container.querySelector("div")?.offsetWidth || 280;

    // Scroll left
    leftBtn?.addEventListener("click", () => {
      container.scrollBy({ left: -cardWidth - 20, behavior: "smooth" });
    });

    // Scroll right
    rightBtn?.addEventListener("click", () => {
      container.scrollBy({ left: cardWidth + 20, behavior: "smooth" });
    });
  }

  // Initialize both scrollable sections
  makeScrollable(".packages-container", "#packages-left", "#packages-right");
  makeScrollable(".specials-grid", "#specials-left", "#specials-right");

  // ===== MODAL & ORDER HANDLING =====
  const orderButtons = document.querySelectorAll(".order-btn");
  const modal = document.getElementById("orderModal");
  const closeModal = document.getElementById("closeModal");
  const cancelOrder = document.getElementById("cancelOrder");
  const selectedItemInput = document.getElementById("selectedItem");
  const orderForm = document.getElementById("orderForm");

  if (modal) {
    // Open modal when "Order Now" button is clicked
    orderButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const itemName = btn.dataset.item;
        selectedItemInput.value = itemName;
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      });
    });

    // Function to close the modal
    const hideModal = () => {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
      orderForm?.reset();
    };

    // Close modal when clicking X, Cancel, or background
    closeModal?.addEventListener("click", hideModal);
    cancelOrder?.addEventListener("click", hideModal);
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) hideModal();
    });

    // ===== FORM SUBMISSION (WhatsApp Integration) =====
    orderForm?.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("customerName").value.trim();
      const phone = document.getElementById("customerPhone").value.trim();
      const quantity = document.getElementById("quantity").value.trim();
      const item = selectedItemInput.value.trim();

      // ✅ Replace this number with your uncle's WhatsApp number (include country code, no +)
      const businessNumber = "2347077569358";

      // Build message text
      const message = `🛍️ *New Order at TBT Spot!*\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n🍢 Item: ${item}\n🔢 Quantity: ${quantity}\n\nPlease confirm my order.`;

      // Build WhatsApp link
      const whatsappURL = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;

      // Open WhatsApp in a new tab
      window.open(whatsappURL, "_blank");

      // Close modal and show success message
      hideModal();

      setTimeout(() => {
        alert(`✅ Hi ${name}, your order for ${quantity} × ${item} has been sent to TBT Spot!\nWe’ll contact you at ${phone} soon.`);
      }, 300);
    });
  }
});
