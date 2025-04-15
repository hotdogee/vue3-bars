import type { App, Plugin } from 'vue'
import VueBarsComponent from './components/VueBars.vue'

const install: Plugin = (app: App) => {
  app.component('VueBars', VueBarsComponent)
}

// Attach the install function directly to the component object.
// Use a type assertion with an intersection type to inform TypeScript
// that this object now also has an 'install' property.
const VueBars = VueBarsComponent as typeof VueBarsComponent & { install: Plugin }
VueBars.install = install

export default VueBars
