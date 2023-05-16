import Bg from './signinBg.png';
import Style from "./style.module.css";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { history } from '_helpers';
import { userActions, alertActions } from '_store';

export { Register };

function Register() {
    const dispatch = useDispatch();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
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
        console.log("data", data);
        dispatch(alertActions.clear());
        try {
            await dispatch(userActions.register(data)).unwrap();

            // redirect to login page and display success alert
            history.navigate('/account/login');
            dispatch(alertActions.success({ message: 'Registration successful', showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    return (
        <div className={Style.auth_content}>
            <div className={Style.auth_section}>
                <div className="flex center"
                    style={{ marginBottom: 100, textAlign: "center" }}>
                    <Link to="/">
                        <img
                            src="/logo_light.png"
                            alt="Logo"
                            width="235px"
                            height="80px"
                        />
                    </Link>
                </div>
                <h1 className={Style.auth_title} style={{ textAlign: "center", marginBottom: "40px" }}>
                    Create Account
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={Style.input_row}>
                        <div className={Style.input_wrapper}>
                            <input placeholder='Full Name*' name="firstName" type="text" {...register('firstName')} className={`${errors.firstName ? 'is-invalid' : ''} theme_input`} />
                            <div className={Style.invalid_feedback} >{errors.firstName?.message}</div>
                        </div>
                        <div className={Style.input_wrapper}>
                            <input placeholder='Last Name*' name="lastName" type="text" {...register('lastName')} className={`${errors.lastName ? 'is-invalid' : ''} theme_input`} />
                            <div className={Style.invalid_feedback} >{errors.lastName?.message}</div>
                        </div>
                    </div>
                    <div className={Style.input_wrapper}>
                        <input placeholder='Email Address*' name="email" type="email" {...register('email')} className={`${errors.email ? 'is-invalid' : ''} theme_input`} />
                        <div className={Style.invalid_feedback} >{errors.email?.message}</div>
                    </div>
                    <div className={Style.input_wrapper}>
                        <input placeholder='Password' name="password" type="password" {...register('password')} className={`${errors.password ? 'is-invalid' : ''} theme_input`} />
                        <div className={Style.invalid_feedback} >{errors.password?.message}</div>
                    </div>
                    <div className={Style.button_wrapper} style={{ margin: "20px 0" }}>
                        <button disabled={isSubmitting} className={Style.theme_btn}>
                            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Register
                        </button>
                    </div>
                    <span className={Style.auth_link}>
                        Already have an account? &nbsp;
                        <Link to="../login" className="btn btn-link">Sign in</Link>
                    </span>
                </form>
            </div>
            <div className={Style.auth_image_section}>
                <img className={Style.image_full} src={Bg} alt="loginBg" />
            </div>
        </div>
    )
}
