import { BASE_FONT_SIZE, notificationPlayerAudioId } from "../constants";

export const calcRem = (pixels = 16) => `${pixels / BASE_FONT_SIZE}rem`;

export const getFileBinary = (file) =>
    new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => resolve(fileReader.result);
        fileReader.onerror = (event) => reject(fileReader.error);
        fileReader.readAsDataURL(file);
    });

export const adjustPixels = (pixels) => {
    const fs = +window
        .getComputedStyle(document.querySelector("html"))
        .getPropertyValue("font-size")
        .slice(0, -2);
    //высчитываем исходную пропорцию, calcRem return \drem - от 'rem' избавляемся
    const pixelsInRems = +calcRem(pixels).slice(0, -3);

    //текущий fs отличается от базового fs, используемого до просчета пропорций элементов в функции calcRem
    return pixelsInRems * fs;
};

export const playNotificationSound = () => {
    document.querySelector(`#${notificationPlayerAudioId}`).play();
};
