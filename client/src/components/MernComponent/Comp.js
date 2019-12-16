import React, { useState } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, ButtonGroup, Input
  } from 'reactstrap'

import MernTools from '../Tools/MernTools'

import CompController from '../../controllers/compController'

export default function Comp(props) {
    const [edit, switchToEdit] = useState(false)
    let binary = '',
    bytes = [].slice.call(new Uint8Array(props.image.data.data));
    bytes.forEach((b) => binary += String.fromCharCode(b));

    let imgstring = 'data:image/png;base64,' + window.btoa(binary)

    if (!edit) return (
        <Card style={{margin: '2vw', width: '20vw', height: 'fit-content', display: 'flex', flexDirection: 'row'}}>

            <CardImg style={{maxWidth: '20%', height: '4vw', margin: 'auto 1vw', objectFit: 'contain'}} src={imgstring}/>

            <CardBody>

                    <div style={{display: 'inline-flex', justifyContent: 'space-between', width: '100%'}}>
                            <CardTitle style={{fontWeight: '800'}}>{props.compName}</CardTitle>
                            <ButtonGroup size="sm">
                                <Button onClick={() => switchToEdit(true)} style={{fontWeight: '800'}} color="info">E</Button>
                                <Button onClick={() => CompController.deleteComponent(props)} style={{fontWeight: '800'}} color="danger">X</Button>
                            </ButtonGroup>
                    </div>
                    <CardText>{props.desc}</CardText>

            </CardBody>
        </Card>
    )

    else return <MernTools {...props} handleBack={() => switchToEdit(false)} getComponents={props.getComponents} update={true} id={props._id}/>
}

