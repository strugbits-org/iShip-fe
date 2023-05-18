import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Logout from '../icons/logout.svg';
import Merchants from '../icons/merchants.svg';
import Order from '../icons/order.svg';
// import {useState} from 'react';

import { authActions } from '_store';


export { Sidebar };

function Sidebar() {
    const auth = useSelector(x => x.auth.value);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => {
    //     setOpen(true)
    //     console.log("open");
    // };
    // const handleClose = () => {
    //     console.log("close");
    //     setOpen(false)};
    
    // only show nav when logged in
    if (!auth) return null;

    return (
        <div className="sidebar">
            <div className="sidebar_logo" style={{ textAlign: "center" }}>
                <Link to="/">
                    <img
                        src="/logo_light.png"
                        alt="Logo"
                        width="180px"
                        height="65px"
                    />
                </Link>
            </div>
            <div className='sidebar_menu'>
                <ul className='menu_items'>
                    <li className='menu_links'>
                        <NavLink to="/" className="menu_item_wrapper">
                            {/* <Order />  */}
                            <img className='sidebar_icons' src={Order} alt="" />
                            <span className='sidebar_link'> Order</span>
                        </NavLink>
                    </li>
                    <li className='menu_links'>
                        <NavLink to="/users" className="menu_item_wrapper">
                            <img className='sidebar_icons' src={Merchants} alt="" />
                            <span className='sidebar_link'> Merchants</span>
                        </NavLink>
                    </li>
                </ul>
                <button onClick={logout} className="menu_item_wrapper">
                    <img src={Logout} alt="" />
                    <span className='sidebar_link'> Logout</span>
                </button>
                {/* <button onClick={handleOpen()}>open</button>
                <button onClick={handleClose()}>close</button> */}
            </div>
        </div>
    );
}