import { useState } from "react";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";
import Admins from '../components/admin/Admins';
import Borrowers from "../components/borrower/borrowers";
import Lenders from "../components/lender/Lenders";
import Transactions from "../components/transaction/Transactions";
import Navbar from "./../components/Navbar";

const Home = () => {
    const [component, setComponent] = useState("dashboard");

    return (
        <>
            <Navbar />
            <Sidebar setComponent={setComponent} component={component} />
            <div className="flex w-full justify-end">
                <div className="w-10/12">
                    {
                        component == "dashboard" &&
                        <Dashboard />
                    }
                    {
                        component == "lenders" &&
                        <Lenders />
                    }
                    {
                        component == "borrowers" &&
                        <Borrowers />
                    }
                    {
                        component == "transactions" &&
                        <Transactions />
                    }
                    {
                        component == "admins" &&
                        <Admins />
                    }
                </div>
            </div>
        </>
    )
}

export default Home;