import MQTTAdafruitIO from "../adafruit.js"
import { MQTTClients } from "../adafruit.js"

const publish = async (req, res) => {
    const { user_id } = req.body
    const { type, value } = req.params
    MQTTClients.forEach(client => {
        if (user_id === client.user_id) {
            client.publish(type, value)
        }
    });

    res.json(200)
}

export {
    publish
}