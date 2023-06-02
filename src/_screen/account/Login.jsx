import Bg from '../../_assets/images/signupBg.png';
import Style from "./style.module.css";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { authActions } from '_store';
import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';


export { Login };

function Login() {
    const dispatch = useDispatch();

    // Add these variables to your component to track the state
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().email()
        .required('email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ email, password }) {
        return dispatch(authActions.login({ email, password }));
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
                    <h1 className={Style.auth_title} style={{ textAlign: "center" }}>
                        Sign in
                    </h1>
                    <p className={Style.aut_subtitle} style={{ textAlign: "center" }}>
                        Sign in to access your dashboard
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className={Style.input_wrapper}>
                            <input placeholder='Email Address*' name="email" type="text" {...register('email')} className={`${errors.email ? 'is-invalid' : ''} theme_input`} />
                            <div className={Style.invalid_feedback}>{errors.email?.message}</div>
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
                            <div className={Style.invalid_feedback}>{errors.password?.message}</div>
                        </div>
                        <span className={Style.auth_forget}>
                            <Link to="../forgot-password">Forgot password?</Link>
                        </span>
                        <div className={Style.button_wrapper} style={{ margin: "20px 0" }}>
                            <button disabled={isSubmitting} className={Style.theme_btn}>
                            {isSubmitting &&
                                    setTimeout(() => {
                                        <span className="spinner"></span>
                                    }, 300)
                                }
                                Login
                            </button>
                        </div>
                        <span className={Style.auth_link} style={{ textAlign: "center" }}>
                            Don’t have an account? &nbsp;
                            <Link to="../register">Create an account</Link>
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
