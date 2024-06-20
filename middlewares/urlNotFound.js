const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({ success: false, message: "URL not found" });
};

export default notFoundMiddleware;