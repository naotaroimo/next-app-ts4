import Link from "next/link";
import React, { useRef, useState } from "react";

const Login = () => {

    //入力フォームの値
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    //レスポンス内容の格納用(今回は型定義省略)
    const [message, setMessage] = useState<any>(null);

    async function handleLogin() {
        //fetch関数でpostする
        const res = await fetch(
            'http://localhost:3000/api/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        email: emailRef.current?.value,
                        password: passRef.current?.value
                    }
                )
            }
        );

        const json = await res.json();

        //受け取った内容を表示用に値をセットする
        setMessage(json);
    }

    return (
        <div>
            <input type="text" placeholder="email" ref={emailRef} />
            <input type="password" placeholder="password" ref={passRef} />
            <button onClick={handleLogin}>Login</button>

            <div>
                {JSON.stringify(message, null, 4)}
            </div>
            <div>
                <Link href="./">
                    <a>HOME</a>
                </Link>
            </div>

        </div>
    );
}

export default Login