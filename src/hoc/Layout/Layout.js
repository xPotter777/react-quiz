import React,{Component} from 'react'
import classes from './Layout.module.css'
import Menu from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'


class Layout extends Component{

    state = {
        menu:false,

    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    menuCloseHandler = () => {
        this.setState({
            menu:false
        })
    }


    render(){
        return (

            <div className={classes.Layout}>



            <Menu
            onToggle={this.toggleMenuHandler}
            isOpen={this.state.menu}
            />     
            <Drawer
            isOpen={this.state.menu}
            onClose={this.menuCloseHandler}
            />           
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
  
  export default Layout