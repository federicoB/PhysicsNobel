import React from 'react'
import {Header} from 'semantic-ui-react'

import WorksComponent from './WorksComponent'

export default function LaureateWorks({name, works}) {
    return [
        <Header key="publicationsHeader">Publications by {name}</Header>,
        <WorksComponent key="laureatePublications" works={works}/>
    ]
}
