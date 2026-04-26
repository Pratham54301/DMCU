const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  siteName: { type: String, default: "DMCU Multiverse" },
  maintenanceMode: { type: Boolean, default: false },
  registrationOpen: { type: Boolean, default: true },
  cacheEnabled: { type: Boolean, default: true },
  googleAnalyticsId: { type: String, default: "" },
  primaryContact: { type: String, default: "" },
  maxUploadSize: { type: String, default: "50MB" }
}, { timestamps: true });

module.exports = mongoose.model("Setting", settingSchema);
