import React, { useState } from 'react'

const Blog = ({ blog }) => {
    const [moreVisible, setMoreVisible] = useState(false)
    const lessVisible = { display: moreVisible ? 'none' : '' }
    const allVisible = { display: moreVisible ? '' : 'none' }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return(
        <div style={blogStyle}>
            <div style={lessVisible} className="lessVisible">
                {blog.title}, Author: {blog.author}
                <button onClick={() => setMoreVisible(true)}>view</button>
            </div>
            <div style={allVisible} className="blogInfo">
                {blog.title}, Author: {blog.author}, Likes: {blog.likes}, Url: {blog.url}
                <button onClick={() => setMoreVisible(false)}>close</button>
            </div>
        </div>
    )
}

export default Blog
