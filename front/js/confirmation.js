//Obtention de l'id de confirmation de la commande à partir de l'URL
const str = window.location.href;
const url = new URL(str);
const orderId = url.searchParams.get("orderId");

//Affichage de l'id de confirmation de la commande
document.querySelector("#orderId").innerText = orderId;

//Remise à zéro du panier après la commande d'un ou des articles  par l'utilisateur
localStorage.removeItem("VictorP5");

//Message de remerciement à l'utilisateur pour son achat
document.querySelector(".confirmation > p").innerHTML += "<br><br>Merci de votre achat !";