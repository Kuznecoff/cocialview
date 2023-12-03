import React, { useState, useEffect } from 'react';
import { Mix, G2, } from '@ant-design/plots';
import { fillRange, inSeconds } from '../../service/parser';
import { configCommands, configMix, configMovments, configReasons, configWatches } from './configs';
import { useChartContext } from '../../ChartContext';
import { useStore } from '../../core/store';
import { toJS } from 'mobx';


const Timeline = () => {
    const [eventsData, setEventsData] = useState(new Array());
    const [eventsDataSec, setEventsDataSec] = useState(new Array());


    const { chartStore } = useStore();
    const { data } = useChartContext();

    const [xField, setXField] = useState('date');
    const [range, setRange] = useState('date');
    const [rawJson, setRawJson] = useState([]);





    useEffect(() => {

        if (xField === 'date' && data.mainTimeline && data.mainTimeline.length > 0) {
            console.log('ondate')
            setEventsData(data.mainTimeline);
            chartStore.timelineData = data.mainTimeline;
            setRawJson(data.rawJson);

            const onFilter = (context: any) => {

                const { view, event } = context;
                const view1 = view.parent.views[1];
                const view2 = view.parent.views[2];
                const view3 = view.parent.views[3];
                const min = Math.min(...event.view.filteredData.map((e: any) => +e.timestamp));
                const max = Math.max(...event.view.filteredData.map((e: any) => +e.timestamp));
                console.log(min, max)
                view1.filter('timestamp', (d: any) => +d >= min && +d <= max);
                view1.render(true);
                view2.filter('timestamp', (d: any) => +d >= min && +d <= max);
                view2.render(true);
                view3.filter('timestamp', (d: any) => +d >= min && +d <= max);
                view3.render(true);


            }

            const onFilter2 = (context: any) => {

                const { event } = context;


                const min = Math.min(...event.view.filteredData.map((e: any) => +e.timestamp));
                const max = Math.max(...event.view.filteredData.map((e: any) => +e.timestamp));
                const newLine = toJS(chartStore.timelineData).filter(d => +d.timestamp >= min && +d.timestamp <= max);
                fillRange(newLine, newLine, inSeconds)
                setEventsDataSec(newLine.sort((a: any, b: any) => +a.timestamp < +b.timestamp ? -1 : 1));
                setRange('dateSeconds')

            }
            G2.registerInteraction('custom-association-filter', {

                showEnable: [
                    {
                        trigger: 'afterrender',
                        action: (context) => {

                            const filteredData = context.event.view.filteredData;
                            console.log(filteredData)
                            chartStore.filteredData = filteredData;
                            const rangeinminutes = getMinutesTimeRange(filteredData);
                            if (rangeinminutes < 7 && (context.view as any).getXScale().field == 'date') {
                                onFilter2(context);
                            } else {
                                onFilter(context);
                            }
                        }
                    },
                ],

                start: [
                    {
                        trigger: 'brush-filter:beforereset',
                        isEnable(context) {
                            if (!((context.view as any).getXScale().field === 'date')) {
                                setRange('date')
                            }
                            return false;
                        },
                        action: [],
                    },

                ],

            });
        }


    }, [data.rawJson, data.xFiled, , xField]);

    let preEvent: any;
    const eventRouter = (component: any, event: any, data: any) => {
        if (event.type === "plot:mouseup") {

            if (preEvent?.data && !event.gEvent.shape?.attrs?.width) {
                chartStore.selectedData = event.view.controllers[2].title;
            }
            else { console.log(event) }
        }
        if (event.type === 'mousedown') {
            preEvent = event;
        }

        if (event.type === 'tooltip:show') {
            const hoverData = (event.data.items || []).map((el: any) => el.data);
            chartStore.hoverData = hoverData;
        }

    }




    return <div>
        {
            range === 'date' ?
                <Mix id="minutesRange" key="date" {...configMix([configReasons(eventsData, xField), configMovments(eventsData, xField), configCommands(eventsData, xField), configWatches(eventsData, xField)])} onEvent={eventRouter} />
                :
                <Mix id="secondsRange" key="sec" {...configMix([configReasons(eventsDataSec, range), configMovments(eventsDataSec, range), configCommands(eventsDataSec, range), configWatches(eventsDataSec, range)])} onEvent={eventRouter} />
        }


    </div>;
};

export default Timeline;



function getMinutesTimeRange(data: any) {
    const min = Math.min(...data.map((e: any) => +e.timestamp));
    const max = Math.max(...data.map((e: any) => +e.timestamp));
    return (max - min) / 60000;
}