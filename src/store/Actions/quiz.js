import axios from '../../Axios/Axios'
import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_START,
    FETCH_QUIZ_SUCCESS,
    QUIZ_STATE,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY
}
     from './ActionTypes'

export function  fetchQuizes() {
    return  async dispatch => {
        dispatch(fetchQuizesStart())
        try{
            const response = await axios.get('/quizes.json')
            const quizes = []  
            
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test № ${index + 1}`
                })
            })  
            console.log(quizes);
            dispatch (fetchQuizesSuccess(quizes))
                
            }catch(e){
                dispatch(fetchQuizesError(e))
            }
            
        }
    }

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try{
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data
            console.log(quiz);
            
           
            dispatch(fetchQuizSuccess(quiz))
        
        }catch(e){
               dispatch(fetchQuizesError(e))
           }
    
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function  fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}
export function quizState(answerState, results) {
    return {
        type: QUIZ_STATE,
        answerState,results
    }
}
export function finishedQuiz () {
    return {
        type: FINISH_QUIZ,
    }
}

export function quizNextQuestion (number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number

    }
}
export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz
    
        if (state.answerState) {
          const key = Object.keys(state.answerState)[0]
          if (state.answerState[key] === 'success') {
            return
          }
        }
    
        const question = state.quiz[state.ActiveQuestion]
        const results = state.results
    
        if (question.RightAnswerId === answerId) {
          if (!results[question.id]) {
            results[question.id] = 'success'
          }
    
          dispatch(quizState({[answerId]: 'success'}, results))
    
          const timeout = window.setTimeout(() => {
            if (isQuizFinished(state)) {
              dispatch(finishedQuiz())
            } else {
              dispatch(quizNextQuestion(state.ActiveQuestion + 1))
            }
            window.clearTimeout(timeout)
          }, 1000)
        } else {
          results[question.id] = 'mistake'
          dispatch(quizState({[answerId]: 'mistake'}, results))
        }
      }
    }
    
    function isQuizFinished(state) {
      return state.ActiveQuestion + 1 === state.quiz.length
    }

export function retryQuiz () {
    return {
        type: QUIZ_RETRY,
    }
}