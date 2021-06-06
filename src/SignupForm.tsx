import React from "react";
import { useFormik } from "formik";


/**
 * フォームの型
 */
type FormValueType = {
    email: string,
    firstName: string,
    lastName: string
}

/**
 * 登録フォーム
 */
const SignupForm = () => {
    /**
     * 送信処理
     * @param values 
     */
    const onSubmit = (values: FormValueType) => {
        alert(JSON.stringify(values, null, 2));
    }

    /**
     * フォームの定義
     */
    const formik = useFormik<FormValueType>({
        initialValues: {email : "", firstName:"", lastName:""},
        onSubmit: onSubmit
    });
    
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">メールアドレス</label>
                <input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email}></input>
                <label htmlFor="lastName">姓</label>
                <input id="lastName" name="lastName" type="text" onChange={formik.handleChange} value={formik.values.lastName}></input>
                <label htmlFor="firstName">名</label>
                <input id="firstName" name="firstName" type="text" onChange={formik.handleChange} value={formik.values.firstName}></input>
                <button type="submit" onSubmit={formik.handleSubmit}>送信</button>
            </form>
        </div>
    )
}

export default SignupForm;