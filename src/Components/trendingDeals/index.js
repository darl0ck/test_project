import React, { Component } from 'react'

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import ReactTable from "react-table";
import 'react-table/react-table.css'

import './styles.css';

import cryptocurStore from '../../tools/stores/cryptocurStore';

let id = 0;
function createData(name, price, dynamic) {
  id += 1;
  return { id, name, price, dynamic};
}


export default class TrendingDeals extends Component {

  componentWillMount() {
    setInterval(() => {
      cryptocurStore.generateRandomInfo(0,1);
      this.forceUpdate();
    }, 1000);
  }

  render() {

    const rows = [
      createData('Frozen yoghurt', setInterval(function() {
        return Math.random();
      }, 2000), 6.0),
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
    }]
    return (
        <Paper className={'myDealsTable'}>
        <Typography style={{marginLeft: "1em"}} align={'left'} variant={'title'}>
        Набирающие популярность
        </Typography>
        <ReactTable
            data={cryptocurStore.marketValue}
            columns={columns}
            style={{
              width: '100%',
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
