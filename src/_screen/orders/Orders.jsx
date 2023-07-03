import Style from './style.module.css'
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { File } from '_assets/icons/icon';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { orderData } from '_helpers/dummy'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useSpring, animated } from '@react-spring/web';
import { EditOrder } from './EditOrder';
import { ImportShopify } from './ImportShopify';
import Papa from "papaparse";

export { Orders };

//<Model Styling>
const Fade = React.forwardRef(function Fade(props, ref) {
    const {
        children,
        in: open,
        onClick,
        onEnter,
        onExited,
        ownerState,
        ...other
    } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter(null, true);
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited(null, true);
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {React.cloneElement(children, { onClick })}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element.isRequired,
    in: PropTypes.bool,
    onClick: PropTypes.any,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
    ownerState: PropTypes.any,
};
//<Model Styling/>

function Orders() {
    const mobile = useSelector(x => x.mobile.value)
    const [rows, setRow] = useState([])
    const [importshopify, setImportShopify] = useState(false)
    const [editorder, setEditOrder] = useState('');
    const [open, setOpen] = useState(false);
    const [fileName, setFileName] = useState('')
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setTimeout(() => {
            setImportShopify(false)
        }, 1000);
    };

    const changeHandler = (event) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        setFileName(event.target.files[0].name)
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                console.log(results.data)
            },
        });
    };
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
        const row = data?.map(item => {
            return {
                "id": item.orderNo,
                "status": item.status,
                "amount": item.amount,
                "store": item.store,
                "merchant": item.merchant,
                "product": item.products,
                "date": item.createdAt,
            }
        })
        setRow(row)
    }, [data])

    // // Grid Style
    const grigStyle =
    {

        ".MuiDataGrid-overlayWrapperInner": {
            maxHeight: "500px",
            minHeight: "500px"
        },
        '.MuiDataGrid-overlayWrapper': {
            height: "100%!important"
        },
        '.MuiDataGrid-columnHeaders': {
            background: "#f7f7f7",
            minHeight: "80px!important"
        },
        '.MuiDataGrid-cell, .MuiDataGrid-columnHeader': {
            padding: '0 0 0 25px'
        },
        '.MuiDataGrid-cellContent': {
            fontFamily: "AxiformaRegular",
            fontSize: "14px",
            color: '#303030'
        },
        '.MuiDataGrid-columnHeaderTitleContainerContent': {
            fontFamily: 'AxiformaSemiBold',
            color: '#000',
            fontSize: "14px",
        }
    }

    // //GRID COLUMN
    const columns = [
        {
            field: 'id', headerName: 'Order No #',
            minWidth: 100,
            flex: 1
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 150,
            renderCell: (params) => (
                <span className={`${params.value.replaceAll(' ', '')} status`}>{params.value}</span>
            ),
            flex: 1

        },
        {
            field: 'amount',
            headerName: 'Amount',
            minWidth: 80,
            flex: 1
        },
        {
            field: 'store',
            headerName: 'Store',
            minWidth: 150,
            flex: 1

        },
        {
            field: 'merchant',
            headerName: 'Merchant',
            minWidth: 150,
            flex: 1

        },
        {
            field: 'product',
            headerName: 'Products',
            minWidth: 100,
            flex: 1

        },
        {
            field: 'date',
            headerName: 'Created At',
            minWidth: 180,
            flex: 1

        },
        {
            field: "action",
            headerName: "Edit Merchant",
            renderCell: (cellValues) => {
                return <Link onClick={() => { setEditOrder(cellValues.row); handleOpen() }} className={Style.col_btn}>Edit</Link>;
            },
            minWidth: 150,
            filterable: false,
            flex: 1

        }
    ];

    function NoRowsOverlay() {
        return (
            <div className={Style.container_Notfound}>
                <div className={Style.notFound}></div>
            </div>
        );
    }

    function NoResultsOverlay() {
        return (
            <div className={Style.container_Notfound}>
                <div className={Style.notFound}></div>
            </div>
        );
    }
    return (
        <div className={Style.order_mainContainer} style={{ marginLeft: mobile ? mobile.class : "290px" }}>
            <div className={Style.main_container}>
                <div className={Style.display}></div>
                <div className={Style.filters_wrapper}>
                    <h6 className={Style.filter_title}>Filters</h6>
                    <hr style={{ borderColor: "#dcdcdc", opacity: .3 }} />
                    <div className={Style.search_form}>
                        <form className={Style.form_filter} onSubmit={handleSubmit}>
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
                            <div className={Style.filter_inputWrapper}>
                                <button type="submit" className={Style.filter_button} >Filter</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className={Style.content_wrapper}>
                    <div className={Style.head}>
                        <h1 className={Style.title}>Orders</h1>
                        <div className={Style.actions}>
                            <button onClick={() => { setImportShopify(true); handleOpen() }} className={Style.button_import}>
                                <File />Import Shopify
                            </button>
                            <div>
                                <label className={Style.button_import} htmlFor="raised-button-file">
                                    <File />Import CSV
                                    <input
                                        type="file"
                                        name="file"
                                        accept=".csv"
                                        id="raised-button-file"
                                        onChange={changeHandler}
                                        style={{ display: "none", margin: "10px auto" }}
                                    />
                                </label>
                                <span className={Style.fileName}>
                                    {fileName}
                                </span>
                            </div>

                        </div>
                    </div>
                    <div className={Style.orderList}>
                        <Box sx={{ height: "100%", maxWidth: "100%", width: '100%', position: 'relative', background: "#fff" }}>

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
            </div>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        TransitionComponent: Fade,
                    },
                }}
            >
                <Fade in={open}>
                    <Box className={Style.modelBox}>
                        <CloseIcon className={Style.closeBtn} onClick={handleClose} />
                        {importshopify ? <ImportShopify  handleClose={handleClose} /> :
                            <EditOrder handleClose={handleClose} id={editorder ? editorder.id : ""} />}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
