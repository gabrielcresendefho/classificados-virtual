import * as functions from 'firebase-functions'
import * as express from 'express'
import { addUser, login } from './userController'
import * as cors from 'cors'

const options: cors.CorsOptions = {
    origin: true
}

const app = express()
app.use(cors(options))

app.get('/', (req, res) => res.status(200).send('Hey there!'))
app.post('/users', addUser)
app.post('/login', login)

exports.app = functions.https.onRequest(app)