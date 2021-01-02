import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />' , () => {

    const blog = {
        title: 'Blogs first test',
        author: 'Jaakko Palm',
        url: 'localhost:3000',
        likes: 0
    }

    const component = render(
        <Blog blog={blog}/>
    )

    component.debug()
    //Alussa komponentissa renderöivät vain title ja author
    test('renders title and author', () => {
        const div = component.container.querySelector('.blogInfo')
        expect(div).toHaveStyle('display: none')
    })
})