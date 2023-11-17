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
import ElementResizeListener from './core/elementResizeListener';
import SideBar from './ui/sideBar';




const { Content } = Layout;

const layoutStyle = {
  height: 'calc(100vh - 240px)',
};



function App() {

  const { mapglInstance } = useMapglContext();

  const onResize = () => {
    mapglInstance?.invalidateSize();
  }
  const { actions } = useAppContext();
  return (
    <>
      <AppContextProvider >

        <Layout style={layoutStyle} hasSider>
          <HistoryList />
          <SideBar />
          <Layout>
            <MainMenu />
            <Content>

              <Mapgl />

            </Content>

          </Layout>
          <Message />
        </Layout>
        <DataLoader />
        <ElementResizeListener onResize={onResize} />
      </AppContextProvider >
      <Timeline />


    </>
  );
}

export default App;
