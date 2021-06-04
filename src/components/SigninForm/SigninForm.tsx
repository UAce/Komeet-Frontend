import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef } from "react";
import { Form, Input, Button, notification } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { ParticipantData, SigninData } from "../../interfaces/SigninInterfaces";
import { signin } from "../../common/api/SigninApis";

interface SigninFormProps {
    setParticipantData: Dispatch<SetStateAction<ParticipantData | undefined>>;
    eventId: string;
}
const { Item } = Form;
const SigninForm: React.FC<SigninFormProps> = ({ setParticipantData, eventId }) => {
    const [form] = Form.useForm();
    const nameRef = useRef<Input>() as MutableRefObject<Input>; // Ugly hack to fit the type
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    };

    useEffect(() => {
        nameRef.current.input.focus();
    }, []);
    const onFormFinish = async ({ username, password = "" }: SigninData) => {
        try {
            const participantData: ParticipantData = await signin({ username, password, eventId });
            setParticipantData(participantData);
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || "Oops, something went wrong!";
            notification.error({
                message,
                description: "Failed to sign in",
                placement: "bottomLeft"
            });
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
