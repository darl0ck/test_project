import React, { Component } from 'react'

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import cryptocurStore from '../../tools/stores/cryptocurStore';

import ReactTable from "react-table";
import 'react-table/react-table.css'

import './styles.css';

import TableNew from "../tableNew";

let id = 0;
function createData(name, price, dynamic) {
  id += 1;
  return { id, name, price, dynamic};
}



export default class LastDeals extends Component {
  render() {
    const rows = [
      createData('Frozen yoghurt', 159, 6.0),
      createData('Frozen ETH', 159, 6.0),
      createData('Frozen ETH', 159, 6.0),
      createData('Frozen ETH', 159, 6.0),
      createData('Frozen ETH', 159, 6.0),
      createData('Frozen ETH', 159, 6.0),
    ];
    const columns = [{
      Header: 'Coin',
      accessor: 'name' // String-based value accessors!
    }, {
      Header: 'Price',
      accessor: 'price',
    }, {
      id: 'Amount', // Required because our accessor is not a string
      Header: 'Amount',
      accessor: 'dynamic' // Custom value accessors!
    }, {
      Header: 'Type', // Custom header components!
      accessor: 'type'
    }]

    return (
        <Paper className={'lastDealTable'}>
        <Typography style={{marginLeft: "1em"}} align={'left'} variant={'title'}>
          Последние сделки
          </Typography>
          <ReactTable
            data={cryptocurStore.myDeals}
            columns={columns}
            style={{
              // height: "400px", // This will force the table body to overflow and scroll, since there is not enough room
              marginTop: "1em"
            }}
            showPagination = {false}
            showPaginationBottom={false}
            showPageSizeOptions={false}
            minRows={cryptocurStore.myDealsLength}
            className="-striped -highlight"
  />      
                    
                        </Paper>


    )
  }
}
