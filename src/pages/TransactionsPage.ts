import { WebDriver, until, WebElement, Locator } from "selenium-webdriver";
import { BasePage } from "./BasePage";

export class TransactionPage extends BasePage {
  // componentes
  private locators = {
    transactions: {
      h2: {
        title: "css:h2[data-testid='transactions-title']",
      },
      tableTransactions: {
        table: "css:table[data-testid='transactions-table']",
        thead: "css:thead[data-testid='transactions-table-header']",
        tbody: "css:tbody[data-testid='transactions-table-body']",
        rows: "css:tbody[data-testid='transactions-table-body']>tr']",
      },
      input: {
        search: "css:input[placeholder^='Buscar moneda']",
      },
    },
  };

  // Metodos propios de la pagina

  constructor(driver: WebDriver, url: string) {
    super(driver, url);
  }
}
