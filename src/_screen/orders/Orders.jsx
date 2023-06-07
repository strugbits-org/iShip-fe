import Style from './style.module.css'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
// import { File } from '_assets/icons/icon';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
import { orderData } from './orderData';
// import { OrdersList } from './Orderlist';

export { Orders };

function Orders() {
    const mobile = useSelector(x => x.mobile.value)
    // const [rows, setRow] = useState([])
    const [filter, setFilter] = useState({
        orderNo: '',
        status: '',
        store: '',
        merchant: '',
        createdAt: '',
    });
    const handleChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle filter logic here
        console.log(filter);
    };

    const data = orderData
    useEffect(() => {
        // const row = data.map(item => {
        //     return {
        //         "id": item.orderNo,
        //         "status": item.status,
        //         "amount": item.amount,
        //         "store": item.store,
        //         "merchant": item.merchant,
        //         "product": item.products,
        //         "date": item.createdAt,
        //     }
        // })
        // setRow(row)
    }, [data, filter])

    // // Grid Style
    // const grigStyle =
    // {

    //     ".MuiDataGrid-overlayWrapperInner": {
    //         maxHeight: "500px",
    //         minHeight: "500px"
    //     },
    //     '.MuiDataGrid-overlayWrapper': {
    //         height: "100%!important"
    //     },
    //     '.MuiDataGrid-columnHeaders': {
    //         background: "#f7f7f7",
    //         minHeight: "80px!important"
    //     },
    //     '.MuiDataGrid-cell, .MuiDataGrid-columnHeader': {
    //         padding: '0 0 0 25px'
    //     },
    //     '.MuiDataGrid-cellContent': {
    //         fontFamily: "AxiformaRegular",
    //         fontSize: "14px",
    //         color: '#303030'
    //     },
    //     '.MuiDataGrid-columnHeaderTitleContainerContent': {
    //         fontFamily: 'AxiformaSemiBold',
    //         color: '#000',
    //         fontSize: "14px",
    //     }
    // }

    // //GRID COLUMN
    // const columns = [
    //     {
    //         field: 'id', headerName: 'Order No #',
    //         minWidth: 80,
    //         flex: .6,
    //     },
    //     {
    //         field: 'status',
    //         headerName: 'Status',
    //         minWidth: 150,
    //         flex: .5,
    //         renderCell: (params) => (
    //             <span className={`${params.value.replaceAll(' ', '')} status`}>{params.value}</span>
    //         )
    //     },
    //     {
    //         field: 'amount',
    //         headerName: 'Amount',
    //         minWidth: 80,
    //         flex: .5,
    //     },
    //     {
    //         field: 'store',
    //         headerName: 'Store',
    //         minWidth: 100,
    //         flex: 1,
    //     },
    //     {
    //         field: 'merchant',
    //         headerName: 'Merchant',
    //         minWidth: 100,
    //         flex: 1,
    //     },
    //     {
    //         field: 'product',
    //         headerName: 'Products',
    //         minWidth: 100,
    //         flex: .8,
    //     },
    //     {
    //         field: 'date',
    //         headerName: 'Created At',
    //         minWidth: 100,
    //         flex: 1,
    //     },
    // ];

    // function NoRowsOverlay() {
    //     return (
    //         <div className={Style.container_Notfound}>
    //             <div className={Style.notFound}></div>
    //         </div>
    //     );
    // }

    // function NoResultsOverlay() {
    //     return (
    //         <div className={Style.container_Notfound}>
    //             <div className={Style.notFound}></div>
    //         </div>
    //     );
    // }
    return (
        <div className={Style.order_mainContainer} style={{ marginLeft: mobile ? mobile.class : "290px" }}>
            {/* <div className={Style.main_container}>
                <div className={Style.filters_wrapper}>
                    <h6 className={Style.filter_title}>Filters</h6>
                    <hr style={{ borderColor: "#dcdcdc", opacity: .3 }} />
                    <div className={Style.search_form}>
                        <form onSubmit={handleSubmit}>
                            <div className={Style.filter_inputWrapper}>
                                <label className={Style.filter_label}>Search</label>
                                <input onChange={handleChange} value={filter.name}
                                    name="orderNo" className={Style.filter_input} type='text' placeholder='Order No, Store, Merchant, etc.' />
                            </div>
                            <div className={Style.filter_inputWrapper}>
                                <label className={Style.filter_label}>Status</label>
                                <input onChange={handleChange} name="status" className={Style.filter_input} type='text' placeholder='Order Status' />
                            </div>
                            <div className={Style.filter_inputWrapper}>
                                <label className={Style.filter_label}>Store</label>
                                <input onChange={handleChange} name="store" className={Style.filter_input} type='text' placeholder='Search Stores' />
                            </div>
                            <div className={Style.filter_inputWrapper}>
                                <label className={Style.filter_label}>Search Users</label>
                                <input onChange={handleChange} name="merchant" className={Style.filter_input} type='text' placeholder='Order No, Store, Merchant, etc.' />
                            </div>
                            <div className={Style.filter_inputWrapper}>
                                <label className={Style.filter_label}>Created At</label>
                                <input onChange={handleChange} name="createdAt" className={Style.filter_input} type='date' placeholder='Order No, Store, Merchant, etc.' />
                            </div>
                            <div className={Style.filter_buttonwrapper}>
                                <button type="submit" className={Style.filter_button} >Filter</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={Style.content_wrapper}>
                    <div className={Style.head}>
                        <h1 className={Style.title}>Orders</h1>
                        <div className={Style.actions}>
                            <button className={Style.button_import}>
                                <File />Import Shopify
                            </button>
                            <button className={Style.button_import}>
                                <File />Import CSV
                            </button>
                        </div>
                    </div>
                    <div className={Style.orderList}>
                        <Box sx={{ height: "100%", maxWidth: "100%", width: '100%',position: 'relative', background: "#fff" }}>
                        <OrdersList/>
                            <DataGrid
                                headerHeight={80}
                                rowHeight={80}
                                sx={grigStyle}
                                className={Style.data}
                                rows={rows}
                                columns={columns}
                                components={{ NoRowsOverlay, NoResultsOverlay }}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 10,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5, 10, 15]}
                                disableRowSelectionOnClick
                            />
                        </Box>
                    </div>
                </div>
            </div> */}


            <div className={Style.filters_wrapper}>
                <h6 className={Style.filter_title}>Filters</h6>
                <hr style={{ borderColor: "#dcdcdc", opacity: .3 }} />
                <div className={Style.search_form}>
                    <form onSubmit={handleSubmit}>
                        <div className={Style.filter_inputWrapper}>
                            <label className={Style.filter_label}>Search</label>
                            <input onChange={handleChange} value={filter.name}
                                name="orderNo" className={Style.filter_input} type='text' placeholder='Order No, Store, Merchant, etc.' />
                        </div>
                        <div className={Style.filter_inputWrapper}>
                            <label className={Style.filter_label}>Status</label>
                            <input onChange={handleChange} name="status" className={Style.filter_input} type='text' placeholder='Order Status' />
                        </div>
                        <div className={Style.filter_inputWrapper}>
                            <label className={Style.filter_label}>Store</label>
                            <input onChange={handleChange} name="store" className={Style.filter_input} type='text' placeholder='Search Stores' />
                        </div>
                        <div className={Style.filter_inputWrapper}>
                            <label className={Style.filter_label}>Search Users</label>
                            <input onChange={handleChange} name="merchant" className={Style.filter_input} type='text' placeholder='Order No, Store, Merchant, etc.' />
                        </div>
                        <div className={Style.filter_inputWrapper}>
                            <label className={Style.filter_label}>Created At</label>
                            <input onChange={handleChange} name="createdAt" className={Style.filter_input} type='date' placeholder='Order No, Store, Merchant, etc.' />
                        </div>
                        <div className={Style.filter_buttonwrapper}>
                            <button type="submit" className={Style.filter_button} >Filter</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <OrdersList/> */}
        </div>
    );
}
