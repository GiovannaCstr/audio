import style from './login.module.css';
import gitHub from './img/gitHubIcon.svg';
import facebook from './img/facebook.svg';
import google from './img/google.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword, 
        GoogleAuthProvider, signInWithPopup, 
        FacebookAuthProvider, signInWithEmailAndPassword, 
        GithubAuthProvider } from 'firebase/auth';

export function Login() {
    const providerGoogle = new GoogleAuthProvider();
    const providerFacebook = new FacebookAuthProvider();
    const providerGitHub = new GithubAuthProvider();

    const [loginEmail, setEmail] = useState<string>("");
    const [loginPassword, setPassword] = useState<string>("");
    const [registerEmail, setEmailRegister] = useState<string>("");
    const [registerPassword, setPasswordRegister] = useState<string>("");
    const [change, setChange] = useState<boolean>(true);
    const navigate = useNavigate();

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
        } catch (error: any) {
            console.log(error.message)
        }
    }

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
            navigate("/home");
        }).catch((error: any) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    function facebookSignUp() {
        signInWithPopup(auth, providerFacebook)
        .then((result) => {
            const user = result.user;
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential?.accessToken;
            navigate("/home");
        })
        .catch((error: any) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = FacebookAuthProvider.credentialFromError(error);
        });
    }

    function gitHubSignUp() {    
        signInWithPopup(auth, providerGitHub)
        .then((result) => {
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;
            navigate("/home");
        }).catch((error: any) => {
            console.log(error)
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GithubAuthProvider.credentialFromError(error);
        });
    }


    return(
        <>
        <section className={style.background}>
        <div className={style.divTitle}>
            <h1 className={style.title}>Audio</h1>
            <h2 className={style.subtitle}>It's modular and designed to last</h2>
        </div>

        {change ?  <div className={style.divLogin}>
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
                <button onClick={() => setChange(false)} className={style.loginLink}>
                    Sign Up here
                </button>
            </p>
        </div> : 
            <div className={style.divLogin}>
            <input 
                type="email" 
                placeholder="Email" 
                onChange={(event) => {setEmailRegister(event.target.value)}}
                className={style.input}/>
            <input 
                type="text" 
                placeholder="Password"
                onChange={(event) => {setPasswordRegister(event.target.value)}}
                className={style.input}/>
            <button onClick={register} className={style.registerButton}>Sign Up</button>
            <div className={style.divAcounts}>
                <button onClick={gitHubSignUp}
                    className={style.buttonAcounts}>
                    <img src={gitHub}/>
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
                <button onClick={() => setChange(true)} className={style.loginLink}>
                    Sign In here
                </button>
            </p>
        </div>
        }
        </section>       
        </>
    )
}