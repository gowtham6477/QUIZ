import QuizCard from "../components/QuizCard";
import Leaderboard from "../components/Leaderboard";
import "../styles/dashboard.css";
import Navbar from "../components/Navbar";
function Dashboard(){

return(

<div>

<Navbar/>

<h1>Available Quizzes</h1>

<div className="quiz-container">

<QuizCard title="Mathematics Quiz" time="20 minutes"/>
<QuizCard title="Science Quiz" time="15 minutes"/>

</div>

<Leaderboard/>

</div>

)



}

export default Dashboard;