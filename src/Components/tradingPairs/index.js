import React, { Component } from 'react'

import { Grid,Col,Row } from 'react-bootstrap';

import { observer, inject } from "mobx-react";

import Paper from '@material-ui/core/Paper';


import ReactTable from "react-table";
import 'react-table/react-table.css'

import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button';

import './styles.css';

import cryptocurStore from "../../tools/stores/cryptocurStore";

let id = 0;
function createData(name, price, dynamic) {
  id += 1;
  return { id, name, price, dynamic};
}

export default class TradingPairs extends Component {
  state = {
    buttonActive: false,
};
constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
};
handleChange = name => event => {
    console.info(event.target.value);
  this.setState({
    button: name,
  });
};

componentWillMount() {
  setInterval(() => {
    cryptocurStore.generateRandomInfo(1,15);
    this.forceUpdate();
  }, 1000);
}

  render() {

    
    const data = [...cryptocurStore.marketValue]
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
      Header: 'Change', // Custom header components!
      accessor: 'dynamic'
    }]
    return (
        <Paper className={'tablePaper'}>
        <div>
        <Typography style={{marginLeft: "1em"}} align={'left'} variant={'title'}>
        Market
           <Button onClick={() => {
             cryptocurStore.changeCoin('BTC');
           }}
           color={cryptocurStore.coin === 'BTC' ? 'primary' : ''}>
             BTC
             </Button>
           <Button onClick={() => {
             cryptocurStore.changePair('USD');
             cryptocurStore.changeCoin('ETH');
           }}
           color={cryptocurStore.coin === 'ETH' ? 'primary' : ''}>
             ETH
             </Button>
           <Button onClick={() => {
             cryptocurStore.changePair('USD');
             cryptocurStore.changeCoin('LTC');
           }}
           color={cryptocurStore.coin === 'LTC' ? 'primary' : ''}
           >
             LTC
             </Button>
        </Typography>
           </div>

           <div id="custom-search-input">
                            <div class="input-group col-md-12">
                                <input type="text" class="  search-query form-control" placeholder="Search" />
                                <span class="input-group-btn">
                                    <button class="btn btn-danger" type="button">
                                        <span class=" glyphicon glyphicon-search"></span>
                                    </button>
                                </span>
                            </div>
                        </div>
         <ReactTable
            data={data}
            columns={columns}
            style={{
              width: '100%',
              marginTop: "1em"
            }}
            showPagination = {false}
            showPaginationBottom={false}
            showPageSizeOptions={false}
            className="-striped -highlight"
            minRows={cryptocurStore.myDealsLength}
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: (e, handleOriginal) => {
                  console.log("It was in this row:", rowInfo.row.name);
                  cryptocurStore.changePair(rowInfo.row.name);
                  
                  // IMPORTANT! React-Table uses onClick internally to trigger
                  // events like expanding SubComponents and pivots.
                  // By default a custom 'onClick' handler will override this functionality.
                  // If you want to fire the original onClick handler, call the
                  // 'handleOriginal' function.
                  if (handleOriginal) {
                    handleOriginal();
                  }
                }
              };
            }}
  />
                       </Paper>

    )
  }
}
  