import React,{useMemo} from 'react';
import {useTable,usePagination} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import {COLUMNS/* , GROUPED_COLUMNS its work that grouped of columns trought columns */} from './columns';
import './Table.css';


export const PaginationTable = ()=>{

  const columns = useMemo(() => COLUMNS, []);
  
  const data = useMemo(() => MOCK_DATA, []);
  
  const tableInstance = useTable({
    columns,
    data,
    initialState:{pageIndex:2}
  },usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    previousPage,
    prepareRow} = tableInstance;//This is a example of destructuring

    const {pageIndex, pageSize} = state;

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
          page.map(row=>{
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
    </table>
    <div>
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1}of{pageOptions.length}
        </strong>{' '}
      </span>
      <span>
        | Go to Page: {''}
        <input type="number" defaultValue={pageIndex+1} onChange={e=>{
          const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
          gotoPage(pageNumber)
        }} style={{width:'50px'}} />
      </span>
      <select value={pageSize} oncChange={e=> setPageSize(Number(e.target.value))}>
        {
          [10,25,50].map(pageSize=>(
            <option key={pageSize} value={pageSize}>Show {pageSize}</option>
          ))
        }
      </select>
      <button onClick={()=> gotoPage(0)} disable={!canPreviousPage}>{'<<'}</button>
      <button onClick={()=>previousPage()} disable={!canPreviousPage}>Previous</button>
      <button onClick={()=>nextPage()} disable={!canNextPage}>Next</button>
      <button onClick={()=> gotoPage(pageCount - 1)} disable={!canNextPage}>{'>>'}</button>
    </div>
    </>
  )
}