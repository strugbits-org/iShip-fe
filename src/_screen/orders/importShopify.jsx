import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import Style from './style.module.css';
import Styles from "../account/style.module.css";
import { orderActions, alertActions } from '_store';
import { Loader } from '../../_components/loader';


export { ImportShopify };

function ImportShopify({ handleClose, id }) {
    // console.log("id", id);
    const [disabled, setDisabled] = useState(false)
    // Add these variables to your component to track the state


    const dispatch = useDispatch();
    const location = useSelector(x => x.location.list);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        apikey: Yup.string()
            .required('Api key is required'),
        event: Yup.string()
            .required('Event Version is required'),
        url: Yup.string()
            .required('Store url is required'),

    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;



    async function onSubmit(data) {
        // console.log("Client data", data);
        dispatch(alertActions.clear());
        setDisabled(true)
        try {
            // create or update user based on id param
            let message;

            await dispatch(orderActions.importShopify(data)).unwrap();
            message = 'Order has been import successfully';

            // redirect to location list with success message
            dispatch(orderActions.getAll());
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
                <h1 style={{ textAlign: "center" }} className={Style.title}>Import from shopify</h1>
                {!(location?.loading || location?.error) &&
                    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "50px" }}>
                        <div className={Styles.input_wrapper}>
                            <input placeholder='Your Api Key' name="apikey" type="text" {...register('apikey')} className={`${errors.apikey ? 'is-invalid' : ''} theme_input`} />
                            <div className={Styles.invalid_feedback}>{errors.apikey?.message}</div>
                        </div>
                        <div className={Styles.input_wrapper}>
                            <input placeholder='Your Event version' name="event" type="text" {...register('event')} className={`${errors.event ? 'is-invalid' : ''} theme_input`} />
                            <div className={Styles.invalid_feedback}>{errors.event?.message}</div>
                        </div>
                        <div className={Styles.input_wrapper}>
                            <input placeholder='Store domain eg: fa4e11-2.myshopify.com' name="url" type="text" {...register('url')} className={`${errors.url ? 'is-invalid' : ''} theme_input`} />
                            <div className={Styles.invalid_feedback}>{errors.url?.message}</div>
                        </div>
                        <div className={Styles.input_row} style={{ gap: "20px" }}>
                            <button type="submit" disabled={disabled} className={Styles.theme_btn}>
                                {isSubmitting && disabled && <span className="spinner"></span>}
                                Import orders
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
