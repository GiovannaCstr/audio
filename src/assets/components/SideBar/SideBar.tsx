import style from './SideBar.module.css';
import { FaTimes, FaRegBell, FaRegHeart, FaSignOutAlt, FaRegQuestionCircle } from "react-icons/fa";
import { auth } from '../../../services/firebase';
import { useNavigate } from 'react-router-dom';


const SideBar = ({ closeSideBar }: { closeSideBar: () => void }) => {    
    const navigate = useNavigate();

    const handleLogOut = () => {
        try {
            auth.signOut();
            navigate("/");
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    return(
        <nav className={style.sideBar}>
            <FaTimes className={style.iconCloseMenu} onClick={closeSideBar}/>
            <div className={style.sideBarList}>
                <button className={style.buttonSideBar}>
                    Notifications
                    <FaRegBell/>
                </button>
                <button className={style.buttonSideBar}>
                    Wishlist
                    <FaRegHeart/>
                </button>
                <button className={style.buttonSideBar}>
                    Help
                    <FaRegQuestionCircle/>
                </button>
                <button onClick={handleLogOut} className={style.buttonSideBar}>
                    Logout
                    <FaSignOutAlt/>
                </button>               
            </div>
        </nav>
    )
}

export default SideBar;