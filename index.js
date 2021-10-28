const { request, response } = require('express')
const uuid = require('uuid')
const express = require('express')
const port = 3000

const app = express()
app.use(express.json())

const order = []

const middleware = (request, response, next) => {
    const { id } = request.params
    const index = order.findIndex(order => order.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "Order not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}


app.get('/order', (request, response) => {


    return response.json(order)
})

app.post('/order', (request, response) => {
    const { orders, name, price, status } = request.body
    const user = { id: uuid.v4(), orders, name, price, status }

    order.push(user)

    return response.status(201).json(order)
})

app.put('/order/:id', middleware, (request, response) => {
    const { orders, name, price, status } = request.body
    const index = request.userIndex
    const id = request.userId
    const updatedOrder = { id, orders, name, price, status }

    order[index] = updatedOrder

    return response.json(updatedOrder)
})



app.delete('/order/:id', middleware, (request, response) => {
    const index = request.userIndex

    order.splice(index, 1)


    return response.status(204).json()
})


app.listen(port, () => {
    console.log(`🍔Server started on port ${port}🥤`)
})