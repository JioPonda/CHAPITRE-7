/*****************************************************  BASES  ********************************************************************/

/** ---------- FETCH DATA pour récupérer les infos des photographes du fichier JSON ---------- */
async function getRecipes() {
    await fetch("JS/recipes.json")
      .then((res) => res.json())
      .then((data) => (recipes = data.recipes));
    return {recipes: [...recipes],};
  }

/*********************************************  ALGORYTHME DE RECHERCHE V1 *********************************************************/

function factorySearch (data) {
    /** Données du JSON*/ 
    const {ingredients,appliance,ustensils}= data;

    /************************* INGREDIENTS *************************************/
    /** création d'un tableau avec uniquement les ingrédient*/ 
    let ingredientsArray = []; /** premier tableau avec les données brute */
    let ingredientsArray2 = []; /** deuxiéme tableau avec les données pré-filtrer */
    
    for ( let i = 0; i < data.length; i++ ) {
        ingredientsArray.push(data[i].ingredients); /** pour chaque ingredient dans le JSON nous l'ajoutons dans le premier tableau*/
    };
    
    ingredientsArray = ingredientsArray.flat(); /** Mise a plat du premier tableau */
    
    for ( let i = 0; i < ingredientsArray.length; i++ ) {
        ingredientsArray2.push(ingredientsArray[i].ingredient.toLowerCase()); /** Pour chaque ingrédient dans le premier tableau nous l'ajoutons dans le deuxiémée 
        tableau en supprimant les majuscule */
    };

    let ingredientList = ingredientsArray2.filter((x, i) => ingredientsArray2.indexOf(x) === i); /** Nous créons une variable ou  nous filtrons les ingrédients 
    afin de retourner un tableau sans doublons */

    ingredientList.forEach(e =>  { /** Pour chaqque element de nortre ingredientList */
        /** Element du DOM */ 
        const suggestionIngredients = document.getElementById("suggestions-ingredient"); 
        const pIngredient = document.createElement("p"); /** Nous créeons un lien */
        pIngredient.setAttribute("id" , "pIngredient");
        /** Texte et implémentation*/ 
        pIngredient.textContent = e; /** pour chaque lien crée nous ajoutons en texte un ingrédients */
        suggestionIngredients.appendChild(pIngredient); /** notre DIV suggestion-ingredient enfante de chaque lien crée précédemment */
    });
    /************************* APPLIANCE *************************************/
    
    /** création d'un tableau avec uniquement les appareils*/ 
    let appareilsArray = []; /** tableau avec les données brute */ 
    
    for ( let i = 0; i < data.length; i++ ) {
        appareilsArray.push(data[i].appliance.toLowerCase()); /** pour chaque appareil dans le JSON nous l'ajoutons dans le tableau*/
    };
    
    appareilsArray = appareilsArray.flat(); /** Mise a plat du tableau */

    let appareilList = appareilsArray.filter((x, i) => appareilsArray.indexOf(x) === i); /** Nous créons une variable ou  nous filtrons les appareils 
    afin de retourner un tableau sans doublons */

    appareilList.forEach(e =>  {
        /** Element du dom*/ 
        const suggestionAppareils = document.getElementById("suggestions-appareils"); 
        const pAppareils = document.createElement("p");
        pAppareils.setAttribute("id" , "pAppareils")
        /** Texte et implémentation*/ 
        pAppareils.textContent = e; /** pour chaque lien crée nous ajoutons en texte les appareils */
        suggestionAppareils.appendChild(pAppareils); /** notre DIV suggestion-ingédient enfante de chaque lien crée précédemment */
    });

    /************************* USTENSILES *************************************/

    /** création d'un tableau avec uniquement les ustensiles*/ 
    let ustensilesArray = []; /** tableau avec les données brute */
    
    for ( let i = 0; i < data.length; i++ ) {
        ustensilesArray.push(data[i].ustensils); /** pour chaque ustensile dans le JSON nous l'ajoutons dans le tableau*/
    };
    ustensilesArray = ustensilesArray.flat(); /** Mise a plat du tableau */
    
    let ustensilslList = ustensilesArray.filter((x, i) => ustensilesArray.indexOf(x) === i); /** Nous créons une variable ou nous filtrons les ustensiles 
    afin de retourner un tableau sans doublons */

    ustensilslList.forEach(e =>  {
        /** Element du dom*/ 
        const suggestionUstensils = document.getElementById("suggestions-ustensiles"); 
        const pUstensils = document.createElement("p");
        pUstensils.setAttribute("id" , "pUstensils")
        /** Texte et implémentation*/ 
        pUstensils.textContent = e; /** pour chaque lien crée nous ajoutons en texte les ustensiles */
        suggestionUstensils.appendChild(pUstensils); /** notre DIV suggestion-ingédient enfante de chaque lien crée précédemment */
    });

    /************************* SEARCH SYSTEM *************************************/



    return {ingredients,appliance , ustensils}
}
/********************************************* INITIALISATION *********************************************************/

