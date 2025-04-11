import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";

const FONT_SIZES = {
    10: responsiveFontSize(1.25),
    12: responsiveFontSize(1.5),
    14: responsiveFontSize(1.75),
    14: responsiveWidth(3.73),
    16: responsiveWidth(4.27),
    20 : responsiveFontSize(2.34),
    21: responsiveWidth(5.6),
    24: responsiveWidth(6.4),
    32: responsiveWidth(8.53),
    40: responsiveWidth(10.67),
    45.93: responsiveWidth(12.26),
    50: responsiveWidth(13.33),
    52: responsiveWidth(13.87),
    56: responsiveWidth(14.93),
    73: responsiveWidth(19.47),
    16: responsiveFontSize(2),
    18: responsiveFontSize(2.25),
    20: responsiveFontSize(2.5),
    22: responsiveFontSize(2.75),
    24: responsiveFontSize(3),
  };
  
  const WIDTH_SIZES = {
    1.5: responsiveWidth(0.4),
    2: responsiveWidth(0.53),
    4: responsiveWidth(1.07),
    8: responsiveWidth(2.13),
    9: responsiveWidth(2.4),
    10: responsiveWidth(2.67),
    12: responsiveWidth(3.2),
    14: responsiveWidth(3.73),
    16: responsiveWidth(4.27),
    18 : responsiveWidth(4.8),
    19: responsiveWidth(5.07),
    20: responsiveWidth(5.33),
    24 : responsiveWidth(6.12),
    32 : responsiveWidth(8.50),
    36 : responsiveWidth(9.6),
    84 :responsiveWidth(21.54),
    136: responsiveWidth(36.27),
    150: responsiveWidth(40),
    154: responsiveWidth(41.07),
    208 : responsiveWidth(50.6),
    214: responsiveWidth(57.07),
    281: responsiveWidth(74.93),
    284: responsiveWidth(75.73),
    345: responsiveWidth(92),
  };
  
  const COLORS = {
    primaryGreen: '#4CAF50',       // Main action green
    darkGreen: '#388E3C',          // For hover or pressed states
    lightGreen: '#C8E6C9',         // For backgrounds or disabled buttons
    successGreen: '#66BB6A',       // For success messages or icons
    borderGreen: '#A5D6A7',        // For input borders or subtle outlines
  };

  export {FONT_SIZES, WIDTH_SIZES, COLORS};
  