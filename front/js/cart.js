//Récupération des données depuis le localStorage (depuis la page Panier, on récupère le panier (l’array) via localStorage)
let cartStorage = localStorage.VictorP5;
let cartStorageWithInfo = [];

//Sélection de l'élément form du formulaire
const orderForm = document.querySelector(".cart__order__form");

//Fonction qui vérifie et qui teste s'il y a des erreurs dans les 5 champs du formulaire saisi par l'utilisateur
//Donc pour ça, on utilise les 5 regex (Expressions régulières) pour tester la validité des 5 champs du formulaire "Prénom", "Nom", "Adresse", "Ville" et "Email".
function verifyForm(firstName, lastName, address, city, email) {
  let errors = 0;
  const errorFields = document.querySelectorAll(".cart__order__form p");
  for (let i = 0; i < errorFields.length; i++) {
    errorFields[i].innerText = "";
  }
  if (!/^(?=.{1,50}$)[a-zA-Z \-]+$/.test(firstName)) {
    document.querySelector("#firstNameErrorMsg").innerText =
      "Ce champs Prénom est mal formatté";
    errors++;
  }
  if (!/^(?=.{1,50}$)[a-zA-Z \-]+$/.test(lastName)) {
    document.querySelector("#lastNameErrorMsg").innerText =
      "Ce champs Nom est mal formatté";
    errors++;
  }
  if (!/^[a-zA-Z0-9\s,'-é]*$/.test(address)) {
    document.querySelector("#addressErrorMsg").innerText =
      "Ce champs Adresse est mal formatté";
    errors++;
  }
  if (
    !/^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/.test(
      city
    )
  ) {
    document.querySelector("#cityErrorMsg").innerText =
      "Ce champs ville est mal formatté";
    errors++;
  }
  if (!/^[A-Za-z0-9+_.-]+@(.+)$/.test(email)) {
    document.querySelector("#emailErrorMsg").innerText =
      "Ce champs est mal formatté, veuillez entrer une adresse email valide";
    errors++;
  }
  //On remet les erreurs à 0
  return errors === 0;
}
//Envoi des informations client au localstorage
function sendOrder(firstName, lastName, address, city, email) {
  const body = {
    contact: { firstName, lastName, address, city, email },
    products: cartStorage.map(function (cartItem) {
      return cartItem.id;
    }),
  };

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      document.location.href = "./confirmation.html?orderId=" + result.orderId;
    });
}

//Ecoute du clic addEventListener quand l'utilisateur va appuyer sur le bouton "Commander" et envoi du formulaire au serveur
orderForm.addEventListener("submit", function (e) {
  e.preventDefault();

  //Informations saisi par l'utilisateur dans les champs "firstName", "lastName", "address", "city", "email" du formulaire
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const address = document.querySelector("#address").value;
  const city = document.querySelector("#city").value;
  const email = document.querySelector("#email").value;
  
  //Appel à la fonction verifyForm() pour vérifier s'il y a des erreurs ou pas
  const noErrors = verifyForm(firstName, lastName, address, city, email);

  //s'il n'y a pas d'erreurs
  if (noErrors === true) {

    //Appel à la fonction sendOrder() pour envoyer le formulaire au serveur backend
    sendOrder(firstName, lastName, address, city, email);
  }
});
//Sélection de la quantité totale des articles
const totalQuantityElt = document.querySelector("#totalQuantity");
let totalQuantity = 0;

//Sélection du prix total
const totalPriceElt = document.querySelector("#totalPrice");
let totalPrice = 0;

