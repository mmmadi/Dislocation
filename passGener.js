const bcrypt = require("bcryptjs");

async function getPass() {
  const hashedPassword = await bcrypt.hash("12345", 8);
  console.log(hashedPassword);

  const check = await bcrypt.compare("12345", hashedPassword)

  console.log(check)
}

getPass();