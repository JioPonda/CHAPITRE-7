/*****************************************************  BASES  ********************************************************************/

/** ---------- FETCH DATA pour récupérer les infos des photographes du fichier JSON ---------- */
async function getRecipes() {
    await fetch("JS/recipes.json")
      .then((res) => res.json())
      .then((data) => (recipes = data.recipes));
    return {recipes: [...recipes],};
  }

/*********************************************  ALGORYTHME DE RECHERCHE V1 *********************************************************/

function search (data) {
    /** Données du JSON*/ 
    const {ingredients,appliance,ustensils}= data;
    
    /** Element du DOM*/ 
    const searchIngredient = document.getElementById('ingredient');
    const searchAppareils = document.getElementById('appareils');
    const searchUstensiles = document.getElementById('ustensiles');

    /** Recherche des Ingrédients*/ 
    function ingredientSearch () {
        searchIngredient.addEventListener('keyup', function() { /** On écoute la barre de recherche lors de la saisie du texte */
            const inputIngredient = searchIngredient.value; /** on récupére la valeur saisie*/ 
            console.log(inputIngredient); /** on récupére la valeur dans la console */

            const resultIngredient = data.filter(item => item.ingredients.includes(inputIngredient)); /** on filtre les ingrédients et pour chaque ingrédients incluant
            la valeur de inputIngredient */

            /** on renvoie dans la console les valeurs de notre JSON correspondante */
            console.log(resultIngredient);
        })
    }

    function appareilsSearch () {
        searchAppareils.addEventListener('keyup', function() { /** On écoute la barre de recherche lors de la saisie du texte */
            const inputAppareils = searchAppareils.value; /** on récupére la valeur saisie*/ 
            console.log(inputAppareils); /** on récupére la valeur dans la console */

            const resultAppareils = data.filter(item => item.appliance.includes(inputAppareils)); /** on filtre les appareils et pour chaque Appareils incluant
            la valeur de inputAppareils */

            /** on renvoie dans la console les valeurs de notre JSON correspondante */
            console.log(resultAppareils);
        })
    }
    
    function ustensilsSearch () {
        searchUstensiles.addEventListener('keyup', function() { /** On écoute la barre de recherche lors de la saisie du texte */
            const inputUstensiles = searchUstensiles.value; /** on récupére la valeur saisie*/ 
            console.log(inputUstensiles); /** on récupére la valeur dans la console */

            const resultUstensiles = data.filter(item => item.ustensils.includes(inputUstensiles)); /** on filtre les Ustensiles et pour chaque Ustensiles incluant
            la valeur de inputUstensiles */

            /** on renvoie dans la console les valeurs de notre JSON correspondante */
            console.log(resultUstensiles);
        })
    }

    return {ingredients,appliance , ustensils , ingredientSearch , appareilsSearch, ustensilsSearch}
}

/********************************************* INITIALISATION *********************************************************/

/** Initialisation des données des recipes pour la recherche */
async function initSearch () {
    const {recipes} = await getRecipes(); /** Récupére les données des récipes avant recherche*/
    search(recipes); /** Apelle de la fonction de rercherche des données des récipes */
}

initSearch();


