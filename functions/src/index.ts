import * as functions from 'firebase-functions'
import * as express from 'express'
import { addUser, login } from './userController'
import { addCategory, deleteCategory, getCategories, getCategoryById } from './categoryController'
import { addProduct, deleteProduct, getProducts, getProductById } from './productController'
import * as cors from 'cors'

const options: cors.CorsOptions = {
    origin: true
}

const app = express()
app.use(cors(options))

app.get('/', (req, res) => res.status(200).send('Hey there!'))
app.post('/users', addUser)
app.post('/login', login)
app.post('/categories', addCategory)
app.put('/categories/:id', addCategory)
app.delete('/categories/:id', deleteCategory)
app.get('/categories', getCategories)
app.get('/categories/:id', getCategoryById)
app.post('/products', addProduct)
app.put('/products/:id', addProduct)
app.delete('/products/:id', deleteProduct)
app.get('/products', getProducts)
app.get('/products/:id', getProductById)

exports.app = functions.https.onRequest(app)