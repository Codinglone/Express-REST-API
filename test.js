const bcrypt = require('bcrypt');

const check = async() => {
    const names = "Fabrice";

const hashedName = await bcrypt.hash(names, 10);

console.log(hashedName);
}

check();