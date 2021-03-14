module.exports = (body) => {
    const newBody = {};
    Object.entries(body).forEach(([key, value]) => {
        if (value !== undefined) {
            newBody[key] = value;
        }
    });
    return newBody;
};
