import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { history } from '_helpers';
import { Nav, Alert, PrivateRoute, Sidebar } from '_components';
import { OrderLayout } from '_screen/orders';
import { AccountLayout } from '_screen/account';
import { UsersLayout } from '_screen/merchants';
import { LocationLayout } from '_screen/location'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export { App };

function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    //CHECK IF ADMIN
    const auth = useSelector(x => x.auth.value);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const role = auth?.user?.email
        role === "stephen.mk091@gmail.com" ? setIsAdmin(true) : setIsAdmin(false)
    }, [auth])



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
                    {isAdmin ?
                        <Route element={<PrivateRoute />}>
                            <Route path="/*" element={<OrderLayout />} />
                            <Route path="users/*" element={<UsersLayout />} />
                            <Route path="location/*" element={<LocationLayout />} />
                        </Route>
                        :
                        <Route element={<PrivateRoute />}>
                            <Route path="/*" element={<OrderLayout />} />
                            <Route path="users/*" element={<Navigate to="/" />} />
                            <Route path="location/*" element={<LocationLayout />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Route>
                    }

                    {/* public */}
                    <Route path="account/*" element={<AccountLayout />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
}
