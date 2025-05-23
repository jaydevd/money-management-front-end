import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Admins from '../components/home/Admins';
import Borrowers from '../components/home/Borrowers';
import Dashboard from '../components/home/Dashboard';
import Lenders from '../components/home/Lenders';
import Transactions from '../components/home/Transactions';
import useLogOut from './../hooks/auth/useLogOut';

const Home = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const admin = JSON.parse(sessionStorage.getItem("admin"));

    const navigate = useNavigate();

    const renderComponent = () => {
        switch (activeTab) {
            case 'Dashboard': return <Dashboard />;
            case 'Lenders': return <Lenders />;
            case 'Borrowers': return <Borrowers />;
            case 'Transactions': return <Transactions />;
            case 'Admins': return <Admins />;
            default: return <Dashboard />;
        }
    };

    useEffect(() => {
        if (window.innerWidth >= 1024) {
            setSidebarOpen(true);
        }
    }, []);

    const onLogOut = async () => {
        try {

            const response = await useLogOut();
            navigate('/auth/login', { state: { message: "Logged out successfully!", type: "green" } });

        } catch (error) {
            console.log(error);
            navigate('/auth/login', { state: { message: "Failed to log out!", type: "red" } });
        }
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-purple-800 via-pink-600 to-orange-400 text-white font-sans">
            <div className="lg:hidden flex justify-between items-center p-4 bg-[#1e1e2f]">
                <div className="text-xl font-bold">Money Management</div>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white focus:outline-none">
                    {sidebarOpen ? '✕' : '☰'}
                </button>
            </div>
            {(sidebarOpen || window.innerWidth >= 1024) && (
                <aside className="w-full lg:w-64 bg-[#1e1e2f] flex flex-col justify-between p-4">
                    <div>
                        <div className="hidden lg:flex items-center mb-8">
                            <img src="logo.png" alt="Logo" className="w-10 h-10 mr-2" />
                            <span className="text-xl font-bold">Money Management</span>
                        </div>
                        <nav className="space-y-2">
                            {[
                                { name: 'Dashboard', icon: 'dashboard' },
                                { name: 'Lenders', icon: 'people' },
                                { name: 'Borrowers', icon: 'group' },
                                { name: 'Transactions', icon: 'compare_arrows' },
                                { name: 'Admins', icon: 'admin_panel_settings' },
                            ].map(({ name, icon }) => (
                                <button
                                    key={name}
                                    onClick={() => {
                                        setActiveTab(name);
                                        setSidebarOpen(false);
                                    }}
                                    className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === name
                                        ? 'bg-gradient-to-r from-pink-500 to-purple-600'
                                        : 'hover:bg-gray-700'
                                        }`}
                                >
                                    <span className="material-icons">{icon}</span>
                                    <span>{name}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                    <button onClick={onLogOut} className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-lg hover:opacity-90">
                        Log out
                    </button>
                </aside>
            )}

            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                <div className="mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">{activeTab}</h1>
                    <p className="text-md sm:text-lg text-gray-200">{admin.name + " " + admin.surname}</p>
                    <p className="text-sm text-gray-300">{admin.email}</p>
                </div>
                {renderComponent()}
            </main>
        </div>
    );
}

export default Home;