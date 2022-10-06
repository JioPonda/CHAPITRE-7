/** Recherchez une recette dans la barre principale */ 
const searchBar = document.querySelector("#searchbar");
const divCard = document.querySelector(".div-card");

searchBar.addEventListener('keyup', function() {
const searchValue = searchBar.value;
console.log(searchValue);
if (divCard.includes(searchValue)) {
    divCard.style.display = "none";
};

})