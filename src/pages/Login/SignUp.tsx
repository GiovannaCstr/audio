import style from './login.module.css';
import apple from './img/apple.svg';
import facebook from './img/facebook.svg';
import google from './img/google.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword, 
        GoogleAuthProvider, signInWithPopup, 
        FacebookAuthProvider, OAuthProvider } from 'firebase/auth';

const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();
const providerApple = new OAuthProvider('apple.com');

export function SignUp() {
    const [registerEmail, setEmail] = useState<string>("");
    const [registerPassword, setPassword] = useState<string>("");

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            console.log(user);
        } catch (error: any) {
            console.log(error.message)
        }
    }

    function googleSignUp() {
        signInWithPopup(auth, providerGoogle)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;

            console.log(token, user)
        }).catch((error: any) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            
            console.log(errorCode, errorMessage, email, credential)
        });
    }

    function facebookSignUp() {
        signInWithPopup(auth, providerFacebook)
        .then((result) => {
            const user = result.user;
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential?.accessToken;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = FacebookAuthProvider.credentialFromError(error);
        });
    }

    function appleSignUp() {
        signInWithPopup(auth, providerApple)
        .then((result) => {
            const user = result.user;
            const credential = OAuthProvider.credentialFromResult(result);
            const accessToken = credential?.accessToken;
            const idToken = credential?.idToken;

            console.log(user, accessToken, idToken)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = OAuthProvider.credentialFromError(error);

            console.log(errorCode, errorMessage, email, credential)
        });
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
                <button onClick={register} className={style.registerButton}>Sign Up</button>
                <div className={style.divAcounts}>
                    <button onClick={appleSignUp}
                        className={style.buttonAcounts}>
                        <img src={apple}/>
                    </button>
                    <button onClick={facebookSignUp}
                        className={style.buttonAcounts}>
                        <img src={facebook}/>
                    </button>
                    <button onClick={googleSignUp}
                        className={style.buttonAcounts}>
                        <img src={google}/>
                    </button>
                </div>
                <p className={style.loginParagraph}>
                    If you have an account? 
                    <Link to={"/"} className={style.loginLink}>
                        Sign In here
                    </Link>
                </p>
            </div>
        </section>
    )
}