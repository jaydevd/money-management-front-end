import useGetUsers from "../../hooks/transaction/useGetUsers";

const DropDown = ({ handleInputChange, name }) => {
    const users = useGetUsers();

    useEffect(() => {
        if (users.length === 1) {
            setSelectedValue(users[0].value);
        }
    }, [users]);

    return (
        <select name={name} onChange={(e) => handleInputChange(e)} className="rounded-md px-4 py-2 bg-gray-100">
            {
                users && users.length > 0 ? (
                    users.map((user) => {
                        return (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        )
                    })
                ) : (
                    <option value="none">no users</option>
                )
            }
        </select>
    )
}

export default DropDown;