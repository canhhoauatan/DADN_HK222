import mongoose from 'mongoose'
const Schema = mongoose.Schema

const RecordSchema = new Schema({
    data: { type: String, maxLength: 255 },
    sensor_id: { type: Schema.Types.ObjectId, ref: 'Sensor' },
    created_at: { type: Date, default: Date.now }
})

const Record = mongoose.model('Record', RecordSchema);
export default Record