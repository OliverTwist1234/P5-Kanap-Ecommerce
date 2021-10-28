//fonction globale d'affichage des produits dans le panier
(async function () {
  //Déclaration variable "produitDansLocalStorage" pour key et values dans le local storage
  let produitDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
  //JSON.parse pour convertir les données au format JSON en JS dans locol storage

  //Affichage des produits séléctionnés dans la page panier et fonctionnalités ajouts et suppressions
  affichPanierVide(produitDansLocalStorage);
  affichPanier(produitDansLocalStorage);
  supprimProduitPanier(produitDansLocalStorage);
  modifQteProduitPanier(produitDansLocalStorage);
  articlesPrixTotal(produitDansLocalStorage);
  idProduits(produitDansLocalStorage);

  //Gestion du formulaire
  //ciblage du formulaire dans le DOM
  const form = document.querySelector(".cart__order__form");

  verifUserDataForm(form);
  console.log(produitDansLocalStorage);
})();

/*************************AFFICHAGE DYNAMIQUE DU PANIER************************************/

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
    const panier = document.getElementById(
      "cart__items"
    );
    panier.innerHTML += `<article class="cart__item" data-id="${
      produitDansLocalStorage[l].idProduit
    }" data-color="${produitDansLocalStorage[l].couleur}">
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
          //on recharge la page pour mettre à jour le HTML
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
          //on met à jour les données dans le local storage
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
  //récupération des prix panier et des quantités dans le local storage
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
    //stockage du prix total dans le local storage
    const prixTotalCmde = {
      prixGlobal: prixTotal,
    };
    localStorage.setItem("prixCmde", JSON.stringify(prixTotalCmde));
    //affichage des valeurs calculées dans la page
    document.getElementById("totalQuantity").textContent = articles;
    document.getElementById("totalPrice").textContent = prixTotal.toFixed(2);
  }
}

//Fonction de récupération des tous les ID de produits dans le panier dans un tableau et stockage dans le local storage
function idProduits(produitDansLocalStorage) {
  //Déclaration variable de tableau pour y stocker les noms de produits du panier
  let idPanierTab = [];
  //récupération des noms de produits dans le local storage
  for (let s = 0; s < produitDansLocalStorage.length; s += 1) {
    let idPanier = produitDansLocalStorage[s].idProduit;
    idPanierTab.push(idPanier);
    console.log(idPanierTab);
    //stockage du prix total dans le local storage
    localStorage.setItem("idsCmde", JSON.stringify(idPanierTab));
  }
}

/****************************GESTION DU FORMULAIRE********************************************/

//Fonction de vérification des données entrées par l'utilisateur dans le formulaire
async function verifUserDataForm(form) {
  //Ecouter la modification du prénom
  form.firstName.addEventListener("change", function () {
    //on excute la fonction validPrénom pour vérifier la valeur entrée
    validPrenom(this);
  });

  //Ecouter la modification du prénom
  form.lastName.addEventListener("change", function () {
    validNom(this);
  });

  //Ecouter la modification de l'adresse
  form.address.addEventListener("change", function () {
    validAdresse(this);
  });

  //Ecouter la modification de la Ville
  form.city.addEventListener("change", function () {
    validVille(this);
  });

  //Ecouter la modification de la Ville
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  //Ecouter la soumission du formulaire
  form.addEventListener("submit", function (e) {
    //on annule le comportement par défaut du submit
    e.preventDefault();
    if (
      //si toutes les saisies de l'utilisateur dans le formulaire sont valides
      validPrenom(form.firstName) &&
      validNom(form.lastName) &&
      validAdresse(form.address) &&
      validVille(form.city) &&
      validEmail(form.email)
    ) {
      console.log("data OK");
      recupDataForm(this);
      sendDataToApi();
    } else {
      console.log("data KO");
    }
  });

  //fonction de validation du prénom
  const validPrenom = function (inputPrenom) {
    //création de la reg exp pour validation prénom
    let prenomRegExp = new RegExp(
      `[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]{3,50}$`,
      "g"
    );
    let testPrenom = prenomRegExp.test(inputPrenom.value);
    console.log(form.firstName.value);
    console.log(testPrenom);
    //récupération de la balise qui suit le champ de formulaire
    let msg = inputPrenom.nextElementSibling;
    //on test l'expression régulière
    if (testPrenom) {
      msg.innerHTML = "Prénom valide !";
      msg.style.color = "greenyellow";
      console.log("bon");
      return true;
    } else {
      msg.innerHTML = "Prénom non valide !";
      msg.style.color = "red";
      console.log("pas bon");
      alert(
        "Le Prénom ne doit pas contenir de chiffres, espaces ou caractères spéciaux et doit contenir entre 3 et 20 caractères. Veuillez saisir un prénom valide E: Jean-Pierre"
      );
      return false;
    }
  };

  //fonction de validation du Nom
  const validNom = function (inputNom) {
    //création de la reg exp pour validation de Nom
    let nomRegExp = new RegExp(
      `^[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ ,.'-]{3,20}$`,
      "g"
    );
    let testNom = nomRegExp.test(inputNom.value);
    console.log(form.lastName.value);
    console.log(testNom);
    //récupération de la balise qui suit le champ de formulaire
    let msg = inputNom.nextElementSibling;
    //on test l'expression régulière
    if (testNom) {
      msg.innerHTML = "Nom valide !";
      msg.style.color = "greenyellow";
      console.log("bon");
      return true;
    } else {
      msg.innerHTML = "Nom non valide !";
      msg.style.color = "red";
      console.log("pas bon");
      alert(
        "Le Nom ne doit pas contenir de chiffres ou caractères spéciaux et doit contenir entre 3 et 20 caractères en Majuscules."
      );
      return false;
    }
  };

  //fonction de validation de l'adresse
  const validAdresse = function (inputAdresse) {
    //création de la reg exp pour validation de Nom
    let adresseRegExp = new RegExp(
      `^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,50}$`,
      "g"
    );
    let testAdresse = adresseRegExp.test(inputAdresse.value);
    console.log(form.address.value);
    console.log(testAdresse);
    //récupération de la balise qui suit le champ de formulaire
    let msg = inputAdresse.nextElementSibling;
    //on test l'expression régulière
    if (testAdresse) {
      msg.innerHTML = "Adresse valide !";
      msg.style.color = "greenyellow";
      console.log("bon");
      return true;
    } else {
      msg.innerHTML = "Adresse non valide !";
      msg.style.color = "red";
      console.log("pas bon");
      alert(
        "L'adresse ne doit pas contenir de caractères spéciaux. Veuillez saisir une adresse valide. Ex: 26 Rue des Archives"
      );
      return false;
    }
  };

  //fonction de validation de la Ville
  const validVille = function (inputVille) {
    //création de la reg exp pour validation de Ville
    let villeRegExp = new RegExp(
      `^[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ ,.'-]{3,20}$`,
      "g"
    );
    let testVille = villeRegExp.test(inputVille.value);
    console.log(form.city.value);
    console.log(testVille);
    //récupération de la balise qui suit le champ de formulaire
    let msg = inputVille.nextElementSibling;
    //on test l'expression régulière
    if (testVille) {
      msg.innerHTML = "Ville valide !";
      msg.style.color = "greenyellow";
      console.log("bon");
      return true;
    } else {
      msg.innerHTML = "Ville non valide !";
      msg.style.color = "red";
      console.log("pas bon");
      alert(
        "La Ville ne doit pas contenir de chiffres ou caractères spéciaux et doit contenir entre 3 et 20 caractères en Majuscules."
      );
      return false;
    }
  };

  //fonction de validation de l'Email
  const validEmail = function (inputEmail) {
    //création de la reg exp pour validation de Email
    let emailRegExp = new RegExp(
      `^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$`,
      "g"
    );
    let testEmail = emailRegExp.test(inputEmail.value);
    console.log(form.email.value);
    console.log(testEmail);
    //récupération de la balise qui suit le champ de formulaire
    let msg = inputEmail.nextElementSibling;
    //on test l'expression régulière
    if (testEmail) {
      msg.innerHTML = "Email valide !";
      msg.style.color = "greenyellow";
      console.log("bon");
      return true;
    } else {
      msg.innerHTML = "Email non valide !";
      msg.style.color = "red";
      console.log("pas bon");
      alert("Veuillez saisir une adresse email valide Ex: exemple@bidule.com.");
      return false;
    }
  };

  //Fonction de récupération des données validées du formulaire et ajout dans le local storage
  function recupDataForm(form) {
    //on met dans un objet les données validées du formulaire
    const contactUser = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      address: form.address.value,
      city: form.city.value,
      email: form.email.value,
    };
    console.log(contactUser);
    //conversion en JSON et stockage dans la clé "produit" du local storage
    localStorage.setItem("userData", JSON.stringify(contactUser));
  }

  //fonction pour envoyer les données du local storage à l'API
  async function sendDataToApi() {
    //on récupère les données du local storage et on les stocke dans des variables
    let contact = JSON.parse(localStorage.getItem("userData"));
    console.log(contact);

    let products = JSON.parse(localStorage.getItem("idsCmde"));
    console.log(products);
    //On met la totalité des données à envoyer dans un objet
    const dataToSend = {
      contact,
      products,
    };
    console.log(dataToSend);
    //Requête de type post avec fetch pour envoyer les données à l'API
    const promise1 = await fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.orderId);
        //location.href = "confirmation.html";
      })
      .catch((err) => alert("Erreur : " + err));      
  }
}


