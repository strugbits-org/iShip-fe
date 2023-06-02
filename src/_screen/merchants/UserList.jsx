import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Style from './style.module.css';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useSpring, animated } from '@react-spring/web';
import { AddEdit } from './AddEdit';
import { userActions } from '_store';
import Input from '@mui/material/Input';

export { List };
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

function List() {

	const [open, setOpen] = React.useState(false);
	const [rows, setRows] = React.useState([]);
	const [editUser, setEditUser] = React.useState('');
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const mobile = useSelector(x => x.mobile.value)
	//MERCHANTS SEARCH FILTER
	const [searchValue, setSeatchValue] = React.useState('');
	const [search, setSearch] = React.useState(searchValue);

	const handleChange = (event) => {
		setSeatchValue(event.target.value);
	};
	const handleClick = () => {
		setSearch(searchValue);
	};

	const users = useSelector(x => x.users.list);
	// console.log("users====> ", users);

	const dispatch = useDispatch();
	// console.log("asd", useSelector(x => x.users.list));

	useEffect(() => {
		dispatch(userActions.getAll());
	}, []);

	//SET GRID ROW
	useEffect(() => {

		const data = users?.value?.user
		// console.log("data", data);
		if (search) {
			const filterData = data?.filter(x => {
				const filteredObj = x.name.toLowerCase().includes(search) || x._id.toLowerCase().includes(search)
				return filteredObj
			})
			// console.log("filterData", filterData);
			if (users?.value?.user?.length > 0) {
				const userData = filterData.map(data => {
					return { "id": data._id, "fullname": data.name, "email": data.email, "phone": data.phoneno.toString(), url: `edit/${data.id}` }
				})
				setRows(userData)
			}
		}
		else {
			// console.log("search", data);
			if (data?.length > 0) {
				const userData = data?.map(data => {
					return { "id": data._id, "fullname": data.name, "email": data.email, "phone": data.phoneno.toString(), url: `edit/${data.id}` }
				})
				setRows(userData)
			}
		}

	}, [search, users]);

	//GRID COLUMN
	const columns = [
		{
			field: 'id', headerName: 'Merchant ID #',
			minWidth: 150,
			maxWidth: 300,
			flex: 2,
		},
		{
			field: 'fullname',
			headerName: 'Merchant Name',
			minWidth: 120,
			flex: .8
		},
		{
			field: 'email',
			headerName: 'Merchant Email',
			minWidth: 150,
			flex: 1,
		},
		{
			field: 'phone',
			headerName: 'Merchant Phone #',
			type: 'number',
			minWidth: 150,
			flex: 1,
			align: 'left',
			headerAlign: 'left'
		},
		{
			field: "Edit Merchant",
			renderCell: (cellValues) => {

				return <Link onClick={() => { setEditUser(cellValues.row); handleOpen() }} className={Style.col_btn}>Edit details</Link>;
			},
			minWidth: 150,
			filterable: false
		}
	];

	// Grid Style
	const grigStyle =
	{
		'.MuiDataGrid-columnSeparator': {
			display: 'none',
		},
		".MuiDataGrid-overlayWrapperInner": {
			maxHeight: "500px",
			minHeight: "500px"
		},
		'.MuiDataGrid-overlayWrapper': {
			height: "100%!important"
		},
		'&.MuiDataGrid-root': {
			border: '',
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
	function NoRowsOverlay() {
		return (
			<div className={Style.notFound}></div>
		);
	}

	function NoResultsOverlay() {
		return (
			<div className={Style.notFound}></div>
		);
	}
	return (
		<div className={Style.sections} style={{ marginLeft: mobile ? mobile.class : "290px" }}>
			<div className={Style.main_container} >
				<div className={Style.head}>
					<h1 className={Style.title}>Merchants</h1>
					<div className={Style.add_search}>

						<div className={Style.search}>
							<Input
								sx={{ height: "100%", width: "100%", padding: "10px" }}
								placeholder="Search by ID, Name"
								// onChange={e => setSearch(e.target.value)} className={Style.search_field} 
								onChange={handleChange}
								value={searchValue}
							/>
							<div onClick={handleClick} className={Style.serach_box} >
								<SearchIcon className={Style.search_icons} /></div>
						</div>
						<Link onClick={() => {
							setEditUser('')
							handleOpen()
						}} className={Style.add_merchant}>
							<AddIcon color='#fff' />
							<span className={Style.link}>Add new merchants</span>
						</Link>
					</div>
				</div>
				<div className={Style.userList}>

					<Box sx={{ height: "100%", width: '100%', background: "#fff" }}>
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
							checkboxSelection
							disableRowSelectionOnClick
						/>
					</Box>
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
						<AddEdit handleClose={handleClose} id={editUser ? editUser.id : ""} />
					</Box>

				</Fade>
			</Modal>
		</div>
	);
}
