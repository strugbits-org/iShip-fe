import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Style from './style.module.css';
import Styles from "../account/style.module.css";

// import { history } from '_helpers';
import { userActions, alertActions } from '_store';

export { DeleteUser };

function DeleteUser({ handleClose, id }) {


    const dispatch = useDispatch();
    const user = useSelector(x => x.users?.item);
    // console.log("user-->",user);


    useEffect(() => {
        dispatch(userActions.getById(id)).unwrap()
    }, []);

    async function onDelete() {
        dispatch(alertActions.clear());
        try {

            dispatch(userActions.delete(id))
            let message;
            message = 'User has been deleted';

            // redirect to user list with success message
            dispatch(userActions.getAll());
            handleClose(false)
            dispatch(alertActions.success({ message, showAfterRedirect: true }));

        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    return (
        <div className={Style.sections_edit}>
            <div className={Style.main_container_edit}>
                <h1 className={Style.title}>Are you sure you want to delete this user?</h1>
                <div>
                    <button onClick={() => onDelete()} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                        {user.isDeleting
                            ? <span className="spinner-border spinner-border-sm"></span>
                            : <span>Yes Delete</span>
                        }
                    </button>
                    <button onClick={handleClose(false)} className={Styles.theme_btn}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
