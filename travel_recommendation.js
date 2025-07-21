const resultContainer = document.querySelector(".results-container");

document
  .querySelector(".search-bar")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    resultContainer.innerHTML = "";
    let result;
    const query = document.getElementById("searchInput").value;
    if (query) {
      console.log(`Searching for: ${query}`);
      fetch("travel_recommendation_api.json")
        .then((response) => response.json())
        .then((data) => {
          const { countries, temples, beaches } = data;
          if (
            query === "beaches" ||
            query === "beach" ||
            query === "BEACH" ||
            query === "BEACHES"
          ) {
            result = data.beaches;
          } else if (
            query === "temples" ||
            query === "temple" ||
            query === "TEMPLE" ||
            query === "TEMPLES"
          ) {
            result = data.temples;
          } else {
            result = data.countries.filter((country) =>
              country.name.toLowerCase().includes(query.toLowerCase())
            )[0].cities;
          }
          console.log("Result: ", result);
          let resultHTML = "";
          result.forEach((element) => {
            resultHTML += `<a href="details.html?id=1" class="card">
                                <img
                                    src="${element.imageUrl}"
                                    alt="Maldives"
                                />
                                <div class="card-content">
                                    <div class="card-title">${element.name}</div>
                                    <div class="card-location">${element.description}</div>
                                </div>
                            </a>`;
          });
          resultContainer.innerHTML = resultHTML;
        });
    }
  });

document.querySelector(".btn-clear").addEventListener("click", function () {
  resultContainer.innerHTML = "";
  document.getElementById("searchInput").value = "";
  console.log("Search cleared");
});
