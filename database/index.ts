
import * as mongoDB from "mongodb"
import * as dotenv from "dotenv";



dotenv.config();
export const typeOrmConfig: any = {
  DB_CONN_STRING: process.env.DB_CONN_STRING,
  DB_NAME: process.env.DB_NAME
}

interface T{
  c?: mongoDB.Collection,
  db: mongoDB.Db,
  client: mongoDB.MongoClient
}


function dbConnect(collectionName?: string){
  
  // const client = new mongoDB.MongoClient("mongodb://localhost:27017")
  const client = new mongoDB.MongoClient(typeOrmConfig.DB_CONN_STRING)
  
  //{
  //   // useNewUrlParser: true,
  //   useUnifiedTopology: true
  // }

  return new Promise<T>(async (resolve, reject) => {
    try {
      await client.connect()
      const db = client.db(typeOrmConfig.DB_NAME);
      // const db = client.db(typeOrmConfig.DB_NAME);
      
      if(collectionName){
        resolve({c: db.collection(collectionName), client: client, db: undefined})
      } else {
        resolve({db: db, client: client, c: undefined})
      }
    } catch (ex){
      reject(new Error(ex))
    }
  })
}

export default dbConnect

