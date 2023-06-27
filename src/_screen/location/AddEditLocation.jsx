import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import Style from './style.module.css';
import Styles from "../account/style.module.css";
import { locationActions, alertActions } from '_store';
import { Loader } from '../../_components/loader';
// import { locationData } from '_helpers/dummy';


export { AddEditLocation };

function AddEditLocation({ handleClose, id }) {
    // console.log("id", id);
    const [disabled, setDisabled] = useState(false)
    // Add these variables to your component to track the state

    const [title, setTitle] = useState();
    const [label, setLabel] = useState();

    const dispatch = useDispatch();
    const location = useSelector(x => x.location.list);
    // console.log("locations -----", location);
    // const data = locationData

    let phoneRejex =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    // form validation rules 
    const validationSchema = Yup.object().shape({
        phoneno: Yup.string()
            .required("Phone Number is required")
            .matches(phoneRejex, "Phone Number is not valid"),
        zipcode: Yup.string()
            .required('Zip code is required'),
        email: Yup.string()
            .required('Email is required').email(),
        address: Yup.string()
            .required('Address is required'),
        status: Yup.string()
            .required('Status is required'),

    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        if (id) {
            setTitle('Edit Pickup Location');
            setLabel('UPDATE');
            // fetch location details and
            // populate form fields with reset()
            // and filter by props id

            dispatch(locationActions.getAll())
                .then(res => {
                    const locationArr = res?.payload?.locations
                    // console.log("locationArr", locationArr);
                    let item = locationArr.filter((c) => {
                        const obj = c._id === id
                        return obj
                    })
                    // console.log(item[0]);
                    reset(item[0])
                })
        } else {
            setTitle('Add New Pickup Location');
            setLabel('ADD PICKUP LOCATION');
        }
    }, []);

    async function onSubmit(data) {

        dispatch(alertActions.clear());
        setDisabled(true)
        try {
            // create or update user based on id param
            let message;
            if (id) {
                let obj = {
                    "status": data.status,
                    "emial": data.email,
                    "address": data.address,
                    "Phoneno": data.phoneno,
                    "zipcode": data.zipcode,
                }
                // console.log("data front", obj);
                await dispatch(locationActions.update({ id, obj })).unwrap();
                message = 'Location has been updated';
            } else {
                await dispatch(locationActions.addLocation(data)).unwrap();
                message = 'Location added successfully';
            }

            // redirect to location list with success message
            dispatch(locationActions.getAll());
            handleClose(false)
            dispatch(alertActions.success({ message, showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
        setTimeout(() => {
            setDisabled(false)
        }, 2500);
    }

    return (
        <div className={Style.sections_edit}>
            <div className={Style.main_container_edit}>
                <h1 style={{ textAlign: "center" }} className={Style.title}>{title}</h1>
                {!(location?.loading || location?.error) &&
                    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "50px" }}>
                        <div className={Styles.input_row}>
                            <div className={Styles.input_wrapper}>
                                <input placeholder='Phone Number' name="phoneno" type="text" {...register('phoneno')} className={`${errors.phoneno ? 'is-invalid' : ''} theme_input`} />
                                <div className={Styles.invalid_feedback}>{errors.phoneno?.message}</div>
                            </div>
                            <div className={Styles.input_wrapper}>
                                <input placeholder="Zip Code" name="zipcode" type="text" {...register('zipcode')} className={`${errors.zipcode ? 'is-invalid' : ''} theme_input`} />
                                <div className={Styles.invalid_feedback}>{errors.zipcode?.message}</div>
                            </div>
                        </div>
                        <div className={Styles.input_wrapper}>
                            <input placeholder='Email Address' name="email" type="text" {...register('email')} className={`${errors.email ? 'is-invalid' : ''} theme_input`} />
                            <div className={Styles.invalid_feedback}>{errors.email?.message}</div>
                        </div>
                        <div className={Styles.input_wrapper}>
                            <input placeholder="Pickup Address" name="address" type="text" {...register('address')} className={`${errors.address ? 'is-invalid' : ''} theme_input`} />
                            <div className={Styles.invalid_feedback}>{errors.address?.message}</div>
                        </div>
                        <div className={Styles.input_wrapper}>
                            <select className="input_location" name='status' placeholder='Add Status' {...register("status")}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            <div className={Styles.invalid_feedback}>{errors.status?.message}</div>
                        </div>


                        <div className={Styles.input_row} style={{ gap: "20px" }}>
                            <button type="submit" disabled={disabled} className={Styles.theme_btn}>
                                {isSubmitting && disabled && <span className="spinner"></span>}
                                {label}
                            </button>
                        </div>
                    </form>
                }
                {location?.loading &&
                    <div style={{ textAlign: "center", marginTop: "40px" }}>
                        <Loader />
                    </div>
                }
                {location?.error &&
                    <div class="text-center m-5">
                        <div class="text-danger">Error loading user: {location.error}</div>
                    </div>
                }
            </div>
        </div>
    );
}
