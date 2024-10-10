import {render, screen} from "@testing-library/react";
import {describe, expect, test} from 'vitest';
import userEvent from '@testing-library/user-event'
import BlogCard from "../src/components/BlogCard.jsx";

const blog = {
    id: '33',
    title: 'testing title',
    author: 'super author',
    url: 'httpTest',
    likes: 12,
}
describe('<Blog />', () => {
    test('renders only title and an author of a blog', () => {
        render(<BlogCard blog={blog}/>)

        const title = screen.getByText(blog.title);
        const author = screen.getByText(blog.author);
        const url = screen.queryByText(blog.url);
        const likes = screen.queryByText(blog.likes)

        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(url).toBeNull()
        expect(likes).toBeNull()
    });
    test('renders url and number of likes when button is clicked', async () => {
        const mockViewButton = vi.fn();
        render(<BlogCard blog={blog} handleShow={mockViewButton}/>)

        const url = screen.queryByText(blog.url);
        const likes = screen.queryByText(blog.likes);

        const user = userEvent.setup()
        const button = screen.queryByText('viewBtn');

        await user.click(button);

        expect(url).toBeDefined()
        expect(likes).toBeDefined()
    })
    test('checks event handler is called twice if like button is clicked twice', async () => {
        const mockViewButtonClick = vi.fn();
        const mockLikeButtonClick = vi.fn();

        render(<BlogCard blog={blog}
                         handleShow={mockViewButtonClick}
                         handleLike={mockLikeButtonClick}/>)

        const user = userEvent.setup();
        const viewButton = screen.getByText('view');
        const likeButton = screen.getByText('Like');

        await user.click(viewButton);
        await user.click(likeButton);
        await user.click(likeButton);

        expect(mockLikeButtonClick.mock.calls).toHaveLength(2);
    })
})
