import axios from "axios";
import { useEffect, useState } from "react";

const useListBorrowers = () => {
    const [borrowers, setBorrowers] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const page = 1;
            const limit = 10;

            const token = localStorage.getItem('token');

            const result = await axios.get(`http://localhost:5000/borrower/list?page=${page}&limit=${limit}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            const borrowers = result.data.data.borrowers;
            const count = result.data.data.count;

            setBorrowers(borrowers);
            setTotal(count);
        }
        fetchData();
    }, [])
    return { borrowers, total };
}

export default useListBorrowers;