import { ReactNode, createContext, useContext, useState } from "react"
export type AppContextActions = { 
    rawJson?: any[], 
    historyDrawer?: boolean, 
    sideBar?: boolean, 
    message?: { type: 'loading', content: string }, 
    dataQuery?: { userId: string, timeFrom: number, timeTo: number },
    filteredData?: any[], 
};
export type AppContextState = {
    actions: AppContextActions
    setActions: (newActions: AppContextActions) => void
}
export const AppContext = createContext<AppContextState>({
    actions: {},
    setActions: () => { },
})
export const useAppContext = () => useContext(AppContext)

export function AppContextProvider({ children }: { children: ReactNode }) {
    const [actions, setActions] = useState<AppContextActions>({});
    return (
        <AppContext.Provider value={{ actions, setActions }}>
            {children}
        </AppContext.Provider>
    );
}