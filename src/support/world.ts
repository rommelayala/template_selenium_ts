// tests/e2e/selenium/cucumber/support/world.ts

import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { WebDriver } from "selenium-webdriver";
import { BasePage } from "../pages/BasePage";
import { DynamicLocatorEngine, LocatorRegistry } from "rommel-anti-pom";
import devConfig from '../resources/dev.json';
import prodConfig from '../resources/prod.json';
import stagingConfig from '../resources/staging.json';
import locators from '../resources/locators.json';

export interface AppConfig {
  baseUrl: string;
  // Aquí puedes añadir otras propiedades de tus JSON (ej: timeout, user, etc.)
  [key: string]: any;
}

export class CustomWorld extends World {
  driver: WebDriver | undefined;
  private _basePage: BasePage | undefined;
  private _pages: Map<string, BasePage> = new Map();
  public config: AppConfig;
  public engine: DynamicLocatorEngine;

  constructor(options: IWorldOptions) {
    super(options);
    this.config = this.loadConfig();
    this.engine = new DynamicLocatorEngine();
    this.engine.loadRegistry(locators as LocatorRegistry);
  }

  private loadConfig(): AppConfig {
    const env = (process.env.TEST_ENV || "dev").toLowerCase();
    console.log(`[INIT] Cargando configuración para el entorno: ${env}`);

    switch (env) {
      case "prod":
        return prodConfig;
      case "staging":
        return stagingConfig;
      case "dev":
      default:
        return devConfig;
    }
  }

  getBasePage(): BasePage {
    if (!this._basePage) {
      if (!this.driver) throw new Error("Driver not initialized");
      this._basePage = new BasePage(this.driver, this.config.baseUrl);
    }
    return this._basePage;
  }

  public getPage<T extends BasePage>(PageClass: { new(driver: WebDriver, url: string): T }): T {
    const className = PageClass.name;
    if (!this._pages.has(className)) {
      if (!this.driver) throw new Error("Driver not initialized");
      this._pages.set(className, new PageClass(this.driver, this.config.baseUrl));
    }
    return this._pages.get(className) as T;
  }
}

setWorldConstructor(CustomWorld);
