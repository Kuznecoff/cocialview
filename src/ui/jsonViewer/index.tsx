import { autorun, toJS } from 'mobx';
import React, { useEffect, useState } from 'react';
import ReactJson from 'react-json-view'
import { useStore } from '../../core/store';
import { ChartContextActions, useChartContext } from '../../ChartContext';
import { getEventsByDate } from '../../service/parser';


const josnViewStyle: React.CSSProperties = {
    height: '100%',
    overflowY: 'scroll',
    width: '100%',
    padding: '8px',
    textAlign: 'left',
    lineHeight: '14px'
};

function JsonViewer() {
    const [dataJson, setDataJson] = useState(new Array());
    const { chartStore } = useStore();
    const { data } = useChartContext();
    useEffect(() => {
        const disposer = autorun(() => {
            const date = chartStore.selectedData;
            const selectedData = getEventsByDate(data.rawJson || [], date)
            setDataJson(selectedData);

        });
        return disposer;

    }, [chartStore.selectedData.length, chartStore.selectedData, data])

    return (
  
        <ReactJson style={josnViewStyle} iconStyle='triangle' enableClipboard={false} indentWidth={2} displayObjectSize={false} displayDataTypes={false} collapsed={false} collapseStringsAfterLength={20} theme={'shapeshifter:inverted'} src={dataJson} />
    );
}

export default JsonViewer;

