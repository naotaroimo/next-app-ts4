import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from 'sqlite3';
import { open } from "sqlite";
import { authenticated } from "./handler";

//上記のエラーハンドリングでラッピングする
export default authenticated(
    //ここにapiの処理を書く
    async function getPeople(req: NextApiRequest, res: NextApiResponse) {

        //db Open
        const db = await open(
            {
                filename: './mydb.sqlite',
                driver: sqlite3.Database
            }
        );

        const people = await db.all('select id, name, email from person');
        res.json(people);

    }

);

/*
export default async function getPeople(req: NextApiRequest, res: NextApiResponse) {

    //ヘッダー内の「authorization」の値（＝JWTを仕込んだ部分）を渡す
    verify(req.headers.authorization!,
        '704d410c-e2c7-4de8-af06-06994e445d8e', //今回JWT作成に使っているsecret
        async function (err, decoded) {
            if (!err && decoded) {
                const db = await open(
                    {
                        filename: './mydb.sqlite',
                        driver: sqlite3.Database
                    }
                );

                const people = await db.all('select id, name, email from person');

                res.json(people);
            }

            res.status(401).json(
                { message: 'you are not authenticated.' }
            );
        }
    )
}
*/