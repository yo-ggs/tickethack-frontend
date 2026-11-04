fetch("http://localhost:3000/cart")
  .then((response) => response.json())
  .then((data) => {
    document.querySelector("#cart-list").innerHTML = "";

    data.carts.forEach((trajet) => {
      document.querySelector("#cart-list").innerHTML += `
    <div class="travel-row">
      <div class="travel">${trajet.departure} > ${trajet.arrival}</div>
      <div class="hour">${new Date(trajet.date).toLocaleDateString("fr-FR")}</div>
      <div class="hour">${new Date(trajet.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</div>
 <div class="price">${trajet.price}€</div>
      <div class="btn">x</div>
    </div>
  `;
    });

    let total = 0;

    data.carts.forEach((trajet) => {
      total += trajet.price;
    });

    document.querySelector("#total").textContent = total;
  });
