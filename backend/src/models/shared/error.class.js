module.exports = {
    Error: class {
        constructor(status = 500, message = 'Произошла ошибка на стороне сервера...') {
            this.status = status;
            this.message = message;
        }
    },
};
