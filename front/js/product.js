//Fonction globale qui va récupèrer l'ID du canapé selectionné et l'afficher dans la page product.
(async function () {
  const canapeId = getCanapeId();
  console.log(canapeId);
  const canap = await apiCanape(canapeId);
  console.log(canap);
  affichCanap(canap);
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
