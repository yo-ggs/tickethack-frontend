fetch("http://localhost:3000/cart")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.carts);
  });