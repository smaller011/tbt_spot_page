// ...existing code...
document.addEventListener("DOMContentLoaded", () => {
    // init (safe to call again)
    if (typeof emailjs !== "undefined" && emailjs.init) emailjs.init("mQ3f-d-m95iuMlwcb");

    const orderButtons = document.querySelectorAll(".order-btn");
    const modal = document.getElementById("orderModal");
    const closeModal = document.getElementById("closeModal");
    const cancelOrder = document.getElementById("cancelOrder");
    const selectedItemInput = document.getElementById("selectedItem");
    const orderForm = document.getElementById("orderForm");

    if (!orderForm) {
        console.error("orderForm not found");
        return;
    }

    orderButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const itemVal = btn.dataset.item ?? btn.dataset.itemName ?? btn.getAttribute("data-item") ?? btn.textContent.trim();
            if (selectedItemInput) selectedItemInput.value = itemVal;
            if (modal) modal.classList.remove("hidden");
            document.body.style.overflow = "hidden";
        });
    });

    const hideModal = () => {
        if (modal) modal.classList.add("hidden");
        document.body.style.overflow = "auto";
        orderForm.reset();
    };

    if (closeModal) closeModal.addEventListener("click", hideModal);
    if (cancelOrder) cancelOrder.addEventListener("click", hideModal);
    if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) hideModal(); });

    orderForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Debugging logs
        console.log("Form submitted");
        console.log("Customer Name:", document.getElementById("customerName").value);
        console.log("Customer Phone:", document.getElementById("customerPhone").value);
        console.log("Selected Item:", selectedItemInput.value);
        console.log("Quantity:", document.getElementById("quantity").value);

        const fd = new FormData(orderForm);
        const rawFD = Object.fromEntries(fd.entries());

        const read = (ids = [], names = []) => {
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && typeof el.value !== "undefined") {
                    const v = String(el.value).trim();
                    if (v !== "") return v;
                }
            }
            for (const n of names) {
                const byName = orderForm.querySelector(`[name="${n}"]`) || document.querySelector(`[name="${n}"]`);
                if (byName && typeof byName.value !== "undefined") {
                    const v = String(byName.value).trim();
                    if (v !== "") return v;
                }
                const fdVal = fd.get(n);
                if (fdVal !== null) {
                    const v = String(fdVal).trim();
                    if (v !== "") return v;
                }
            }
            return "";
        };

        const templateParams = {
            name: read(["customerName"], ["name", "customerName", "customer_name"]),
            phone: read(["customerPhone"], ["phone", "customerPhone", "customer_phone", "tel"]),
            item: (selectedItemInput && String(selectedItemInput.value).trim()) || read(["selectedItem"], ["item", "selectedItem", "selected_item"]),
            quantity: read(["quantity"], ["quantity", "qty"]) || "1"
        };

        console.log("RAW FORM DATA (FormData):", rawFD);
        console.log("SENDING TO EMAILJS:", templateParams);

        const missing = Object.entries(templateParams).filter(([, v]) => !v).map(([k]) => k);
        if (missing.length) {
            alert(`Please fill in the following field(s): ${missing.join(", ")}`);
            return;
        }

        emailjs.send("service_qcnyv8d", "template_71r52c4", templateParams)
            .then(() => {
                alert(`Thank you, ${templateParams.name}! Your order for ${templateParams.quantity} × ${templateParams.item} has been received.`);
                hideModal();
            })
            .catch((err) => {
                console.error("EmailJS ERROR:", err);
                alert("Sorry! Something went wrong, please try again.");
            });
    });
});
// ...existing code...