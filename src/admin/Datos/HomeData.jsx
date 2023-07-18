import { DAutos } from "./DAutos"
import { DInfo } from "./DInfo"
import { DUsuarios } from "./DUsuarios"
import { Dhistory } from "./Dhistory"
import '../styles/Data.css'
import { OverviewTraffic } from "./overview-traffic"

export const HomeData = () => {
    const chartSeries = [12, 8, 3, 1];
    const labels = ['Paypal', 'Fisico', 'Transferencia', 'Otros'];

    return (
        <div className="data-home">

            <div className="data-info">
                <center>

                </center>
                <DInfo />
            </div>
            <div className="data1">
                <div className="data-analisis"> 
                    <Dhistory />
                </div>
                <div>
                    <OverviewTraffic chartSeries={chartSeries} labels={labels} sx={{ color: 'black' }}/>
                </div>
            </div>
            <div className="data-usuarios">
                <DUsuarios />
                <DAutos />
            </div>
        </div>
    )
}
