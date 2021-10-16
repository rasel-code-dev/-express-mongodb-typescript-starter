import express, { Request, Response, NextFunction } from 'express';
import Product from "./models/Product";
import dbConnect from "./database";
import {ObjectId} from "mongodb";


const app = express()



app.get("/insert", async (req: Request, res: Response, next: NextFunction)=>{
  let product = new Product()
  try {
    let result = await product.insertInto({
      attributes: undefined,
      brand_id: "",
      category_id: "",
      cover_photo: "",
      created_at: "",
      images: [],
      qty: 0,
      seller_id: "",
      sold: 0,
      updated_at: "",
      views: 0,
      title: "This is product Title",
      price: 213,
      discount: 21,
      customer_id: "32444444444"
    })
    
    res.send(result)
    
  } catch (ex){
    res.send(ex.message)
  }
})

app.get("/update", async (req: Request, res: Response, next: NextFunction)=>{
  try {
    let product = new Product()
  
    // product.update({
    //   _id: "616a69b5dd303a51d707b6fc",
    //   brand_id: "nannying"
    // })
 
  
    let products = await product.find({})
    res.send(products)
    
    // raw operation from model.......
    // let client;
    // try {
    //   let {collection, client:cc} = await Product.getCollection()
    //   client = cc
    //   let c = collection.find({price: 350.5})
    //   let pp = []
    //   await c.forEach(cc => {
    //     pp.push(cc)
    //   })
    //
    //   client?.close()
    //   res.send(pp)
    //
    // } catch (ex){
    //   console.log(ex.message)
    // } finally {
    //   client?.close()
    // }
    
  } catch (ex){
    res.send(ex.message)
  } finally {
  
  }
})


app.get("/getRaw", async (req: Request, res: Response, next: NextFunction)=>{
  let client;
  try {
    let { db, client: cc} = await dbConnect()
    client = cc
    let ProductCollection = db.collection("products")
    
    let p = await ProductCollection.findOne({_id: new ObjectId("6148d80a841259e445116639")})
    res.send(p)
    
  } catch (ex){
  
  } finally {
    client?.close()
  }
})





app.listen(1000, ()=>console.log("express server is running on port 1000"))