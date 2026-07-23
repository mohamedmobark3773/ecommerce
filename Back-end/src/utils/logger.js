class Logger {

    getTimestamp() {
        return new Date().toISOString();
    }

    log(level, ...args) {
        const timestamp = this.getTimestamp();
        console.log(`[${timestamp}] [${level}]`, ...args);
    }

    success(...args) {
        this.log("SUCCESS", ...args);
    }

    error(...args) {
        const timestamp = this.getTimestamp();
        console.error(`[${timestamp}] [ERROR]`, ...args);
    }

    warn(...args) {
        this.log("WARNING", ...args);
    }

    info(...args) {
        this.log("INFO", ...args);
    }

    debug(...args) {
        if (process.env.NODE_ENV === "development") {
            this.log("DEBUG", ...args);
        }
    }

    trace(...args) {
        if (process.env.NODE_ENV === "development") {
            this.log("TRACE", ...args);
        }
    }

    http(method, url, meta = {}) {
        this.log(
            "HTTP",
            `[${method.toUpperCase()}]`,
            url,
            meta
        );
    }

    db(operation, model, meta = {}) {
        this.log(
            "DATABASE",
            `[${operation.toUpperCase()}]`,
            model,
            meta
        );
    }

    cache(operation, key) {
        this.log(
            "CACHE",
            `[${operation.toUpperCase()}]`,
            key
        );
    }

    security(event, meta = {}) {
        this.log(
            "SECURITY",
            event,
            meta
        );
    }

    auth(action, userId = null, meta = {}) {
        this.log(
            "AUTH",
            action,
            {
                userId,
                ...meta,
            }
        );
    }

    queue(action, queueName, meta = {}) {
        this.log(
            "QUEUE",
            action,
            queueName,
            meta
        );
    }

    mail(action, email, meta = {}) {
        this.log(
            "MAIL",
            action,
            email,
            meta
        );
    }

    payment(action, transactionId, meta = {}) {
        this.log(
            "PAYMENT",
            action,
            transactionId,
            meta
        );
    }

    file(action, fileName, meta = {}) {
        this.log(
            "FILE",
            action,
            fileName,
            meta
        );
    }

    redis(action, meta = {}) {
        this.log(
            "REDIS",
            action,
            meta
        );
    }

    server(action, meta = {}) {
        this.log(
            "SERVER",
            action,
            meta
        );
    }

    custom(category, ...args) {
        this.log(category.toUpperCase(), ...args);
    }

}

const logger = new Logger();

export default logger;