const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Bloglist', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })
    test('Login form is shown', async ({ page }) => {
        await expect(page.getByText('Blogs')).toBeVisible()
        await expect(page.getByRole('button', {name: 'log in'})).toBeVisible()
    })
})