/* Fonction globale qui s'auto appelle pour récupérer les données de l'API et afficher les produits dans la page d'acceuil */
(async function () {
  const canapes = await apiCall();
  console.log(canapes);
  for (canape of canapes) {
    affichCanape(canape);
  }
})();

// fonction d'appel de l'API
function apiCall() {
  let url = "http://localhost:3000/api/products";
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

// fonction d'affichage des canapés dans la page d'acceuil
function affichCanape(canape) {
  document.getElementById("items").innerHTML += `
  <a href="./product.html?id=${canape._id}">
    <article>
      <img src="${canape.imageUrl}" alt="${canape.altTxt}">
      <h3 class="productName">${canape.name}</h3>
      <p class="productDescription">${canape.description}</p>
    </article>
  </a>`;
}
