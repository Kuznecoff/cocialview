import { memo, useEffect } from 'react';
import { load } from '@2gis/mapgl';
import { useMapglContext } from './mapglContext';
import { useChartContext } from '../../ChartContext';


const MapWrapper = memo(
    function MapContainer() {
        return <div id='map-container' style={{ width: '100%', height: '100%' }}></div>;
    },
    () => true,
);

export default function Mapgl() {
    const { setMapglContext } = useMapglContext();
    const { data } = useChartContext();

    useEffect(() => {
        let map: mapgl.Map | undefined = undefined;

        load().then((mapgl) => {
            map = new mapgl.Map('map-container', {
                center: [82.91, 55.03],
                zoom: 10,
                key: 'a1893935-6834-4445-b97a-3405fb426c5b',
                style: 'ac5ac22f-d482-4348-8be8-b55a65d02153',
                maxZoom: 22
            });

            setMapglContext({
                mapglInstance: map,
                mapgl,
            });
        });

        // Destroy the map, if Map component is going to be unmounted
        return () => {
            map && map.destroy();
            setMapglContext({ mapglInstance: undefined, mapgl: undefined });
        };
    }, [setMapglContext]);

    return <MapWrapper />;
}