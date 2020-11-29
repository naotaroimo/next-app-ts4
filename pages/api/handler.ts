import { NextApiRequest,NextApiResponse, NextApiHandler } from "next";
import {verify} from 'jsonwebtoken';

//apiとして作成した関数をNextApiHandlerとして受け取る
export const authenticated = (fn:NextApiHandler) => async(
   req:NextApiRequest,
   res:NextApiResponse
   )=>{
       //ハンドラ内でJWT検証
       verify(req.headers.authorization!,
           '704d410c-e2c7-4de8-af06-06994e445d8e',
           async function(err, decoded){

               if(!err && decoded){
               //ハンドラに渡された関数をコール（apiをコール）
                   return await fn(req,res);
               }

               //JWT不一致
               res.status(401).json(
                   {message:'you are not authenticated.'}
               );

           }
       )

}