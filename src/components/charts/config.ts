import { Chart, registerables } from "chart.js"
import datalabels from "chartjs-plugin-datalabels"
import "chartjs-adapter-date-fns"

Chart.register(...registerables, datalabels)
