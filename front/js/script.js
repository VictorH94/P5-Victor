//Fonction qui gère l'insertion des éléments dans la page index.html(dans le DOM)
function displayKanap(kanap){
      // Insertion de l'élément "a"
      const a = document.createElement('a');
      document.querySelector(".items").appendChild(a);
      a.href = `./product.html?id=${kanap._id}`;
                              
      // Insertion de l'élément "article"
      const article = document.createElement('article');
      a.appendChild(article);

      // Insertion de l'image img
      const imageImg = document.createElement('img');
      article.appendChild(imageImg);
      imageImg.src = kanap.imageUrl;
      imageImg.alt = kanap.altTxt;
      
      // Insertion du titre "h3"
      const h3Title = document.createElement('h3');
      article.appendChild(h3Title);
      h3Title.classList.add("productName");
      h3Title.innerHTML = kanap.name;

      // Insertion de la description "p"
      const paraDescription = document.createElement('p');
      article.appendChild(paraDescription);
      paraDescription.classList.add("productDescription");
      paraDescription.innerHTML = kanap.description;
}

//Fonction qui gère l'affichage de tous les articles
function displayKanaps(allKanap){
    for(let kanap of allKanap) {
    displayKanap(kanap);
    }
}

// Fonction qui récupère et qui affiche l'ensemble des produits de l'API
function run(){
fetch ("http://localhost:3000/api/products")
.then (function(response) {
    return response.json();
})

.then(function(kanaps){
    const allKanap = kanaps;

    //Appel de la fonction displayKanaps() pour afficher tous les articles
    displayKanaps(allKanap);
    
})
//Affichage du message d'erreur s'il y a l'erreur
.catch(function (error){
    console.log(error);
})
}

//Appel de la fonction run() 
run();

