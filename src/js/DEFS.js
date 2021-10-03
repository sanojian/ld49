

// this file is for tweaking the game without changing any code

g_game.DEFS = {

  SCALE: 3,

  REACTIONS: {
    //'11_12': 16,
    //'14_16': 19,

    '11_12': 14,
    '11_13': 20,
    '12_13': 15,
    '13_14': 16,
    '12_17': 18,
    '13_15': 19,
    '14_20': 21,
    '15_16': 17,
    '18_19': 22

  },

  ELEMENTS: {
    // base
    11: { color: 0xffeb3b,	heat: -1, name: 'hydorium' },
    12: { color: 0x259b24,	heat: -1, name: 'oxxum' },
    13: { color: 0x90a4ae,	heat: -1, name: 'chlorium' },
    // compounds
    14: { color: 0x03a9f4,	heat: 3, name: 'coldium' },
    15: { color: 0x4e6cef,	heat: 4, name: 'coolium' },
    16: { color: 0x8e24aa,	heat: 5, name: 'neutrium' },
    17: { color: 0xf48fb1,	heat: 6, name: 'warmium' },
    18: { color: 0xf06292,	heat: 7, name: 'hotium' },
    19: { color: 0xf36c60,	heat: 8, name: 'flamium' },
    20: { color: 0x00bcd4,	heat: 2, name: 'icium' },
    21: { color: 0x81d4fa,	heat: 1, name: 'freezium' },
    22: { color: 0xe51c23,	heat: 9, name: 'exlosivium' }

  }
};
