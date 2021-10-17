 //Déclaration variable "produitDansLocalStorage" pour key et values dans le local storage
 let produitDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
 //JSON.parse pour convertir les données au format JSON en JS dans locol storage
console.log(produitDansLocalStorage);