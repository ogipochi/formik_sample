import React from "react";
import { Formik, useField, FieldHookConfig, FieldInputProps, GenericFieldHTMLAttributes, FieldConfig, Field } from "formik";
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
 * 入力要素をinputに限定
 */
type MyTextFieldProps = JSX.IntrinsicElements['input'] & FieldConfig<string> &{
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
    const [field, meta ] = useField(props);

    // inputの属性のみを抽出
    const {component, as, render, children, validate, name, type, value, innerRef, ...rest} = props;
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...rest}/>
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
                        <MyTextField label="メールアドレス" name="email" type="email" onClick={()=>{console.log("クリックemail")}}/>
                        <MyTextField label="姓" name="lastName" type="text" onKeyDown={()=>{console.log("キーダウンlastName")}}/>
                        <MyTextField label="名" name="firstName" type="text" onDoubleClick={()=>{console.log("ダブルクリックfirstName")}}/>
                        <button type="submit">送信</button>
                    </form>
                );
            }}
        </Formik>
    );
};

export default SignupForm;
