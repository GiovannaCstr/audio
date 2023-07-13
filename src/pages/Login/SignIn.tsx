import style from './login.module.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../../services/firebase';

export function SignIn() {
    const [loginEmail, setEmail] = useState<string>("");
    const [loginPassword, setPassword] = useState<string>("");

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            console.log("oi", auth.currentUser);
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return(
        <section className={style.background}>
            <div className={style.divTitle}>
                <h1 className={style.title}>Audio</h1>
                <h2 className={style.subtitle}>It's modular and designed to last</h2>
            </div>
            <div className={style.divLogin}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    onChange={(event) => {setEmail(event.target.value)}}
                    className={style.input}/>
                <input 
                    type="text" 
                    placeholder="Password"
                    onChange={(event) => {setPassword(event.target.value)}}
                    className={style.input}/>
                <h3 className={style.loginParagraph}>Forgot Password</h3>
                <button onClick={login} className={style.loginButton}>Sign In</button>
                <p className={style.loginParagraph}>Didn't have any account? 
                    <Link to={"/register"} className={style.loginLink}>
                        Sign Up here
                    </Link>
                </p>
            </div>
        </section>
    )
}