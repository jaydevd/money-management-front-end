import axios from "axios";
import { useEffect, useState } from "react";

const useListBorrowers = () => {

    const [borrowers, setBorrowers] = useState([]);
    const [totalBorrowers, setTotalBorrowers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const page = 1;
            const limit = 10;

            const token = localStorage.getItem('token');

            const result = await axios.get(`http://localhost:5000/borrower/list?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const borrowers = result.data.data.borrowers;
            const count = result.data.data.count;

            setBorrowers(borrowers);
            setTotalBorrowers(count);
        }
        fetchData();
    }, [])
    return { borrowers, totalBorrowers };
}

export default useListBorrowers;