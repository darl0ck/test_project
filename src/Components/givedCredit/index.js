import React, { Component } from 'react'

import { Grid,Col,Row } from 'react-bootstrap';

import { observer, inject } from "mobx-react";

import Paper from '@material-ui/core/Paper';


import ReactTable from "react-table";
import 'react-table/react-table.css'

import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button';

import './styles.css';

import creditPageStore from "../../tools/stores/creditPageStore";

let id = 0;
function createData(name, price, dynamic) {
  id += 1;
  return { id, name, price, dynamic};
}



const givedCredit = observer(
    class givedCredit extends Component {
        constructor(props){
            super(props);
            this.state={
                props,
                button: 'buttonAll',
            };

        }
       
        static getDerivedStateFromProps(nextProps) {
            return {
                creditStore: nextProps.creditStore,
            };
        }



    handleChange = name => event => {
        console.info(name);
      this.setState({
        button: name,
      });
    };

  render() {
      const data = [...this.props.creditStore];
    const columns = [{
      Header: 'Name',
      accessor: 'coin' // String-based value accessors!
    }, {
      Header: 'Type',
      accessor: 'type',
      filterMethod: (f,row) => {
        if (this.state.button === "buttonAll") {
          return true;
        }
        if (this.state.button === "buttonActive") {
          return row.type;
        }
        if (this.state.button === "buttonCompleted") {
            return row.type === false;
        }
      },
      Filter: ({ filter, onChange }) =>
        <select
          onChange={()=> onChange()}
          style={{ width: "100%" }}
          value={this.state.button}
        >
          <option value="buttonAll">Show All</option>
          <option value="buttonActive">Active</option>
          <option value="buttonCompleted">Completed</option>
        </select>
    ,
      Cell: row => (
        <span>
        <span style={{
          color: row.value
            ? '#ff2e00'
            : '#57d500',
          transition: 'all .3s ease'
        }}>
          {
          row.value ? 'Active' : 'Completed'
        }
        </span> 
      </span>
      )
    }, {
      Header: 'Amount',
      accessor: 'amount' // Custom value accessors!
    }, {
      Header: 'Coin', // Custom header components!
      accessor: 'coin'
    }]
    return (
        <Paper style={
            {
                height: '98.5%',
                }
                }>
        <div className="d-md-flex">
        <Typography style={{marginLeft: "1em"}} align={'left'} variant={'title'}>
        Выданные кредиты
</Typography>
<div className="ml-md-auto d-md-flex">
           <Button
                      color={this.state.button === 'buttonAll' ? 'primary' : ''}
                      onClick={
                          this.handleChange('buttonAll')
                      //  cryptocurStore.changePair('ETHUSD');
                     }
                     >
             All
             </Button>
           <Button
           color={this.state.button === 'buttonActive' ? 'primary' : ''}
            onClick={
                this.handleChange('buttonActive')
            //  cryptocurStore.changePair('ETHUSD');
           }>
             Active
             </Button>
           <Button
                      color={this.state.button === 'buttonCompleted' ? 'primary' : ''}
                      onClick={
                          this.handleChange('buttonCompleted')
                      //  cryptocurStore.changePair('ETHUSD');
                     }
           >
             Completed
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
            data={data}
            columns={columns}
            style={{
              marginTop: "1em"
            }}
            showPagination = {false}
            showPaginationBottom={false}
            minRows = {data.length}
            showPageSizeOptions={false}
            filterable
  
            className="-striped -highlight"
  />
                       </Paper>

    )
  }
}
)
export default givedCredit;