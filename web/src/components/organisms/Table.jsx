import PropTypes from 'prop-types'
import React from 'react'

const Table = ({ rows = [], data = [] }) => {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-striped'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            {rows.length > 0 ?
              rows.map((row) => (
                <th key={row.key} scope='col' className='px-6 py-3'>
                  {row.header}
                </th>
              ))
            : <th>No Data</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ?
            data.map((item) => (
              <tr key={item.id} className={`border-b dark:border-gray-700`}>
                {rows.map((row) => (
                  <td key={row.key} className='px-6 py-4'>
                    {row.render(item)}
                  </td>
                ))}
              </tr>
            ))
          : <tr>
              <td colSpan={rows.length}>No data available</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      render: PropTypes.func.isRequired,
    }),
  ),
  data: PropTypes.arrayOf(PropTypes.object),
}

export default Table
