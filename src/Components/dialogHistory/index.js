import React, { Component } from 'react'

import { Grid,Col,Row } from 'react-bootstrap';

import { observer, inject } from "mobx-react";

import Paper from '@material-ui/core/Paper';


import ReactTable from "react-table";
import 'react-table/react-table.css'

import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button';

import './styles.css';

import faqPageStore from "../../tools/stores/faqPageStore";

let id = 0;
function createData(date, question, status) {
  id += 1;
  return { id, date, question, status};
}


export default class dialogHistory extends Component {
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
      createData('21.12.18', 'Как установить приложение туда-то ', 'Решено'),
      createData('15.02.18', 'Как установить приложение туда-то ', 'В процессе'),
      createData('02.11.18', 'Как установить приложение туда-то ', 'Ожидание'),

    ];
    const columns = [{
      Header: 'ID',
      accessor: 'id2' // String-based value accessors!
    }, {
      Header: 'Дата',
      accessor: 'date',
    }, {
      Header: 'Вопрос',
      accessor: 'question' // Custom value accessors!
    }, {
      Header: 'Статус', // Custom header components!
      accessor: 'status',
      Cell: row => (
        <span>
          <span style={{
            color: row.value === 'Решено' ? '#ff2e00'
              : row.value === 'Ожидание' ? '#ffbf00'
              : '#57d500',
            transition: 'all .3s ease'
          }}>
            &#x25cf;
          </span> {
            row.value
          }
        </span>
      )
    }]
    return (
        <Paper style={{marginBottom:'2%',marginTop: '2%'}}>
        <div className="d-md-flex">
        <Typography style={{marginLeft: "1em"}} align={'left'} variant={'title'}>
        История диалогов
</Typography>

</div>

       
         <ReactTable
            data={faqPageStore.questions}
            columns={columns}
            style={{
              // height: "400px", // This will force the table body to overflow and scroll, since there is not enough room
              marginTop: "2%"
            }}
            showPagination = {false}
            showPaginationBottom={false}
            showPageSizeOptions={false}
            minRows={faqPageStore.questions.length}
            className="-striped -highlight"
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: (e, handleOriginal) => {
                  console.log("It was in this row:", rowInfo.row.id2);
                  faqPageStore.handleDialogChange(rowInfo.row.id2)                  
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
  