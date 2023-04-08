import User from "../models/User.js"
import bcrypt from 'bcrypt'

const login = async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username: username })

    const result = await bcrypt.compare(password, user.password)

    if (result)
        res.status(200).json({ token: "test123", user_id: user.id })
    else
        res.status(500).json({ messsage: "Incorrect password" })
}

export {
    login
}