import React, { useState, useEffect } from 'react';
import { Mix, G2, } from '@ant-design/plots';
import { fillRange, getCommandTimeLine, getMovementsTimeLine, getReasonsTimeLine, getWatchsTimeLine, inSeconds } from '../../service/parser';
import { configCommands, configMix, configMovments, configReasons, configWatches } from './configs';
import { useChartContext } from '../../ChartContext';
import { useStore } from '../../core/store';


const Timeline = () => {
    const [reasonsData, setReasonsData] = useState(new Array());
    const [movingStatusData, setMovingStatusData] = useState(new Array());
    const [watchesData, setWatchesData] = useState(new Array());
    const [commandsData, setCommandsData] = useState(new Array());
    const { chartStore } = useStore();
    const { data } = useChartContext();



    const [xField, setXField] = useState('date');
    const [range, setRange] = useState([]);
    const [rawJson, setRawJson] = useState([]);


    const onFilter = (context: any) => {
        const { view, event } = context;
        const view1 = view.parent.views[1];
        const view2 = view.parent.views[2];
        const view3 = view.parent.views[3];

        const filterData = event.view.filteredData.map((item: any) => item['date'])
        view1.filter('date', (d: any) => filterData.includes(d));
        view1.render(true);
        view2.filter('date', (d: any) => filterData.includes(d));
        view2.render(true);
        view3.filter('date', (d: any) => filterData.includes(d));
        view3.render(true);

    }

    useEffect(() => {

        if (xField === 'date') {
            setReasonsData(getReasonsTimeLine(data.rawJson));
            setMovingStatusData(getMovementsTimeLine(data.rawJson));
            setWatchesData(getWatchsTimeLine(data.rawJson));
            setCommandsData(getCommandTimeLine(data.rawJson));
            setRawJson(data.rawJson);
        }

        G2.registerInteraction('custom-association-filter', {

            showEnable: [
                {
                    trigger: 'afterrender',
                    action: (context) => {
                        onFilter(context);
                    }
                },
                {
                    trigger: 'slider:dbClick',
                    action: (context) => {
                        console.log('zoom')
                    }
                }
            ],

            start: [
                {
                    trigger: 'slider:valuechanged',
                    action: (context) => {
                        onFilter(context);
                    },
                },
            ],
        });



    }, [data.rawJson, data.xFiled, rawJson, xField]);

    const eventRouter = (_c: any, event: any, data: any) => {
        if (event.type === "slider:valuechanged") {
            const { view } = event;
            chartStore.filteredData = view.views[0].filteredData;
        }
        if (event.type === "element:click") {
            const { view } = event;
            if (event.data.data.date) {
                const xType = view.views[0].controllers[4].slider.component.cfg.id;
                chartStore.selectedData = xType === 'date' ? event.data.data.date : event.data.data.dateSeconds;
            }

        }
        if (event.type === "slider:dblclick") {
            const rangeLength = event.gEvent.delegateObject.slider.getValue()[1] - event.gEvent.delegateObject.slider.getValue()[0];
            if (rangeLength !== 1) {
                const { view } = event;
                const view0 = view.views[1];
                const view1 = view.views[1];
                const view2 = view.views[2];
                const view3 = view.views[3];

                fillRange(view0.filteredData, view0.filteredData, inSeconds);
                fillRange(view0.filteredData, view1.filteredData, inSeconds);
                fillRange(view0.filteredData, view2.filteredData, inSeconds);
                fillRange(view0.filteredData, view3.filteredData, inSeconds);

                setReasonsData(view0.filteredData.sort((a: any, b: any) => +a.timestamp < +b.timestamp ? -1 : 1));
                setMovingStatusData(view1.filteredData.sort((a: any, b: any) => +a.timestamp < +b.timestamp ? -1 : 1));
                setWatchesData(view2.filteredData.sort((a: any, b: any) => +a.timestamp < +b.timestamp ? -1 : 1));
                setCommandsData(view3.filteredData.sort((a: any, b: any) => +a.timestamp < +b.timestamp ? -1 : 1));
                setXField('dateSeconds');
                setRange(event.gEvent.delegateObject.slider.getValue());
            } else {
                setXField('date');
            }
        }

    }




    return <div>

        <Mix {...configMix([configReasons(reasonsData, xField, range), configMovments(movingStatusData, xField), configWatches(watchesData, xField), configCommands(commandsData, xField)])} onEvent={eventRouter} />


    </div>;
};

export default Timeline;

function getEventsByDate(rawJson: any, date: any): any[] {
    throw new Error('Function not implemented.');
}
