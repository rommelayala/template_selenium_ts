// tests/e2e/selenium/cucumber/pages/BasePage.ts
import { WebDriver, until, WebElement, Locator } from 'selenium-webdriver';

export class BasePage {
  protected driver: WebDriver;
  protected url: string;

  constructor(driver: WebDriver, url: string = '') {
    this.driver = driver;
    this.url = url;
  }

  
   public  getLocator(selector: string): Locator {
    let type = 'css';
    let cleanSelector = selector;

    if (selector.startsWith('id:')) { type = 'id'; cleanSelector = selector.replace('id:', ''); }
    else if (selector.startsWith('xpath:')) { type = 'xpath'; cleanSelector = selector.replace('xpath:', ''); }
    else if (selector.startsWith('css:')) { type = 'css'; cleanSelector = selector.replace('css:', ''); }
    else if (selector.startsWith('name:')) { type = 'name'; cleanSelector = selector.replace('name:', ''); }
    else if (selector.startsWith('class:')) { type = 'className'; cleanSelector = selector.replace('class:', ''); }

    // Strip leading and trailing single quotes if present
    cleanSelector = cleanSelector.replace(/^'|'$/g, '');
    cleanSelector = cleanSelector.trim(); // In case there are spaces

    console.log(`[DEBUG] getLocator resolved -> type: ${type}, cleanSelector: "${cleanSelector}"`);

    switch (type) {
      case 'id': return { id: cleanSelector };
      case 'xpath': return { xpath: cleanSelector };
      case 'name': return { name: cleanSelector };
      case 'className': return { className: cleanSelector };
      case 'css':
      default:
        return { css: cleanSelector };
    }
  }
  
  // Navegar a la página
  async navigateTo(path: string = this.url): Promise<void> {
     
    if (path.startsWith('http')) {
        await this.driver.get(path);
        return;
    }
    // Usamos el .env.local y si falla, fallback a localhost
    const baseUrl = process.env.NEXTAUTH_URL_LOCAL || 'http://localhost:3001';
    console.log('baseUrl', baseUrl);
    await this.driver.get(baseUrl + path);
  }

  // Esperar a que un elemento sea visible (WAIT explícito)
  async waitForElementVisible(selectorOrLocator: string | Locator, timeout: number = 10000): Promise<WebElement> {
    const locator = typeof selectorOrLocator === 'string' ? this.getLocator(selectorOrLocator) : selectorOrLocator;
    return await this.driver.wait(until.elementLocated(locator), timeout, `Elemento no encontrado: ${JSON.stringify(locator)}`);
  }

  // Hacer click de forma segura
  async click(selectorOrLocator: string | Locator): Promise<void> {
    const element = await this.waitForElementVisible(selectorOrLocator);
    await this.driver.wait(until.elementIsVisible(element), 5000); // Doble check de visibilidad
    await this.driver.wait(until.elementIsEnabled(element), 5000); // Check de habilitado
    await element.click();
  }

  // Obtener texto de un elemento
  async getText(selectorOrLocator: string | Locator): Promise<string> {
    const element = await this.waitForElementVisible(selectorOrLocator);
    const text = await element.getText();
    if (!text) {
        return await element.getAttribute('textContent') || '';
    }
    return text;
  }
  // Escribir texto en un input de forma segura
  async type(selectorOrLocator: string | Locator, text: string): Promise<void> {
    const element = await this.waitForElementVisible(selectorOrLocator);
    await this.driver.wait(until.elementIsVisible(element), 5000);
    await this.driver.wait(until.elementIsEnabled(element), 5000);
    await element.clear(); // Opcional: limpiar antes de escribir, es común en tests
    await element.sendKeys(text);
  }

  // Seleccionar opción en un dropdown por su valor
  async selectByValue(selectorOrLocator: string | Locator, value: string): Promise<void> {
    const locator = typeof selectorOrLocator === 'string' ? this.getLocator(selectorOrLocator) : selectorOrLocator;
    const selectElement = await this.driver.findElement(locator);
    // En Selenium puro, la forma robusta es buscar la opción y clickearla
    // O usar la clase Select (pero lo haremos manual para máxima compatibilidad)
    await selectElement.click();
    
    // Buscamos la opción por su atributo 'value' dentro del select
    const option = await selectElement.findElement({ css: `option[value="${value}"]` });
    await option.click();
  }

  // Buscar un elemento retornando WebElement
  async findElement(selectorOrLocator: string | Locator): Promise<WebElement> {
    const locator = typeof selectorOrLocator === 'string' ? this.getLocator(selectorOrLocator) : selectorOrLocator;
    return await this.driver.findElement(locator);
  }

}