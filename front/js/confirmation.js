//Affichage de la commande
const str = window.location.href;
const url = new URL(str);
const orderId = url.searchParams.get("orderId");

document.querySelector("#orderId").innerText = orderId;

