const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CategorySchema = mongoose.Schema({
    name: { type: String, required: true  },
    color: { type: String, required: true },
    sharedFrom: [{ type: String }],
    sharedTo: [{ type: String }]
});

const ReminderSchema = mongoose.Schema({
    message: { type: String, required: true },
    date: { type: Date, required: true },
    reminder: { type: Date, required: true }
});

const ItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    categoryId: { type: String, default: 'main' },
    categoryName: { type: String, default: 'main' },
    notes: { type: String },
    importantDate: ReminderSchema
});

const UserSchema = mongoose.Schema({
    password: { type: String },
    email: { type: String, required: true },
    username: { type: String, required: true },
    inventory: [ItemSchema],
    categories: [CategorySchema],
    notificationsOn: { type: Boolean, default: true }
});

UserSchema.statics.hashPassword = function(password) {
    const salt = bcrypt.genSaltSync(require('./../../config').bcrypt);
    return bcrypt.hashSync(password, salt);
};

UserSchema.methods.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const schema = {
    user: UserSchema,
    item: ItemSchema,
    reminder: ReminderSchema,
    category: CategorySchema
};

module.exports = schema;