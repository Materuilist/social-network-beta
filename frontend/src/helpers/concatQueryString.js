/**
 *
 * @param {Object} params - { paramName: paramValue, ... }
 */
export const concatQueryString = (params) => {
    const query = Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .map((param) => param.join("="))
        .join("&");

    return query ? `?${query}` : "";
};
