import { v4 as uuidv4 } from 'uuid';
import useTransactionList from '../../hooks/transaction/useTransactionList';

const TransactionsTable = () => {
    const { transactions, total } = useTransactionList();

    return (
        <table className='w-full'>
            <thead>
                <tr className="border-b border-b-gray-300">
                    <th className="text-start py-5 px-2">User</th>
                    <th className="text-start py-5 px-2">Type</th>
                    <th className="text-start py-5 px-2">Amount</th>
                    <th className="text-start py-5 px-2">Notes</th>
                </tr>
            </thead>
            <tbody>
                {
                    transactions && transactions.length > 0 ? (
                        transactions.map((row) => {
                            return (
                                <tr key={uuidv4()} className="border-b border-b-gray-300">
                                    <td className="py-5 px-2">{row.full_name}</td>
                                    <td className="py-5 px-2">{row.type}</td>
                                    <td className="py-5 px-2">{row.amount}</td>
                                    {
                                        row.notes ? (
                                            <td className="py-5 px-2">{row.notes}</td>
                                        ) : (
                                            <td className="py-5 px-2 italic text-lg text-gray-300 font-medium">~</td>
                                        )
                                    }
                                </tr>
                            )
                        })
                    ) : (
                        <tr key={"bnibboernvkrb"}>
                            <td colSpan="4" className='text-center py-10 bg-gray-300 rounded-lg' >No records found</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default TransactionsTable;