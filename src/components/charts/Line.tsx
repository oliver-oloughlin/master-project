import { Chart, registerables } from "chart.js"
import { Line } from "react-chartjs-2"
import "chartjs-adapter-date-fns"

Chart.register(...registerables)

export default Line
