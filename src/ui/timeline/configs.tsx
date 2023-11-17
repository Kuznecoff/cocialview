export const configReasons: any = (dataInit: any, xField: string, range: number[]) => {
    
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
            yField: 'value',
            seriesField: 'type',
            slider: {
                id:xField,
                start: xField === 'date' ? range[0] || 0 : 0,
                end: xField === 'date' ? range[1] || 0.1 : 1,
                height: 40,
                trendCfg: {
                    isArea: false,
                },
            },
            yAxis: {
                label: {
                    offsetX: 25,
                    style: {
                        fontSize: 0
                    }
                }
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

            data: dataInit, filter: (d: any) => { console.log(d); return true },
            isStack: true,
            xField,
            yField: 'value',
            color: ({ type }: any) => type === 'Moving' ? '#ff0000' : '#888888',
            seriesField: 'type',
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
            yField: 'value',
            seriesField: 'type',
            color: ({ type }: any) => type === 'Watch' ? '#fcba03' : '#888888',
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
            yField: 'value',
            seriesField: 'type',
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
        legend: {
            layout: 'horizontal',
            position: 'bottom'
        },

        plots: [...plotsConfigs]
    }
}