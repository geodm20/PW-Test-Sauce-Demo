# Automated Tests for Sauce Demo

## Description

This repository contains automated tests for Sauce Demo using Playwright, a sample e-commerce website, using Playwright - a modern end-to-end testing framework. The tests cover various functionalities such as login, product interactions, adding/removing items from the cart, and checkout processes, and they're written in TypeScript and utilize the Page Object Model pattern for better maintainability.

## Project Structure

```
PW-DEMO-SAUCE/
│-- pages/                # Page Object Model (POM) files
│   ├── cart.page.ts
│   ├── checkout.page.ts
│   ├── login.page.ts
│   ├── products.page.ts
│-- tests/                # Test specifications
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── login.spec.ts
│   ├── products.spec.ts
│-- utils/                # Utility functions
│   ├── config.ts
│-- test-cases/           # Test case documentation
│-- test-results/         # Stores test run results
│-- playwright-report/    # Playwright test reports
│-- playwright.config.ts  # Playwright configuration
│-- package.json          # Project dependencies
│-- .gitignore            # Git ignore file
```
## Features

* **Page Object Model (POM):** Organizes UI interactions into reusable components.
* **Parallel Test Execution:** Supports running tests concurrently.
* **Comprehensive Reports:** Generates HTML reports with test details.
* **Cross-Browser Testing:** Supports multiple browsers like Chromium, Firefox, and WebKit.

# Prerequisites

Ensure you have the following installed before running the tests:
* Node.js (Recommended: latest LTS version)
* npm (comes with Node.js)

## Installation

Clone this repository and install dependencies:
```
git clone https://github.com/geodm20/PW-Test-Sauce-Demo.git
cd PW-Test-Sauce-Demo
npm install
```

## Running Tests

To execute the Playwright tests, use:

```npx playwright test```

To run tests in headed mode (UI mode):

```npx playwright test --headed```

To run tests for a specific file:

```npx playwright test tests/example.spec.ts```

## Configuring Workers (Parallel Execution)

Modify the number of workers (parallel test execution) in playwright.config.ts (currently, the value set makes Playwright use many workers as the half of the CPU logical cores):

```
export default defineConfig({
  workers: 4, // Change this number as needed
});
```

Alternatively, set the number of workers via CLI:

```npx playwright test --workers=2```

## Adding More Browsers

By default, only Chromium is installed for speed execution. To add or configure other browsers:

1. Open playwright.config.ts
2. Locate the projects section and modify it to include other browsers:
```
// Example configuration for multiple browsers
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  // Uncomment to add Firefox
  // {
  //   name: 'firefox',
  //   use: { ...devices['Desktop Firefox'] },
  // },
  // Uncomment to add WebKit (Safari)
  // {
  //   name: 'webkit',
  //   use: { ...devices['Desktop Safari'] },
  // },
  // Uncomment to add Edge
  // {
  //   name: 'msedge',
  //   use: { 
  //     channel: 'msedge',
  //   },
  // },
]
```
Or use CLI to install them:

```npx playwright install firefox webkit```

Then, you can run tests on a specific browser:

```npx playwright test --browser=firefox```

## Generating and Viewing Reports

Playwright generates reports automatically. To generate an HTML report:

```npx playwright test --reporter=html```

After running the command, open the report:

```npx playwright show-report```

## Accessing Test Results

Test results are stored in the ```playwright-report``` directory. The HTML report provides detailed information about test runs, including:

* Test status (passed/failed)
* Test duration
* Screenshots of failures
* Detailed error messages
* Test traces for debugging

## Capturing Screenshots and Videos

Screenshots are taken automatically on test failures. You can configure this in playwright.config.ts:

```
use: {
  screenshot: 'on',
  video: 'only-on-failure',
},
```

You can also manually take a screenshot in a test:

```await page.screenshot({ path: 'screenshot.png' });```

## Debugging Tests

Run Playwright in debug mode:

```npx playwright test --debug```

Use the pause() function inside a test to inspect the state before proceeding:

```await page.pause();```

Use explicit waits in case you need to see fast actions that happen on screen:

```await page.waitForTimeOut(500);```

Use ```console.log()``` to check if your variables contain the right values.

If not found errors:
* Check if selectors in page objects need updating
* Consider using more robust selectors or adding wait conditions

## Contributing

For contributions:

1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

Feel free to submit issues and pull requests for improvements or bug fixes!

## License

This project is licensed under the MIT License.
