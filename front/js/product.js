//Fonction globale qui va récupèrer l'ID du canapé selectionné et l'afficher dans la page product.html
(async function () {
  const canapeId = getCanapeId();
  const canap = await apiCanape(canapeId);
  affichCanap(canap);
  recupUserSelect(canap);
})();

// Fonction de récupération du l'ID via le lien
function getCanapeId() {
  return new URL(location.href).searchParams.get("id");
}

//Fonction récupération de l'élément du tableau canapes de l'api avec la méthode fetch
function apiCanape(canapeId) {
  let url = `http://localhost:3000/api/products/${canapeId}`;
  return fetch(url)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (canapes) {
      return canapes;
    })
    .catch(function (err) {
      alert("Erreur : " + err);
    });
}

//Fonction d'insertion des éléments du canapé selectionné dans la page product
function affichCanap(canap) {
  document.getElementsByClassName(
    "item__img"
  )[0].innerHTML = `<img src="${canap.imageUrl}" alt="${canap.altTxt}">`;
  document.getElementById("title").textContent = canap.name;
  document.getElementById("price").textContent = canap.price.toFixed(2) + " ";
  document.getElementById("description").textContent = canap.description;
  //Boucle for pour afficher les couleurs du canapé dans le menu déroulant
  for (let i = 0; i < canap.colors.length; i += 1) {
    document.getElementById(
      "colors"
    ).innerHTML += `<option value="${canap.colors[i]}">${canap.colors[i]}</option>`;
  }
}

/*Fonction de récupération des valeurs sélectionnées par l'utilisateur dans un 
objet puis dans le localstorage */
function recupUserSelect(canap) {
  const ajoutPanier = document.getElementById("addToCart");
  ajoutPanier.addEventListener("click", (e) => {
    e.preventDefault();

    //récupération des valeurs sélectionnées
    let colorProduit = document.getElementById("colors").value;
    let quantityProduit = document.getElementById("quantity").value;

    //Groupement des valeurs dans un objet
    const userSelectProduit = {
      nomProduit: canap.name,
      idProduit: canap._id,
      couleur: colorProduit,
      quantite: quantityProduit,
      prix: canap.price.toFixed(2),
    };
    console.log(userSelectProduit);
    //Stockage des valeurs sélectionnées dans le local storage

    //Déclaration variable "produitDansLocalStorage" pour key et values dans le local storage
    let produitDansLocalStorage = JSON.parse(localStorage.getItem("produit"));

    //JSON.parse pour convertir les données au format JSON en JS dans locol storage

    //fonction ajouter le produit dans le local storage
    const ajoutDansLocalStorage = () => {
      //ajout de l'objet des valeurs sélectionnées par l'utilisateur dans un tableau
      produitDansLocalStorage.push(userSelectProduit);

      //conversion en JSON et stockage dans la clé "produit" du local storage
      localStorage.setItem("produit", JSON.stringify(produitDansLocalStorage));
    };

    //fonction fenêtre de confirmation et choix aller sur page panier ou page d'acceuil
    const pageSelect = () => {
      if (
        window.confirm(`${canap.name}, ${colorProduit} a bien été ajouté au panier.
Consulter le panier : OK ou revenir à l'acceuil : ANNULER.`)
      ) {
        window.location.href = "cart.html";
      } else {
        window.location.href = "index.html";
      }
    };

    //Si produits présents dans le local storage
    if (produitDansLocalStorage) {
      for (let j = 0; j < produitDansLocalStorage.length; j += 1) {
        if (
          userSelectProduit.idProduit == produitDansLocalStorage[j].idProduit &&
          userSelectProduit.couleur == produitDansLocalStorage[j].couleur
        ) {
          userSelectProduit.quantite =
            parseInt(userSelectProduit.quantite) +
            parseInt(produitDansLocalStorage[j].quantite);
          console.log("inna un");
          produitDansLocalStorage.splice(j, 4);
          console.log(userSelectProduit.quantite);
        }
      }
      ajoutDansLocalStorage();
      console.log(produitDansLocalStorage.length);
      pageSelect();
    }
    //Pas de produits présents dans le local storage
    else {
      produitDansLocalStorage = [];
      ajoutDansLocalStorage();
      pageSelect();
    }
  });
}
