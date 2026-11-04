fetch("http://localhost:3000/cart")
  .then((response) => response.json())
  .then((data) => {
    const bookingList = document.querySelector("#booking-list");
    bookingList.innerHTML = "";

    data.carts.forEach((trajet) => {
      if (trajet.booking === true) {
        const now = new Date();
        const departureTime = new Date(trajet.date);
        const diffMs = departureTime - now;

        let timeRemainingText = "";

        if (diffMs > 0) {
          const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
          const diffMinutes = Math.floor(
            (diffMs % (1000 * 60 * 60)) / (1000 * 60),
          );

          if (diffHours > 0) {
            timeRemainingText = `departure in ${diffHours} hours`;
          } else {
            timeRemainingText = `departure in ${diffMinutes} minutes`;
          }
        } else {
          timeRemainingText = "Departure passed";
        }

        bookingList.innerHTML += `
          <div class="travel-row">
            <div class="travel">${trajet.departure} > ${trajet.arrival}</div>
            <div class="hour">${new Date(trajet.date).toLocaleDateString("fr-FR")}</div>
            <div class="hour">${new Date(trajet.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</div>
            <div class="price">${trajet.price}€</div>
            <div class="departure">${timeRemainingText}</div>
          </div>
        `;
      }
    });
  });
