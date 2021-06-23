import { Response } from 'express'
import { db } from './config/firebase'
import { v4 as uuidv4 } from 'uuid';

type ProductType = {
  id: string,
  nome: string,
  categoria_id: string,
  descricao: string
}

type Request = {
  body: ProductType,
  params?: any
}

const addProduct = async (req: Request, res: Response) => {
  const { nome, categoria_id, descricao } = req.body
  const { id } = req.params

  let productId: string;
  if (id) {
    productId = id
  }
  else {
    productId = uuidv4()
  }

  try {
    const product = await db.collection('products').doc(productId)
    const productObject = {
      id: productId,
      nome: nome,
      categoria_id: categoria_id,
      descricao: descricao
    }

    product.set(productObject)

    res.status(200).send({
      status: 'success',
      message: id ? 'produto atualizado com sucesso' : 'produto cadastrado com sucesso',
      data: productObject
    })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await db.collection('products').doc(id)

    await product.delete().catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    })

    return res.status(200).json({
      status: 'success',
      message: 'produto deletado com sucesso',
    })
  }
  catch (error) { return res.status(500).json(error.message) }
}

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.collection('products')
    products.get().then((querySnapshot) => {
      const tempDoc: any = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() })
      });
      res.status(200).send({
        status: 'success',
        message: 'produtos obtidos com sucesso',
        produtos: tempDoc
      });
    })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const doc = await (await db.collection('products').where('id', '==', id).get()).docs[0];
    const product = {
      id: doc.id,
      nome: doc.data().nome,
      descricao: doc.data().descricao,
      categoria_id: doc.data().categoria_id
    }

    res.status(200).send({
      status: 'success',
      message: 'produto obtido com sucesso',
      product: product
    })
  } catch(error) {
      res.status(500).json(error.message)
  }
}

export { addProduct, deleteProduct, getProducts, getProductById }