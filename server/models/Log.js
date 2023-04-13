import mongoose from 'mongoose'
const Schema = mongoose.Schema

const LogSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    activity: { type: String, maxLength: 255 },
    created_at: { type: Date, default: Date.now }
})

const Log = mongoose.model('Log', LogSchema);
export default Log