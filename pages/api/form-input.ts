import clientPromise from "../../lib/mongodb";

export default async function handler(req: { method: any; body:any },res: any){
    try{
    const client = await clientPromise
    const db = client.db("database")
    const {method}=req;
    if (method === "POST") {
        const body=JSON.parse(req.body)
        const post=await db.collection("posts").insertOne(body)    
        res.status(200).json(post);
      }
    if(method==="GET")  {
        const post=await db.collection("posts").find({}).toArray();
        res.json({status:200,data:post})
    }
    }catch(e:any){
        console.error("outer", e.message);
        return res.status(500).send(e);
    }
   
}