// Si le panier est vide, on affiche votre panier est vide
if (!cartStorage) {
  document.querySelector("h1").innerText = "Votre panier est vide";

  // Sinon si le panier n'est pas vide
} else {
  //Récupération et transformation du contenu string JSON en objet JS
  cartStorage = JSON.parse(cartStorage);

  //Déclaration d'un array promises en tableau vide
  const promises = [];

  //La boucle for va parcourir chaque élément du tableau
  for (let i = 0; i < cartStorage.length; i++) {
    const kanap = cartStorage[i];
    const promise = new Promise(function (resolve) {
      fetchOneProduct(kanap.id).then(function (result) {
        
        // Update de l'ajout de la quantité totale
        totalQuantity += Number(kanap.quantity);

        //Update de l'ajout du prix total
        totalPrice += Number(result.price) * Number(kanap.quantity);

        resolve({
          id: kanap.id,
          quantity: kanap.quantity,
          color: kanap.color,
          imageUrl: result.imageUrl,
          altTxt: result.altTxt,
          name: result.name,
          price: result.price,
        });
      });
    });
    //Ajout des éléments dans le tableau
    promises.push(promise);
  }
  //Récupération des données updatées du tableau
  Promise.all(promises).then(function (data) {
    cartStorageWithInfo = data;

    //Affichage de la quantité totale des articles commandés par l'utilisateur
    totalQuantityElt.innerText = totalQuantity;

    //Affichage du prix total des articlees commandés par l'utilisateur
    totalPriceElt.innerText = totalPrice;

    //Parcourir des éléments dans le tableau avec la boucle for of + Création et insertion des éléments dans la page Panier (dans le DOM)
    for (let kanap of cartStorageWithInfo) {
      // Insertion de l'élément "article"
      const article = document.createElement("article");
      document.querySelector("#cart__items").appendChild(article);
      article.className = "cart__item";
      article.setAttribute("data-id", kanap.id);
      article.setAttribute("data-color", kanap.color);

      // Insertion de l'élément "div"
      const divImg = document.createElement("div");
      article.appendChild(divImg);
      divImg.className = "cart__item__img";

      // Insertion de l'élément "img"
      const img = document.createElement("img");
      divImg.appendChild(img);
      img.src = kanap.imageUrl;
      img.alt = kanap.altTxt;

      // Insertion de l'élément "div"
      const divContent = document.createElement("div");
      article.appendChild(divContent);
      divContent.className = "cart__item__content";

      // Insertion de l'élément "div"
      const divDescription = document.createElement("div");
      divContent.appendChild(divDescription);
      divDescription.className = "cart__item__content__description";

      // Insertion du titre h2
      const h2 = document.createElement("h2");
      divDescription.appendChild(h2);
      h2.innerHTML = kanap.name;

      // Insertion de l'élément "p" pour la couleur
      const pColor = document.createElement("p");
      divDescription.appendChild(pColor);
      pColor.innerHTML = kanap.color;

      // Insertion de l'élément "p" pour le prix
      const pPrice = document.createElement("p");
      divDescription.appendChild(pPrice);
      pPrice.innerHTML = kanap.price + " €";

      // Insertion de l'élément "div"
      const divSettings = document.createElement("div");
      divContent.appendChild(divSettings);
      divSettings.className = "cart__item__content__settings";

      // Insertion de l'élément "div"
      const divQuantity = document.createElement("div");
      divSettings.appendChild(divQuantity);
      divQuantity.className = "cart__item__content__settings__quantity";

      // Insertion de l'élément "p" pour la quantité
      const pQuantity = document.createElement("p");
      divQuantity.appendChild(pQuantity);
      pQuantity.innerHTML = "Qté : ";

      // Insertion de l'élément "input"
      const input = document.createElement("input");
      divQuantity.appendChild(input);
      input.setAttribute("type", "number");
      input.className = "itemQuantity";
      input.setAttribute("name", "itemQuantity");
      input.setAttribute("min", "1");
      input.setAttribute("max", "100");
      input.setAttribute("value", kanap.quantity);

      //Ecoute du clic addEventLstener quand l'utilisateur clique sur l'input de Qté pour modifier la quantité d'articles du panier + update de la nouvelle quantité totale et prix total dans le localStorage.
      input.addEventListener("change", function () {
        const index = cartStorage.findIndex(
          (item) => item.id == kanap.id && item.color == kanap.color
        );
        totalPrice +=
          (this.value - cartStorage[index].quantity) * Number(kanap.price);
        totalQuantity += this.value - cartStorage[index].quantity;
        totalPriceElt.innerText = totalPrice;
        totalQuantityElt.innerText = totalQuantity;
        cartStorage[index].quantity = this.value;
        cartStorageWithInfo[index].quantity = this.value;
        localStorage.VictorP5 = JSON.stringify(cartStorage);
      });

      // Insertion de l'élément "div"
      const divDelete = document.createElement("div");
      divSettings.appendChild(divDelete);
      divDelete.className = "cart__item__content__settings__delete";

      // Insertion de l'élément "p" pour la suppression de la quantité
      const pDelete = document.createElement("p");
      divDelete.appendChild(pDelete);
      pDelete.className = "deleteItem";
      pDelete.innerHTML = "Supprimer";

      //Ecoute du clic addEventListener quand l'utilsateur clique sur le bouton de suppression pour supprimer un article ou des articles du panier.
      pDelete.addEventListener("click", function () {
        const index = cartStorage.findIndex(
          (item) => item.id == kanap.id && item.color == kanap.color
        );
        totalPrice -= cartStorage[index].quantity * Number(kanap.price);
        totalQuantity -= cartStorage[index].quantity;

        //Update du prix de la quantité dans le HTML (dans le DOM)
        totalPriceElt.innerText = totalPrice;
        totalQuantityElt.innerText = totalQuantity;
        
        //Update du panier
        cartStorage.splice(index, 1);
        cartStorageWithInfo.splice(index, 1);
        localStorage.VictorP5 = JSON.stringify(cartStorage);
        
        //Suppresion de l'article de la liste du ponier
        article.remove();
      });
    }
  });
}
//Fonction qui renvoie la promesse qui va récupérer un produit à l'unité et qui sera appelé autant de fois qu'il y a de kanapé dans le panier.
async function fetchOneProduct(id) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`);
  const kanap = await response.json();
  return kanap;
}
