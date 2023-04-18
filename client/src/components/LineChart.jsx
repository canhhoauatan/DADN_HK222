import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, CategoryScale, LineController, LineElement, PointElement, LinearScale } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, CategoryScale, LineController, LineElement, LinearScale, PointElement);

class LineChart extends React.Component {

    render() {
        return (
            <Line height={this.props.height} data={this.props.data} />
        )
    }

}

export default LineChart