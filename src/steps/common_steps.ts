import { Given, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CustomWorld } from '../support/world';

Given('I navigate to {string}', async function (this: CustomWorld, url: string) {
    const basePage = this.getBasePage();
    await basePage.navigateTo(url);
});

Then('the page title should contain {string}', async function (this: CustomWorld, expectedTitle: string) {
    const title = await this.driver?.getTitle();
    expect(title).to.contain(expectedTitle);
});
