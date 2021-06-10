import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";


/**
 * フォームの型
 */
type FormValueType = {
    email: string,
    firstName: string,
    lastName: string
};

/**
 * バリデーションスキーマ
 */
const validationSchema = Yup.object({
    firstName: Yup.string().max(15, "１５文字以下で入力してください").required("このフィールドは必須です"),
    lastName: Yup.string().max(15, "１５文字以下で入力してください").required("このフィールドは必須です"),
    email: Yup.string().email("正しいメールアドレスを入力してください").required("このフィールドは必須です")
});

/**
     * 送信処理
     * @param values 
     */
 const onSubmit = (values: FormValueType) => {
    alert(JSON.stringify(values, null, 2));
}

/**
 * 登録フォーム
 */
const SignupForm = () => {

    /**
     * フォームの定義
     */
    const formik = useFormik<FormValueType>({
        initialValues: {email : "", firstName:"", lastName:""},
        validationSchema: validationSchema,
        onSubmit: onSubmit
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">メールアドレス</label>
                <input id="email" name="email" type="email" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.email}></input>
                {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null}
                <label htmlFor="lastName">姓</label>
                <input id="lastName" name="lastName" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName}></input>
                {formik.touched.lastName && formik.errors.lastName ? (
         <div>{formik.errors.lastName}</div>
       ) : null}
                <label htmlFor="firstName">名</label>
                <input id="firstName" name="firstName" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName}></input>
                {formik.touched.firstName && formik.errors.firstName ? (
         <div>{formik.errors.firstName}</div>
       ) : null}
                <button type="submit" onSubmit={() => {formik.handleSubmit();}}>送信</button>
            </form>
        </div>
    )
}

export default SignupForm;