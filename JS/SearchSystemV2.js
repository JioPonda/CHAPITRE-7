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

    /************************* USTENSILES *************************************/

    /** création d'un tableau avec uniquement les ingrédient*/ 
    let dishArrays = []; /** premier tableau avec les données brute */
    
    for ( let i = 0; i < data.length; i++ ) {
        dishArrays.push(data[i].name); /** pour chaque ingredient dans le JSON nous l'ajoutons dans le premier tableau*/
    };
    
    dishArrays = dishArrays.flat(); /** Mise a plat du premier tableau */

    /************************* SEARCH SYSTEM *************************************/

    /** Element du DOM*/
    const searchBar = document.querySelector("#searchbar"); /** correspond a la barre de recherche*/
    const divCard = document.querySelectorAll(".div-card"); /** tableau contenant les différentes card des plats */
    const error = document.querySelector('#error-search');

    searchBar.addEventListener('keyup', function() { /** mise en place d'un écoute sur la barre de recherche lors de la saisie de texte*/ 
        
        const searchValue = searchBar.value; /** On récupére la valeur saisie dans la barre de recherche */
        divCard.forEach((card) => { /** Pour chaque card */
            if (searchValue.length >= 3 && card.id.toLowerCase().includes(searchValue.toLowerCase())) { /** si le tableau de noms inclue la valeur saisie */
                card.style.display = "block"; 
            } else {
                card.style.display = "none";
            }
    
            if (searchValue == "" ) {
                card.style.display = "block";
                error.style.display = "none";
            }
        })
    })
    
    /** Recherchez dans les barres d'ingrédients d'appareils et d'ustensiles */ 

    /** Element du DOM*/ 
    const searchIngredient = document.getElementById('ingredient');
    const pIngredient = document.querySelectorAll('#pIngredient')
    const searchAppareils = document.getElementById('appareils');
    const pAppareils = document.querySelectorAll('#pAppareils')
    const searchUstensiles = document.getElementById('ustensiles');
    const pUstensils = document.querySelectorAll('#pUstensils');
    const spanIngredient = document.querySelectorAll(".span-ingredient")
    const cardDescription = document.querySelectorAll(".card-description")
    
    /** Recherche des Ingrédients*/     
    searchIngredient.addEventListener('keyup', function() {
        const inputIngredient = searchIngredient.value;

        for (let i = 0; i < pIngredient.length; i++) {
            if (pIngredient[i].textContent.toLowerCase().includes(inputIngredient.toLowerCase())) {
                pIngredient[i].style.display = "block";
            } else {
                pIngredient[i].style.display = "none";
            }

            if (inputIngredient === "") {
                pIngredient[i].style.display = "block";
            }
        }
    });

    /** Recherche des Ingrédients via suggestion + création du tag au click*/ 
    for (let iI = 0; iI < pIngredient.length; iI++)
    pIngredient[iI].addEventListener('click', function() {
        for (let i = 0; i < spanIngredient.length; i++) {
            if (spanIngredient[i].textContent.toLowerCase().includes(pIngredient[iI].textContent.toLowerCase())) {
                divCard[i].style.display = "block";
            } else {
                divCard[i].style.display = "none";
            }
        }
        const tag = document.getElementById("ingredient-tag-liste");
        const divTag = document.createElement("div");
        divTag.setAttribute("class" , "tag-ingredient");
        const iTag = document.createElement("p");
        iTag.setAttribute("class" , "text-ingredient-tag")
        iTag.textContent = pIngredient[iI].textContent;        
        const crossTag = document.createElement("i");
        crossTag.setAttribute("class" , "fa-regular fa-circle-xmark");
        crossTag.setAttribute("id" , "crossed-ingredient");
        crossTag.setAttribute("onclick" , "hideTagIngredient ()");
        divTag.appendChild(iTag);
        divTag.appendChild(crossTag);
        tag.appendChild(divTag);     
        console.log(tag);   
    });

    /** Affichage des tag ingrédients via la touche ENTER */ 
    const ingredientSearch = document.querySelector("#ingredient");
    ingredientSearch.addEventListener('keyup', function(e) {
        if (ingredientList.includes(ingredientSearch.value.toLowerCase())) {
            const tag = document.getElementById("ingredient-tag-liste");
            const divTag = document.createElement("div");
            divTag.setAttribute("class" , "tag-ingredient");
            const iTag = document.createElement("p");
            iTag.setAttribute("class" , "text-ingredient-tag");
            const crossTag = document.createElement("i");
            crossTag.setAttribute("id" , "crossed-ingredient");
            crossTag.setAttribute("onclick" , "hideTagIngredient ()");
            if (e.key === "Enter" & ingredientSearch.value !== "") {
                iTag.textContent = ingredientSearch.value 
                crossTag.setAttribute("class" , "fa-regular fa-circle-xmark");
                crossTag.setAttribute("id" , "crossed-ingredient");       
                crossTag.setAttribute("onclick" , "hideTagIngredient ()");
                divTag.appendChild(iTag);
                divTag.appendChild(crossTag);
                tag.appendChild(divTag);
            }
        }
    })

    /** Recherche des Appareils*/
    searchAppareils.addEventListener('keyup', function() {
        const inputAppareils = searchAppareils.value;

        for (let i = 0; i < pAppareils.length; i++) {
            if (pAppareils[i].textContent.includes(inputAppareils.toLowerCase())) {
                pAppareils[i].style.display = "block";
            } else {
                pAppareils[i].style.display = "none";
            }

            if (inputAppareils === "") {
                pAppareils[i].style.display = "block";
            }
        }
    })
    
    /** Recherche des Appareils via suggestion + création du tag au click */ 
    for (let iA = 0; iA < pAppareils.length; iA++)
    pAppareils[iA].addEventListener('click', function() {
        for (let i = 0; i < cardDescription.length; i++) {
            if (cardDescription[i].textContent.includes(pAppareils[iA].textContent)) {
                divCard[i].style.display = "block";
            } else {
                divCard[i].style.display = "none";
            }
        }
        const tag = document.getElementById("appareil-tag-liste");
        const divTag = document.createElement("div");
        divTag.setAttribute("class" , "tag-appareil");
        const aTag = document.createElement("p");
        aTag.setAttribute("class" , "text-appareil-tag")
        aTag.textContent = pAppareils[iA].textContent;        
        const crossTag = document.createElement("i");
        crossTag.setAttribute("class" , "fa-regular fa-circle-xmark");
        crossTag.setAttribute("id" , "crossed-appareils");
        crossTag.setAttribute("onclick" , "hideTagAppareils ()");
        divTag.appendChild(aTag);
        divTag.appendChild(crossTag);
        tag.appendChild(divTag);
    });
    
    /** Affichage des tag appareils via la touche ENTER */ 
    const appareilSearch = document.querySelector("#appareils");
    appareilSearch.addEventListener('keyup', function(e) {
        if (appareilList.includes(appareilSearch.value.toLowerCase())) {
            const tag = document.getElementById("appareil-tag-liste");
            const divTag = document.createElement("div");
            divTag.setAttribute("class" , "tag-appareil");
            const aTag = document.createElement("p");
            aTag.setAttribute("class" , "text-appareil-tag");
            const crossTag = document.createElement("i");
            crossTag.setAttribute("id" , "crossed-appareils");
            crossTag.setAttribute("onclick" , "hideTagAppareils ()");
            if (e.key === "Enter" & appareilSearch.value !== "") {
                aTag.textContent = appareilSearch.value;
                crossTag.setAttribute("id" , "crossed-appareils");        
                crossTag.setAttribute("class" , "fa-regular fa-circle-xmark");
                crossTag.setAttribute("onclick" , "hideTagAppareils ()");
                divTag.appendChild(aTag);
                divTag.appendChild(crossTag);
                tag.appendChild(divTag);
            }
        }
    })    
    
    /** Recherche des Ustensiles*/
    searchUstensiles.addEventListener('keyup', function() {
        const inputUstensiles = searchUstensiles.value;
        for (let i = 0; i < pUstensils.length; i++) {
            if (pUstensils[i].textContent.includes(inputUstensiles.toLowerCase())) {
                pUstensils[i].style.display = "block";
            } else {
                pUstensils[i].style.display = "none";
            }

            if (inputUstensiles === "") {
                pUstensils[i].style.display = "block";
            }
        }
    })

    /** Recherche des Ustensiles via suggestion + création du tag au click */ 
    for (let iU = 0; iU < pUstensils.length; iU++)
    pUstensils[iU].addEventListener('click', function() {
        for (let i = 0; i < cardDescription.length; i++) {
            if (cardDescription[i].textContent.includes(pUstensils[iU].textContent)) {
                divCard[i].style.display = "block";
            } else {
                divCard[i].style.display = "none";
            }
        }

        const tag = document.getElementById("ustensile-tag-liste");
        const divTag = document.createElement("div");
        divTag.setAttribute("class" , "tag-ustensile");
        const uTag = document.createElement("p");
        uTag.setAttribute("class" , "text-ustensile-tag");
        uTag.textContent = pUstensils[iU].textContent;        
        const crossTag = document.createElement("i");
        crossTag.setAttribute("class" , "fa-regular fa-circle-xmark");
        crossTag.setAttribute("id" , "crossed-ustensiles");
        crossTag.setAttribute("onclick" , "hideTagUstensiles ()");
        divTag.appendChild(uTag);
        divTag.appendChild(crossTag);
        tag.appendChild(divTag);
    });    

    /** Affichage des tag ustensiles via la touche ENTER */ 
    const ustensileSearch = document.querySelector("#ustensiles");
    ustensileSearch.addEventListener('keyup', function(e) {
        if (ustensilslList.includes(ustensileSearch.value.toLowerCase())) {
            const tag = document.getElementById("ustensile-tag-liste");
            const divTag = document.createElement("div");
            divTag.setAttribute("class" , "tag-ustensile");
            const uTag = document.createElement("p");
            uTag.setAttribute("class" , "text-ustensile-tag");
            const crossTag = document.createElement("i");
            crossTag.setAttribute("id" , "crossed-ustensiles");
            crossTag.setAttribute("onclick" , "hideTagUstensiles ()");
            if (e.key === "Enter" & ustensileSearch.value !== "") {
                uTag.textContent = ustensileSearch.value;
                crossTag.setAttribute("id" , "crossed-ustensiles");
                crossTag.setAttribute("onclick" , "hideTagUstensiles ()");
                crossTag.setAttribute("class" , "fa-regular fa-circle-xmark");
                divTag.appendChild(uTag);
                divTag.appendChild(crossTag);
                tag.appendChild(divTag);
            }
        }
    })


    return {ingredients,appliance,ustensils}
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

