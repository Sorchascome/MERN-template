import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Input
  } from 'reactstrap'

import CompController from '../../controllers/compController'

export default class MernTools extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            compName: this.props.compName ? this.props.compName : '',
            desc: this.props.desc ? this.props.desc : '',
            file: this.props.file ? this.props.file : null,
            invalid: false
        }

        this.createComponent = this.createComponent.bind(this)
        this.updateComponent = this.updateComponent.bind(this)
    }

    createComponent() {
        (this.state.compName.length >= 3) ?

            CompController.addComponent(this.state, () => this.setState({compName: '', desc: '', invalid: false}, this.props.getComponents)) :

            this.setState({invalid: true})
    }

    updateComponent() {
        if (this.state.compName.length >= 3) {
            CompController.updateComponent(this.props.id, this.state, () => {
                this.props.getComponents()
                this.props.handleBack()
            })
        }

        else this.setState({invalid: true})
    }

    render() {
        return (
            <Card style={{margin: '2vw', width: '22vw', height: 'fit-content'}}>
                <CardBody>

                    <Input type="file" name="file" id="imagefile" accept="image/png, image/jpeg" onChange={e => this.setState({file: e.target.files[0]})}/>

                    <Input invalid={this.state.invalid} placeholder='Component name' style={{fontWeight: '400'}} type='text' value={this.state.compName} onChange={e => this.setState({compName: e.target.value})}/>

                    <Input invalid={this.state.invalid} placeholder='Component description' style={{fontWeight: '300'}} type='text' value={this.state.desc} onChange={e => this.setState({desc: e.target.value})}/>

                    {this.props.update ?
                        <Button onClick={this.updateComponent}>Update</Button>
                            :
                        <Button onClick={this.createComponent}>Add</Button>
                    }

                </CardBody>
          </Card>
        )
    }
}
