import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from '_helpers';
import { Nav, Alert, PrivateRoute, Sidebar } from '_components';
import { Orders } from 'orders';
import { AccountLayout } from 'account';
import { UsersLayout } from 'merchants';
import { useState } from 'react';

export { App };

function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate();
    history.location = useLocation();
    const [sidebar, setSidebar] = useState(false);

    const showMobile = () => setSidebar(!sidebar);



    return (
        <div className='main_container flex'>
            <Alert />
            <Sidebar action={showMobile} />
            <div className='main_content' >
                <Nav action={showMobile} />
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
