const Sidebar = ({ setComponent, component }) => {
    return (
        <div className="w-2/12 h-[92.9vh] fixed top-17 left-0 flex bg-gray-200 px-5 py-10">
            <div className="flex flex-col gap-3 w-full">
                <div>
                    <button onClick={() => setComponent("dashboard")} className={`px-4 py-2 ${component == "dashboard" ? ("bg-white text-black font-medium hover:bg-white/70") : ("text-gray-500 bg-transparent hover:bg-gray-300/50")} rounded-md w-full text-start cursor-pointer duration-200`}>Dashboard</button>
                </div>
                <div>
                    <button onClick={() => setComponent("lenders")} className={`px-4 py-2 ${component == "lenders" ? "bg-white text-black font-medium hover:bg-white/70" : "bg-transparent text-gray-500 hover:bg-gray-300/50"} rounded-md w-full text-start cursor-pointer duration-200`}>Lenders</button>
                </div>
                <div>
                    <button onClick={() => setComponent("borrowers")} className={`px-4 py-2 ${component == "borrowers" ? "bg-white text-black font-medium hover:bg-white/70" : "bg-transparent text-gray-500 hover:bg-gray-300/50"} rounded-md w-full text-start cursor-pointer duration-200`}>Borrowers</button>
                </div>
                <div>
                    <button onClick={() => setComponent("transactions")} className={`px-4 py-2 mb-2 ${component == "transactions" ? "bg-white text-black font-medium hover:bg-white/70" : "bg-transparent text-gray-500 hover:bg-gray-300/50"} rounded-md w-full text-start cursor-pointer duration-200`}>Transactions</button>
                </div>
                <div>
                    <button onClick={() => setComponent("admins")} className={`px-4 py-2 mb-2 ${component == "admins" ? "bg-white text-black font-medium hover:bg-white/70" : "bg-transparent text-gray-500 hover:bg-gray-300/50"} rounded-md w-full text-start cursor-pointer duration-200`}>Admins</button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;