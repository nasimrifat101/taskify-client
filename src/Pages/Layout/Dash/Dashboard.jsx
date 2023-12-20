import useAuth from "../../../Hooks/useAuth";
import NavDash from "./Components/NavDash";

const Dashboard = () => {
    const {user} = useAuth()
    return (
        <div>
            <NavDash title={`Welcome ${user?.displayName}`} btn='Add Task' profile={user?.photoURL}/>
        </div>
    );
};

export default Dashboard;