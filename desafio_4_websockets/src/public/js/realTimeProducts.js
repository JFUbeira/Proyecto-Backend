const socketClient = io()

socketClient.emit('message', 'Hello from realTimeProducts.js')

const button = document.querySelector('#button')

socketClient.on('products', (data) => {
    console.log(data)

    const div = document.querySelector('.product-list')

    div.innerHTML = `${data.map(product => `<li class='product-item'>${product.title}</li>`).join('')}`
})

button.addEventListener('click', (evt) => {
    evt.preventDefault()

    const title = document.querySelector('#title')
    const description = document.querySelector('#description')
    const price = document.querySelector('#price')
    const thumbnail = document.querySelector('#thumbnail')
    const code = document.querySelector('#code')
    const stock = document.querySelector('#stock')
    const category = document.querySelector('#category')

    const product = {
        title: title.value,
        description: description.value,
        price: price.value,
        thumbnail: thumbnail.value,
        code: code.value,
        stock: stock.value,
        category: category.value
    }

    socketClient.emit('formData', product)
})