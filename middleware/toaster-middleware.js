function toaster(req, res, next) {

    res.locals.toastMessage = req.cookies.toastMessage;
    res.clearCookie("toastMessage");

    res.setToastMessage = function (message) {
        res.cookie("toastMessage", message);
    }

    next();
}

module.exports = toaster;