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