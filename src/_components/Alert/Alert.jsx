import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';

import { alertActions } from '_store';

export { Alert };

function Alert() {
    const dispatch = useDispatch();
    const location = useLocation();
    const alert = useSelector(x => x.alert.value);

    setTimeout(() => {
        dispatch(alertActions.clear());
    }, 5000);

    useEffect(() => {
        // clear alert on location change
        dispatch(alertActions.clear());
    }, [location]);

    if (!alert) return null;

    return (
        <div className={`alert alert-dismissible ${alert.type}`}>
            {alert.message}
            <button type="button" className="btn-close" onClick={() => dispatch(alertActions.clear())}>X</button>

        </div>
    );
}
