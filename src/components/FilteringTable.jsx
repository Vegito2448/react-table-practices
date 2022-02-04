import React,{useMemo} from 'react';
import {useTable,useGlobalFilter,useFilters} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import {COLUMNS/* , GROUPED_COLUMNS its work that grouped of columns trought columns */} from './columns';
import './Table.css';
import GlobalFilter from './GlobalFilter.js';
import {ColumnFilter} from './ColumnFilter.js'

export const FilteringTable = ()=>{

  const columns = useMemo(() => COLUMNS, []);
  
  const data = useMemo(() => MOCK_DATA, []);

  const defaultColumn = useMemo(() => {
    return {Filter:ColumnFilter}
  },[]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({
    columns,
    data,
    defaultColumn
  },
  useFilters,
  useGlobalFilter);//This is a example of destructuring

  const {globalFilter} = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup=>{

          return (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {
              headerGroup.headers.map( column=>{
                
               return (<th {...column.getHeaderProps()}> {column.render('Header')}
                  <div>{column.canFilter?column.render('Filter'):null}</div>
                </th>);
              
              })
            }
          </tr>
          );
  
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            rows.map(row=>{
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
              return(
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map(column=>{
                  return(
                  <td {...column.getFooterProps}>
                    {column.render('Footer')}
                  </td>
                  )
                })}
              </tr>
              )
            })
          }
        </tfoot>
      </table>
    </>
  )
}