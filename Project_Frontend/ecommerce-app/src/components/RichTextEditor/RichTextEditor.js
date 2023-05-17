import React from 'react'
import JoditEitor from 'jodit-react'
const RichTextEditor = ({ setDescription }) => {
    return (
        <>
            <JoditEitor onChange={(content) => setDescription(content)} />
        </>
    )
}

export default RichTextEditor