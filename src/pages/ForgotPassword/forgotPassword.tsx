import forgotIcon from './img/forgotPassword.png';
import backIcon from './img/back.svg';
import audioIcon from './img/audioLogo.svg';
import style from './forgotPassword.module.css';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';

export function ForgotPassword() {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState<string>("");

    const forgetPassword = async () => {
        try {
            if (email) {
              await sendPasswordResetEmail(auth, email);
              Swal.fire({
                icon: "info",
                title: "Forgot Password",
                html: "Password reset email sent successfully!",
                confirmButtonColor: "#0ACF83"
              });
            //   setLoginError("");
            } else {
            // setLoginError("Please enter a valid email to reset your password.");
            console.log("não tem")
            }
          } catch (error) {
            // setLoginError("There was an error sending the password reset email.");
            console.log(error)
        }
    }
    
    return(
        <main className={style.container}>
            <header>
                <button className={style.backButton}
                onClick={() => navigate(-1)}>
                    <img src={backIcon} alt='Arrow icon to return to the previous screen'/>
                </button>
            </header>
            <section className={style.sectionForgot}>
                <div className={style.divIcon}>
                    <img src={forgotIcon} alt='Padlock and question mark icon'/>
                    <h1 className={style.title}>Forgot Password?</h1>
                    <h2>We can help you!</h2>
                </div>
                <div className={style.divInput}>
                    <input
                        className={style.inputEmail} 
                        onChange={(event) => {setEmail(event.target.value)}}
                        type='email'
                        placeholder='Enter your email'
                        value={email}
                    />
                    <button className={style.buttonResetPassword}
                        onClick={forgetPassword}>Send Email
                    </button>
                </div>
            </section>
            <footer className={style.footer}>
                <img src={audioIcon}/>
                <p>Audio</p>
            </footer>
        </main>
    )    
}
