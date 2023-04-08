import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, maxLength: 25 },
    password: { type: String, maxLength: 255 },
    key: { type: String, maxLength: 255 }
});

const User = mongoose.model('User', UserSchema);
export default User;