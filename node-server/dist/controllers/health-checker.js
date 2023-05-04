export async function healthChecker(_, res, next) {
    const healthcheck = {
        uptime: process.uptime(),
        responseTime: process.hrtime(),
        message: "OK",
        timestamp: Date.now(),
    };
    try {
        res.status(200).json({ success: true, payload: { healthcheck } });
    }
    catch (error) {
        next(error);
        // healthcheck.message = error;
        // res.status(503).send();
    }
}
//# sourceMappingURL=health-checker.js.map