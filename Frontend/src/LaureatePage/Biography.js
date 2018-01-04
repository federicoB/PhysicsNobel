import React from 'react'

import WikiText from '../WikiText'

export default class Biography extends React.Component {
    render() {
        return <WikiText id="biography" text={this.props.biography}/>
    }
}