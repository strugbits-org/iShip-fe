import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Style from './style.module.css';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useSpring, animated } from '@react-spring/web';
import { AddEditLocation } from './AddEditLocation';
import { locationActions } from '_store';
// import { locationData } from '_helpers/dummy'
export { Location };

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

function Location() {

	const [open, setOpen] = React.useState(false);
	const [rows, setRows] = React.useState([]);
	const [editLocation, setEditLocation] = React.useState('');
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const mobile = useSelector(x => x.mobile.value)

	const location = useSelector(x => x.location.list);
	// console.log("location",location?.value?.locations);
	// const data = locationData

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(locationActions.getAll());
	}, []);

	//SET GRID ROW
	useEffect(() => {
		const locationData = location?.value?.locations
		// console.log("locationsData", locationData);

		if (locationData?.length > 0) {
			const items = locationData?.map((data,i) => {
				return {
					"id": data._id,
					"sNo": i+1,
					"address": data.address,
					"status": data.status,
					"phoneNo": data.phoneno,
					"zipCode": data.zipcode,
					url: `edit/${data.id}`
				}
			})
			setRows(items)
		}


	}, [location]);

	//GRID COLUMN
	const columns = [
		{
			field: 'sNo', headerName: 'S.No',
			minWidth: 70,
			// maxWidth: 300,
			flex: .5,
		},
		{
			field: 'phoneNo',
			headerName: 'Phone No',
			minWidth: 120,
			flex: .8
		},
		{
			field: 'address',
			headerName: 'Pickup Address',
			minWidth: 150,
			flex: 1,
		},
		{
			field: 'zipCode',
			headerName: 'Zip Code',
			minWidth: 150,
			flex: 1,
			align: 'left',
			headerAlign: 'left'
		},
		{
			field: 'status',
			headerName: 'Status',
			minWidth: 150,
			flex: 1,
			align: 'left',
			headerAlign: 'left',
			renderCell: (params) => (
				<span className={`${params.value.replaceAll(' ', '')} status`}>{params.value}</span>
			)
		},
		{
			field: "action",
			headerName: "Action",
			renderCell: (cellValues) => {
				return <Link onClick={() => { setEditLocation(cellValues.row); handleOpen() }} className={Style.col_btn}>Edit</Link>;
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
		<div className={Style.sections} style={{ marginLeft: mobile ? mobile.class : "290px" }}>
			<div className={Style.main_container} >
				<div className={Style.head}>
					<h1 className={Style.title}>Pickup Locations</h1>
					<div className={Style.add_search}>
						<Link onClick={() => {
							setEditLocation('')
							handleOpen()
						}} className={Style.add_location}>
							<AddIcon color='#fff' />
							<span className={Style.link}>Add new pickup location</span>
						</Link>
					</div>
				</div>

				<div className={Style.userlist}>
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
						<AddEditLocation handleClose={handleClose} id={editLocation ? editLocation.id : ""} />
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
