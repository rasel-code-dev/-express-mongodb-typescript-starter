import dbConnect from "../database";
import * as mongoDB from "mongodb"
import{ ObjectId} from "mongodb"


interface fieldsType{
  title?: string,
  price?: number,
  discount?: number
  customer_id?: string
  created_at?: string,
  attributes?: object,
  cover_photo?: string,
  images?: string[],
  updated_at?: string,
  seller_id?: string,
  _id?: string
  category_id?: string
  brand_id?: string
  qty?: number,
  sold?: number,
  views?: number,
}

class Product {
  protected fields?: fieldsType = {
    title: "",
    price: 0,
    discount: 0,
    customer_id: "",
    created_at: "",
    attributes: {},
    cover_photo: "",
    images: [],
    updated_at: "",
    seller_id: "",
    _id: "",
    category_id: "",
    brand_id: "",
    qty: 0,
    sold: 0,
    views: 0,
  };

  protected client?: mongoDB.MongoClient
  protected collection?: mongoDB.Collection
  
  constructor(fields?: fieldsType) {
    this.fields = fields
  }
  
  // getCollection with Static Method............
  static getCollection(){
    return new Promise<{collection: mongoDB.Collection, client: mongoDB.MongoClient}>(async (resolve, reject)=>{
      try {
        let {c, client} = await dbConnect("products")
        resolve({collection: c, client: client})
      } catch (ex){
        reject({collection: undefined, client: undefined})
      }
    })
    
  }
  
  
  protected async dbConnect(){
    try {
      let { c, client} = await dbConnect("products")
      this.client = client
      this.collection = c
      
    } catch (ex){
      console.log(ex)
    }
  }
  
  insertInto(values: fieldsType){
    return new Promise(async (resolve, reject)=>{
      try {
        await this.dbConnect()
        let {_id, ...other} = values
        let cursor = await this.collection?.insertOne({
          ...other,
          created_at: new Date(),
          updated_at: new Date()
        })
        // console.log(cursor, other)
        resolve(cursor)
        
        this.client?.close()
        
      } catch (ex){
        this.client?.close()
        resolve(new Error(ex.message))
      } finally {
        this.client?.close()
      }
    })
  }
  
  update(values: fieldsType){
    return new Promise(async (resolve, reject)=>{
      try {
    
        await this.dbConnect()
        let {_id, ...other} = values
        let cursor = await this.collection?.findOneAndUpdate({_id: new ObjectId(_id)},
          {
            $set: {
              ...other,
              updated_at: new Date()
            }
        })
        console.log(cursor, other)
        resolve(cursor)

        this.client?.close()
        
      } catch (ex){
        reject(new Error(ex.message))
      }
      finally {
        this.client?.close()
      }
    })
  }
  
  find(attribute: fieldsType){
    return new Promise(async (resolve, reject)=>{
      try {
        await this.dbConnect()
        let attr = {}
        if (attribute){
          attr = attribute
        }
        let cursor = this.collection?.find(attr)
        let products: fieldsType[] = []
        await cursor.forEach(p=>{
          products.push(p)
        })
        resolve(products)
        this.client?.close()
        
      } catch (ex){
        reject(new Error(ex.message))
      }
      finally {
        this.client?.close()
      }
    })
  }
  
}

export default Product