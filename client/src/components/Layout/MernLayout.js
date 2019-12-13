import React from 'react'

import MernComponent from '../MernComponent/Comp'
import MernTools from '../Tools/MernTools'

import CompController from '../../controllers/compController'

export default function MernLayout(props) {
    return (
        <div>
            <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                {props.components.map(comp => <MernComponent getComponents={props.getComponents} key={comp.compName} {...comp}/>)}
            </div>
            <hr/>
            <div>
                <MernTools getComponents={props.getComponents}/>
            </div>
        </div>
    )
}