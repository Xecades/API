module.exports = (req, res) => {
    const { name = "Xecades" } = req.query;
    res.send(`Hello ${name}!`);
};
