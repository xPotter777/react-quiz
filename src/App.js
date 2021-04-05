import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'

import QuizList from './containers/QuizList/QuizList'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Auth from './containers/Auth/Auth'
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";




class App extends Component{

render() {

    let routes = (
        <Switch>
            <Route path='/' exact component={QuizList}/>
            <Route path='/auth' exact  component={Auth}/>
            <Route path='/quiz-creator' exact component={QuizCreator}/>
            <Route path='/quiz/:id'  exact component={Quiz}/>
            <Redirect to={'/'} />
        </Switch>
    )

    if(this.props.isAuth) {
        routes = (
            <Switch>
                <Route path='/' exact component={QuizList}/>
                <Route path='/quiz-creator' exact component={QuizCreator}/>
                <Route path='/quiz/:id'  exact component={Quiz}/>
                <Route path='/logout' exact component={Logout}/>
                <Redirect to={'/'} />
            </Switch>
        )
    }
  
  return (
    <Layout>
        { routes }
    </Layout>
    

     
  );
}
}

function mapStateToProps (state) {
    return {
        isAuth: !!state.auth.token
    }
}

export default withRouter(connect(mapStateToProps)(App))