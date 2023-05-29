import { Routes, Route } from 'react-router-dom';

import { List, AddEdit, DeleteUser } from '.';

export { UsersLayout };

function UsersLayout() {
    return (
        <Routes>
            <Route index element={<List />} />
            <Route path="add" element={<AddEdit />} />
            <Route path="edit/:id" element={<AddEdit />} />
            <Route path="delete/:id" element={<DeleteUser />} />
        </Routes>
    );
}
