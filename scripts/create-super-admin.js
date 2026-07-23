const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

(async () => {
  console.log("======================================");
  console.log(" SWaGi InTech - Super Admin Generator ");
  console.log("======================================");

  const fullName = await ask("Full Name: ");
  const email = await ask("Email: ");
  const password = await ask("Password: ");

  const passwordHash = await bcrypt.hash(password, 12);

  console.log("\n--------------------------------------");
  console.log("Super Admin Details");
  console.log("--------------------------------------");
  console.log("Full Name :", fullName);
  console.log("Email     :", email);
  console.log("Password Hash:");
  console.log(passwordHash);
  console.log("--------------------------------------");

  rl.close();
})();