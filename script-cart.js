fetch("https://tickethack-backend-puce-gamma.vercel.app/cart")
  .then((response) => response.json())
  .then((data) => {
    const mainContainer = document.querySelector("#cart-container");

    if (!data.carts || data.carts.length === 0) {
      mainContainer.innerHTML = `
        <h1>No ticket in your cart</h1>
        <p>Why not plan a trip ?</p>
      `;
      return;
    }

    let htmlContent = `<h1>My cart</h1><div id="cart-list">`;

    let total = 0;

    data.carts.forEach((trajet) => {
      total += trajet.price;
      htmlContent += `
        <div class="travel-row">
          <div class="travel">${trajet.departure} > ${trajet.arrival}</div>
          <div class="hour">${new Date(trajet.date).toLocaleDateString("fr-FR")}</div>
          <div class="hour">${new Date(trajet.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</div>
          <div class="price">${trajet.price}€</div>
          <div class="btn" data-id="${trajet._id}">x</div>
        </div>
      `;
    });

    htmlContent += `
      </div>
      <div class="footer-container">
        <p class="total">Total : <span id="total">${total}</span>€</p>
        <button class="purchase">Purchase</button>
      </div>
    `;

    mainContainer.innerHTML = htmlContent;

    document.querySelectorAll(".btn").forEach((button) => {
      button.addEventListener("click", () => {
        fetch(
          `https://tickethack-backend-puce-gamma.vercel.app/cart/${button.dataset.id}`,
          {
            method: "DELETE",
          },
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
              window.location.reload();
            }
          });
      });
    });

    const purchaseBtn = document.querySelector(".purchase");
    if (purchaseBtn) {
      purchaseBtn.addEventListener("click", () => {
        fetch(
          "https://tickethack-backend-puce-gamma.vercel.app/cart/purchase",
          {
            method: "PUT",
          },
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
              window.location.href = "booking.html";
            }
          });
      });
    }
  });
