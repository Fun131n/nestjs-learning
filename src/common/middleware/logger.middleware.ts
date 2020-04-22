export function logger(req, res, next) {
    console.log("Log: logger -> req", req.user);
    next();
};