import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import MainMenu from './ui/mainmenu';
import { AppContextProvider, useAppContext } from './AppContext';
import HistoryList from './ui/historyList';
import Mapgl from './ui/mapgl/mapgl';
import { useMapglContext } from './ui/mapgl/mapglContext';
import Message from './ui/notification';
import DataLoader from './service/dataLoader';
import Timeline from './ui/timeline';
import JsonViewer from './ui/jsonViewer';
import { useChartContext } from './ChartContext';




const { Footer, Sider, Content } = Layout;

const layoutStyle = {
  height: 'calc(100vh - 240px)',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#dddddd',
};
const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#ffffff',
  height: '96px'
};


function App() {

  const { mapglInstance } = useMapglContext();
  useEffect(() => { 
    setTimeout(() => mapglInstance?.invalidateSize(), 200) }, [mapglInstance]);

  return (
    <>
      <AppContextProvider >

        <Layout style={layoutStyle} hasSider>
          <HistoryList />
          <Sider collapsedWidth={0} trigger={null} style={siderStyle} collapsible collapsed={false} width={378}>
            <JsonViewer></JsonViewer>
          </Sider>
          <Layout>
            <MainMenu />
            <Content>

              <Mapgl />

            </Content>

          </Layout>
          <Message />
        </Layout>
        <DataLoader />
      </AppContextProvider >
      <Timeline />


    </>
  );
}

export default App;
