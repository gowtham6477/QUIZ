import "../styles/quiz.css"

function QuizPage(){

return(

<div className="quiz-page">

<h2>Math Quiz</h2>

<p className="question">Question 1: 2 + 2 = ?</p>

<div className="options">

<label>
<input type="radio" name="q1"/> 3
</label>

<label>
<input type="radio" name="q1"/> 4
</label>

<label>
<input type="radio" name="q1"/> 5
</label>

</div>

<button>Next</button>

</div>

)

}

export default QuizPage