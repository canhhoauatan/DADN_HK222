import mongoose from 'mongoose'
const Schema = mongoose.Schema

const SensorSchema = new Schema({
    type: { type: String, maxLength: 25 },
    value: { type: String, maxLength: 255 },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    updated_at: { type: Date, default: Date.now }
})

const Sensor = mongoose.model('Sensor', SensorSchema);
export default Sensor