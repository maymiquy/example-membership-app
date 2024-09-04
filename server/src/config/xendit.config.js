const { Xendit } = require('xendit-node');
const xendit = new Xendit({
    secretKey: process.env.XENDIT_SECRET_KEY,
});

module.exports = xendit;