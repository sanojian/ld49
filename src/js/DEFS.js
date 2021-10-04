

// this file is for tweaking the game without changing any code

g_game.DEFS = {

  SCALE: 3,

  REACTIONS: {
    '11_12': 14,
    '11_13': 20,
    '11_15': 19,
    '12_13': 15,
    '12_17': 18,
    '13_14': 16,
    '14_20': 21,
    '15_16': 17,
    '17_12': 18,
    '19_18': 22
  },

  HEATCOLORS: [
    0x81d4fa,
		0x00bcd4,
		0x03a9f4,
		0x4e6cef,
		0x8e24aa,
		0xf48fb1,
		0xf06292,
		0xf36c60,
		0xe51c23
  ],

  ELEMENTS: {
    // air
    10: { color: 0xeeeeee,	heat: -1, name: 'airium' },
    // base
    11: { color: 0xffeb3b,	heat: -1, name: 'hydrum' },
    12: { color: 0x259b24,	heat: -1, name: 'oxxum' },
    13: { color: 0x90a4ae,	heat: -1, name: 'klorum' },
    // compounds
    14: { color: 0x03a9f4,	heat: 3, name: 'coolium' },
    15: { color: 0x4e6cef,	heat: 4, name: 'coldium' },
    16: { color: 0x8e24aa,	heat: 5, name: 'neutrium' },
    17: { color: 0xf48fb1,	heat: 6, name: 'warmium' },
    18: { color: 0xf06292,	heat: 7, name: 'hotium' },
    19: { color: 0xf36c60,	heat: 8, name: 'flamium' },
    20: { color: 0x00bcd4,	heat: 2, name: 'iceium' },
    21: { color: 0x81d4fa,	heat: 1, name: 'freezium' },
    22: { color: 0xe51c23,	heat: 9, name: 'exlosivium' }

  }
};
