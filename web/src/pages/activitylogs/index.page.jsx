import React from 'react'

import { useActivityLog } from '@/hooks/redux/useActivityLog'
import Template from '@/components/templates/Template'

const ActivityLogComponent = () => {
  const { logs, isError, isLoading } = useActivityLog()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading activity logs.</div>
  }

  return (
    <Template>
      <div>
        <h1>Activity Logs</h1>
        <ul>
          {logs.map((log) => (
            <li key={log.id}>
              <p>Action: {log.action}</p>
              <p>Schedule ID: {log.schedule_id}</p>
              <p>Data: {log.data}</p>
              <p>Timestamp: {log.created_at}</p>
            </li>
          ))}
        </ul>
      </div>
    </Template>
  )
}

export default ActivityLogComponent
