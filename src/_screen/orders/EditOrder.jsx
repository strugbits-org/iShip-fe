import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import Style from './style.module.css';
import Styles from "../account/style.module.css";
import { userActions, alertActions } from '_store';
import { orderData } from '_helpers/dummy'
import { Loader } from '../../_components/loader';

export { EditOrder };

function EditOrder({ handleClose, id }) {
    // console.log("id", id);
    const [disabled, setDisabled] = useState(false)
    const [order, setOrder] = useState(false)
    // Add these variables to your component to track the state


    const dispatch = useDispatch();
    const user = useSelector(x => x.users.list);
    const data = orderData

    // console.log("user-->", user);
    // form validation rules 
    const validationSchema = Yup.object().shape({
        status: Yup.string()
            .required('Status is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        if (id) {
            // fetch user details into redux state and 
            // populate form fields with reset()
            // and filter by props id

            // dispatch(userActions.getAll())
            //     .then(user => {
            //         const userArr = user?.payload?.user
            //         let item = userArr?.filter((c) => {
            //             const userObj = c._id === id
            //             return userObj
            //         })
            //         reset(item[0])
            //     })
            let orderItem = data?.filter((x) => {
                let item = x.orderNo === id
                return item
            })
            reset(orderItem[0])
            setOrder(orderItem[0])
        }
    }, []);

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        setDisabled(true)
        try {
            // create or update user based on id param
            let message;
            if (id) {
                await dispatch(userActions.update({ id, data })).unwrap();
                message = 'Order has been updated';
            }

            dispatch(userActions.getAll());
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
                <div className={Style.head}>
                    <h1 className={Style.title}>Edit Order</h1>
                    <span className={`${order?.status} status`}>{order?.status}</span>
                </div>
                <div className={Style.details}>
                    <div className={Style.detail_wrapper}>
                        <div className={Style.detail_box}>
                            <p className={Style.detail_title}>Order No:</p>
                            <p className={Style.detail_value}>{order?.orderNo}</p>
                        </div>
                        <div className={Style.detail_box}>
                            <p className={Style.detail_title}>Amount:</p>
                            <p className={Style.detail_value}>{order?.amount}</p>
                        </div>
                    </div>
                    <div className={Style.detail_wrapper}>
                        <div className={Style.detail_box}>
                            <p className={Style.detail_title}>Store:</p>
                            <p className={Style.detail_value}>{order?.store}</p>
                        </div>
                        <div className={Style.detail_box}>
                            <p className={Style.detail_title}>Merchant:</p>
                            <p className={Style.detail_value}>{order?.merchant}</p>
                        </div>
                    </div>
                    <div className={Style.detail_wrapper}>
                        <div className={Style.detail_box}>
                            <p className={Style.detail_title}>Products:</p>
                            <p className={Style.detail_value}>{order?.products}</p>
                        </div>
                        <div className={Style.detail_box}>
                            <p className={Style.detail_title}>Created At:</p>
                            <p className={Style.detail_value}>{order?.createdAt}</p>
                        </div>
                    </div>
                </div>
                {!(data?.loading || data?.error) &&
                    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "30px" }}>
                        <div className={Style.input_container}>
                            <span className={Style.input_label}>
                                Change order status
                            </span>
                            <select className={Style.input_order} name='status' placeholder='Add Status' {...register("status")}>
                                <option value="Pending">Pending</option>
                                <option value="On the way">On the way</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                            <div className={Styles.invalid_feedback}>{errors.name?.message}</div>
                        </div>

                        <div className={Style.input_row} style={{ gap: "20px" }}>
                            <button type="submit" disabled={disabled} className={Style.input_btn}>
                                {isSubmitting && disabled && <span className="spinner"></span>}
                                Update
                            </button>
                        </div>
                    </form>
                }
                {data?.loading &&
                    <div style={{ textAlign: "center", marginTop: "40px" }}>
                        <Loader />
                    </div>
                }
                {data?.error &&
                    <div class="text-center m-5">
                        <div class="text-danger">Error loading user: {user.error}</div>
                    </div>
                }
            </div>
        </div>
    );
}
