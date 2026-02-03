import bcrypt from "bcrypt";

const run = async () => {
  const hash = await bcrypt.hash("student123", 10);
  console.log(hash);
};

run();
