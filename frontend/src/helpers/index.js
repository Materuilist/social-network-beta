import { BASE_FONT_SIZE } from "../constants";

export const calcRem = (pixels = 16) => `${pixels / BASE_FONT_SIZE}rem`;

export const getFileBinary = (file) =>
    new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => resolve(fileReader.result);
        fileReader.onerror = (event) => reject(fileReader.error);
        fileReader.readAsDataURL(file);
    });
