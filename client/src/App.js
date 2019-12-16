import React, { Component } from 'react'
import MernLayout from './components/Layout/MernLayout'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'reactstrap';

import CompController from './controllers/compController'

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {}

    this.getComponents = this.getComponents.bind(this)
  }

  getComponents = async () => {
    CompController.getComponents( components => this.setState({components: components.sort((a,b) => a.order - b.order)} ) )
  }

  componentDidMount() {
    this.getComponents()
  }

  render() {
    if (this.state.components) return <MernLayout getComponents={this.getComponents} components={this.state.components} />
    else return <Spinner color="primary" style={{margin: 'auto'}}/>
  }
}
