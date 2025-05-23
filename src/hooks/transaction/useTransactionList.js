import axios from "axios";
import { useEffect, useState } from "react";
import getCookie from "../../helpers/getCookie";

const useTransactionList = (page, limit) => {
    const [transactions, setTransactions] = useState([]);
    const [totalTransactions, setTotalTransactions] = useState(0);

    useEffect(() => {
        const fetchData = async () => {

            const token = getCookie("token");
            const response = await axios.get(`http://localhost:5000/transaction/list?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const transactions = response.data.data.transactions;
            const count = response.data.data.count;

            setTransactions(transactions);
            setTotalTransactions(count);
        }
        fetchData();
    }, [])
    return { transactions, totalTransactions };
}

export default useTransactionList;