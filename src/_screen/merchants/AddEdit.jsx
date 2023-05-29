import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import Style from './style.module.css';
import Styles from "../account/style.module.css";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { userActions, alertActions } from '_store';

export { AddEdit };

function AddEdit({ handleClose, id }) {
    // console.log("id", id);

    // Add these variables to your component to track the state
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const [title, setTitle] = useState();
    const [label, setLabel] = useState();

    const dispatch = useDispatch();
    const user = useSelector(x => x.users.list);
    // console.log("user-->", user);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('First Name is required'),
        email: Yup.string()
            .required('Email is required').email(),
        phoneno: Yup.string().matches(/^\d{11}$/, { message: "Please enter valid number.", excludeEmptyString: false }),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            // password optional in edit mode 
            .concat(id ? null : Yup.string().required('Password is required'))
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        if (id) {
            setTitle('Edit Merchant Detail');
            setLabel('UPDATE');
            // fetch user details into redux state and 
            // populate form fields with reset()
            // and filter by props id
            dispatch(userActions.getAll())
                .then(user => {
                    const userArr = user?.payload?.user
                    let item = userArr.filter((c) => {
                        const userObj = c._id === id
                        return userObj
                    })
                    reset(item[0])
                })
        } else {
            setTitle('Add New Merchant');
            setLabel('ADD MERCHANT');
        }
    }, []);

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            // create or update user based on id param
            let message;
            if (id) {
                await dispatch(userActions.update({ id, data })).unwrap();
                message = 'User has been updated';
            } else {
                await dispatch(userActions.addUser(data)).unwrap();
                message = 'User added successfully';
            }

            // redirect to user list with success message
            // history.navigate('/users');
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
                <h1 className={Style.title}>{title}</h1>
                {!(user?.loading || user?.error) &&
                    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "50px" }}>
                        <div className={Styles.input_row}>
                            <div className={Styles.input_wrapper}>
                                <input placeholder="Full Name" name="name" type="text" {...register('name')} className={`${errors.name ? 'is-invalid' : ''} theme_input`} />
                                <div className={Styles.invalid_feedback}>{errors.name?.message}</div>
                            </div>
                            <div className={Styles.input_wrapper}>
                                <input placeholder='Phone Number' name="phoneno" type="number" {...register('phoneno')} className={`${errors.phoneno ? 'is-invalid' : ''} theme_input`} />
                                <div className={Styles.invalid_feedback}>{errors.phoneno?.message}</div>
                            </div>
                        </div>
                        <div className={Styles.input_wrapper}>
                            <input placeholder='Email Address' name="email" type="text" {...register('email')} className={`${errors.email ? 'is-invalid' : ''} theme_input`} />
                            <div className={Styles.invalid_feedback}>{errors.email?.message}</div>
                        </div>
                        <div className={Styles.input_wrapper}>
                            <label className="form-label">
                                {id && <span className={Style.notification}>(Leave blank to keep the same password)</span>}
                            </label>
                            <div className={Styles.password_field}>
                                <input placeholder='Password' name="password"
                                    type={showPassword ? 'text' : 'password'} {...register('password')}
                                    className={`${errors.password ? 'is-invalid' : ''} theme_input`} />
                                <span className={Styles.pass_icon} aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword} > {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />} </span>
                            </div>
                            <div className={Styles.invalid_feedback}>{errors.password?.message}</div>

                        </div>
                        <div className={Styles.input_row} style={{ gap: "20px" }}>
                            <button type="submit" disabled={isSubmitting} className={Styles.theme_btn}>
                                {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                                {label}
                            </button>
                        </div>
                    </form>
                }
                {user?.loading &&
                    <div className="text-center m-5">
                        <span className="spinner-border spinner-border-lg align-center"></span>
                    </div>
                }
                {user?.error &&
                    <div class="text-center m-5">
                        <div class="text-danger">Error loading user: {user.error}</div>
                    </div>
                }
            </div>
        </div>
    );
}
