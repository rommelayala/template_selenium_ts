// tests/e2e/selenium/cucumber/support/world.ts

import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { WebDriver } from 'selenium-webdriver';
import { BasePage } from '../pages/BasePage';

export class CustomWorld extends World {
  driver: WebDriver | undefined;
  private _basePage: BasePage | undefined;
  private _pages: Map<string, BasePage> = new Map();

  constructor(options: IWorldOptions) {
    super(options);
  }

  getBasePage(): BasePage {
    if (!this._basePage) {
      if (!this.driver) throw new Error('Driver not initialized');
      this._basePage = new BasePage(this.driver);
    }
    return this._basePage;
  }

  getPage<T extends BasePage>(PageClass: new (driver: WebDriver) => T): T {
    const className = PageClass.name;
    if (!this._pages.has(className)) {
      if (!this.driver) throw new Error('Driver not initialized');
      this._pages.set(className, new PageClass(this.driver));
    }
    return this._pages.get(className) as T;
  }
}

setWorldConstructor(CustomWorld);
