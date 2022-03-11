import React from "react";
import {Textfit} from "react-textfit"
import './index.css'

export const Display = ({value})=>{
    return(
        <Textfit className='output' mode='single' max={50}>
            {value}
        </Textfit>
    )
}