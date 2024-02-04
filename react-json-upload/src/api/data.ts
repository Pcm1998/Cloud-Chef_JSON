import { getLocalStorage } from "components/LocalStorage";
import axios from "axios";
import { useQuery } from "react-query";

export const fetchData = async () => {
    const userId = getLocalStorage();
    try {
        // Your API fetching logic using Axios here
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/data?id=${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
};

export const useDataQuery = () => {
    return useQuery('data', fetchData);
};
