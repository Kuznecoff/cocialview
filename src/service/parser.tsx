import { Feature, FeatureCollection } from "geojson";
import { isCommandEvent, isGeoEvent, isWatchEvent } from "./helper";

export const inMinutes = { hour: '2-digit', minute: '2-digit' };
export const inSeconds = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

export function getGeoJson(data: any[] = [], minmaxFilter?: number[]): FeatureCollection {
    const geoTimePoints = data.filter((event: any) => isGeoEvent(event));

    const minmax = minmaxFilter || [0, 999999999999999999];

    return {
        type: "FeatureCollection",
        features: [
            generatePolyline(geoTimePoints, 'mainLine'), generatePolyline(geoTimePoints.filter(event => event.timestamp >= minmax[0] && event.timestamp <= minmax[1]), 'hoverLine'),
            ...generatePoints(geoTimePoints.filter(event => event.timestamp >= minmax[0] && event.timestamp <= minmax[1])),
        ]
    }
}



export function getReasonsTimeLine(data: any) {
    if (!data) {
        return []
    }
    const dataTimeLine = new Array();
    fillRange(data, dataTimeLine, inMinutes);
    data.forEach((event: any) => {
        const date = new Date(+event.timestamp);
        isGeoEvent(event) && dataTimeLine.push({ timestamp: event.timestamp, date: dateToLocal(event.timestamp, inMinutes), dateSeconds: dateToLocal(event.timestamp, inSeconds), value: 1, type: getMovementReasonsEventType(event) });
    })
    return dataTimeLine
}

export function getMovementsTimeLine(data: any) {
    if (!data) {
        return []
    }
    const dataTimeLine = new Array();
    fillRange(data, dataTimeLine, inMinutes);
    data.forEach((event: any) => {
        const date = new Date(+event.timestamp);
        isGeoEvent(event) && dataTimeLine.push({ timestamp: event.timestamp, date: dateToLocal(event.timestamp, inMinutes), dateSeconds: dateToLocal(event.timestamp, inSeconds), value: 1, type: getMovementEventType(event) });
    })
    return dataTimeLine
}

export function getWatchsTimeLine(data: any) {
    if (!data) {
        return []
    }
    const dataTimeLine = new Array();
    fillRange(data, dataTimeLine, inMinutes);
    data.forEach((event: any) => {
        const date = new Date(+event.timestamp);
        isWatchEvent(event) && dataTimeLine.push({ timestamp: event.timestamp, date: dateToLocal(event.timestamp, inMinutes), dateSeconds: dateToLocal(event.timestamp, inSeconds), value: 1, type: 'Watch' });
    })
    return dataTimeLine
}

export function getEventsByDate(data: any, date: string): any[] {
    const result: any[] = [];
    data.forEach((event: any) => {
        if (event.dateTime === date || event.dateTimeSeconds === date) {
            result.push(event);
        }
    })
    return result;
}

export function inDate(data: any) {
    data.forEach((event: any) => {
        event.dateTime = dateToLocal(+event.timestamp, inMinutes);
        event.dateTimeSeconds = dateToLocal(+event.timestamp, inSeconds);
    })
    return data
}

export function getCommandTimeLine(data: any) {
    if (!data) {
        return []
    }
    const dataTimeLine = new Array();
    fillRange(data, dataTimeLine, inMinutes);
    data.forEach((event: any) => {
        const date = new Date(+event.timestamp);
        isCommandEvent(event) && dataTimeLine.push({ timestamp: event.timestamp, date: dateToLocal(event.timestamp, inMinutes), dateSeconds: dateToLocal(event.timestamp, inSeconds), value: 1, type: getCommandEventType(event) });
    })
    return dataTimeLine
}

function dateToLocal(dateOfEvent: any, localRange: any) {
    const date = new Date(+dateOfEvent);
    return date.toLocaleDateString("ru-RU") + ' ' + date.toLocaleTimeString("ru-RU", localRange)
}

export function fillRange(data: any, dataTimeLine: any, localRange: any) {
    const shiftTime = localRange.second ? 12000 : 60000;
    const minTimestamp = Math.min(...data.map((el: any) => +el.timestamp));
    const maxTimestamp = Math.max(...data.map((el: any) => +el.timestamp));
    for (let timePoint = minTimestamp; timePoint <= maxTimestamp; timePoint = timePoint + shiftTime) {
        dataTimeLine.push({ timestamp: `${timePoint}`, date: dateToLocal(timePoint, localRange), dateSeconds: dateToLocal(timePoint, localRange) });
    }
}


function getMovementReasonsEventType(element: any) {
    const reason = element?.message?.movement?.userInfo?.wakeup?.reason || '*';
    const reasons = ['fg-service', 'geofence', 'push', 'scheduler', 'start-walk', 'update', '*'];
    const symbols = ['F', 'G', 'P', 'S', 'W', 'U', '*'];
    if (!symbols[reasons.indexOf(reason)]) {
        console.log('Unknown wekeup reason: ' + reason)
    }
    return symbols[reasons.indexOf(reason)] || '?';
}

function getMovementEventType(element: any) {
    const statustype = element?.message?.movement?.marker?.status?.type || '*';
    const statuses = ['moving', 'stopped', '*'];
    const symbols = ['Moving', 'Stopped', '?'];
    if (!symbols[statuses.indexOf(statustype)]) {
        console.log('Unknown movement status: ' + statustype)
    }
    return symbols[statuses.indexOf(statustype)] || '?';
}

function getCommandEventType(element: any) {
    const actiontype = element?.command?.action?.type || '*';
    const actions = ['start-sending-location-fast', 'start-sending-location-slow', 'stop-sending-location'];
    const symbols = ['start sending location fast', 'start sending location slow', 'stop sending location'];
    if (!symbols[actions.indexOf(actiontype)]) {
        console.log('Unknown command action: ' + actiontype)
    }
    return symbols[actions.indexOf(actiontype)] || '?';
}

function generatePolyline(geoTimePoints: any, name?: string): Feature {
    const coordinates: number[][] = [];
    geoTimePoints.forEach((element: any) => {
        const lat = element.message.movement.location.lat;
        const lng = element.message.movement.location.lon;
        coordinates.push([lng, lat]);
    });
    return {
        "type": "Feature",
        "properties": { name },
        "geometry": {
            "coordinates": coordinates,
            "type": "LineString"
        }
    }
}

function generatePoints(geoTimePoints: any): Feature[] {
    const points: Feature[] = [];
    geoTimePoints.forEach((element: any) => {
        const lat = element.message.movement.location.lat;
        const lng = element.message.movement.location.lon;
        const symbol = getMovementReasonsEventType(element);
        points.push(
            {
                type: 'Feature',
                properties: {
                    message: element.message,
                    pointType: 'movement',
                    symbol: symbol,
                    status: element.message.movement.marker.status.type || 'unknown'
                },
                geometry: {
                    type: 'Point',
                    coordinates: [lng, lat],
                },
            }
        )
    });

    return points
}