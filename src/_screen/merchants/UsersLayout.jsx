import { Routes, Route, } from 'react-router-dom';

import { List, AddEdit } from '.';

export { UsersLayout };

function UsersLayout() {
    return (
        <Routes>
            <Route index element={<List />} />
            <Route path="add" element={<AddEdit />} />
            <Route path="edit/:id" element={<AddEdit />} />
            
        </Routes>
    );
}
