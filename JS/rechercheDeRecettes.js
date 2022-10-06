/** Recherchez une recette dans la barre principale */ 
const searchBar = document.querySelector("#searchbar");
const cardTitle = document.querySelectorAll(".card-title");
const searchValue = searchBar.value;
searchBar.addEventListener('keyup', function() {
    if (cardTitle.textContent !== searchValue) {
        const divCard = document.querySelector(".div-card");
        divCard.style.display = "none";
        console.log(searchValue);
    };
})
