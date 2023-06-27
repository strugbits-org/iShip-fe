import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Logout, Merchants, Orders } from '../../_assets/icons/icon';

import { useState, useEffect } from 'react';
import './Sidebar.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { authActions, mobileActions } from '_store';


export { Sidebar };

function Sidebar() {
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());
    const mobile = useSelector(x => x.mobile.value)
    //CHECK ADMIN
    const auth = useSelector(x => x.auth.value);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const role = auth?.user?.email
        role === "stephen.mk091@gmail.com" ? setIsAdmin(true) : setIsAdmin(false)
    }, [auth])

    //TOGGLE sidebar component
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => {
        setSidebar(!sidebar);
        !sidebar ?
            dispatch(mobileActions.closeSideBar("90px"))
            : dispatch(mobileActions.closeSideBar("290px"))
    }


    // only show nav when logged in
    if (!auth) return null;

    return (
        <div className={mobile ? mobile.class : "hideOnMobile"}>
            <div className={sidebar ? 'sidebar close' : 'sidebar active'}>

                <div className="sidebar_logo" style={{ textAlign: "center" }}>
                    <Link to="/">
                        {sidebar ?
                            <img
                                src="/images/iship_icon.png"
                                alt="Logo"
                                width="45px"
                                height="54px"
                            />
                            :
                            <img
                                src="/images/I-Ship_logo.png"
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
                                <span className='_iconHover'>
                                    <Orders />
                                </span>
                                <span className='sidebar_link'> Order</span>
                            </NavLink>
                        </li>
                        {isAdmin && <li className='menu_links'>
                            <NavLink to="/users" className="menu_item_wrapper">
                                <span className='_iconHover'>
                                    <Merchants />
                                </span>
                                <span className='sidebar_link'> Merchants</span>
                            </NavLink>
                        </li>}
                        <li className='menu_links'>
                            <NavLink to="/location" className="menu_item_wrapper">
                                <span className='_iconHover'>
                                    <PlaceOutlinedIcon />
                                </span>
                                <span className='sidebar_link'> Pickup Location</span>
                            </NavLink>
                        </li>
                    </ul>
                    <button onClick={logout} className="menu_item_wrapper">
                        <span className='_iconHover'>
                            <Logout />
                        </span>
                        <span className='sidebar_link'> Logout</span>
                    </button>

                </div>
            </div>
        </div>
    );
}


