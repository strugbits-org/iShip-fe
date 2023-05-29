import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Style from './style.module.css';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { AddEdit } from './AddEdit';
import { userActions } from '_store';

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

	// console.log("auth", token);
	const [open, setOpen] = React.useState(false);
	const [rows, setRows] = React.useState([]);
	const [editUser, setEditUser] = React.useState('');
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const users = useSelector(x => x.users.list);
	// console.log("users====> ", users);

	const dispatch = useDispatch();
	// console.log("asd", useSelector(x => x.users.list));

	useEffect(() => {
		dispatch(userActions.getAll());
	}, []);

	//SET GRID ROW
	useEffect(() => {
		// console.log("user inside: ", users?.value?.user);
		if (users?.value?.user?.length > 0) {
			const userData = users?.value?.user.map(data => {
				return { "id": data._id, "fullname": data.name, "email": data.email, "phone": data.phoneno.toString(), url: `edit/${data.id}` }
			})
			setRows(userData)
		}
	}, [users]);

	//DUMMY DATA SEARCH FIELD
	const dummyDAta = [
		{ title: 'The Shawshank Redemption', year: 1994 },
		{ title: 'The Godfather', year: 1972 },
		{ title: 'The Godfather: Part II', year: 1974 },
		{ title: 'The Dark Knight', year: 2008 },
		{ title: '12 Angry Men', year: 1957 },
		{ title: "Schindler's List", year: 1993 },
		{ title: 'Pulp Fiction', year: 1994 },
	]

	//GRID COLUMN
	const columns = [
		{
			field: 'id', headerName: 'Merchant ID #',
			minWidth: 150,
			maxWidth: 200,
			flex: 1,
		},
		{
			field: 'fullname',
			headerName: 'Merchant Name',
			minWidth: 150,
			flex: 1
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

	// console.log("editUser: ", editUser);
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
								options={dummyDAta.map((option) => option.title)}
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
						{/* <Button to="add" >Open modal</Button> */}
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
							initialState={{
								pagination: {
									paginationModel: {
										pageSize: 8,
									},
								},
							}}
							pageSizeOptions={[5]}
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
