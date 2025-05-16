import { useState } from "react";
import AddLender from "./AddLender";
import LendersTable from "./LendersTable";
import MakeTransaction from './MakeTransaction';

const Lenders = () => {
    const [isLender, setIsLender] = useState(false);
    const [isTransaction, setIsTransaction] = useState(false);

    return (
        <div className="pt-5 px-10">
            {
                isLender &&
                <AddLender setIsLender={setIsLender} />
            }
            {
                isTransaction &&
                <MakeTransaction setIsTransaction={setIsTransaction} />
            }
            <div className="flex flex-col gap-5 mb-5 pr-10">
                <h4 className="text-2xl font-bold">Lenders</h4>
                <div className="flex gap-2">
                    <button className="w-fit text-sm rounded-full px-3 py-1 bg-sky-400 text-white cursor-pointer" onClick={() => setIsLender(true)}>Add lender</button>
                    <button className="w-fit text-sm rounded-full px-3 py-1 bg-black text-white cursor-pointer" onClick={() => setIsTransaction(true)}>New transaction</button>
                </div>
            </div>
            <LendersTable />
        </div >
    )
}

export default Lenders;