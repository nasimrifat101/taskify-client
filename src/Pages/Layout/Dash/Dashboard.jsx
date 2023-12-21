/* eslint-disable react/no-unescaped-entities */
import useAuth from "../../../Hooks/useAuth";
import NavDash from "./Components/NavDash";

const Dashboard = () => {
    const {user} = useAuth()
    return (
        <div>
            <NavDash title={`Welcome ${user?.displayName}`} btn='Add Task' profile={user?.photoURL}/>
            <div className="grid grid-cols-3 gap-3">
                {/*  */}
                <div className="flex-1 bg-base-300 min-h-screen">
                    <h1 className="text-center bg-green-300 p-3 font-bold text-base-300">To-do</h1>
                </div>
                {/*  */}
                <div className="flex-1 bg-base-300 min-h-screen">
                    <h1 className="text-center bg-green-400 p-3 font-bold text-base-300">On Going</h1>
                </div>
                {/*  */}
                <div className="flex-1 bg-base-300 min-h-screen">
                    <h1 className="text-center bg-green-500 p-3 font-bold text-base-300">Completed</h1>
                </div>
                
               
             
            </div>
        </div>
    );
};

export default Dashboard;