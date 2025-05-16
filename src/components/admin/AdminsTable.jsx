import { v4 as uuidv4 } from 'uuid';
import useListAdmins from '../../hooks/admin/useListAdmins';

const AdminsTable = () => {
    const { admins, total } = useListAdmins();

    return (
        <table className='w-full'>
            <thead>
                <tr className="border-b border-b-gray-300">
                    <th className="text-start py-5 px-2">Name</th>
                    <th className="text-start py-5 px-2">Email address</th>
                </tr>
            </thead>
            <tbody>
                {
                    admins && admins.length > 0 ? (
                        admins.map((row) => {
                            return (
                                <tr key={uuidv4()} className="border-b border-b-gray-300">
                                    <td className="py-5 px-2">{row.full_name}</td>
                                    <td className="py-5 px-2">{row.email}</td>
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

export default AdminsTable;