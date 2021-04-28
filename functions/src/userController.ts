import { Response } from 'express'
import { db } from './config/firebase'

type UserType = {
    nome: string,
    email: string,
    senha: string
}

type Request = {
    body: UserType
}

const addUser = async (req: Request, res: Response) => {
    console.log('body:', JSON.stringify(req.body, null, 2));
    const { nome, email, senha } = req.body
    try {
      const user = db.collection('users').doc(email)
      const userObject = {
        id: user.id,
        nome,
        senha
      }

      user.set(userObject)

      res.status(200).send({
        status: 'success',
        message: 'usuário cadastrado com sucesso',
        data: userObject
      })
    } catch(error) {
        res.status(500).json(error.message)
    }
}

const login = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const userRef = db.collection('users').doc(email);
    const doc = await userRef.get();
    if (!doc.exists) {
      return res.status(404)
    } else {
      return res.status(200).json(doc.data())
    }
  } catch(error) { return res.status(500).json(error.message) }
}

//const getAllEntries = async (req: Request, res: Response) => {
//  try {
//    const allEntries: UserType[] = []
//    const querySnapshot = await db.collection('users').get()
//    querySnapshot.forEach((doc: any) => allEntries.push(doc.data()))
//    return res.status(200).json(allEntries)
//  } catch(error) { return res.status(500).json(error.message) }
//}
//
//const updateUser = async (req: Request, res: Response) => {
//  const { body: { text, title }, params: { userId } } = req
//
//  try {
//    const user = db.collection('users').doc(userId)
//    const currentData = (await user.get()).data() || {}
//    const userObject = {
//      title: title || currentData.title,
//      text: text || currentData.text,
//    }
//
//    await user.set(userObject).catch(error => {
//      return res.status(400).json({
//        status: 'error',
//        message: error.message
//      })
//    })
//
//    return res.status(200).json({
//      status: 'success',
//      message: 'usuário atualizado com sucesso',
//      data: userObject
//    })
//  }
//  catch(error) { return res.status(500).json(error.message) }
//}
//
//const deleteUser = async (req: Request, res: Response) => {
//  const { userId } = req.params
//
//  try {
//    const user = db.collection('users').doc(userId)
//
//    await user.delete().catch(error => {
//      return res.status(400).json({
//        status: 'error',
//        message: error.message
//      })
//    })
//
//    return res.status(200).json({
//      status: 'success',
//      message: 'usuário deletado com sucesso',
//    })
//  }
//  catch(error) { return res.status(500).json(error.message) }
//}

export { addUser, login }