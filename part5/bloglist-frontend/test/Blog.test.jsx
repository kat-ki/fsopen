import {render, screen} from "@testing-library/react";
import {describe, expect, test} from 'vitest'
import Blog from "../src/components/Blog.jsx";

describe('test', () => {
    test('renders only title and an author of a blog', () => {
        const blog = {
            title: 'testing title',
            author: 'super author',
            url: 'httpTest',
            likes: 12
        }
        render(<Blog blog={blog}/>)

        const title = screen.getByText(blog.title);
        const author = screen.getByText(blog.author);
        const url = screen.queryByText(blog.url);
        const likes = screen.queryByText(blog.likes)

        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(url).toBeNull()
        expect(likes).toBeNull()
    })
})
