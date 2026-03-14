import { useNavigate } from "react-router-dom";

function QuizCard({title,time}){

const navigate = useNavigate()

return(

<div className="quiz-card">

<h3>{title}</h3>

<p>{time}</p>

<button onClick={()=>navigate("/quiz")}>Start Quiz</button>

</div>

)

}

export default QuizCard