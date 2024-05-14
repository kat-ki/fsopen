const {test, expect, beforeEach, describe} = require('@playwright/test')
const {loginWith} = require("./helper");

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
            await expect(page.getByText('Tester logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({page}) => {
            await loginWith(page, 'tester', 'wrongPassword');
            await expect(page.getByText('Tester logged in')).not.toBeVisible();
            await expect(page.getByText('Wrong username or password')).toBeVisible();
        })
    })
})