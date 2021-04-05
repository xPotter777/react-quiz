  
import React,{Component} from 'react'
import classes from './Auth.module.css'
import Btn from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import is from 'is_js'
import axios from "axios";
import {connect} from "react-redux";


 class Auth extends Component{

    state = {
        isFormValid:false,
        formControls:{
            email: {
                value:'',
                type:'email',
                label:'Email',
                errorMessage:'Введите корректный email',
                valid:false,
                touched:false,
                validation:{
                    required:true,
                    email:true
                }
            },
            password: {
                value:'',
                type:'password',
                label:'Пароль',
                errorMessage:'Введите корректный пароль',
                valid:false,
                touched:false,
                validation:{
                    required:true,
                    minLength:6

            }
        }
    }}

    loginHandler = async () => {
    const authData = {
        email:this.state.formControls.email.value,
        password:this.state.formControls.password.value,
        returnSecureToken: true
    }
    try{
        const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyBBrCnAG2ucbSTgGds_6lZOs7k0vHpBJMg', authData)
        console.log(response.data)
    }
    catch (e) {
        console.log(e)
    }
    }

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBBrCnAG2ucbSTgGds_6lZOs7k0vHpBJMg', authData)

            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    
    submitHandler = (event) => {
        event.preventDefault();
        
    }

    validateControl(value, validation) {
        if(!validation){
            return true 
        }
        let isValid = true

        if(validation.required){
            isValid = value.trim() !== '' && isValid
        }

        if(validation.email){
            isValid = is.email(value) && isValid
        }

        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid
    }

    onChangeHandler = (event,controlName) => {
        console.log(`${controlName}: ${event.target.value}` );
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}
        control.value =  event.target.value

        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control 

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls,isFormValid
        })
    }

    renderInputs()  {
        return Object.keys(this.state.formControls).map((controlName, index)=>{
            const control = this.state.formControls[controlName]
            return(
                <Input
                key={controlName + index}
                type={control.type}
                value={control.value}
                label={control.label}
                valid={control.valid}
                touched={control.touched}
                errorMessage={control.errorMessage}
                shouldValidate={!!control.validation}
                onChange={(event)=>{this.onChangeHandler(event, controlName)}}
                />
            )
           
        })
       
    }



    render() {
        return(
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                    
                        {this.renderInputs()}

                        <Btn
                         type="success" 
                         onClick={this.loginHandler}
                         disabled={!this.state.isFormValid}>Войти</Btn>
                        <Btn type="primary"
                         onClick={this.registerHandler}
                         disabled={!this.state.isFormValid}
                         > Регистрация</Btn>
                    </form>
                </div>
            </div>
        )
    }
}
export default connect()(Auth)