import axios from "axios";
import { useEffect, useState } from "react";

const useListLenders = () => {
    const [lenders, setLenders] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const page = 1;
            const limit = 10;

            const token = localStorage.getItem('token');

            const result = await axios.get(`http://localhost:5000/lender/list?page=${page}&limit=${limit}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            const lenders = result.data.data.lenders;
            const count = result.data.data.count;

            setLenders(lenders);
            setTotal(count);
        }
        fetchData();
    }, [])
    return { lenders, total };
}

export default useListLenders;