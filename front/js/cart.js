//fonction globale
(async function () {
  //Déclaration variable "produitDansLocalStorage" pour key et values dans le local storage
  let produitDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
  //JSON.parse pour convertir les données au format JSON en JS dans locol storage
  console.log(produitDansLocalStorage);
  //Appel fonction d'affichage de la page panier
  affichPanierVide(produitDansLocalStorage);
  affichPanier(produitDansLocalStorage);
  supprimProduitPanier(produitDansLocalStorage);
  modifQteProduitPanier(produitDansLocalStorage);
  articlesPrixTotal(produitDansLocalStorage);
})();

//Fontion d'affichage du panier vide si pas de produits dans local storage
function affichPanierVide(produitDansLocalStorage) {
  //s'il n'y a rien de stocker dans local storage
  if (produitDansLocalStorage === null || produitDansLocalStorage == 0) {
    console.log("panier vide");
    let titre = document.getElementsByTagName("h1");
    console.log(titre);
    //on modifie le contenu de h1, nombre d'articles et prix total
    titre[0].textContent = "Votre Panier est vide.";
    document.getElementById("totalQuantity").textContent = 0;
    document.getElementById("totalPrice").textContent = 0;
  }
}

//Fonction d'affichage des produits dans le panier
function affichPanier(produitDansLocalStorage) {
  // pour tous les produits présents dans le local storage
  for (let l = 0; l < produitDansLocalStorage.length; l += 1) {
    //on cible la section cart_items et on injecte le html pour chaque produit dans le local storage et les valeurs des objets produits que l'on récupère
    document.getElementById(
      "cart__items"
    ).innerHTML += `<article class="cart__item" data-id="${
      produitDansLocalStorage[l].idProduit
    }">
    <div class="cart__item__img">
      <img src="${produitDansLocalStorage[l].photo}" alt="${
      produitDansLocalStorage[l].altTxt
    }">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${produitDansLocalStorage[l].nomProduit}, ${
      produitDansLocalStorage[l].couleur
    }</h2>
        <p>${
          produitDansLocalStorage[l].prix * produitDansLocalStorage[l].quantite
        }.00 €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
            produitDansLocalStorage[l].quantite
          }">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
  }
}

//fonction supprimer un produit présent dans le panier
function supprimProduitPanier(produitDansLocalStorage) {
  //ciblage de tous les éléments supprimer dans le panier
  let supprimProduit = document.querySelectorAll(".deleteItem");
  console.log(supprimProduit);
  //Ecoute du clic sur tous les éléments supprimer du panier
  for (let m = 0; m < supprimProduit.length; m += 1) {
    supprimProduit[m].addEventListener("click", (e) => {
      //Au clic sur 1 élément supprimer on récupère dans une variable l'idProduit et la couleur correspondante
      let idSupprimProduit = produitDansLocalStorage[m].idProduit;
      let colorSupprimProduit = produitDansLocalStorage[m].couleur;
      console.log(idSupprimProduit);
      console.log(colorSupprimProduit);
      //pour tous les produits dans le local storage
      for (let n = 0; n < produitDansLocalStorage.length; n += 1) {
        if (
          //si les variables idProduit et couleur sont identiques
          idSupprimProduit == produitDansLocalStorage[n].idProduit &&
          colorSupprimProduit == produitDansLocalStorage[n].couleur
        ) {
          console.log("condition vérifiée");
          //on cible l'objet du produit dans le local storage avec .splice
          produitDansLocalStorage.splice(n, 1);
          //on actualise les produits du local storage pour y supprimer le produit
          localStorage.setItem(
            "produit",
            JSON.stringify(produitDansLocalStorage)
          );
          console.log(produitDansLocalStorage);
          console.log("produit supprimé dans local storage");
          //alert pour signaler que le produit a été supprimé et recharegement de la page
          alert("Le produit a été supprimé du panier");
          location.reload();
          console.log("produit supprimé dans html");
        }
      }
    });
  }
}

//Fonction de modification de la quantité d'un produit dans le panier
function modifQteProduitPanier(produitDansLocalStorage) {
  //cibalge de tous les éléments Qté dans le panier
  let modifQte = document.querySelectorAll(".itemQuantity");
  console.log(modifQte);
  //Ecoute du changement sur tous les éléments Qté du panier
  for (let o = 0; o < modifQte.length; o += 1) {
    modifQte[o].addEventListener("change", (e) => {
      //Au changement sur 1 élément Qté du panier on récupère dans une variable l'idProduit et la couleur correspondante
      let idModifProduit = produitDansLocalStorage[o].idProduit;
      let colorModifProduit = produitDansLocalStorage[o].couleur;
      console.log(idModifProduit);
      console.log(colorModifProduit);
      //pour tous les produits dans le local storage
      for (let p = 0; p < produitDansLocalStorage.length; p += 1) {
        if (
          //si les variables idProduit et couleur sont identiques
          idModifProduit == produitDansLocalStorage[p].idProduit &&
          colorModifProduit == produitDansLocalStorage[p].couleur
        ) {
          console.log("condition vérifiée");
          produitDansLocalStorage[p].quantite = modifQte[p].value;
          console.log(produitDansLocalStorage[p].quantite);
          localStorage.setItem(
            "produit",
            JSON.stringify(produitDansLocalStorage)
          );
          location.reload();
        }
      }
    });
  }
}

//Fonction de calcul du nombre d'articles dans le panier et du prix total
function articlesPrixTotal(produitDansLocalStorage) {
  //déclaration variables de tableaux pour insertion prix et nombre d'articles
  let prixTab = [];
  let articlesTab = [];
  //récupération des prix panier
  for (let q = 0; q < produitDansLocalStorage.length; q += 1) {
    let prixPanier =
      produitDansLocalStorage[q].quantite * produitDansLocalStorage[q].prix;
    let nbreArticles = parseInt(produitDansLocalStorage[q].quantite);
    //Ajouter prix et nombre d'articles dans les tableaux
    prixTab.push(prixPanier);
    articlesTab.push(nbreArticles);
    console.log(prixTab);
    console.log(articlesTab);
    //Additionner les valeurs par tableaux avec .reduce
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const prixTotal = prixTab.reduce(reducer, 0);
    const articles = articlesTab.reduce(reducer, 0);
    console.log(prixTotal);
    console.log(articles);
    document.getElementById("totalQuantity").textContent = articles;
    document.getElementById("totalPrice").textContent = prixTotal.toFixed(2);
  }
}
