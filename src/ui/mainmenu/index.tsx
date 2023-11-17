import React from 'react';
import { Button, Flex, Layout, Space } from 'antd';
import { HistoryOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useAppContext } from '../../AppContext';
import RequestForm from '../requestForm';

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'left',
    color: '#fff',
    height: 70,
    paddingInline: 20,
    lineHeight: '70px',
    backgroundColor: '#ffffff',
    background: 'linear-gradient(180deg, rgb(255, 255, 255) 99%, rgb(222, 222, 222) 100%)',
};

function MainMenu() {
    const { actions, setActions } = useAppContext();

    return (
        <Header style={headerStyle}>
            <Flex justify={'space-between'} align={'flex-start'}>
                <Space >
                    <Button type="default" onClick={() => setActions({ ...actions, sideBar: !actions.sideBar, })} icon={actions.sideBar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
                    <Button type="default" onClick={() => setActions({ ...actions, historyDrawer: true, })} icon={<HistoryOutlined />} />
                </Space>
                <Space >
                    <RequestForm />
                </Space>
            </Flex>
        </Header>
    );
}

export default MainMenu;