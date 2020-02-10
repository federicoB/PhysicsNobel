import React from 'react'

import {Header} from 'semantic-ui-react'

export default class WikiText extends React.Component {
    render() {
        const createHeader = (element, index, size) => {
            if (index % 2 === 1)
                return <Header key={index} size={size}>{element}</Header>
            else return element
        };
        const newText = this.props.text.split(/\s==\s(.*)\s==/)
            .map((element, index) => createHeader(element, index, "medium"))
            .reduce((accumulator, element, index) => {
                if (index % 2 === 0) {
                    accumulator.push(element.split(/\s===\s(.*)\s===/)
                        .map((element, index) => createHeader(element, index, "small")));
                } else accumulator.push(element)
                return accumulator;
            }, []);
        return (<div dangerouslySetInnerHTML={{__html: newText}}/>)
    }
}
