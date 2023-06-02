import Bg from '../../_assets/images/signupBg.png';
import Style from "./style.module.css";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { authActions } from '_store';

export { Reset };

function Reset() {
    const [disabled, setDisabled] = useState(false)
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    let auth = searchParams.get('authorization')
    console.log("authorization", auth);

    // Add these variables to your component to track the state
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ password }) {
        setDisabled(true)
        setTimeout(() => {
            setDisabled(false)
        }, 2500);
        return dispatch(authActions.reset({ password, auth }));
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
                    <h1 className={Style.auth_title} style={{ textAlign: "center", marginBottom: "50px" }}>
                        Reset your password
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className={Style.input_wrapper}>
                            <div className={Style.password_field}>
                                <input placeholder='Enter your password' name="password"
                                    type={showPassword ? 'text' : 'password'} {...register('password')}
                                    className={`${errors.password ? 'is-invalid' : ''} theme_input`} />
                                <span className={Style.pass_icon} aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword} > {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />} </span>
                            </div>
                            <div className={Style.invalid_feedback}>{errors.password?.message}</div>
                        </div>
                        <div className={Style.button_wrapper} style={{ margin: "20px 0" }}>
                            <button disabled={disabled} className={Style.theme_btn}>
                                {isSubmitting && disabled &&
                                    disabled ? <span className="spinner"></span> : ""
                                }
                                Update Password
                            </button>
                        </div>
                        <span className={Style.auth_link} style={{ textAlign: "center" }}>
                            Have an account &nbsp;
                            <Link to="../login">Sign in</Link>
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
