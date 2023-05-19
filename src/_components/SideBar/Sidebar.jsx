import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Logout from '../../icons/logout.svg';
import Merchants from '../../icons/merchants.svg';
import Order from '../../icons/order.svg';
import { useState } from 'react';
import './Sidebar.css';
import MenuIcon from '@mui/icons-material/Menu';
import { authActions } from '_store';


export { Sidebar };

function Sidebar(show) {
    const auth = useSelector(x => x.auth.value);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    //TOGGLE sidebar component
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);


    // only show nav when logged in
    if (!auth) return null;

    return (
        <div className={show ? 'dfg' : 'asd'}>
        <div className={sidebar ? 'sidebar active' : 'sidebar close'}>
            <div className="sidebar_logo" style={{ textAlign: "center" }}>
                <Link to="/">
                    {sidebar ?
                        <img
                            src="/logo_light.png"
                            alt="Logo"
                            width="160px"
                            height="50px"
                        />
                        :
                        <img
                            src="/iships-icon.svg"
                            alt="Logo"
                            width="50px"
                            height="40px"
                        />}
                </Link>
                <Link to='#'>
                    <MenuIcon className='menu_bars' onClick={showSidebar} />
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
        </div>
    );
}




// import React, { useState } from 'react';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import { Link } from 'react-router-dom';
// import { SidebarData } from './sidebarData';
// import './Sidebar.css';
// import { IconContext } from 'react-icons';
// export { Sidebar };
// function Sidebar() {
//     const [sidebar, setSidebar] = useState(false);

//     const showSidebar = () => setSidebar(!sidebar);

//     return (
//         <>
//             <IconContext.Provider value={{ color: '#fff' }}>
//                 <div className='navbar'>
//                     <Link to='#' className='menu-bars'>
//                         <FaIcons.FaBars onClick={showSidebar} />
//                     </Link>
//                 </div>
//                 <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
//                     <ul className='nav-menu-items' onClick={showSidebar}>
//                         <li className='navbar-toggle'>
//                             <Link to='#' className='menu-bars'>
//                                 <AiIcons.AiOutlineClose />
//                             </Link>
//                         </li>
//                         {SidebarData.map((item, index) => {
//                             return (
//                                 <li key={index} className={item.cName}>
//                                     <Link to={item.path}>
//                                         {item.icon}
//                                         <span>{item.title}</span>
//                                     </Link>
//                                 </li>
//                             );
//                         })}
//                     </ul>
//                 </nav>
//             </IconContext.Provider>
//         </>
//     );
// }
