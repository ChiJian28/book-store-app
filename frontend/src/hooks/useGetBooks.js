import { useEffect, useState } from "react"
import { useQuery } from "react-query";
import { axios } from '../api/axios';

export const useGetBooks = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);


    const fetchData = async () => {
        const res = await axios.get('/books');
        const data = res.data.data;
        setLoading(false);
        return data;
    }

    const { isError, data: books, error } = useQuery({
        queryKey: ['books'],
        queryFn: () => fetchData(),
    })

    return { isError, books, error, loading }
}
