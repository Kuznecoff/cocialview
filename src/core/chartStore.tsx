import { makeAutoObservable } from "mobx";

const chartStore = () => {
    return makeAutoObservable({
        filteredData: [] as any[],
        selectedData: '',
        xField: '',
        timelineData: [] as any[],
        hoverData: [] as any[],
    });
};

export default chartStore;