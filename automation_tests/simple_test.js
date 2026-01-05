const { Builder, By, Key, until } = require('selenium-webdriver');

async function exampleTest() {
    // Initialize the driver (Chrome)
    // Selenium Manager (included in selenium-webdriver 4.6+) handles the driver automatically.
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        console.log('Navigating to the application...');
        // Replace with your running frontend URL
        await driver.get('http://localhost:5173');

        // Wait for the body to be located (ensures page loaded)
        await driver.wait(until.elementLocated(By.tagName('body')), 10000);

        // Get the title
        let title = await driver.getTitle();
        console.log(`Page Title is: ${title}`);

        // Example assertion Check
        if (title && title.length > 0) {
            console.log('✅ Title Check Passed');
        } else {
            console.log('❌ Title Check Failed');
        }

        // You can add more steps here, e.g. finding a button:
        // await driver.findElement(By.css('button.login-btn')).click();

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        console.log('Closing browser...');
        await driver.quit();
    }
}

exampleTest();
