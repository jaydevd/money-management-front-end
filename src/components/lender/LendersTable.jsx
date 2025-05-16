import { v4 as uuidv4 } from 'uuid';
import useListLenders from '../../hooks/lender/useListLenders';

const LendersTable = () => {
    const { lenders, total } = useListLenders();

    return (
        <table className='w-full'>
            <thead>
                <tr className="border-b border-b-gray-300">
                    <th className="text-start py-5 px-2">Lender Name</th>
                    <th className="text-start py-5 px-2">Interest(%)</th>
                    <th className="text-start py-5 px-2">Time (years)</th>
                    <th className="text-start py-5 px-2">Amount Received</th>
                    <th className="text-start py-5 px-2">Remaining Amount</th>
                    <th className="text-start py-5 px-2">Total Amount</th>
                </tr>
            </thead>
            <tbody>
                {
                    lenders && lenders.length > 0 ? (
                        lenders.map((row) => {
                            return (
                                <tr key={uuidv4()} className="border-b border-b-gray-300">
                                    <td className="py-5 px-2">{row.full_name}</td>
                                    <td className="py-5 px-2">{row.interest}</td>
                                    <td className="py-5 px-2">{row.period}</td>
                                    <td className="py-5 px-2">{row.amount_received}</td>
                                    <td className="py-5 px-2">{row.remaining_amount}</td>
                                    <td className="py-5 px-2">{row.total_amount}</td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr key={"bnibboernvkrb"}>
                            <td colSpan="6" className='text-center py-10 bg-gray-300 rounded-lg' >No records found</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default LendersTable;