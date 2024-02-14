import { useParams } from "react-router-dom";

const EmailVerification = () => {
     const { user, token } = useParams();

     // You can use `user` and `token` here to perform any necessary actions
     console.log("User ID:", user);
     console.log("Token:", token);
    return (
        <div>
            <h2>Email verification</h2>
        </div>
    );
};

export default EmailVerification;