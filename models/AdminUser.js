const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminUserSchema = new Schema({
  adminUserName: {
    type: String,
    required: true,
  },
  adminUserPassword: {
    type: String,
    required: true,
  }
});

const AdminUser = mongoose.model('adminUser', AdminUserSchema);

module.exports = AdminUser;