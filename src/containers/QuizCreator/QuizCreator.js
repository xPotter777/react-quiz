import React, { Component } from 'react'
import classes from './QuizCreator.module.css'
import Btn from '../../UI/Button/Button'
import {createControl,validate,validateForm} from '../../Form/FormFramework'
import Input from '../../UI/Input/Input'
import Auxillary from '../../hoc/Auxillary/Auxillary' //same as React.Fragment
import Select from '../../UI/Select/Select'
import {createQuizQuestion, finishCreateQuiz} from "../../store/Actions/create";
import {connect} from 'react-redux'


function createOptionControl(number) {
    return  createControl ({
            label:`Вариант ${number}`,
            errorMessage:'Вопрос не может быть пустым',
            id:number
        },{required:true})
    }


function createFormControls() {
    return {

        question: createControl({
            label:'Введите вопрос',
            errorMessage:'Вопрос не может быть пустым'
        },{required:true}),
        option1:createOptionControl(1),
        option2:createOptionControl(2),
        option3:createOptionControl(3),
        option4:createOptionControl(4)
    }
}

class QuizCreator extends Component {



    state = {
        formControls:createFormControls(),
        RightAnswerId:1,
        isFormValid: false
    }

    submitHandler = (event) => {
        event.preventDefault();
        
    }

    addQuestionHandler = (event)  => {
        event.preventDefault()
        console.log('clicked');



        const {question,option1,option2,option3,option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            RightAnswerId:this.state.RightAnswerId,
            answers:[
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
                
            ]
        }

        this.props.createQuizQuestion(questionItem)

        this.setState({
            formControls: createFormControls(),
            RightAnswerId: 1,
            isFormValid: false
        })

    }

    createQuizHandler =  event => {


        this.setState({
            formControls:createFormControls(),
            RightAnswerId:1,
            isFormValid: false
        })
            this.props.finishCreateQuiz()
    }


    changeHandler = (value,controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}
        

        control.touched = true
        control.value = value 
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName,index)=>{

            const control = this.state.formControls[controlName]

            return (
                <Auxillary key={controlName + index}>
                <Input
                label={control.label}
                errorMessage={control.errorMessage}
                value={control.value}
                valid={control.valid}
                shouldValidate={!!control.validation}
                touched={control.touched}
                onChange={event => this.changeHandler(event.target.value, controlName)}
                />
                {index === 0 ? <hr/> : null}
                </Auxillary>
            )


        })
    }

    selectChangeHandler = event => {
        
            this.setState({
                RightAnswerId: +event.target.value
            }
            )
        
    }

    render() {

        const select = <Select
        label='Выберите правильный ответ'
        value={this.state.RightAnswerId}
        onChange={this.selectChangeHandler}
        options={
            [
                {text: 1, value:1},
                {text: 2, value:2},
                {text: 3, value:3},
                {text: 4, value:4}
            ]
        }
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>
                 
                    {this.renderControls()}
                    

                    {select}

                    <Btn
                    type='primary'
                    onClick={this.addQuestionHandler}
                    disabled={!this.state.isFormValid}
                    >Добавить вопрос</Btn>

                    <Btn
                    type='success'
                    onClick={this.createQuizHandler}
                    disabled={this.props.quiz.length === 0}
                    >Создать тест</Btn>
                    
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch){
    return{
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizCreator)