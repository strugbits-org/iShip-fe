import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';

export { Nav };

function Nav() {
    const auth = useSelector(x => x.auth.value);
    // only show nav when logged in
    if (!auth) return null;

    return (
        <nav className="navBar flex align_c ">
            <div className="nav_logo align_c" style={{ textAlign: "center" }}>
                <Link className='logo' to="/">
                    <img
                        src="/logo_light.png"
                        alt="Logo"
                        width="150px"
                        height="50px"
                    />
                </Link>
                <Link to='#'>
                    <MenuIcon className='menu_bars' />
                </Link>
            </div>
            <div className="flex align_c navBar_content">
                <h6 className='display_name'>{auth?.firstName} {auth?.lastName}</h6>
                <span className='avatar flex align_c justify_c'>{auth?.firstName.slice(0, 1)}</span>
            </div>
        </nav>
    );
}