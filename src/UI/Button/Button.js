import React from 'react'
import classes from './Button.module.css'

const Btn = props => {
    const cls = [
        classes.Btn,
        classes[props.type]
    ]

    return (
        <button
         className={cls.join(' ')}
         onClick={props.onClick}
         disabled={props.disabled}
         >{props.children}</button>
    )
}

export default Btn