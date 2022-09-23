/*****************************************************  BASES  ********************************************************************/

/** ---------- FETCH DATA pour récupérer les infos des photographes du fichier JSON ---------- */
async function getRecipes() {
    await fetch("JS/recipes.js")
      .then((res) => res.json())
      .then((data) => (recipes = data.recipes));
    return {recipes: [...recipes],};
  }

/*****************************************************  RECIPES  ********************************************************************/

/** ---------- CREATION DU GABARIT DES CARDS ---------- */ 
function recipesFactory(data) {
  const {id,name,servings,ingredients,time,description, appliance , ustensils }= data;
  
  console.log(data);
  const clock = `assets/clock.png`;
  
  function getRecipesCardDOM() {
    /** Squelette de la card */ 
    const divCard = document.createElement("div");
    divCard.setAttribute("class","div-card");
    const divGreyZone = document.createElement("div");
    divGreyZone.setAttribute("class", "grey-zone");
    const divCardInfos = document.createElement("div");
    divCardInfos.setAttribute("class","card-infos");
    const divRecipes = document.createElement("div");
    divRecipes.setAttribute("class" , "div-recipes");
    const divDescription = document.createElement("div");
    divDescription.setAttribute("class","div-description");
    /** texte de la card */
    const cardTitle = document.createElement("h2");
    cardTitle.setAttribute("class" , "card-title");
    cardTitle.textContent = name;
    const cardClock = document.createElement("img");
    cardClock.setAttribute("class" , "card-clock", "src" , clock);
    const cardTime = document.createElement("p");
    cardTime.setAttribute("class", "card-time");
    cardTime.textContent = time;
    const cardIngredient = ingredients.forEach(ingredients => {
      const ingredientArray = document.createElement("p");
      ingredientArray.setAttribute("class" , "card-ingredient");
      ingredientArray.textContent = [...ingredients];
    });
    const cardDescription = document.createElement("p");
    cardDescription.setAttribute("class" , "card-description");
    cardDescription.textContent = description;
    
    divCard.appendChild(divGreyZone);
    divCard.appendChild(divCardInfos);
    divCardInfos.appendChild(divRecipes);
    divRecipes.appendChild(cardTitle);
    divRecipes.appendChild(cardIngredient);
    divCardInfos.appendChild(divDescription);
    divDescription.appendChild(cardClock);
    divDescription.appendChild(cardTime);
    divDescription.appendChild(cardDescription);

    return divCard;
  }

  return {id,name,servings,ingredients,time,description, appliance , ustensils , getRecipesCardDOM};
}

/*****************************************************  AFFICHAGE SUR LA PAGE INDEX.HTML  ********************************************************************/

/** Affichage des recipes sur la page index.html*/
function displayRecipes () {
  const recipesContainer = document.querySelector(".container");

  /** Boucles dans les recipes */
  recipes.forEach((recipe) => {
    const recipesModelPage = recipesFactory(recipe);
    const recipeCardDOMpage = recipesModelPage.getRecipesCardDOM();
    recipesContainer.appendChild(recipeCardDOMpage);
  }); 
} 

/*****************************************************  INITIALISATION  ********************************************************************/

/** Initialisation pour l'affichage des données des recipes sur la page index.html */
async function initRecipe () {
  const { recipes } = await getRecipes(); /** Récupére les données des récipes avant affichage */
  displayRecipes(recipes); /** Apelle de la fonction d'affichage des données des récipes */
}

initRecipe();