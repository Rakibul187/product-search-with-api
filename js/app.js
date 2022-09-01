// =================load data=====================
const loadAllProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products")
    const data = await response.json()
    return data;
}
// ==================set menu by categories================
const setAllMenu = async () => {
    // loadAllProducts()
    //     .then(data => console.log(data))
    const data = await loadAllProducts();
    // console.log(data)
    const menu = document.getElementById('all-menu')
    const uniqueArray = [];
    for (const product of data) {
        // console.log(product)
        if (uniqueArray.indexOf(product.category) === -1) {
            uniqueArray.push(product.category)
            const li = document.createElement('li')
            li.innerHTML = `
              <a>${product.category}</a>`
            menu.appendChild(li)
        }
    }
}

setAllMenu()
// loadAllProducts()
// ==============================search field=========================
document.getElementById('search-field').addEventListener('keypress', async (event) => {
    // console.log(event.key)
    if (event.key === 'Enter') {
        // console.log(event.target.value)
        // console.log(event.key)
        const searchField = event.target.value;
        // console.log(searchField)
        const allProducts = await loadAllProducts();
        // console.log(allProducts)
        const foundProducts = allProducts.filter(product => product.category.includes(searchField))
        // console.log(foundProducts)
        const notFound = document.getElementById('not-found');
        notFound.innerText = '';
        if (foundProducts.length === 0) {
            return notFound.innerText = `Not Found !! Try Others Something!`
        }
        const productContainer = document.getElementById('products-container');
        productContainer.textContent = "";

        foundProducts.forEach(product => {
            console.log(product)
            const { category, title, image, price, description } = product;
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
             <div class="card card-compact w-100 bg-orange-100 shadow-xl">
                    <figure ><img class="h-60 w-full p-2"  src="${image}" /></figure>
               <div class="card-body">
                     <h2 class="card-title">${category}</h2>
                     <p>${title.length > 30 ? title.slice(0, 30) + "..." : title}</p>
                    <div class="card-actions justify-end">
                    <label onclick="showDetail('${price}','${image}','${description}')" for="my-modal-3" class="border border-0 btn bg-orange-500 modal-button">Show Details</label>
                     </div>
                </div>
            </div>    
            `;
            productContainer.appendChild(productDiv)
        });

    }
})

const showDetail = async (price, image, description) => {
    console.log(description, price, image)

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <img  src="${image}" >
    <h3 class="text-lg font-bold">Price: ${price}</h3>
    <p class="py-4">Description: ${description}</p>
    `
}