import product from "../model/productModel.js"

export const createProduct = async(req,res)=>{
   try {
      let newProduct = new product(req.body)
      await newProduct.save()
      res.status(201).send("create", newProduct)
   } catch (error) {
      res.status(500).send("server error")
   }
}

export const deleteProduct = async(req,res)=>{
   let {id}= req.params
   try {
      let deletedProduct = await product.findByIdAndDelete(id)
      if(!deletedProduct){
         res.status(400).send("not deleted")
      }res.status(200).send("deleted")
   } catch (error) {
      res.status(500).send("server error")
   }
}

export const getProducts = async(req,res)=>{
   try {
      let products = await product.find()
      if(!products){
         res.status(404).send("not found")
      }res.status(200).send(products)
   } catch (error) {
      res.status(500).send("server error")
   }
}