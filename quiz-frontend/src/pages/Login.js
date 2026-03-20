import "../styles/login.css";
import { useNavigate } from "react-router-dom";

function Login(){

const navigate = useNavigate();

const loginUser = () =>{
navigate("/dashboard")
}

return(

<div className="login-container">

<h1>Quiz.com</h1>

<div className="login-box">

<h2>Login</h2>

<input type="email" placeholder="Email"/>

<input type="password" placeholder="Password"/>

<button onClick={loginUser}>Login</button>

<p>New User?
<span onClick={()=>navigate("/register")}> Register</span>
</p>

</div>

</div>

)

}

export default Login;