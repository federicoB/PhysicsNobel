import React from 'react'
import {Accordion, Icon} from 'semantic-ui-react'

export default function WorkItem({work, activeIndex, index, handleClick}) {
    const {title, author, URL, publishDate, type,} = work
    return [
        <Accordion.Title key={work.URL + "title"} active={activeIndex === index} index={index} onClick={handleClick}>
            <Icon name='dropdown'/>
            {title}
        </Accordion.Title>,
        <Accordion.Content key={work.URL + "content"} active={activeIndex === index}>
            <ul>
                {(author != null) && (author !== "None") ? (<li><b>Author:</b> {author}</li>) : null}
                {(URL != null) && (URL !== "None") ? <li><b>URL: </b><a href={URL}>{URL}</a></li> : null}
                {(publishDate != null) && (publishDate !== "None") ? <li><b>Issue date:</b> {publishDate}</li> : null}
                {(type != null) && (type !== "None") ? <li><b>Type:</b> {type}</li> : null}
            </ul>
        </Accordion.Content>
    ]
}