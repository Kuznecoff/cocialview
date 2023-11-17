import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { MapglContextProvider } from './ui/mapgl/mapglContext';
import { ChartContextProvider } from './ChartContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <ConfigProvider locale={ruRU}>
    <MapglContextProvider>
      <ChartContextProvider>
        <App />
      </ChartContextProvider>
    </MapglContextProvider>
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
