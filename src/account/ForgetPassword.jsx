import Bg from './signinBg.png';
import Style from "./style.module.css";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { authActions } from '_store';

export { Forget };

function Forget() {
    const dispatch = useDispatch();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ email }) {
        return dispatch(authActions.forgot({ email }));
    }

    return (
        <div className={Style.auth_content}>
            <div className={Style.auth_section}>
                <div className={Style.auth_content_wrapper}>
                    <div className={Style.logo_auth}>
                        <Link to="/">
                            <img
                                src="/logo_light.png"
                                alt="Logo"
                                width="235px"
                                height="80px"
                            />
                        </Link>
                    </div>
                    <h1 className={Style.auth_title} style={{ textAlign: "center", marginBottom:"50px"}}>
                        Forgot your password?
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className={Style.input_wrapper}>
                            <input placeholder='Email Address*' name="email" type="text" {...register('email')} className={`${errors.email ? 'is-invalid' : ''} theme_input`} />
                            <div className={Style.invalid_feedback}>{errors.email?.message}</div>
                        </div>
                        <div className={Style.button_wrapper} style={{ margin: "20px 0" }}>
                            <button disabled={isSubmitting} className={Style.theme_btn}>
                                {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                                Reset Password
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
