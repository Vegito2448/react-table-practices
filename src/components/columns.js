import {formatISO} from 'date-fns';
// import { ColumnFilter } from './ColumnFilter';
export const COLUMNS = [
  {
    Header:'Id',
    Footer:'Id',
    accessor:'íd',
    disableFilters:true
  },
  {
    Header:'First Name',
    Footer:'First Name',
    accessor:'first_name',
    
  },
  {
    Header:'Last Name',
    Footer:'Last Name',
    accessor:'last_name',
    
  },
  {
    Header:'Date of Birth'  ,
    Footer:'Date of Birth'  ,
    accessor:'date_of_birth',
    Cell: ({ value }) => formatISO(new Date(value), { representation: 'date' }),
    
  },
  {
    Header:'Country'  ,
    Footer:'Country'  ,
    accessor:'country',
    
  },
  {
    Header:'Phone'  ,
    Footer:'Phone'  ,
    accessor:'phone',
    
  },
]
export const GROUPED_COLUMNS =  [
  {
    Header:'Id',
    Footer:'Id',
    accessor:'íd'   
  },
  {
    Header:'Name',
    Footer:'Name',
    columns:[
      {
        Header:'First Name',
        Footer:'First Name',
        accessor:'first_name'
      },
      {
        Header:'Last Name',
        Footer:'Last Name',
        accessor:'last_name'
      },     
    ]
    
  },
  {
    Header:'Info',
    Footer:'Info',
    columns:[
      {
        Header:'Date of Birth'  ,
        Footer:'Date of Birth'  ,
        accessor:'date_of_birth'
      },
      {
        Header:'Country'  ,
        Footer:'Country'  ,
        accessor:'country'
      },
      {
        Header:'Phone'  ,
        Footer:'Phone'  ,
        accessor:'phone'
      }   
    ]   
  }
]