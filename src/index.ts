import type { App } from 'vue' // Import App and Plugin types from Vue 3
import VueBars from './components/VueBars.vue' // Import the .vue component

// Define the install function conforming to the Plugin interface
const install = (app: App) => {
  // Register the component globally
  // In Vue 3, component names are typically PascalCase for registration
  app.component('VueBars', VueBars)
}

// Export the plugin object
export default {
  install,
  VueBars // Export the component as default
}

// Allow named export of the component itself
export { VueBars }
