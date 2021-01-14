import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import {Doughnut} from 'react-chartjs-2';

import TradingViewWidget, { Themes } from 'react-tradingview-widget';

import ReactTable from "react-table";
import 'react-table/react-table.css';

import balancePageStore from "../../tools/stores/balancePageStore";


import './styles.css';
import { modularScale } from 'polished';

let id = 0;
function createData(coin, name, totalBalance, availableBalance, btcValue, inOrder, action) {
  id += 1;
  return { id, coin, name, totalBalance, availableBalance, btcValue, inOrder, action};
}


function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getState = () => ({
  labels: [
    'ETH',
    'BTC',
    'LTC'
  ],
  datasets: [{
    data: [getRandomInt(50, 200), getRandomInt(100, 150), getRandomInt(150, 250)],
    backgroundColor: [
    '#CCC',
    '#36A2EB',
    '#FFCE56'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ]
  }]
});


export default class voitingPage extends Component {
    state ={
        projectInfo:[
        {
            name: 'BTC',
            people: ['asd','fwq','sdf'],
            text: 'asdasfa',
            category: 'Финансы',
            mark: false,
            totalBalance: 1,
            availableBalance: 1,
            btcValue: 1,
            inOrder: 1,
            action: 'asd',
        },
        {
            name: 'ETH',
            category: 'Финансы',
            totalBalance: 1,
            availableBalance: 1,
            btcValue: 1,
            inOrder: 1,
        },
        {
            name: 'TCH',
            people: ['asd','fwq','sdf'],
            text: 'asdasfa',
            category: 'Финансы',
            mark: false,
            totalBalance: 1,
            availableBalance: 1,
            btcValue: 1,
            inOrder: 1,
            action: 'asd',
        },
    ],
        choosedProject: '',
    }

    chooseProject(projectName){
        console.info(projectName)
        let project =  this.state.projectInfo.slice().filter((el)=>
        el.name === projectName
    )
        this.setState(
            {
                choosedProject: project,
            }
        )
        console.info(this.state.projectInfo)

    }

    handleVote(voteObj,mark){
        console.info(voteObj)
        voteObj.mark = mark;
        this.forceUpdate();
    }

    getInitialState() {
		return getState();
	}

	componentWillMount() {
		setInterval(() => {
			this.setState(getState());
		}, 2000);
	}

  render() {
    const data = {
        labels: [
            'Red',
            'Green',
            'Yellow'
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
        }]
    };

    const columns = [{
        Header: 'Coin',
        accessor: 'name', // String-based value accessors!
        width: 70
      }, {
        Header: 'Name',
        accessor: 'name',// String-based value accessors!
        width: 70
      }, {
        Header: 'Total Balance',
        accessor: 'totalBalance',
        width: 100
      }, {
        id: 'Amount', // Required because our accessor is not a string
        Header: 'Available Balance',
        accessor: 'availableBalance', // Custom value accessors!
        width: 100
      },{
        Header: 'BTC Value',
        accessor: 'btcValue',
        width: 80
    }, {
        Header: 'In order',
        accessor: 'inOrder',
        width: 100
    }, {
        Header: 'Action',
        accessor: 'action',
        // width: 100,
        Cell: row => (
            <span>
            <span 
                            onClick={()=>{
                                console.info('Deposit');
                            }}
            style={{
              color:
                '#57d500',
              transition: 'all .3s ease',
              marginRight: '3px',
              cursor: 'pointer'
            }}>
              Deposit
            </span> 
                <span>
                    |
                </span>                       
            <span
                onClick={()=>{
                    console.info('Withdrawal');
                }}
             style={{
              color: 
                '#ff2e00',                
              transition: 'all .3s ease',
              marginLeft: '3px',
              cursor: 'pointer'
            }}>
              Withdrawal
            </span> 
          </span>
          )
    },
 ]

    return (
        <div className="container-fluid ">
      <div className="row">

                <Paper className={'listOfActives'}>
        <Typography style={{marginLeft: "1em"}} align={'left'} variant={'title'}>
          Список активов
        </Typography>
        <ReactTable
            data={balancePageStore.balance}
            columns={columns}
            style={{
            //   height: "400px", // This will force the table body to overflow and scroll, since there is not enough room
              marginTop: "1em"
            }}
            showPagination = {false}
            showPaginationBottom={false}
            // defaultPageSize = {10}
            // minRows = {rows.length}
            showPageSizeOptions={false}
            className="-striped -highlight"
  />
                      </Paper>

      <div className="col maxWidth">

                <Paper className={'assetChart'}>
                <TradingViewWidget
                        symbol={"AAPL" }
                        locale="ru"
                        // theme={Themes.DARK}
                        autosize
                        // hide_side_toolbar= {false}
                        // details={true}
                      />
                      </Paper>

                        <div className="minHeight">

                            <Card className="diagram col">
                            <CardContent>
                            <Typography   variant={'title'} gutterBottom>
                                Diagram1
                                </Typography>
                            </CardContent>
                            <CardActions
                                                        style={{
                                                            objectFit: 'contain',
                                                            marginTop: '30%'
                                                        }}
                            >
                            <Doughnut 

                                                            options={{
                                                                maintainAspectRatio: false
                                                            }}
                                data={this.state}
                                 />
                                
                            </CardActions>
                            </Card>
                            
                            <Card className="diagram col centerDiagram">
                            <CardContent>
                            <Typography   variant={'title'} gutterBottom>
                                Diagram2
                                </Typography>
                            </CardContent>
                            <CardActions
                                                                                    style={{
                                                                                        objectFit: 'contain',

                                                                                        marginTop: '30%'
                                                                                    }}>
                            <Doughnut 
                                                            options={{
                                                                maintainAspectRatio: false
                                                            }}
                                
                                data={this.state}
                                 />
                                
                            </CardActions>
                            </Card>
                            
                            <Paper className="diagram col">
                            <CardContent>
                            <Typography   variant={'title'} gutterBottom>
                                Diagram3
                                </Typography>
                            </CardContent>
                            <CardActions
                                                                                    style={{
                                                                                        objectFit: 'contain',

                                                                                        marginTop: '30%'
                                                                                    }}>
                            <Doughnut 
                                data={this.state}
                                options={{
                                    maintainAspectRatio: false
                                }}
                                 />
                                
                            </CardActions>
                            </Paper>
                            
                            </div>
      </div>
      </div>
      </div>
    )
  }
}