/** Suppression des tag ingrédient */
function hideTagIngredient () {
    const crossedIngredient = document.querySelectorAll("#crossed-ingredient");
    for ( let crossI = 0; crossI < crossedIngredient.length; crossI++){
        const tagIngredient = document.querySelectorAll('.tag-ingredient');
        crossedIngredient[crossI].addEventListener('click' , function () {
            tagIngredient[crossI].remove();
        })
    }
}

/** Suppression des tag appareils */
function hideTagAppareils () {
    const crossedAppareils = document.querySelectorAll("#crossed-appareils");
    for ( let crossA = 0; crossA < crossedAppareils.length; crossA++){
        const tagAppareils = document.querySelectorAll('.tag-appareil');
        crossedAppareils[crossA].addEventListener('click' , function () {
            tagAppareils[crossA].remove();
        })
    }
}

/** Suppression des tag ustensiles */
function hideTagUstensiles () {
    const crossedUstensiles = document.querySelectorAll("#crossed-ustensiles");
    for ( let crossU = 0; crossU < crossedUstensiles.length; crossU++){
        const tagUstensiles = document.querySelectorAll('.tag-ustensile');
        crossedUstensiles[crossU].addEventListener('click' , function () {
            tagUstensiles[crossU].remove();
        })
    }
}

// /** Clean de la page quand les tag sont supprimez */ 
// const ingredientTagList = document.querySelector('#ingredient-tag-liste');
// const appareilTagList = document.querySelector('#appareil-tag-liste');
// const ustensileTagList = document.querySelector('#ustensile-tag-liste');
// const divCard = document.querySelectorAll(".div-card");