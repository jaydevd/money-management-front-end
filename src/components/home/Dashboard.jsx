import useListBorrowers from "../../hooks/borrower/useListBorrowers";
import useListLenders from "../../hooks/lender/useListLenders";
import useTransactionList from "../../hooks/transaction/useTransactionList";

const Dashboard = () => {
    const admin = JSON.parse(sessionStorage.getItem("admin"));

    const { totalBorrowers } = useListBorrowers(0, 0);
    const { totalLenders } = useListLenders(0, 0);
    const { totalTransactions } = useTransactionList(0, 0);

    return (
        <div>
            <div className="p-6 bg-[#2a2a40] rounded-2xl shadow-lg mb-6">
                <h2 className="text-sm text-gray-400 mb-2">User Overview</h2>
                <p className="text-2xl font-bold">Welcome back, {admin.name}!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-[#2a2a40] p-6 rounded-2xl shadow-lg">
                    <h2 className="text-sm text-gray-400 mb-2">LENDERS</h2>
                    <p className="text-2xl font-bold">{totalLenders}</p>
                </div>
                <div className="bg-[#2a2a40] p-6 rounded-2xl shadow-lg">
                    <h2 className="text-sm text-gray-400 mb-2">BORROWERS</h2>
                    <p className="text-2xl font-bold">{totalBorrowers}</p>
                </div>
                <div className="bg-[#2a2a40] p-6 rounded-2xl shadow-lg">
                    <h2 className="text-sm text-gray-400 mb-2">TRANSACTIONS</h2>
                    <p className="text-2xl font-bold">{totalTransactions}</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;