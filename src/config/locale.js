const defaultLocale = 'en'
const languages = ['en', 'ru']

export const determineLocale = () => {
  if (navigator.language) {
    const lang = navigator.language
    for (let lng in languages) {
      if (lang.indexOf(languages[lng]) >= 0) return languages[lng]
    }
    return defaultLocale
  }
}
