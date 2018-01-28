import React from 'react'
import {Accordion} from 'semantic-ui-react'

import WorkItem from './WorkItem'

export default class WorksGroup extends React.Component {
    constructor(props) {
        super(props)
        //no active accordion by default
        this.state = {activeIndex: -1}
        this.handleClick = this.handleClick.bind(this)
    }


    handleClick(e, titleProps) {
        const {index} = titleProps
        const {activeIndex} = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({activeIndex: newIndex})
    }

    render() {
        const {activeIndex} = this.state
        const worksItems = this.props.works.map((work, index) =>
            (<WorkItem key={work.URL} activeIndex={activeIndex} index={index}
                       handleClick={this.handleClick} work={work}/>)
        )
        return (<Accordion exclusive={false} styled>{worksItems}</Accordion>)
    }
}