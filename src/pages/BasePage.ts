// tests/e2e/selenium/cucumber/pages/BasePage.ts
import { WebDriver, until, WebElement, Locator } from 'selenium-webdriver';
import { RommelBasePage } from 'rommel-anti-pom';

export class BasePage extends RommelBasePage {
  protected url: string;

  constructor(driver: WebDriver, url: string = '') {
    super(driver);
    this.url = url;
  }




  // Configura la Base URL
  async setUrlBase(path: string): Promise<void> {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      this.url = path;
      console.log(`[BasePage] setUrlBase ------> : ${path}`);
      await this.driver.get(path);
      return;

    } else {
      // Atrapamos el error que Selenium escupió.
      // Lanzamos uno propio para dar contexto claro a quien vea los logs
      throw new Error(`[BasePage] No se pudo navegar a la URL base: ${this.url}. Asegúrate de que empieza con http:// o https://.`);
    }

  }

  // Navegar a la página
  async navigateTo(path: string = this.url): Promise<void> {
    let targetUrl = this.url;
    try {
      // Usamos la URL inyectada desde la configuración (this.url)
      targetUrl = path.startsWith('/') ? `${this.url}${path}` : `${this.url}/${path}`;
      console.log(`[BasePage] Navegando a: ${targetUrl}`);
      await this.driver.get(targetUrl);
    } catch (error) {
      // Atrapamos el error que Selenium escupió.
      // Lanzamos uno propio para dar contexto claro a quien vea los logs
      throw new Error(`[BasePage] No se pudo navegar a la URL "${targetUrl}". Asegúrate configurar la URL BASE : ${String(error)}`);
    }

  }

  // Esperar a que un elemento sea visible (WAIT explícito)
  async waitForElementVisible(selectorOrLocator: string | Locator, timeout: number = 10000): Promise<WebElement> {
    const locator = typeof selectorOrLocator === 'string' ? this.getSeleniumLocator(selectorOrLocator) : selectorOrLocator;
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
    const locator = typeof selectorOrLocator === 'string' ? this.getSeleniumLocator(selectorOrLocator) : selectorOrLocator;
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
    const locator = typeof selectorOrLocator === 'string' ? this.getSeleniumLocator(selectorOrLocator) : selectorOrLocator;
    return await this.driver.findElement(locator);
  }



}