const authAdmin = (req, res, next) => {
    // Detta är en enkel kontroll, i ett riktigt scenario bör du kontrollera användarens roll på ett säkrare sätt.
    if (req.headers['x-admin-token'] === 'secret-admin-token') {
        next();
    } else {
        res.status(403).json({ error: "Forbidden. Admins only." });
    }
};

export default authAdmin;
