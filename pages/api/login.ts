import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { compare } from 'bcrypt';
import {sign} from 'jsonwebtoken';
import cookie from 'cookie';

export default async function login(req:NextApiRequest,res:NextApiResponse){

   const db = await open(
       {
           filename:'./mydb.sqlite',
           driver:sqlite3.Database
       }
   );

   //login用にPOSTをうける
   if(req.method === 'POST'){

       //ユニークな値としてemailを使ってみる
       const person = await db.get('select * from person where email = ?',[req.body.email]);

       //リクエストbody内のパスワード（平文）と、DB内のパスワード（ハッシュ化済み）を比較
       compare(req.body.password, 
               person.password, 
               function(err,result){
                   if (!err && result){

                    //JWTのペイロード部分を設定
                       //予約語「sub」には一意に決まるものを入れたい⇒idを設定
                       //後はカスタム識別子に設定
                       const claims = {
                        sub:person.id,
                        myPersonName:person.name,
                        myPersonEmail:person.email,
                    };
                    
                    //JWTを作成する（今回のsecretは適当にオンラインのサイトで生成したGUID/UUIDを設定）
                    const jwt = sign(claims,'704d410c-e2c7-4de8-af06-06994e445d8e',{ expiresIn: '1h' });

                       //レスポンスヘッダーにCookieをセット
                       res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                                httpOnly:true,
                                secure: process.env.NODE_ENV !== 'development',
                                sameSite:'strict',
                                maxAge:3600,
                                path:'/'
                       }));

                       res.json({message:'welcome !'});

                   }else{
                       //（パスワードが違う場合）メッセージ上は何かが間違ってる旨だけを伝える
                       res.json(
                           {message:'something wrong !'}
                       );
                   }
               }
       );

   }else{
       //405 エラー（Method Not Allowed）
       res.status(405).json(
           {
               message:'We only  support POST'
           }
       );
   }

}