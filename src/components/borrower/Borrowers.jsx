import { useState } from "react";
import AddBorrower from './AddBorrower';
import BorrowersTable from "./BorrowersTable";
import MakeTransaction from './MakeTransaction';

const Borrowers = () => {
    const [isBorrower, setIsBorrower] = useState(false);
    const [isTransaction, setIsTransaction] = useState(false);

    return (
        <div className="pt-5 px-10">
            {
                isBorrower &&
                <AddBorrower setIsBorrower={setIsBorrower} />
            }
            {
                isTransaction &&
                <MakeTransaction setIsTransaction={setIsTransaction} />
            }
            <div className="flex flex-col gap-5 mb-5 pr-10">
                <h4 className="text-2xl font-bold">Borrowers</h4>
                <div className="flex gap-2">
                    <button className="w-fit text-sm rounded-full px-3 py-1 bg-sky-400 text-white cursor-pointer" onClick={() => setIsBorrower(true)}>Add borrower</button>
                    <button className="w-fit text-sm rounded-full px-3 py-1 bg-black text-white cursor-pointer" onClick={() => setIsTransaction(true)}>New transaction</button>
                </div>
            </div>
            <BorrowersTable />
        </div >
    )
}

export default Borrowers;