/** Initialisation des données des recipes pour la recherche */
async function initSearch () {
    const {recipes} = await getRecipes(); /** Récupére les données des récipes avant recherche*/
    factorySearch(recipes); /** Apelle de la fonction de rercherche des données des récipes */
}

initSearch();


/********************************************* LISTES *********************************************************/

/** Affichage de la liste des ingredients */ 
function displayIngredientList () {
    const divIngredient = document.getElementById("suggestions-ingredient");
    divIngredient.style.display = "grid";
    const chevronIngredient = document.querySelector(".chevron-ingredients");
    chevronIngredient.style.transform = "rotate(180deg)";
};

/** Masquer la liste d'ingrédient */
function hideIngredientList () {
    const divIngredient = document.getElementById("suggestions-ingredient");
    divIngredient.style.display = "none";
    const chevronIngredient = document.querySelector(".chevron-ingredients");
    chevronIngredient.style.transform = "rotate(0)";
    // const divCard = document.querySelectorAll(".div-card");
    // for (let i = 0; i < divCard.length; i++ ) {
    //     divCard[i].style.display = "block";
    // }
};

const divIngredientButton = document.getElementById("ingredient");
divIngredientButton.setAttribute("onclick","displayIngredientList()");

/** Affichage de la liste des appareils */ 
function displayAppareilsList () {
    const divAppareils = document.getElementById("suggestions-appareils");
    divAppareils.style.display = "grid";
    const chevronAppareils = document.querySelector(".chevron-appareils");
    chevronAppareils.style.transform = "rotate(180deg)";
};

/** Masquer la liste d'appareils */
function hideAppareilsList () {
    const divAppareils = document.getElementById("suggestions-appareils");
    divAppareils.style.display = "none";
    const chevronAppareils = document.querySelector(".chevron-appareils");
    chevronAppareils.style.transform = "rotate(0)";
    // const divCard = document.querySelectorAll(".div-card");
    // for (let i = 0; i < divCard.length; i++ ) {
    //     divCard[i].style.display = "block";
    // }
};

const divAppareilsButton = document.getElementById("appareils");
divAppareilsButton.setAttribute("onclick","displayAppareilsList()");

/** Affichage de la liste des ustensiles */ 
function displayUstensilesList () {
    const divUstensiles = document.getElementById("suggestions-ustensiles");
    divUstensiles.style.display = "grid";
    const chevronUstensiles = document.querySelector(".chevron-ustensiles");
    chevronUstensiles.style.transform = "rotate(180deg)";
};

/** Masquer la liste d'ustensiles */
function hideUstensilesList () {
    const divUstensiles = document.getElementById("suggestions-ustensiles");
    divUstensiles.style.display = "none";
    const chevronUstensiles = document.querySelector(".chevron-ustensiles");
    chevronUstensiles.style.transform = "rotate(0)";
    // const divCard = document.querySelectorAll(".div-card");
    // for (let i = 0; i < divCard.length; i++ ) {
    //     divCard[i].style.display = "block";
    // }
};

const divUstensilesButton = document.getElementById("ustensiles");
divUstensilesButton.setAttribute("onclick","displayUstensilesList()");
