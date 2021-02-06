import { BASE_FONT_SIZE } from "../constants";

export const calcRem = (pixels = 16) => `${pixels / BASE_FONT_SIZE}rem`;
