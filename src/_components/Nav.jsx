// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export { Nav };

function Nav() {
    const auth = useSelector(x => x.auth.value);
    // only show nav when logged in
    if (!auth) return null;

    return (
        <nav className="navBar flex align_c justify_c">
            <div className="flex align_c navBar_content">
                <h6 className='display_name'>{auth?.firstName}{auth?.lastName}</h6>
                <span className='avatar flex align_c justify_c'>{auth?.firstName.slice(0, 1)}</span>
            </div>
        </nav>
    );
}