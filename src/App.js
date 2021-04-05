import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import {Route} from 'react-router-dom'

import QuizList from './containers/QuizList/QuizList'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Auth from './containers/Auth/Auth'



export default class App extends Component{
  state={
  }
render(){

  
  return (
    <Layout>
      
      <Route path='/' exact component={QuizList}/>
      <Route path='/auth' exact  component={Auth}/>
      <Route path='/quiz-creator' exact component={QuizCreator}/>
      <Route path='/quiz/:id'  exact component={Quiz}/>
      
      
     
      </Layout>
    

     
  );
}
}