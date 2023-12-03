export function isGeoEvent(event: any) {
    const lat = event.message?.movement?.location?.lat;
    const lng = event.message?.movement?.location?.lon;
    return lat && lng;
}

export function isWatchEvent(event:any) {
    return !!event.message?.watch;
}

export function isCommandEvent(event:any) {
    return !!event.command;
}

export function getMinMax(filteredData:any){
   
    const min = Math.min(...filteredData);
    const max = Math.max(...filteredData);
    return [min, max];
}