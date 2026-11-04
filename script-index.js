/*page index*/

/*afficher les trajets recherchés*/
document.querySelector("#search").addEventListener("click", function () {
  const departure = document.querySelector("#departure").value;
  const arrival = document.querySelector("#arrival").value;
  const date = document.querySelector("#date").value;

  console.log(departure, arrival, date);

  fetch(
    `https://tickethack-backend-puce-gamma.vercel.app/trips?departure=${departure}&arrival=${arrival}&date=${date}`,
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.result) {
        document.querySelector(".results-container").innerHTML = "";
        for (let i = 0; i < data.trips.length; i++) {
          const tripDate = new Date(data.trips[i].date);
          const hours = String(tripDate.getHours()).padStart(2, "0");
          const minutes = String(tripDate.getMinutes()).padStart(2, "0");
          const timeFormatted = `${hours}:${minutes}`;
          document.querySelector(".results-container").innerHTML +=
            `<div class="search-row">
            <div class="travel">${data.trips[i].departure} > ${data.trips[i].arrival}</div>
            <div class="hour">${timeFormatted}</div>
            <div class="price">${data.trips[i].price}</div>
            <button class="btn btn-book" data-id="${data.trips[i]._id}">book</button>
          </div>`;
          console.log(data);
        }
      } else {
        document.querySelector(".results-container").innerHTML =
          ` <div class="center-state"><img src="images/notfound.png" alt=" Not Found" class="icon" />
          <hr />
          <p>No trip found</p>
          </div>`;
      }
    });
});

/*POST : le clic sur "book" envoie le trajet dans cart*/

document
  .querySelector(".results-container")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-book")) {
      const tripId = event.target.getAttribute("data-id");
      const clickedButton = event.target;

      fetch("https://tickethack-backend-puce-gamma.vercel.app/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripId: tripId }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.result) {
            clickedButton.textContent = "added";
            clickedButton.style.backgroundColor = "gray";
            clickedButton.disabled = true;
          }
        });
    }
  });
