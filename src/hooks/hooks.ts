// tests/e2e/selenium/cucumber/hooks/hooks.ts

import { Before, After, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { Builder } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { CustomWorld } from '../support/world';

setDefaultTimeout(60 * 1000);



Before(async function (this: CustomWorld) {
    const options = new Options();
    if (process.env.HEADLESS_MODE === 'true') {
        options.addArguments('--headless=new');
    }
    
    this.driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    // Maximizar ventana para que los screenshots salgan completos
    await this.driver.manage().window().setRect({ width: 1920, height: 1080 });
});

After(async function (this: CustomWorld, scenario) { 
    if (this.driver) {
        // Capturar screenshot si el escenario falla
        if (scenario.result?.status === Status.FAILED) {
            try {
                const screenshot = await this.driver.takeScreenshot();
                // Adjuntar la imagen al reporte HTML de Cucumber
                this.attach(Buffer.from(screenshot, 'base64'), 'image/png');
                console.log(`[DEBUG] Escenario fallido: ${scenario.pickle.name}. Screenshot capturado.`);
            } catch (error) {
                console.error('Error al capturar screenshot:', error);
            }
        }
        
        await this.driver.quit();
        this.driver = undefined;
    }
});
