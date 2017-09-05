import React from 'react'

export default class LaureateWorks extends React.Component {
    render() {
        const works = props.works.map(({title, URL}) => (<p key={URL}>{title} : {URL}</p>));
        return {works}
    }
}