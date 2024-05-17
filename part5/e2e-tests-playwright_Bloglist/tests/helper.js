const loginWith = async (page, username, password) => {
    await page.getByTestId('username').fill(username);
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', {name: 'log in'}).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByPlaceholder('title').fill(title);
    await page.getByPlaceholder('author').fill(author);
    await page.getByPlaceholder('url').fill(url);
}

export {loginWith, createBlog}