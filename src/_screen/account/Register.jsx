import Bg from '../../_assets/images/signupBg.png';
import Style from "./style.module.css";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { history } from '_helpers';
import { userActions, alertActions, authActions } from '_store';

export { Register };

function Register() {
    const dispatch = useDispatch();

    // Add these variables to your component to track the state
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('First Name is required'),
        phoneno: Yup.string().matches(/^\d{11}$/, { message: "Please enter valid number.", excludeEmptyString: false }),
        email: Yup.string().email()
            .required('email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    async function onSubmit(data) {
        // console.log("data", data);
        const email = data.email
        const password = data.password

        dispatch(alertActions.clear());
        try {
            await dispatch(userActions.register(data)).unwrap();
            await dispatch(authActions.login({ email, password }));
            // redirect to login page and display success alert
            history.navigate('/');
            dispatch(alertActions.success({ message: 'Registration successful', showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    return (
        <div className={Style.auth_content}>
            <div className={Style.auth_section}>
                <div className={Style.auth_content_wrapper}>
                    <div className={Style.logo_auth}>
                        <Link to="/">
                            <img
                                src="/images/I-Ship_logo.png"
                                alt="Logo"
                                width="300px"
                                height="70px"
                            />
                        </Link>
                    </div>
                    <h1 className={Style.auth_title} style={{ textAlign: "center", marginBottom: "40px" }}>
                        Create Account
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={Style.input_row}>
                            <div className={Style.input_wrapper}>
                                <input placeholder='Full Name*' name="name" type="text" {...register('name')} className={`${errors.name ? 'is-invalid' : ''} theme_input`} />
                                <div className={Style.invalid_feedback} >{errors.name?.message}</div>
                            </div>
                            <div className={Style.input_wrapper}>
                                <input placeholder='Phone Number*' name="phoneno" type="text" {...register('phoneno')} className={`${errors.phone ? 'is-invalid' : ''} theme_input`} />
                                <div className={Style.invalid_feedback} >{errors.phoneno?.message}</div>
                            </div>
                        </div>
                        <div className={Style.input_wrapper}>
                            <input placeholder='Email Address*' name="email" type="email" {...register('email')} className={`${errors.email ? 'is-invalid' : ''} theme_input`} />
                            <div className={Style.invalid_feedback} >{errors.email?.message}</div>
                        </div>
                        <div className={Style.input_wrapper}>
                            <div className={Style.password_field}>
                                <input placeholder='Password' name="password"
                                    type={showPassword ? 'text' : 'password'} {...register('password')}
                                    className={`${errors.password ? 'is-invalid' : ''} theme_input`} />
                                <span className={Style.pass_icon} aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword} > {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />} </span>
                            </div>
                            <div className={Style.invalid_feedback} >{errors.password?.message}</div>
                        </div>
                        <div className={Style.button_wrapper} style={{ margin: "20px 0" }}>
                            <button disabled={isSubmitting} className={Style.theme_btn}>
                                {isSubmitting &&
                                    setTimeout(() => {
                                        <span className="spinner"></span>
                                    }, 300)
                                }
                                Register
                            </button>
                        </div>
                        <span className={Style.auth_link}>
                            Already have an account? &nbsp;
                            <Link to="../login" className="btn btn-link">Sign in</Link>
                        </span>
                    </form>
                </div>
            </div>
            <div className={Style.auth_image_section}>
                <img className={Style.image_full} src={Bg} alt="loginBg" />
            </div>
        </div>
    )
}
