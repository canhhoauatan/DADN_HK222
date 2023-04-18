import React, { useEffect, useState } from 'react';
import * as tmImage from '@teachablemachine/image';
import SensorCard from './SensorCard';

const WebcamCapture = () => {
    const [status, setStatus] = useState('Đang tải...')

    useEffect(() => {
        let webcam, model;

        const loadModel = async () => {
            const modelURL = 'https://teachablemachine.withgoogle.com/models/GqAHJAzx7/model.json';
            const metadataURL = 'https://teachablemachine.withgoogle.com/models/GqAHJAzx7/metadata.json';

            model = await tmImage.load(modelURL, metadataURL);

            webcam = new tmImage.Webcam(265, 265, true);
            await webcam.setup();
            webcam.play();

            window.requestAnimationFrame(loop)
        };

        loadModel();

        const predict = async () => {
            if (model) {
                const prediction = await model.predict(webcam.canvas)
                setStatus(prediction[0].probability > 0.5 ? 'Tốt' : 'Xấu')
            }
        };

        const loop = async () => {
            webcam.update();
            await predict();
            window.requestAnimationFrame(loop);
        }
    }, []);

    return (
        <SensorCard image='./img/lettuce.png' value={status} title="Trạng thái cây" />
    );
};

export default WebcamCapture