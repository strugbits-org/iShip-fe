import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { history } from '_helpers';
import { Nav, Alert, PrivateRoute, Sidebar } from '_components';
import { Orders } from '_screen/orders';
import { AccountLayout } from '_screen/account';
import { UsersLayout } from '_screen/merchants';

export { App };

function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate();
    history.location = useLocation();
   
    return (
        <div className='main_container flex'>
            <Alert />
            <Sidebar />

            <Nav />
            <div className='main_content'>
                <Routes>
                    {/* private */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Orders />} />
                        <Route path="users/*" element={<UsersLayout />} />
                    </Route>
                    {/* public */}
                    <Route path="account/*" element={<AccountLayout />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
}
