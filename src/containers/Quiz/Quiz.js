import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizById,quizAnswerClick,retryQuiz} from '../../store/Actions/quiz'

class Quiz extends Component{


    // retryHandler = () => {
    //     this.setState({
    //         ActiveQuestion:0,
    //         isFinished:false,
    //         answerState:null,
    //         results:{ }
    //     })
    // }

 
     componentDidMount  ()  {

        this.props.fetchQuizById(this.props.match.params.id)
        
    }
    componentWillUnmount() {
        this.props.retryQuiz()
        
    }

 
    render(){
        return(
            <div className={classes.Quiz}>
               {this.props.loading || !this.props.quiz
                ? <Loader/>
               :
                <div className={classes.QuizWrapper}>
                    
                    <h1>Опрос</h1>
                    {
                        this.props.isFinished
                        ? <FinishedQuiz
                            results={this.props.results}
                            quiz={this.props.quiz}
                            onRetry={this.props.retryQuiz}
                        />
                        : <ActiveQuiz
                        question={this.props.quiz[this.props.ActiveQuestion].question}
                        answers={this.props.quiz[this.props.ActiveQuestion].answers}
                        onAnswerClick={this.props.quizAnswerClick}
                        quizLength={this.props.quiz.length}
                        questionNumber={this.props.ActiveQuestion + 1}
                        state={this.props.answerState}
                        />
                    }


                </div>
    }
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        loading: state.quiz.loading,
        results: state.quiz.results, //{[id]: success, mistake}
        isFinished: state.quiz.isFinished,
        ActiveQuestion: state.quiz.ActiveQuestion,
        answerState: state.quiz.answerState, //{[id]: success, mistake}
        quiz: state.quiz.quiz
    }
}
function mapDispatchToProps (dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Quiz)