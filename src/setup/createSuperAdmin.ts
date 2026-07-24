import { hashPassword } from "../auth/password";

async function main() {
  const password = "admin123";

  const hash = await hashPassword(password);

  console.log("");
  console.log("======================================");
  console.log("SWaGi InTech Super Admin Password Hash");
  console.log("======================================");
  console.log("");
  console.log("Password:");
  console.log(password);
  console.log("");
  console.log("Hash:");
  console.log(hash);
  console.log("");
}

main().catch(console.error);