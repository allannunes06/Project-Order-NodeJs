const port = 3000
const uuid = require('uuid')
const { request, response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())

const orders = []

const checkUserId = (request,response,next) => {
    const {id} = request.params
    const index = orders.findIndex(user => user,id ===id)
    if(index <0) {
        return response.status(404).json({ error: "Order not found"})
    }
    request.userIndex = index
    request.userId = id
    next()
}

app.get('/orders',(request,response) =>{
    return response.json(orders)
})

app.post('/orders', (request,response) =>{
    const{ order,name,price,status} = request.body
    const user = {id: uuid.v4(),order,name,price,status}
    orders.push(user)
    return response.status(201).json(user)
})

app.put('/orders/:id', checkUserId, (request,response) =>{
    const{ order,name,price,status} = request.body 
    const index = request.userIndex
    const id = request.userId
    const updatedUser = { id, order,name,price,status }
    orders[index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/orders/:id', checkUserId, (request,response) =>{
    const index = request.userIndex
    orders.splice(index,1)

    return response.status(204).json()
})




















app.listen(port, () => {
    console.log(`🍔 Server started on port ${port} 🍟`)
})