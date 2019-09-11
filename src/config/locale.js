import Vue from 'vue'
const defaultLocale = 'en'
const languages = ['en', 'ru']

export const determineLocale = (vue) => {
  // -- deprecated, determining with browser's navigator
  // if (navigator.language) {
  //   const lang = navigator.language
  //   for (let lng in languages) {
  //     if (lang.indexOf(languages[lng]) >= 0) return languages[lng]
  //   }
  //   return defaultLocale
  // }
  vue.$edQuery({
    request: {
      method: 'getLocale'
    },
    success (locale) {
      Vue.prototype.$content = require(`./translations_${locale}.json`)
      vue.$mount('#app')
    }
  })
}
