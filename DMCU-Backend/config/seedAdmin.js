const Admin = require("../models/Admin");

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || "DMCU Admin";

  if (!adminEmail || !adminPassword) {
    console.warn("Admin credentials are missing in the environment. Default admin was not created.");
    return;
  }

  const existingAdmin = await Admin.findOne({ email: adminEmail.toLowerCase() });

  if (existingAdmin) {
    return;
  }

  await Admin.create({
    name: adminName,
    email: adminEmail.toLowerCase(),
    password: adminPassword
  });

  console.log(`Default admin created for ${adminEmail}`);
};

module.exports = seedAdmin;
