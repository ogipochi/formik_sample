import React from "react";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";

/**
 * フォームの型
 */
type FormValueType = {
    email: string;
    firstName: string;
    lastName: string;
};

/**
 * バリデーションスキーマ
 */
const validationSchema = Yup.object({
    firstName: Yup.string()
        .max(15, "１５文字以下で入力してください")
        .required("このフィールドは必須です"),
    lastName: Yup.string()
        .max(15, "１５文字以下で入力してください")
        .required("このフィールドは必須です"),
    email: Yup.string()
        .email("正しいメールアドレスを入力してください")
        .required("このフィールドは必須です"),
});

/**
 * 送信処理
 * @param values
 */
const onSubmit = (values: FormValueType) => {
    alert(JSON.stringify(values, null, 2));
};

/**
 * 登録フォーム
 */
const SignupForm = () => {
    const initialValues: FormValueType = {
        email: "",
        firstName: "",
        lastName: "",
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik) => {
                return (
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="email">メールアドレス</label>
                        <Field name="email" type="text" />
                        <ErrorMessage name="email" />
                        <label htmlFor="lastName">姓</label>
                        <Field name="lastName" type="text" />
                        <ErrorMessage name="firstName" />
                        <label htmlFor="firstName">名</label>
                        <Field name="firstName" type="firstName" />
                        <ErrorMessage name="firstName" />
                        <button type="submit">送信</button>
                    </form>
                );
            }}
        </Formik>
    );
};

export default SignupForm;
