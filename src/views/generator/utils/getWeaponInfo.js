export default (context) => {
  for (let i = 0; i < context.profiles.length; i++) {
    if (context.profiles[i]) {
      let weapons = context.payloads.payloads[context.profiles[i]]
      for (let c = 0; c < weapons.length; c++) {
        if (weapons[c]) {
          context.$edQuery({
            request: {
              method: 'getWeaponInfo',
              parameters: [weapons[c]]
            },
            success: (result) => {
              context.$set(context.weaponInfo, weapons[c], result)
              context.$store.commit('SET_WEAPON_INFO', context.weaponInfo)
            }
          })
        }
      }
    }
  }
}
