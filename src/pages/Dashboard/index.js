import React, { lazy } from 'react'
const WidgetsDropdown = lazy(() => import('../../views/widgets/WidgetsDropdown'))
// const Chart = lazy(() => import('../../views/widgets/chart'))
const Tables = lazy(() => import('../../views/base/tables/Tables'))
// import Tables from '../../views/base/tables/Tables'

const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown />
       {/* <Chart />  */}
      <Tables/> 
    </>
  )
}
export default Dashboard
