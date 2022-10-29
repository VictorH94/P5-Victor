// Récupération des données de l'API
fetch ("http://localhost:3000/api/products")
.then(function (response){
    return response.json();
})
.then(function(kanaps){
    const allKanap = kanaps;
    console.log(allKanap)   

    for(let articleKanap in allKanap) {
        
        // Insertion de l'élément "a"
        const a = document.createElement('a');
        console.log(a);
        document.querySelector(".items").appendChild(a);
        a.href = `product.html?id=${kanaps[articleKanap]._id}`;
        
        // Insertion de l'élément "article"
        const article = document.createElement('article');
        a.appendChild(article);

        // Insertion de l'image img
        const imageImg = document.createElement('img');
        article.appendChild(imageImg);
        imageImg.src = kanaps[articleKanap].imageUrl;
        imageImg.alt = kanaps[articleKanap].altTxt;
        
        // Insertion du titre "h3"
        const h3Title = document.createElement('h3');
        article.appendChild(h3Title);
        h3Title.classList.add("productName");
        h3Title.innerHTML = kanaps[articleKanap].name;

        // Insertion de la description "p"
        const paraDescription = document.createElement('p');
        article.appendChild(paraDescription);
        paraDescription.innerHTML = kanaps[articleKanap].description;
    }
})
.catch(function (error){
    console.log(error);
})
