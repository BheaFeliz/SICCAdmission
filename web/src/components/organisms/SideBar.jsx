import { Sidebar as FlowbiteSidebar } from 'flowbite-react'
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from 'react-icons/hi'

const Sidebar = () => {
  return (
    <aside className='pt-2 w-64 bg-gray-50 dark:bg-gray-800'>
      <FlowbiteSidebar>
        <FlowbiteSidebar.Items>
          <FlowbiteSidebar.ItemGroup>
            <FlowbiteSidebar.Item href="/dashboard" icon={HiChartPie}>
              Dashboard
            </FlowbiteSidebar.Item>
            <FlowbiteSidebar.Item href="/schedule" icon={HiInbox}>
              Scheduling
            </FlowbiteSidebar.Item>
            <FlowbiteSidebar.Collapse icon={HiUser} label="Students">
              <FlowbiteSidebar.Item href="/students">All Students</FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item href="#">Sales</FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item href="#">Refunds</FlowbiteSidebar.Item>
            </FlowbiteSidebar.Collapse>
            <FlowbiteSidebar.Item href="/users" icon={HiShoppingBag}>
              Create Users
            </FlowbiteSidebar.Item>
            <FlowbiteSidebar.Item href="/courses" icon={HiArrowSmRight}>
              Course Management
            </FlowbiteSidebar.Item>
            <FlowbiteSidebar.Item href="/activitylogs" icon={HiTable}>
              Activity Management
            </FlowbiteSidebar.Item>
          </FlowbiteSidebar.ItemGroup>
        </FlowbiteSidebar.Items>
      </FlowbiteSidebar>
    </aside>
  )
}

export default Sidebar
