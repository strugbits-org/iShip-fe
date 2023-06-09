import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Login, Register, Forget, Reset } from '.';

export { AccountLayout };

function AccountLayout() {
    const auth = useSelector(x => x.auth.value);

    // redirect to home if already logged in
    if (auth) {
        return <Navigate to="/" />;
    }

    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<Forget />} />
            <Route path="reset-password" element={<Reset />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>

    );
}
