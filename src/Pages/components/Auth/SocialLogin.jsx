import { FaGithub, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";

const SocialLogin = () => {
    const { googleSignIn, gitSignIn } = useAuth()
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn().then((result) => {
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                profile: result.user?.photoURL,
            };
            navigate("/");
            axiosPublic.post("/users", userInfo).then((res) => {
                console.log(res.data);
            });
        });
    };
    const handleGitSignIn = () => {
        gitSignIn().then((result) => {
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                profile: result.user?.photoURL,
            };
            navigate("/");
            axiosPublic.post("/users", userInfo).then((res) => {
                console.log(res.data);
            });
        });
    };

    return (
        <div className="flex justify-center space-x-10">
            <button onClick={handleGoogleSignIn} className="btn w-56">
                <FaGoogle />
                Google
            </button>
            <button onClick={handleGitSignIn} className="btn w-56">
                <FaGithub />
                GitHub
            </button>
        </div>
    );
};

export default SocialLogin;