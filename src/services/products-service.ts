import { config } from '../config'
import { Product } from '../types/types'

const baseApiUrl = config.apiUrlProducts

export const getProductsApi = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${baseApiUrl}/items`)
    if(!res.ok) throw new Error('Check your network')
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Hubo un error, por favor intenta de nuevo')
  }
}