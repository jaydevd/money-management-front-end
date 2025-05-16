import TransactionsTable from "./TransactionsTable";

const Transactions = () => {

    return (
        <div className="pt-5 px-10">
            <div className="flex flex-col gap-5 mb-5 pr-10">
                <h4 className="text-2xl font-bold">Transactions</h4>
            </div>
            <TransactionsTable />
        </div >
    )
}

export default Transactions;