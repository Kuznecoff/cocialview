import React from 'react';
import { useEffect } from 'react';

import { useAppContext } from '../../AppContext';
import { message } from 'antd';



function Message() {
    const { actions } = useAppContext();
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    useEffect(() => {
        if (actions.message) {
            messageApi.open({
                key,
                type: actions.message.type,
                content: actions.message.content,
                duration:0
            });
        } else {
            messageApi.destroy(
                key
            );
        }

    }, [messageApi, actions.message]);


    return (
        <>
            {contextHolder}
        </>
    );
}

export default Message;