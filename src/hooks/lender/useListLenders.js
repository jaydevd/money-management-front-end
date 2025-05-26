import axios from "axios";
import { useEffect, useState } from "react";
import getCookie from "../../helpers/getCookie";

const useListLenders = (page, limit) => {
    const [lenders, setLenders] = useState([]);
    const [totalLenders, setTotalLenders] = useState(0);

    useEffect(() => {
        const fetchLenders = async () => {
            try {

                const token = getCookie("token");

                // const baseUrl = 'https://money-management-f0al.onrender.com';
                const baseUrl = 'http://localhost:5000';

                const response = await axios.get(`${baseUrl}/lender/list?page=${page}&limit=${limit}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                setLenders(response.data.data.lenders);
                setTotalLenders(response.data.data.count);

            } catch (error) {
                console.error('Error fetching lenders:', error);
            }
        };

        fetchLenders();
    }, [page, limit]);

    return { lenders, totalLenders };
};

export default useListLenders;