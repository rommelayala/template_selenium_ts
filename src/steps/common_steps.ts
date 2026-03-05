import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import { CustomWorld } from "../support/world";


// Pasos imperativos (Mantenemos por si se necesitan explícitamente)
Given(
  "set web url base to {string}",
  async function (this: CustomWorld, url: string) {
    const basePage = this.getBasePage();
    await basePage.setUrlBase(url);
  },
);

When("navegate to {string}", async function (this: CustomWorld, url: string) {
  const basePage = this.getBasePage();
  await basePage.navigateTo(url);
});

// Pasos declarativos (Mejor práctica BDD)
Given("I am on the home page", async function (this: CustomWorld) {
  const basePage = this.getBasePage();
  // Navegamos directamente a la URL base inyectada por el world.ts
  await basePage.navigateTo('/');
});

When("I navigate to the transactions page", async function (this: CustomWorld) {
  const basePage = this.getBasePage();
  await basePage.navigateTo('/transactions');
});

Then(
  "the page title should contain {string}",
  async function (this: CustomWorld, expectedTitle: string) {
    const title = await this.driver?.getTitle();
    expect(title).to.contain(expectedTitle);
  },
);

Then(
  "wait for {int} seconds",
  async function (this: CustomWorld, waitfor: number) {
    // Verifica si el driver existe
    if (!this.driver)
      throw new Error(
        "No se puede esperar porque el navegador no está iniciado",
      );

    await this.driver?.sleep(waitfor * 1000);
  },
);

//Then the property "data-testid" of the element "${transactiones.h2.text}" should be equal to "Editor de Transacciones"
Then(
  "the property {string} of the element {string} should be equal to {string}",
  async function (
    this: CustomWorld,
    property: string,
    Locator: string,
    expectedValue: string,
  ) {
    if (!this.driver)
      throw new Error(
        "No se puede esperar porque el navegador no está iniciado",
      );

    const strategy = this.engine.resolveStrategy(Locator);

    // obtener elemento
    const element = await this.getBasePage().findElementResilient(strategy);
    // obtienees el property del elemento
    const actualValue = await element?.getAttribute(property);
    // evaluas el assert
    expect(actualValue).equal(expectedValue);
  },
);
