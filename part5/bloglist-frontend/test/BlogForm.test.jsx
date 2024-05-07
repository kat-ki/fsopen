import {render, screen} from "@testing-library/react";
import {describe, expect, test} from 'vitest';
import userEvent from '@testing-library/user-event'
import BlogForm from "../src/components/BlogForm.jsx";

const blog = {
    id: '33',
    title: 'testing title',
    author: 'super author',
    url: 'httpTest',
    likes: 12,
}
describe('<BlogForm />', () => {
    test('form calls event handler when new blog is created', async () => {
        const createBlog = vi.fn();
        const user = userEvent.setup()

        render(<BlogForm createBlog={createBlog}/>)

        const titleInput = screen.getByPlaceholderText('title');
        const authorInput = screen.getByPlaceholderText('author');
        const urlInput = screen.getByPlaceholderText('url');
        const createBtn = screen.getByText('Create');

        await user.type(titleInput, 'just testing');
        await user.type(authorInput, 'tester');
        await user.type(urlInput, 'www');
        await user.click(createBtn);

        expect(createBlog.mock.calls).toHaveLength(1);
        expect(createBlog.mock.calls[0][0].title).toBe('just testing');
        expect(createBlog.mock.calls[0][0].author).toBe('tester');
        expect(createBlog.mock.calls[0][0].url).toBe('www');
    })
})