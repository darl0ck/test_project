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


export default class creditExamples extends Component {
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
      accessor: 'dynamic' // Custom value accessors!
    }, {
      Header: 'Term', // Custom header components!
      accessor: 'dynamic'
    }, {
      Header: 'Amount',
      accessor: 'price',
    },
  ]
    return (
        <Paper style={{marginBottom:'1em'}}>
        <div className="d-md-flex">
        <Typography style={{marginLeft: "1em"}} align={'left'} variant={'title'}>
        Примеры кредитов
</Typography>
<div className="ml-md-auto d-md-flex">
           <Button
            color={this.state.button === 'BTC' ? 'primary' : ''}
            onClick={
              this.handleChange('BTC')
             }
            onClick={() => {
            cryptocurStore.changePair('BTCUSD')
           }}
           >
             BTC
             </Button>
           <Button
            color={this.state.button === 'ETH' ? 'primary' : ''}

            onClick={() => {
             cryptocurStore.changePair('ETHUSD')
           }}
           onClick={
            this.handleChange('ETH')
           }
           >
             ETH
             </Button>
           <Button
            color={this.state.button === 'LTC' ? 'primary' : ''}
            onClick={() => {
                cryptocurStore.changePair('LTCUSD')
              }}
              onClick={
               this.handleChange('LTC')
              }
           >
             LTC
             </Button>
             </div>
        
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
            data={rows}
            columns={columns}
            style={{
              height: "400px", // This will force the table body to overflow and scroll, since there is not enough room
              marginTop: "1em"
            }}
            showPagination = {false}
            minRows = {rows.length}
            showPaginationBottom={false}
            showPageSizeOptions={false}
            className="-striped -highlight"
  />
                       </Paper>

    )
  }
}
  