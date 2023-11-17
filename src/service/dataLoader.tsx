

import { useEffect, useState } from 'react';
import { useAppContext } from '../AppContext';
import { useMapglContext } from '../ui/mapgl/mapglContext';
import { hoverlineMapStyle, layerGeoPoints, timelineMapStyle } from './timelineMapStyle';
import { getGeoJson, inDate } from './parser';
import { useChartContext } from '../ChartContext';
import { useStore } from '../core/store';
import { autorun, toJS } from 'mobx';
import { GeoJsonSource } from '@2gis/mapgl/types';
import { makeRestUrl } from '../core/config';



function DataLoader() {
    const { actions, setActions } = useAppContext();
    const [geoJsonMapDataSource, setGeoJsonMapDataSource] = useState<GeoJsonSource>();
    const { chartStore } = useStore();
    const { setData } = useChartContext();
    const { mapgl, mapglInstance } = useMapglContext();
    useEffect(() => {
        if (!actions.dataQuery) { return }
        setActions({ ...actions, message: { type: 'loading', content: 'Загрузка данных...' } })

        if (mapgl && mapglInstance) {
            const { userId, timeFrom, timeTo } = actions.dataQuery;
            console.log(userId, timeFrom, timeTo)
            const url = makeRestUrl(userId, timeFrom, timeTo);
            fetch(url).then((response) => {
                return response.json();
            })
                .then((data) => {
                    const geoJsonMapDataSourceObject = new mapgl.GeoJsonSource(mapglInstance, {
                        data: getGeoJson(data), attributes: { timelineLayers: 'cocial' }
                    })
                    mapglInstance.addLayer(timelineMapStyle);
                    mapglInstance.addLayer(layerGeoPoints);
                    mapglInstance.addLayer(hoverlineMapStyle);

                    setGeoJsonMapDataSource(geoJsonMapDataSourceObject);
                    setActions({ ...actions, rawJson: inDate(data), message: undefined })
                    setData({ rawJson: data, xFiled: 'date' });
                });
        };
        return () => {
            mapglInstance?.removeLayer('timeline');
            mapglInstance?.removeLayer('timeline-geo-events');
            mapglInstance?.removeLayer('hoverline');
            if (geoJsonMapDataSource) {
                geoJsonMapDataSource.destroy();
                setGeoJsonMapDataSource(undefined);
            }
        }
    }, [actions.dataQuery])

    useEffect(() => {
        const disposer = autorun(() => {
            const filteredData = toJS(chartStore.filteredData).map(event => event.timestamp);
            const min = Math.min(...filteredData);
            const max = Math.max(...filteredData);
            const minmax = [min, max];
            geoJsonMapDataSource?.setData(getGeoJson(actions.rawJson, minmax));
        });
        return disposer;

    }, [chartStore.filteredData.length, chartStore.filteredData, geoJsonMapDataSource])

    return <></>
}

export default DataLoader;

