import React, { lazy } from 'react'
const WidgetsDropdown = lazy(() => import('../../views/widgets/WidgetsDropdown'))
const Chart = lazy(() => import('../../views/widgets/chart'))
const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown />
      <Chart />
    </>
  )
}
export default Dashboard
