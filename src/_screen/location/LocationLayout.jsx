import { Routes, Route } from 'react-router-dom';

import { Location, AddEditLocation } from '.';

export { LocationLayout };

function LocationLayout() {
    return (
        <Routes>
            <Route index element={<Location />} />
            <Route path="add" element={<AddEditLocation />} />
            <Route path="edit/:id" element={<AddEditLocation />} />
        </Routes>
    );
}
