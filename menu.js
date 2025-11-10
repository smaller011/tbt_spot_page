/* script.js
   JS logic for TBT Spot menu page
   Handles horizontal scrolling for Event Packages & Specials,
   adds arrow controls, and basic auto-scroll behavior.
*/

document.addEventListener("DOMContentLoaded", () => {
  // Helper function to make a section horizontally scrollable with arrows + auto-scroll
  function makeScrollable(containerSelector, leftBtnSelector, rightBtnSelector) {
    const container = document.querySelector(containerSelector);
    const leftBtn = document.querySelector(leftBtnSelector);
    const rightBtn = document.querySelector(rightBtnSelector);

    if (!container) return;

    let scrollAmount = 0;
    const cardWidth = container.querySelector("div")?.offsetWidth || 280;

    // Scroll controls
    leftBtn?.addEventListener("click", () => {
      container.scrollBy({ left: -cardWidth - 20, behavior: "smooth" });
    });
    rightBtn?.addEventListener("click", () => {
      container.scrollBy({ left: cardWidth + 20, behavior: "smooth" });
    });

    // Auto scroll every 4 seconds (mobile-friendly)
    let autoScrollInterval = setInterval(() => {
      if (window.innerWidth < 768) {
        container.scrollBy({ left: cardWidth + 20, behavior: "smooth" });
        scrollAmount += cardWidth + 20;
        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
          scrollAmount = 0;
          container.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 4000);

    // Pause auto scroll on hover (desktop)
    container.addEventListener("mouseenter", () => clearInterval(autoScrollInterval));
    container.addEventListener("mouseleave", () => {
      if (window.innerWidth < 768) return; // don’t restart auto-scroll on desktop
      autoScrollInterval = setInterval(() => {
        container.scrollBy({ left: cardWidth + 20, behavior: "smooth" });
      }, 4000);
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
    orderButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const itemName = btn.dataset.item;
        selectedItemInput.value = itemName;
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      });
    });

    const hideModal = () => {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
      orderForm?.reset();
    };

    closeModal?.addEventListener("click", hideModal);
    cancelOrder?.addEventListener("click", hideModal);
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) hideModal();
    });

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
