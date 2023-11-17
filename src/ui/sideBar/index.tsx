import React, { useEffect } from 'react';

import { useAppContext } from '../../AppContext';
import { Layout } from 'antd';
import JsonViewer from '../jsonViewer';
import { useMapglContext } from '../mapgl/mapglContext';


const { Sider } = Layout;



const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#dddddd',
};

function SideBar() {
    const { actions } = useAppContext();
    const { mapglInstance } = useMapglContext();
    useEffect(() => {
        setTimeout(() => mapglInstance?.invalidateSize(), 200)
      }, [mapglInstance,actions.sideBar]);


    return (
        <Sider collapsedWidth={0} trigger={null} style={siderStyle} collapsible collapsed={actions.sideBar} width={378}>
            <JsonViewer></JsonViewer>
        </Sider>
    );
}

export default SideBar;