fetch ("http://localhost:3000/api/products")
.then(function (response){
    return response.json();
})
.then(function(kanaps){
console.log(kanaps)    
const kanapsSection = document.getElementById('items');
const firstKanap = kanaps[0]
console.log(firstKanap)
const a = document.createElement('a');
console.log(a);
a.setAttribute("href", "./product.html?id=" + firstKanap._id)
kanapsSection.appendChild(a)
const article = document.createElement('article');
console.log(article);
a.appendChild(article)
})
.catch(function (error){
    console.log(error);
})
// <!-- <a href="./product.html?id=42">
// <article>
//   <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
//   <h3 class="productName">Kanap name1</h3>
//   <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
// </article>
// </a> -->