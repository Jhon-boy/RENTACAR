import { OverviewTasksProgress } from "./overview-tasks-progress"
import { OverviewTotalClient } from "./overview-total-client"
import { OverviewTotalCustomers } from "./overview-total-customers"
import { OverviewTotalProfit } from "./overview-total-profit"

export const DInfo = () => {


  return (
    <div className="data-info">
        <div>
            <OverviewTotalCustomers sx={{ maxHeight: 170 }}/>
        </div>
        <div>
            <OverviewTotalClient sx={{ maxHeight: 170 }}/>
        </div>
        <div>
        <OverviewTasksProgress sx={{ maxHeight: 170 }}/>

        </div>
        <div>
            <OverviewTotalProfit sx={{ maxHeight: 170 }}/>
        </div>
    </div>
  )
}
