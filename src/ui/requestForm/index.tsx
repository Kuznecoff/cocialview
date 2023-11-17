import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select } from "antd";
import React from "react";
import { useAppContext } from "../../AppContext";
import { Rule } from "antd/lib/form";



const FormStyle: any = {
    textAlign: 'left',
    height: 64,
    lineHeight: '64px',
    display: 'inline-flex',
};

function RequestForm() {
    const { actions, setActions } = useAppContext();
    const [form] = Form.useForm();
    const
        rules: Rule[] = [
            {
                type: 'array',
                required: false,
                message: 'Выберите период запроса',
            },
        ];
    const onFinish = (values: any) => {
        setActions({ ...actions, dataQuery: { userId: values.userId, timeFrom: values["range-time-picker"][0].$d.getTime(), timeTo: values["range-time-picker"][1].$d.getTime() } })
        console.log('Finish:', values);
    };

    const onAbort = (values: any) => {
        setActions({ ...actions, dataQuery: undefined })
        console.log('Abort:', values);
    };

    const { RangePicker } = DatePicker;

    return (<Form form={form} style={FormStyle} layout={'inline'} onFinish={onFinish} onAbort={onAbort}>
        <Form.Item rules={[
            {
                required: false,
                message: 'Введите идентификатор',
            },
        ]} name="userId" >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Идентификатор пользователя" />
        </Form.Item>
        <Form.Item name="range-time-picker" rules={rules} >
            <RangePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" type="primary" icon={<SearchOutlined />}></Button>
        </Form.Item>

    </Form >
    );
}

export default RequestForm;

