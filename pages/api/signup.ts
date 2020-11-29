import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { hash } from 'bcrypt';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {

    //DBを開く
    const db = await open(
        {
            filename: './mydb.sqlite',
            driver: sqlite3.Database
        }
    );

    //POSTをうける
    if (req.method === 'POST') {
        //bcryptのhashで
        hash(req.body.password,
            10,
            async function (err, hash) {

                //insert文を発行
                const statement = await db.prepare(
                    'INSERT INTO Person (name, email, password) values (?,?,?)'
                );

                const result = await statement.run(
                    req.body.name,
                    req.body.email,
                    hash
                );

                //デバッグ用に出力（実際はセキュリティのためpasswordカラムはとらない）
                const person = await db.all('select * from person');
                res.json(person);
            }
        );

    } else {
        res.status(405).json(
            { message: 'We Only Support POST method!' }
        );
    }

}