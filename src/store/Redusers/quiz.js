import 
    {FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_STATE,
    QUIZ_RETRY
}    from "../Actions/ActionTypes"

const initialState = {
    quizes:[],
    loading:false,
    error:null,
    results:{},//{[id]: success, mistake}
    isFinished: false,
    ActiveQuestion:0,
    answerState:null,//{[id]: success, mistake}
    quiz:null
}

export default function quizReducer(state = initialState, action) {

    switch(action.type) {
        case QUIZ_RETRY:
            return{
                ...state,
                ActiveQuestion:0,
                isFinished:false,
                answerState:null,
                results:{}
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                ActiveQuestion : action.number,
                answerState:null
            }
        case FINISH_QUIZ :
            return {
                ...state,
                isFinished: true
            }
        case QUIZ_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, loading :false,
                quiz:action.quiz
            }
        case FETCH_QUIZES_START:
            return {
                ...state, loading: true
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state, loading:false,
                error:action.error
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,loading:false,
                quizes: action.quizes
            }
        default:
            return state
    }
}