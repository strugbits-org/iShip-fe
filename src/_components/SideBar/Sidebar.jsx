import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Logout from '../../icons/logout.svg';
import Merchants from '../../icons/merchants.svg';
import Order from '../../icons/order.svg';
import { useState } from 'react';
import './Sidebar.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { authActions, mobileActions } from '_store';

export { Sidebar };

function Sidebar() {
    const auth = useSelector(x => x.auth.value);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    const mobile = useSelector(x => x.mobile.value)
    console.log("mobile  ---", mobile);
    //TOGGLE sidebar component
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);


    // only show nav when logged in
    if (!auth) return null;

    return (
        <div className={mobile ? mobile.class : "hideOnMobile"}>
            <div className={sidebar ? 'sidebar close' : 'sidebar active'}>

                <div className="sidebar_logo" style={{ textAlign: "center" }}>
                    <Link to="/">
                        {sidebar ?
                            <img
                                src="/iships-icon.svg"
                                alt="Logo"
                                width="50px"
                                height="40px"
                            />
                            :
                            <img
                                src="/logo_light.png"
                                alt="Logo"
                                width="160px"
                                height="50px"
                            />}
                    </Link>
                    <Link to='#'>
                        <div className='menu_bars'><MenuIcon className='menu_bars' onClick={showSidebar} /></div>
                        <div className='close_icon'> <CloseIcon onClick={() => dispatch(mobileActions.hideMobile("hideOnMobile"))} /></div>
                    </Link>

                </div>
                <div className='sidebar_menu'>
                    <ul className='menu_items'>
                        <li className='menu_links'>
                            <NavLink to="/" className="menu_item_wrapper">
                                {/* <Svg />  */}
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
        </div>
    );
}


