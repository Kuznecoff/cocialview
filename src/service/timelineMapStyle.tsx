export const timelineMapStyle = {
    type: 'line',
    id: 'timeline',
    filter: ['all', ['match', ['sourceAttr', 'timelineLayers'], ['cocial'], true, false], ['match', ['get', 'name'], ['mainLine'], true, false]],
    style: {
        color: '#999999',
        width: ['step', ['zoom'], 10, 2, 8, 8, 6, 12, 5, 16, 4],
    },
}

export const hoverlineMapStyle = {
    type: 'line',
    id: 'hoverline',
    filter: ['all', ['match', ['sourceAttr', 'timelineLayers'], ['cocial'], true, false], ['match', ['get', 'name'], ['hoverLine'], true, false]],
    style: {
        color: '#ff0000',
        width: ['step', ['zoom'], 10, 2, 8, 8, 6, 12, 5, 16, 4],
    },
}

export const layerGeoPoints = {
    type: 'point',
    id: 'timeline-geo-events',
    filter: ['all', ['match', ['sourceAttr', 'timelineLayers'], ['cocial'], true, false], ['match', ['get', 'pointType'], ['movement'], true, false]],
    minzoom: 12,
    style: {
        iconLabelingGroup: '__overlapped',
        iconImage: ['match', ['get', 'status'], ['moving'], 'reddot', 'graydot'],
        iconWidth: 24,
        "iconTextFont": "Noto_Sans",
        "iconTextField": ['get', 'symbol'],
        "iconTextColor": "#FBFBFB",
        "iconTextPadding": [
            1,
            7,
            1,
            7
        ]
    },
    
}

export const layerHoverGeoPoints = {
    type: 'point',
    id: 'timeline-geo-hover',
    filter: ['all', ['match', ['sourceAttr', 'timelineHoverLayers'], ['cocial'], true, false], ['match', ['get', 'pointType'], ['movement'], true, false]],
    minzoom: 12,
    style: {
        iconLabelingGroup: '__overlapped',
        iconImage: ['match', ['get', 'status'], ['moving'], 'reddot', 'graydot'],
        iconWidth: 24,
        "iconTextFont": "Noto_Sans",
        "iconTextField": ['get', 'symbol'],
        "iconTextColor": "#FBFBFB",
        "iconTextPadding": [
            8,
            14,
            8,
            14
        ]
    },
}