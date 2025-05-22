import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from '../common/Pagination';

const Transactions = () => {

    const [page, setPage] = useState(1);
    const limit = 10;
    const [transactions, setTransactions] = useState([]);
    const [totalTransactions, setTotalTransactions] = useState(0);

    useEffect(() => {
        const fetchData = async () => {

            const token = localStorage.getItem('token');

            const result = await axios.get(`http://localhost:5000/transaction/list?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const transactions = result.data.data.transactions;
            const count = result.data.data.count;

            setTransactions(transactions);
            setTotalTransactions(count);
        }
        fetchData();
    }, [page])

    return (
        <div className="p-4 sm:p-6 text-white w-full">
            <div className="bg-[#f3f4f6] rounded-xl overflow-x-auto">
                <table className="min-w-full text-sm text-white bg-[#2a2a40] rounded-lg overflow-hidden">
                    <thead className="bg-[#1e1e2f]">
                        <tr className="text-left text-gray-400">
                            <th className="p-4 whitespace-nowrap">User</th>
                            <th className="p-4 whitespace-nowrap">Amount</th>
                            <th className="p-4 whitespace-nowrap">Transaction Type</th>
                            <th className="p-4 whitespace-nowrap">Date</th>
                            <th className="p-4 whitespace-nowrap">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions && transactions.length > 0 ? (
                                transactions.map((transaction) => (
                                    <tr key={transaction.id} className="border-t border-[#3a3a4f] hover:bg-[#383850]">
                                        <td className="p-4 whitespace-nowrap">{transaction.full_name}</td>
                                        <td className="p-4 whitespace-nowrap">{transaction.amount}</td>
                                        <td className="p-4 whitespace-nowrap">{transaction.type}</td>
                                        <td className="p-4 whitespace-nowrap">{(new Date(transaction.date * 1000).toISOString().slice(0, 10))}</td>
                                        {
                                            transaction.notes ? (
                                                <td className="p-4 whitespace-nowrap">{transaction.notes}</td>
                                            ) : (
                                                <td className="p-4 whitespace-nowrap">-</td>
                                            )
                                        }
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="p-4 text-gray-400" colSpan="5">No records found</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
            <Pagination page={page} setPage={setPage} totalItems={totalTransactions} limit={limit} />
        </div>
    );
}

export default Transactions;