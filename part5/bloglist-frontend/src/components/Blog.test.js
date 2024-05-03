import Blog from './Blog.jsx'
import {render, screen} from "@testing-library/react";
//import {test, expect} from 'vitest'

test('renders only title and an author of a blog', () => {
    const blog = {
        title: 'testing title',
        author: 'super author',
        url: 'httpTest',
        likes: 12
    }
    render(<Blog blog={blog}/>)

    const title = screen.getByText('testing title')
    const author = screen.getByText('super author')
    const url = screen.getByText('httpTest')
    const likes = screen.getByText('12')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).not.toBeDefined()
    expect(likes).not.toBeDefined()
})