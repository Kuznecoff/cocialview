import { makeAutoObservable } from "mobx";

const chartStore = () => {
    return makeAutoObservable({
        filteredData: [] as any[],
        selectedData: '',
        xField: ''
    });
};

export default chartStore;