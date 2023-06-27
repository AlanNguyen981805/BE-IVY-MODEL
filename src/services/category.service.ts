//@ts-ignore
import { buildTree } from "../helpers/tranform"
import Category from "../models/category"

export const getCategoriesService = () => 
new Promise(async(resolve, reject) => {
    try {
        const response = await Category.findAll()
        const tree = buildTree(response)
        resolve({
            error: 0,
            message: 'OK',
            data: tree
        })
    } catch (error) {
        reject(error)
    }
})