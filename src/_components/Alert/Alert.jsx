import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { alertActions } from '_store';

export { Alert };

function Alert() {
    const dispatch = useDispatch();
    const location = useLocation();
    const alert = useSelector(x => x.alert.value);


    // setTimeout(() => {
    //     dispatch(alertActions.clear());
    // }, 5000);

    useEffect(() => {
        // clear alert on location change
        dispatch(alertActions.clear());
    }, [location]);

    alert?.type === "success" ?
        toast.success(alert?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
        :
        toast.error(alert?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })

    if (!alert) return null;

    return (
        // <div className={`alert alert-dismissible ${alert.type}`}>
        //     {alert.message}
        //     <button type="button" className="btn-close" onClick={() => dispatch(alertActions.clear())}>X</button>
        // </div>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            limit={1}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    );
}
