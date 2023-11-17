import React from 'react';
import { Drawer } from 'antd';

import { useAppContext } from '../../AppContext';
import { HistoryOutlined } from '@ant-design/icons';

const tileIconStyle: React.CSSProperties = {
    height: '32px',
    paddingRight:10,
};

function HistoryList() {
    const { actions, setActions } = useAppContext();
    const onClose = () => {
        setActions({ ...actions, historyDrawer: false });
    };

    return (
        <Drawer
            title={<div><HistoryOutlined style={tileIconStyle} />История запросов:</div>}
            placement={'left'}
            closable={false}
            onClose={onClose}
            open={actions.historyDrawer}
            key={'left'}
        >

        </Drawer>
    );
}

export default HistoryList;