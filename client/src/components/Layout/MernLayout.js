import React, { Component } from 'react'

import MernComponent from '../MernComponent/Comp'
import MernTools from '../Tools/MernTools'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import compController from '../../controllers/compController';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
}

const listStyle = { 
    display: 'flex',
    padding: 8,
    overflow: 'auto'
}

export default class MernLayout extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            items: this.props.components,
            active: true
        }

        this.onDragEnd = this.onDragEnd.bind(this)
    }

    onDragEnd(result) {
        if (!result.destination) {
          return
        }

        const items = reorder(
          this.state.items,
          result.source.index,
          result.destination.index
        )

        items.map((item, index) => item.order = index)
        let newOrderedItems = items.filter((item, index) => this.props.components[index].order !== item.order)
        
        this.setState({items, active: false}, 
            () => compController.sortComponents(newOrderedItems, 
                () => this.setState({ active: true })))
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) this.setState({items: this.props.components})
    }
    
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable style={this.state.active ? { pointerEvents: 'none'} : {}} droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <div style={listStyle} ref={provided.innerRef} {...provided.droppableProps}>
                            {this.state.items.map((comp, index) => 
                                <Draggable key={comp._id} draggableId={comp._id} index={index}>
                                    {(provided, snapshot) => 
                                        <div 
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                                <MernComponent getComponents={this.props.getComponents} {...comp}/>
                                        </div> }
                                </Draggable>
                            )}
                        </div>
                    )}
                </Droppable>   

                <hr/>

                <div>
                    <MernTools getComponents={this.props.getComponents}/>
                </div>
            </DragDropContext>
        )
    }
}
