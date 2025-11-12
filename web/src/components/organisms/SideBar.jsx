import {
  Sidebar as FlowbiteSidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from 'flowbite-react'
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from 'react-icons/hi'

const Sidebar = () => {
  return (
    <aside className='pt-2 w-64 bg-gray-50 dark:bg-gray-800'>
      <FlowbiteSidebar>
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem href='/dashboard' icon={HiChartPie}>
              Dashboard
            </SidebarItem>
            <SidebarItem href='/schedule' icon={HiInbox}>
              Scheduling
            </SidebarItem>
            <SidebarCollapse icon={HiUser} label='Students'>
              <SidebarItem href='/students'>All Students</SidebarItem>
              <SidebarItem href='/students/ongoing'>
                On-Going Admissions
              </SidebarItem>
              <SidebarItem href='/students/deleted'>
                Settled Admissions
              </SidebarItem>
            </SidebarCollapse>
            <SidebarItem href='/users' icon={HiShoppingBag}>
              Create Users
            </SidebarItem>
            <SidebarItem href='/courses' icon={HiArrowSmRight}>
              Course Management
            </SidebarItem>
            <SidebarItem href='/activitylogs' icon={HiTable}>
              Activity Management
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </FlowbiteSidebar>
    </aside>
  )
}

export default Sidebar
