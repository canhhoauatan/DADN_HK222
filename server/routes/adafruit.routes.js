import express from 'express'
import { publish } from '../controllers/adafruit.controller.js'

const router = express.Router()

router.route('/publish/:type/:value').post(publish)

export default router