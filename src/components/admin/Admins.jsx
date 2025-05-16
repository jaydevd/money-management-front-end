import { useState } from "react";
import AdminsTable from "./AdminsTable";
import InviteAdmin from "./InviteAdmin";

const Admins = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <div className="pt-5 px-10">
            {
                isAdmin &&
                <InviteAdmin setIsAdmin={setIsAdmin} />
            }
            <div className="flex flex-col gap-5 mb-5 pr-10">
                <h4 className="text-2xl font-bold">Admins</h4>
                <div className="flex gap-2">
                    <button className="w-fit text-sm rounded-full px-3 py-1 bg-sky-400 text-white cursor-pointer" onClick={() => setIsAdmin(true)}>Add admin</button>
                </div>
            </div>
            <AdminsTable />
        </div >
    )
}

export default Admins;