/* script.js
   JS logic for TBT Spot menu page
   Handles horizontal scrolling for Event Packages & Specials,
   adds arrow controls (no auto-scroll).
*/

document.addEventListener("DOMContentLoaded", () => {
  // Helper function to make a section horizontally scrollable with arrows only
  function makeScrollable(containerSelector, leftBtnSelector, rightBtnSelector) {
    const container = document.querySelector(containerSelector);
    const leftBtn = document.querySelector(leftBtnSelector);
    const rightBtn = document.querySelector(rightBtnSelector);

    if (!container) return;

    const cardWidth = container.querySelector("div")?.offsetWidth || 280;

    // Scroll controls (manual)
    leftBtn?.addEventListener("click", () => {
      container.scrollBy({ left: -cardWidth - 20, behavior: "smooth" });
    });

    rightBtn?.addEventListener("click", () => {
      container.scrollBy({ left: cardWidth + 20, behavior: "smooth" });
    });
  }

  // Initialize both scrollable sections
  makeScrollable(".packages-container", "#packages-left", "#packages-right");
  makeScrollable(".specials-grid", "#specials-left", "#specials-right");

  // ===== MODAL CONTROL =====
  const orderButtons = document.querySelectorAll(".order-btn");
  const modal = document.getElementById("orderModal");
  const closeModal = document.getElementById("closeModal");
  const cancelOrder = document.getElementById("cancelOrder");
  const selectedItemInput = document.getElementById("selectedItem");
  const orderForm = document.getElementById("orderForm");

  if (modal) {
    // Open modal when "Order Now" is clicked
    orderButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const itemName = btn.dataset.item;
        selectedItemInput.value = itemName;
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      });
    });

    // Hide modal function
    const hideModal = () => {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
      orderForm?.reset();
    };

    // Close modal events
    closeModal?.addEventListener("click", hideModal);
    cancelOrder?.addEventListener("click", hideModal);
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) hideModal();
    });

    // Handle order form submit
    orderForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("customerName").value;
      const phone = document.getElementById("customerPhone").value;
      const quantity = document.getElementById("quantity").value;
      const item = selectedItemInput.value;

      alert(`Thank you, ${name}! Your order for ${quantity} × ${item} has been received.\nWe’ll contact you at ${phone}.`);
      hideModal();
    });
  }
});
