import axios from "axios";
import { useEffect, useState } from "react";
import getCookie from "../../helpers/getCookie";

const useListBorrowers = (page, limit) => {

    const [borrowers, setBorrowers] = useState([]);
    const [totalBorrowers, setTotalBorrowers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {

            const token = getCookie("token");

            const response = await axios.get(`http://localhost:5000/borrower/list?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const borrowers = response.data.data.borrowers;
            const count = response.data.data.count;

            setBorrowers(borrowers);
            setTotalBorrowers(count);
        }
        fetchData();
    }, [])
    return { borrowers, totalBorrowers };
}

export default useListBorrowers;