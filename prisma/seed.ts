import "dotenv/config";
import { seedUsers } from "./seeders/seedUsers";

export async function main() {
  await seedUsers()
}

main();