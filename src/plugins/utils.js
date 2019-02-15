const Utils = {
  install (Vue, options) {
    Vue.directive('visible', (el, binding) => {
      var value = binding.value
      if (value) {
        el.style.visibility = 'visible'
      } else {
        el.style.visibility = 'hidden'
      }
    })
    Vue.prototype.$utils = {
      monthList: {
        en: ['JAN', 'FEB', 'MAR',
          'APR', 'MAY', 'JUN',
          'JUL', 'AUG', 'SEP',
          'OCT', 'NOV', 'DEC'],
        ru: ['ЯНВ', 'ФЕВ', 'МАР',
          'АПР', 'МАЙ', 'ИЮН',
          'ИЮЛ', 'АВГ', 'СЕН',
          'ОКТ', 'НОЯ', 'ДЕК'
        ]
      },

      hasClass (el, clName) {
        const className = el.className
        if (className.length > 0) return className.indexOf(clName) > 0
        return false
      },

      addClass (el, clName) {
        let elArr = []
        if (!el.length) {
          elArr.push(el)
        } else {
          elArr = el
        }
        for (let i = 0; i < elArr.length; i++) {
          const className = elArr[i].className
          // if (el.tagName === 'svg') return
          elArr[i].className = className.length > 0
            ? className.concat(` ${clName}`)
            : clName
        }
      },

      removeClass (el, clName) {
        let elArr = []
        if (!el.length) {
          elArr.push(el)
        } else {
          elArr = el
        }
        for (let i = 0; i < elArr.length; i++) {
          if (!elArr[i].className) return
          const classArr = elArr[i].className.split(' ')
          elArr[i].className = classArr.filter((cl) => cl !== clName).join(' ')
        }
      }
    }
  }
}

export default Utils
