export const configReasons: any = (dataInit: any, xField: string) => {

    return {

        height: 130,
        type: 'column',
        region: {
            start: {
                x: 0,
                y: 0,
            },
            end: {
                x: 1,
                y: 0,
            },
        },
        options: {
            syncViewPadding: true,


            data: dataInit,
            isStack: true,
            xField,
            yField: 'reasonValue',
            seriesField: 'reasonType',

            yAxis: {
                label: {
                    offsetX: 25,
                    style: {
                        fontSize: 0
                    }
                }
            },
            brush: {
                enabled: true,
                type: 'x-rect',
            },


            interactions: [
                {
                    type: 'custom-association-filter',
                },
            ],
        }
    }
};

export const configMovments: any = (dataInit: any, xField: string) => {

    return {
        height: 44,
        type: 'column',
        region: {
            start: {
                x: 0,
                y: 0,
            },
            end: {
                x: 1,
                y: 0,
            },
        },
        options: {
            syncViewPadding: true,
            isPercent: true,

            data: dataInit,
            isStack: true,
            xField,
            yField: 'movementValue',
            color: ({ movementType }: any) => movementType === 'Moving' ? '#ff0000' : '#888888',
            seriesField: 'movementType',
            xAxis: {
                label: {

                    style: {
                        fillOpacity: 0,
                    },
                    offsetY: -10,
                }
            },
            yAxis: {
                grid: null,
                label: {
                    offsetX: 25,
                    style: {
                        fontSize: 0
                    }
                }
            },
        }
    }
};


export const configWatches: any = (dataInit: any, xField: string) => {

    return {
        height: 32,
        type: 'column',
        region: {
            start: {
                x: 0,
                y: 0,
            },
            end: {
                x: 1,
                y: 0,
            },
        },
        options: {
            syncViewPadding: true,
            isPercent: true,

            data: dataInit,
            isStack: true,
            xField,
            yField: 'watchValue',
            seriesField: 'watchType',
            color: ({ watchType }: any) => watchType === 'Watch' ? '#fcba03' : '#888888',
            xAxis: {
                label: {

                    style: {
                        fillOpacity: 0,
                    },
                    offsetY: -10,
                }
            },
            yAxis: {
                grid: null,
                label: null,
            },
        }
    }
};

export const configCommands: any = (dataInit: any, xField: string) => {

    return {
        height: 32,
        type: 'column',
        region: {
            start: {
                x: 0,
                y: 0,
            },
            end: {
                x: 1,
                y: 0,
            },
        },
        options: {
            syncViewPadding: true,
            isPercent: true,

            data: dataInit,
            isStack: true,
            xField,
            yField: 'commandValue',
            seriesField: 'commandType',
            xAxis: {
                label: {

                    style: {
                        fillOpacity: 0,
                    },
                    offsetY: 0,
                }
            },
            yAxis: {
                grid: null,
                label: null,
            },
        }
    }
};


export const configMix: any = (plotsConfigs: any) => {
    const height = plotsConfigs.reduce((allHeight: number, plot: any) => allHeight + plot.height - 1, 0);
    let prevY = 1;
    plotsConfigs.forEach((plotConfig: any) => {
        const curPlotHeight = plotConfig.height / height;
        plotConfig.region.start.y = prevY - curPlotHeight;
        plotConfig.region.end.y = prevY;
        prevY = prevY - curPlotHeight;
    })

    return {
        height,


        plots: [...plotsConfigs]
    }
}