/** Recherchez une recette dans la barre principale */ 
const searchBar = document.querySelector("#searchbar");
const divCard = document.querySelectorAll(".div-card");
const cardTitle = document.querySelectorAll(".card-title");
searchBar.addEventListener('keyup', function() {
const searchValue = searchBar.value;
if (cardTitle.textContent !== searchValue) {
    divCard.style.display = "none";
};
})