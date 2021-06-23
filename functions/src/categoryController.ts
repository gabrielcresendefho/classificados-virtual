import { Response } from 'express'
import { db } from './config/firebase'
import {v4 as uuidv4} from 'uuid';

type CategoryType = {
    id: string,
    nome: string
}

type Request = {
    body: CategoryType,
    params?: any
}

const addCategory = async (req: Request, res: Response) => {
    const { nome } = req.body
    const { id } = req.params

    let categoryId: string;
    if(id){
      categoryId = id
    }
    else{
      categoryId = uuidv4()
    }

    try {
      const category = await db.collection('categories').doc(categoryId)
      const categoryObject = {
        id: categoryId,
        nome: nome
      }

      category.set(categoryObject)

      res.status(200).send({
        status: 'success',
        message: id ? 'categoria atualizada com sucesso' : 'categoria cadastrada com sucesso',
        data: categoryObject
      })
    } catch(error) {
        res.status(500).json(error.message)
    }
}

const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const products = await db.collection('products').where('categoria_id', '==', id).get();
    if(products && products.size > 0){
      return res.status(400).json({
        status: 'bad request',
        message: 'Categoria possui produtos cadastrados'
      })
    }

    const category = await db.collection('categories').doc(id)

    await category.delete().catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    })

    return res.status(200).json({
      status: 'success',
      message: 'categoria deletada com sucesso',
    })
  }
  catch(error) { return res.status(500).json(error.message) }
}

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await db.collection('categories')
    categories.get().then((querySnapshot) => {
      const tempDoc: any = [];
      querySnapshot.forEach((doc) => {
         tempDoc.push({ id: doc.id, ...doc.data() })
      });
      res.status(200).send({
        status: 'success',
        message: 'categorias obtidas com sucesso',
        categorias: tempDoc
      });
    })
  } catch(error) {
      res.status(500).json(error.message)
  }
}

const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const category = await db.collection('categories').where('id', '==', id).get();

    res.status(200).send({
      status: 'success',
      message: 'categoria obtida com sucesso',
      data: category
    })
  } catch(error) {
      res.status(500).json(error.message)
  }
}

export { addCategory, deleteCategory, getCategories, getCategoryById }