import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef } from "react";
import { Form, Radio, Input, notification, Checkbox, Divider, Select, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { ParticipantData, SigninData } from "../../interfaces/ParticipantInterfaces";

interface SigninFormProps {
    setParticipantData: Dispatch<SetStateAction<ParticipantData | undefined>>;
}
const { Item } = Form;
const SigninForm: React.FC<SigninFormProps> = ({ setParticipantData }) => {
    const [form] = Form.useForm();
    const nameRef = useRef<Input>() as MutableRefObject<Input>; // Ugly hack to fit the type
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    };

    useEffect(() => {
        nameRef.current.input.focus();
    }, []);
    const onFormFinish = async (values: SigninData) => {
        try {
            console.log(values);
            // TODO: sign in
            // const participantData: SignInResponse = await signIn(values);
            const participantData = { ...values, availabilities: [] };
            setParticipantData(participantData);
        } catch (error) {
            console.error(error);
            // TODO: catch 401 for wrong password and show notification
            // notification.error({
            //     message: "Oops, something went wrong!",
            //     description: "Failed to create event, please contact support.",
            //     placement: "topRight"
            // });
        }
    };
    return (
        <>
            <Form form={form} name="signinForm" style={{ textAlign: "center" }} onFinish={onFormFinish} {...layout}>
                <h2>Sign In</h2>
                <Item
                    label="Your name"
                    name="username"
                    required
                    rules={[{ required: true, message: "Please enter your name" }]}
                >
                    <Input autoFocus ref={nameRef} placeholder="e.g. John Doe" />
                </Item>
                <Item label="Password" name="password">
                    <Input.Password iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                </Item>
                <Item>
                    <Button htmlType="submit">Sign in</Button>
                </Item>
            </Form>
        </>
    );
};

export default SigninForm;
