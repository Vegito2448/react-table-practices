import React,{useMemo} from 'react';
import {useTable,useRowSelect} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import {COLUMNS/* , GROUPED_COLUMNS its work that grouped of columns trought columns */} from './columns';
import './Table.css';
import { Checkbox } from './CheckBox';


export const RowSelection = ()=>{

  const columns = useMemo(() => COLUMNS, []);
  
  const data = useMemo(() => MOCK_DATA, []);
  
  const tableInstance = useTable({
    columns,
    data,
  }, useRowSelect,(hooks)=>{
    hooks.visibleColumns.push((columns)=>{
      return [
        {
          id:'selection',
          Header:({getToggleAllRowsSelectedProps})=>(
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell:({row})=>(
            <Checkbox {...row.getToggleAllRowsSelectedProps()} />
          )
        },
        ...columns
      ]
    })
  })
 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    selectedFlatRows
  } = tableInstance;//This is a example of destructuring

  const firstPageRows = rows.slice(0,10)

  return (
    <>
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup=>{
        return(<tr {...headerGroup.getHeaderGroupProps()}>
          {
            headerGroup.headers.map( column=>{
              
              return(<th {...column.getHeaderProps()}>{column.render('Header')}</th>)

            })
          }
        </tr>)

        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {
          firstPageRows.map(row=>{
            prepareRow(row)
            return(

              <tr {...row.getRowProps()}>
                {
                  row.cells.map(cell=>{
                    
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    
                  })
                }
              </tr>

            )
          })
        }
      </tbody>
      <tfoot>
        {
          footerGroups.map(footerGroup=>{
            return(<tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map(column=>{
                return(<td {...column.getFooterProps}>{
                  column.render('Footer')
                }</td>)
              })}
            </tr>)
          })
        }
      </tfoot>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows:selectedFlatRows.map(row=> row.original)
            },
            null,
            2
          )}
        </code>
      </pre>
    </table>
    </>
  )
}