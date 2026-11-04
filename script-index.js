/*page index*/

/*addEventLister du get*/
document.querySelector("#search").addEventListener("click", function () {
  const departure = document.querySelector("#departure").value;
  const arrival = document.querySelector("#arrival").value;
  const date = document.querySelector("#date").value;

  console.log(departure, arrival, date);

  fetch(
    `http://localhost:3000/trips?departure=${departure}&arrival=${arrival}&date=${date}`,
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        document.querySelector(".results-container").innerHTML =
          `<div class="search-row">
            <div class="travel">${departure} > ${arrival}</div>
            <div class="hour">${date}</div>
            <div class="price">103€</div>
            <div class="btn">book</div>
          </div>`;
        console.log(data);
      }
    });
});

/*page cart*/

/*fetch pour récupérer les données en bdd*/

/*page booking*/

/*fetch pour récupérer les données en bdd*/
