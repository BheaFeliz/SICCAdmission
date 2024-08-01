import { Table } from 'flowbite-react'
import React from 'react'

import AdminGuard from '@/components/templates/AdminGuard'
import Template from '@/components/templates/Template'
import { useActivityLog } from '@/hooks/redux/useActivityLog'

const ActivityLogComponent = () => {
  const { logs, isError, isLoading } = useActivityLog()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading activity logs.</div>
  }

  return (
    <AdminGuard>
      <Template>
        <div className='p-4'>
          <h1 className='text-2xl font-semibold mb-4'>Activity Logs</h1>
          <Table>
            <Table.Head>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
              {/* <Table.HeadCell>Data</Table.HeadCell> */}
              <Table.HeadCell>Timestamp</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {logs.map((log) => (
                <Table.Row key={log.id}>
                  <Table.Cell>{log.username || 'N/A'}</Table.Cell>
                  <Table.Cell>{log.action || 'N/A'}</Table.Cell>
                  {/* <Table.Cell>{JSON.stringify(log.data) || 'N/A'}</Table.Cell> */}
                  <Table.Cell>
                    {new Date(log.created_at).toLocaleString() || 'N/A'}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Template>
    </AdminGuard>
  )
}

export default ActivityLogComponent
