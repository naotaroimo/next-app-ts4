import { useRef, useState } from "react";

const Signup = () => {

    //入力フォームの値
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    //レスポンス内容の格納用(型定義は省略)
    const [message, setMessage] = useState<any>(null);

    async function handleSignup() {

        //fetch関数でpost
        const res = await fetch(
            'http://localhost:3000/api/signup',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        name: nameRef.current?.value,
                        email: emailRef.current?.value,
                        password: passRef.current?.value
                    }
                )
            }
        );

        const json = await res.json();
        setMessage(json);
    }

    return (
        <div>
            <h2>a new user</h2>
            <input type="text" placeholder="name" ref={nameRef} />
            <input type="text" placeholder="email" ref={emailRef} />
            <input type="password" placeholder="password" ref={passRef} />
            <button onClick={handleSignup}>signup</button>
            <div>
                {JSON.stringify(message, null, 4)}
            </div>
        </div>
    );
}

export default Signup