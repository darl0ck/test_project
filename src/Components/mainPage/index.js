import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';

import { Grid,Col,Row } from 'react-bootstrap';

import { observer, inject } from "mobx-react";
import cryptocurStore from "../../tools/stores/cryptocurStore";

import TradingViewWidget, { Themes } from 'react-tradingview-widget';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TradingPairs from '../tradingPairs';
import ShopFrame from '../shopFrame';
import LastDeals from '../lastDeals';
import TrendingDeals from '../trendingDeals';

import './styles.css';

const styles = {
    root: {
      flexGrow: 1,
      minWidth: '100%'
    },
    flex: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    card: {
      height: '50%',
    },
    table: {
      width: 'fit-content',
      paddingRight: '3em',
      fontSize: '1.2rem',
    },
    deal:{
      // float: 'right',
      marginRight: '4em',
      // marginLeft: '1em'
    },
    dealTable: {
        overflowY: 'scroll',
        height: '29em',
    },
    myDealsTable: {
      overflowY: 'scroll',
      // width: 'min-content',
      marginTop: '23px',
    },
    tablePaper: {
      width: 'min-content',
    },
  };
  
  let id = 0;
  function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
  }
  

  const MainPage = observer(
    class MainPage extends Component {
  render() {
    const { classes } = this.props;

    return (
        <div className="App">
        <div className="row">

        <div className="col sizeLeft">
          <TradingPairs

          />
          <TrendingDeals/>
           </div>

          <div className="col sizeCenter">
              <Paper className={classes.card}>
                    <TradingViewWidget
                        symbol={cryptocurStore.tradingPair 
                          ? cryptocurStore.tradingPair 
                          : "BTCUSD" }
                        locale="ru"
                        autosize
                        // hide_side_toolbar= {false}
                        // details={true}
                      />
                </Paper>
              <ShopFrame />
                        
                        <Paper className={classes.myDealsTable}>
          <Typography style={{marginLeft: "1em"}} align={'left'} variant={'title'}>
          Мои сделки
          </Typography>
          <Table >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell numeric>Price</TableCell>
              <TableCell numeric>Type</TableCell>
              <TableCell numeric>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cryptocurStore.myDeals.map(row => {
              return (
                <TableRow 
                onClick={()=>console.info(row)}
                hover={true}
                key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell numeric>{row.price}</TableCell>
                  <TableCell numeric>{row.type}</TableCell>
                  <TableCell numeric>{row.dynamic}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
                        </Paper>

           
            </div>

            <div className="col sizeRight">
                <LastDeals/>
            </div>

        </div>
        </div>
      
    )
  }
}
  )
export default withStyles(styles)(MainPage);
