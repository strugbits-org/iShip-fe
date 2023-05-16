import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Style from './style.module.css'
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';



import { userActions } from '_store';

export { List };

function List() {
    const users = useSelector(x => x.users.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
    ]
    const userData = users?.value?.map(data => { return { "id": data.id, "fullname":`${data.firtname}${data.lastname}`, "email": data.email, "phone": 35 } })
    console.log(userData);
    const rows = [
        { id: 1, fullname: 'Snow', email: 'Jon', phone: 35 },
    ]
    const columns = [
        {
            field: 'id', headerName: 'Merchant ID #', flex: 1,
            minWidth: 50,
        },
        {
            field: 'fullname',
            headerName: 'Merchant Name',
            flex: 1,
            minWidth: 50,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Merchant Email',
            flex: 1,
            minWidth: 50,
            editable: true,
        },
        {
            field: 'phone',
            headerName: 'Merchant Phone #',
            type: 'number',
            flex: 1,
            minWidth: 50,
            editable: true,
        }
    ];
    return (
        <div className={Style.sections}>
            <div className={Style.main_container}>
                <div className={Style.head}>
                    <h1 className={Style.title}>Merchants</h1>
                    <div className={Style.add_search}>
                        <div className={Style.search}>
                            <Autocomplete
                                className={Style.search_input}
                                freeSolo
                                sx={{ width: "100%", border: "none" }}
                                id="free-solo-2-demo"
                                disableClearable
                                options={top100Films.map((option) => option.title)}
                                renderInput={(params) => (
                                    <TextField
                                        className={Style.search_field}
                                        {...params}
                                        label="Search by ID, Name"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                            />
                            <div className={Style.serach_box}>
                                <SearchIcon className={Style.search_icons} /></div>
                        </div>
                        <Link to="add" className={Style.add_merchant}>
                            <AddIcon color='#fff' />
                            <span className={Style.link}>Add new merchants</span>
                        </Link>
                    </div>
                </div>
                <div className={Style.userList}>

                    <Box sx={{ height: 400, width: '100%', background: "#fff" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 15,
                                    },
                                },
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </Box>
                    {/* <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: '30%' }}>First Name</th>
                            <th style={{ width: '30%' }}>Last Name</th>
                            <th style={{ width: '30%' }}>Username</th>
                            <th style={{ width: '10%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.value?.map(user =>
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.username}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <Link to={`edit/${user.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                                    <button onClick={() => dispatch(userActions.delete(user.id))} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                                        {user.isDeleting
                                            ? <span className="spinner-border spinner-border-sm"></span>
                                            : <span>Delete</span>
                                        }
                                    </button>
                                </td>
                            </tr>
                        )}
                        {users?.loading &&
                            <tr>
                                <td colSpan="4" className="text-center">
                                    <span className="spinner-border spinner-border-lg align-center"></span>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table> */}
                </div>
            </div>
        </div>
    );
}
