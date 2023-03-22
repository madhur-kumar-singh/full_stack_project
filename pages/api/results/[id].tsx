import clientPromise from "../../../lib/mongodb";
import { NextApiRequest,NextApiResponse } from "next";
import { ObjectId, } from "mongodb";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("database");
    const { method } = req;
    const {id} = req.query;
    if (method === "GET") {
        const post =await db.collection("posts").findOne({_id:new ObjectId(id as string)});        
        res.json({status:200,data:post})
    }
  } catch (e: any) {
    console.error("outer", e.message);
    return res.status(500).send(e);
  }
}
