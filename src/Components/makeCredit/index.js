import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';

import { Grid,Col,Row } from 'react-bootstrap';

import { observer, inject } from "mobx-react";

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/lab/Slider';


import ReactTable from "react-table";
import 'react-table/react-table.css'

import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button';

import './styles.css';

import creditPageStore from "../../tools/stores/creditPageStore";
import balancePageStore from "../../tools/stores/balancePageStore";

let id = 0;
function createData(name, price, dynamic) {
  id += 1;
  return { id, name, price, dynamic};
}


const styles = theme => ({
    root: {
      flexGrow: 1,
    //   maxWidth: '500px',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        display: 'flex',
      },
      textFieldPass: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
    paperBlock: {
        // height: '168px',
        // marginRight: '2em',
    },
    paperBlock2FA: {
        height: '168px',
        width: '39em'
        },
    paperBlockPass: {
        height: 'fit-content',
        width: '33em'
        },
    paperBlockSessions: {
        height: 'fit-content',
        width: '41em'
        },
    paperBlockWhitelist: {
        height: 'fit-content',
        width: '69em',
        },
    inputBlocks: {
        display: 'flex',
        margin: '1em',
    },
    buttonAdd: {
        margin: '16px',
        width: '19em',
        height: '4em',
        // backgroundImage: '-moz-linear-gradient( 0deg, rgb(232,0,16) 0%, rgb(255,206,8) 100%)',
        backgroundImage: '-webkit-linear-gradient( 0deg, rgb(232,0,16) 0%, rgb(255,206,8) 100%)',
        // backgroundImage: '-ms-linear-gradient( 0deg, rgb(232,0,16) 0%, rgb(255,206,8) 100%)',
        // left: '86%',
        // top: '1vw',
      },
      buttonTerminate: {
        margin: '1em 6px',
        width: '92%',
        height: '4em',
        backgroundImage: '-webkit-linear-gradient( 0deg, rgb(232,0,16) 0%, rgb(255,206,8) 100%)',
        // left: '86%',
        // top: '1vw',
      },
      slider: {
    padding: '22px 0px',
    margin: '2em',
  },
  });

  const makeCredit = observer(
      class makeCredit extends Component {
        constructor(props){
            super(props)
            this.state = {
                value: 0,
                coin: 'BTC',
                checkedA: true,
              };

        }



          handleChangeSlider = (event, value) => {
            this.setState({ value });
          };

          handleChange = name => event => {
              console.info(event.target.value);
            this.setState({
              [name]: event.target.value,
            });
            this.forceUpdate();
          };
    
          handleChangeTabs = (event, value) => {
            this.setState({ value });
            console.info(this.state);
          };
    
          handleChangeSwitch = name => event => {
            this.setState({
                 [name]: event.target.checked,
                });
          };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
        <Paper className={classes.paperBlock}>
        
            <h4 style={{
                        textAlign: 'initial',
                        padding: '.4em',

                    }}>
                        Создать кредит
                    </h4>
        <div className={classes.inputBlocks}>

                    <TextField
                        label="Amount"
                        className={classes.textField}
                        value={this.state.value}
                        type='number'
                        onChange={this.handleChange('value')}
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
                        label="Term"
                        className={classes.textField}
                        value={this.state.term}
                        onChange={this.handleChange('term')}
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
          id="outlined-select-currency-native"
          select
          label="Coin"
          className={classes.textField}
          value={this.state.coin}
          onChange={this.handleChange('coin')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
          variant="outlined"
        >
          {balancePageStore.balance.map(option => (
            <option value={option.coin}>
              {option.coin}
            </option>
          ))}
        </TextField>
                    
</div>
    <Slider
          classes={{ container: classes.slider }}
          value={value}
          max={balancePageStore.getBalanceByName(this.state.coin || 'BTC').availableBalance}
          min={0}
          aria-labelledby="label"
          onChange={this.handleChangeSlider}
        />
<Button
                        variant="contained"
                        size="medium" 
                        className={(classes.buttonAdd)}
                        color="primary"
                        onClick={()=>{
                            creditPageStore.makeCredit(this.state.coin,true,value,this.state.coin);
                            balancePageStore.reSumAfterCredit(this.state.coin, Number(value));
                            this.setState({
                                value: balancePageStore.getBalanceByName(this.state.coin || 'BTC').availableBalance
                            });
                        }}
                        >
                        Создать кредит
                    </Button>
                </Paper>
        
      
    )
  }
}
)
export default withStyles(styles)(makeCredit);
