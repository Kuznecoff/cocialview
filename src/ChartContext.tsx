import { ReactNode, createContext, useContext, useState } from "react"
export type ChartContextActions = {
    filteredData?: any[],
    rawJson?: any,
    mainTimeline?:any,
    xFiled?: string,
};
export type ChartContextState = {
    data: ChartContextActions
    setData: (newActions: ChartContextActions) => void
}
export const ChartContext = createContext<ChartContextState>({
    data: {xFiled:'date'},
    setData: () => { },
})
export const useChartContext = () => useContext(ChartContext)

export function ChartContextProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<ChartContextActions>({xFiled:'date'});
    return (
        <ChartContext.Provider value={{ data, setData }}>
            {children}
        </ChartContext.Provider>
    );
}