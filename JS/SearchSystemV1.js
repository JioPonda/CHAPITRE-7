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
        const aIngredient = document.createElement("a"); /** Nous créeons un lien */
        aIngredient.setAttribute("href" , "#");
        /** Texte et implémentation*/ 
        aIngredient.textContent = e; /** pour chaque lien crée nous ajoutons en texte un ingrédients */
        suggestionIngredients.appendChild(aIngredient); /** notre DIV suggestion-ingredient enfante de chaque lien crée précédemment */
    });
    /************************* APPLIANCE *************************************/
    
    /** création d'un tableau avec uniquement les ingrédient*/ 
    let appareilsArray = []; /** premier tableau avec les données brute */
    
    for ( let i = 0; i < data.length; i++ ) {
        appareilsArray.push(data[i].appliance); /** pour chaque ingredient dans le JSON nous l'ajoutons dans le premier tableau*/
    };
    appareilsArray = appareilsArray.flat(); /** Mise a plat du premier tableau */
    
    let appareilList = appareilsArray.filter((x, i) => appareilsArray.indexOf(x) === i); /** Nous créons une variable ou  nous filtrons les ingrédients 
    afin de retourner un tableau sans doublons */

    appareilList.forEach(e =>  {
        /** Element du dom*/ 
        const suggestionAppareils = document.getElementById("suggestions-appareils"); 
        const aAppareils = document.createElement("a");
        aAppareils.setAttribute("href" , "#");
        /** Texte et implémentation*/ 
        aAppareils.textContent = e; /** pour chaque lien crée nous ajoutons en texte les ingrédients */
        suggestionAppareils.appendChild(aAppareils); /** notre DIV suggestion-ingédient enfante de chaque lien crée précédemment */
    });

    /************************* USTENSILES *************************************/

    /** création d'un tableau avec uniquement les ingrédient*/ 
    let ustensilesArray = []; /** premier tableau avec les données brute */
    
    for ( let i = 0; i < data.length; i++ ) {
        ustensilesArray.push(data[i].ustensils); /** pour chaque ingredient dans le JSON nous l'ajoutons dans le premier tableau*/
    };
    ustensilesArray = ustensilesArray.flat(); /** Mise a plat du premier tableau */
    
    let ustensilslList = ustensilesArray.filter((x, i) => ustensilesArray.indexOf(x) === i); /** Nous créons une variable ou  nous filtrons les ingrédients 
    afin de retourner un tableau sans doublons */

    ustensilslList.forEach(e =>  {
        /** Element du dom*/ 
        const suggestionUstensils = document.getElementById("suggestions-ustensiles"); 
        const aUstensils = document.createElement("a");
        aUstensils.setAttribute("href" , "#");
        /** Texte et implémentation*/ 
        aUstensils.textContent = e; /** pour chaque lien crée nous ajoutons en texte les ingrédients */
        suggestionUstensils.appendChild(aUstensils); /** notre DIV suggestion-ingédient enfante de chaque lien crée précédemment */
    });

    /************************* SEARCH SYSTEM *************************************/


    /** Recherchez une recette dans la barre principale */
    let dishArray = [];

    for ( let i = 0; i < data.length; i++) {
        dishArray.push(data[i].name);
    };

    /** recherche dans la barre principale */ 
    const searchBar = document.querySelector("#searchbar");
    const divCard = document.querySelectorAll(".div-card");
    const divTitle = document.querySelectorAll(".card-title");

    searchBar.addEventListener('keyup', function() { 
    const searchValue = searchBar.value;      
    
    for ( let i = 0; i < divCard.length; i++) {
        if (divTitle[i].textContent.toLowerCase().includes(searchValue.toLowerCase())) {
            divCard[i].style.display = "block";
            console.log(searchValue);
        } else {
            divCard[i].style.display = "none"; 
            console.log(searchValue);            
        }
        
        if (searchValue === "")
            divCard[i].style.display = "block";
        }
    })
    

    /** Recherchez dans les barres d'ingrédients d'appareils et d'ustensiles */ 

    /** Element du DOM*/ 
    const searchIngredient = document.getElementById('ingredient');
    const searchAppareils = document.getElementById('appareils');
    const searchUstensiles = document.getElementById('ustensiles');


    /** Recherche des Ingrédients*/     
    searchIngredient.addEventListener('keyup', function() { /** On écoute la barre de recherche lors de la saisie du texte */
        const inputIngredient = searchIngredient.value; /** on récupére la valeur saisie*/ 
        console.log(inputIngredient); /** on récupére la valeur dans la console */

        const resultIngredient = ingredientList.filter(item => item.includes(inputIngredient)); /** on filtre les ingrédients et pour chaque ingrédients incluant
        la valeur de inputIngredient */

        /** on renvoie dans la console les valeurs de notre JSON correspondante */
        console.log(resultIngredient);
    })
    

    /** Recherche des Appareils*/
    searchAppareils.addEventListener('keyup', function() { /** On écoute la barre de recherche lors de la saisie du texte */
        const inputAppareils = searchAppareils.value; /** on récupére la valeur saisie*/ 
        console.log(inputAppareils); /** on récupére la valeur dans la console */

        const resultAppareils = appareilList.filter(item => item.includes(inputAppareils)); /** on filtre les appareils et pour chaque Appareils incluant
        la valeur de inputAppareils */

        /** on renvoie dans la console les valeurs de notre JSON correspondante */
        console.log(resultAppareils);
    })
    
    
    /** Recherche des Ustensiles*/
    searchUstensiles.addEventListener('keyup', function() { /** On écoute la barre de recherche lors de la saisie du texte */
        const inputUstensiles = searchUstensiles.value; /** on récupére la valeur saisie*/ 
        console.log(inputUstensiles); /** on récupére la valeur dans la console */

        const resultUstensiles = ustensilslList.filter(item => item.includes(inputUstensiles)); /** on filtre les Ustensiles et pour chaque Ustensiles incluant
        la valeur de inputUstensiles */

        /** on renvoie dans la console les valeurs de notre JSON correspondante */
        console.log(resultUstensiles);
    })
    

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

const bodyPage = document.getElementsByTagName("body");

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
};

const divUstensilesButton = document.getElementById("ustensiles");
divUstensilesButton.setAttribute("onclick","displayUstensilesList()");

