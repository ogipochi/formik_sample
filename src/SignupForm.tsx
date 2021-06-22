import React from "react";
import { Formik, useField, FieldHookConfig } from "formik";
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
 * [ props ] MyTextFieldのプロパティ
 */
type MyTextFieldProps = FieldHookConfig<string> & {
    label: string;
};

/**
 * [ component ] カスタム入力フォーム
 * labelにはラベル内のコンテンツとして表示する文字列を渡し、
 * nameには対象プロパティ名を渡します
 * @param param0
 * @returns
 */
const MyTextField = ({ label, ...props }: MyTextFieldProps) => {
    const [field, meta, helper] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
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
                        <MyTextField label="メールアドレス" name="email" type="email" onClick={()=>{console.log("マウスが通過")}}/>
                        <MyTextField label="姓" name="lastName" type="text"/>
                        <MyTextField label="名" name="firstName" type="text"/>
                        <button type="submit">送信</button>
                    </form>
                );
            }}
        </Formik>
    );
};

export default SignupForm;
