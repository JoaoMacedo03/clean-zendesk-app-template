import { defineConfig } from "cypress";
import { webPackCypress } from './cy-ts-preprocessor'

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('file:preprocessor', webPackCypress)
    },
    experimentalRunAllSpecs: true,
    baseUrl: 'http://localhost:8080',
    fixturesFolder: false,
    supportFile: 'src/main/test/cypress/support/e2e.{js,jsx,ts,tsx}',
    specPattern: 'src/main/test/cypress/e2e/**/*.spec.{ts,tsx}'
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    }
  },
});
