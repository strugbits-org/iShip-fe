import { Routes, Route, Navigate } from 'react-router-dom';

import { Orders, EditOrder } from '.';

export { OrderLayout };

function OrderLayout() {
    return (
        <Routes>
            <Route index element={<Orders />} />
            <Route path="edit/:id" element={<EditOrder />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
