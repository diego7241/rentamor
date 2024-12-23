const bcrypt = require("bcryptjs");

const generateHash = async () => {
    const hashedPassword = await bcrypt.hash("Magdalena2018", 10);
    console.log("Hashed Password:", hashedPassword);
};

generateHash();
