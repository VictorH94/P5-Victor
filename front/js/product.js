//Récupération de l'id via les paramètres de l'url
const str = window.location.href;
const url = new URL(str);
const idProduct = url.searchParams.get("id");
console.log(idProduct);

// Récupération des articles de l'API avec idProduct
let articleKanap = function () {
  fetch(`http://localhost:3000/api/products/${idProduct}`)
  .then((response) => response.json())
  
   // Répartition des données de l'API dans le DOM
  .then((kanap) => {
    console.log(kanap);

     // Insertion de l'image img 
    let img = document.createElement("img");
    document.querySelector(".item__img").appendChild(img);
    img.src = kanap.imageUrl;
    img.alt = kanap.altTxt;
          
     // Modification du titre "h1"
    let title = document.getElementById("title");                               
    title.innerHTML = `${kanap.name}`;                              
     
     // Modification du prix
    let price = document.getElementById("price");
    price.innerHTML = `${kanap.price}`;

     // Modification de la description
    let description = document.getElementById("description");
    description.innerHTML = `${kanap.description}`;                       

     // Insertion des options de couleurs
    let color = document.getElementById("colors");
    let innerHTML = '';
    for (let i = 0, l = kanap.colors.length; i < l; i++) {
      innerHTML += `<option value="${kanap.colors[i]}">${kanap.colors[i]}</option>`;
    }
    color.innerHTML = innerHTML;
    let qty = document.getElementById('quantity');
    
    //Ecoute du clic(addEventLister) quand l'utilisateur clique sur le bouton (Ajout du panier) + ajout un ou des produits dans le panier selon le choix des utilisateur.
    document.querySelector('#addToCart').addEventListener ('click', function() {
      if (qty.value > 0 && qty.value <= 100) {
        //Récupération des données du contenu du tableau s'il y en a
         let VictorP5 = localStorage.VictorP5;
         if (!VictorP5) {
              VictorP5 = [];
         }   
         else {
          //Transformation des données au format string JSON en objet JavaScript
            VictorP5 = JSON.parse(VictorP5);
         } 
         //La méthode findIndex() renvoie l'indice du premier élément du tableau qui satisfait une condition donnée par une fonction. Si la fonction renvoie faux pour tous les éléments du tableau, le résultat vaut -1
         let indexProduct = VictorP5.findIndex(function(el){
              return el.id === idProduct && el.color === color.value;
         })
         console.log(indexProduct, VictorP5, idProduct, color.value);

         // Si le produit commandé par l'utilisateur est déjà dans le panier et s'il commande un autre le même produit, même couleur, on remplace l'ancien produit par le nouveau produit.
         if (indexProduct > -1) {
          VictorP5.splice(indexProduct, 1)
        }
         //Stockage des données récupérées dans le localStorage
         VictorP5.push({id: idProduct, color: color.value, quantity: parseInt(qty.value)})   
         //Récupération des données au format objet JavaScript transformé en string JSON  
        localStorage.VictorP5 = JSON.stringify(VictorP5);
      }
      else {
         alert("La quantité sélecionnée n'est pas valide");
      }     
    })
  });
};   
articleKanap();


