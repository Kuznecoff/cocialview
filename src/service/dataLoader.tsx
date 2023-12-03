

import { useEffect, useState } from 'react';
import { useAppContext } from '../AppContext';
import { useMapglContext } from '../ui/mapgl/mapglContext';
import { hoverlineMapStyle, layerGeoPoints, layerHoverGeoPoints, timelineMapStyle } from './timelineMapStyle';
import { getEventsTimeLine, getGeoBounds, getGeoJson, inDate } from './parser';
import { useChartContext } from '../ChartContext';
import { useStore } from '../core/store';
import { autorun, toJS } from 'mobx';
import { GeoJsonSource } from '@2gis/mapgl/types';
import { makeRestUrl } from '../core/config';
import { getMinMax } from './helper';



function DataLoader() {
    const { actions, setActions } = useAppContext();
    const [geoJsonMapDataSource, setGeoJsonMapDataSource] = useState<GeoJsonSource>();
    const [geoJsonMapDataHoverSource, setGeoJsonMapDataHoverSource] = useState<GeoJsonSource>();
    const { chartStore } = useStore();
    const { setData } = useChartContext();
    const { mapgl, mapglInstance } = useMapglContext();
    useEffect(() => {
        if (!actions.dataQuery) { return }
        setActions({ ...actions, message: { type: 'loading', content: 'Загрузка данных...' } })

        if (mapgl && mapglInstance) {
            const { userId, timeFrom, timeTo } = actions.dataQuery;
            const url = makeRestUrl(userId, timeFrom, timeTo);
            //const url = './data.json'
            fetch(url).then((response) => {
                return response.json();
            })
                .then((data) => {

                    const geoJsonMapDataSourceObject = new mapgl.GeoJsonSource(mapglInstance, {
                        data: getGeoJson(data), attributes: { timelineLayers: 'cocial' }
                    })
                    const geoJsonMapDataHoverSourceObject = new mapgl.GeoJsonSource(mapglInstance, {
                        data: getGeoJson([]), attributes: { timelineHoverLayers: 'cocial' }
                    })
                    mapglInstance.addLayer(timelineMapStyle);
                    mapglInstance.addLayer(hoverlineMapStyle);
                    mapglInstance.addLayer(layerGeoPoints);
                    mapglInstance.addLayer(layerHoverGeoPoints);


                    setGeoJsonMapDataSource(geoJsonMapDataSourceObject);
                    setGeoJsonMapDataHoverSource(geoJsonMapDataHoverSourceObject);
                    const mapBounds = getGeoBounds(data);
                    if (mapBounds.southWest[1] !== 180) {
                        mapglInstance.fitBounds(mapBounds, { padding: { top: 20, left: 30, bottom: 20, right: 30 } });
                    }
                    setActions({ ...actions, rawJson: inDate(data), message: undefined });

                    setData({ rawJson: data, mainTimeline: getEventsTimeLine(data || []), xFiled: 'date' });
                });
        };
        return () => {
            mapglInstance?.removeLayer('timeline');
            mapglInstance?.removeLayer('timeline-geo-events');
            mapglInstance?.removeLayer('timeline-geo-hover');
            mapglInstance?.removeLayer('hoverline');
            if (geoJsonMapDataSource) {
                geoJsonMapDataSource.destroy();
                setGeoJsonMapDataSource(undefined);
            }
            if (geoJsonMapDataHoverSource) {
                geoJsonMapDataHoverSource.destroy();
                setGeoJsonMapDataHoverSource(undefined);
            }
        }
    }, [actions.dataQuery])

    useEffect(() => {
        const disposer = autorun(() => {
            const filteredData = toJS(chartStore.filteredData).map(event => event.timestamp);
            geoJsonMapDataSource?.setData(getGeoJson(actions.rawJson, getMinMax(filteredData)));
            const hoverData = toJS(chartStore.hoverData).map(event => event.timestamp);
            geoJsonMapDataHoverSource?.setData(getGeoJson(actions.rawJson, getMinMax(hoverData)));
        });
        return disposer;

    }, [chartStore.filteredData.length, chartStore.filteredData, geoJsonMapDataSource])

    return <></>
}

export default DataLoader;

