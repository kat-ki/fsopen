const {test, expect, beforeEach, describe} = require('@playwright/test')
const {loginWith, createBlog} = require("./helper");

describe('Bloglist', () => {
    beforeEach(async ({page, request}) => {
        await request.post('/api/test/reset')
        await request.post('/api/users', {
            data: {
                name: 'Tester',
                username: 'tester',
                password: 'tester'
            }
        })
        await page.goto('/')
    })
    test('Login form is shown', async ({page}) => {
        await expect(page.getByText('Blogs')).toBeVisible()
        await expect(page.getByRole('button', {name: 'log in'})).toBeVisible()
    });

    describe('Log in', () => {
        test('succeeds with correct credentials', async ({page}) => {
            await loginWith(page, 'tester', 'tester');
            await expect(page.getByText('Tester logged in')).toBeVisible();
        });
        test('fails with wrong credentials', async ({page}) => {
            await loginWith(page, 'tester', 'wrongPassword');
            await expect(page.getByText('Tester logged in')).not.toBeVisible();
            await expect(page.getByText('Wrong username or password')).toBeVisible();
        });
    });
    describe('When logged in', () => {
        beforeEach(async ({page}) => {
            await loginWith(page, 'tester', 'tester');
        })
        test('a new blog can be created', async ({page}) => {
            await page.getByRole('button', {name: 'add blog'}).click();
            await createBlog(page, 'Testing is fun', 'The Supertester', 'https://tester.org');
            await page.getByRole('button', {name: 'Create'}).click();

            await expect(page.locator('.title')).toContainText('Testing is fun');
            await expect(page.getByText('Added Testing is fun')).toBeVisible();
        });
        test.only('a blog can be edited (likes amount)', async ({page}) => {
            await page.getByRole('button', {name: 'add blog'}).click();
            await createBlog(page, 'Testing is fun', 'The Supertester', 'https://tester.org');
            await page.getByRole('button', {name: 'Create'}).click();
            await page.getByRole('button', {name: 'view'}).click();

            await expect(page.getByText('Likes:')).toBeVisible();
            await expect(page.locator('.likes')).toContainText('0');

            await page.getByRole('button', {name: 'Like'}).click();
            await expect(page.locator('.likes')).toContainText('1');
        })
    })
})