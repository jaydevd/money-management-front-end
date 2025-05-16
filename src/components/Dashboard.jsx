const Dashboard = () => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    return (
        <div className="pt-5 pl-10">
            <h4 className="text-2xl font-bold mb-10">Dashboard</h4>
            <div className="flex flex-col">
                <span className="text-lg font-serif">{admin.name + ' ' + admin.surname}</span>
                <span className="text-sm font-medium font-mono">{admin.email}</span>
            </div>
        </div>
    )
}

export default Dashboard;