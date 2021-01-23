/**
 * 
 * преобразование формата для flatUI
 */
export const convertDictionary = (dictionary) =>
    dictionary.map(({ id, name }) => ({ key: id, text: name }));
