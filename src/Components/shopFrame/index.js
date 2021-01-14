import React, { Component } from 'react'

import SwipeableViews from 'react-swipeable-views';

import {Paper, Button, TextField, Tabs, Tab, Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import cryptocurStore from "../../tools/stores/cryptocurStore";
import InputAdornment from '@material-ui/core/InputAdornment';

import './styles.css';

const TabContainer = (props) => {
    const { children, dir } = props;
  
    return (
      <Typography component="div" dir={dir}>
        {children}
      </Typography>
    );
  }

  const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: '3em',
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
    textField: {
      height: 50
    }
  });

class ShopFrame extends Component {
    state = {
        value: 0,
        name: ''
      };
    
      handleChangeVal = (event, value) => {
        this.setState({ value });
      };

      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
    
      handleChangeIndex = index => {
        this.setState({ value: index });
      };

  render() {
    const { classes } = this.props;

    return (
      <div>
         <Paper className='shop'>


        <div
          className={"row"}
        >

          <div
            className={"col margin"}
          >
            <Typography>
            {`Купить ${cryptocurStore.coin}`}
              </Typography>
<div className="row">
<div className="col">
          <TextField
            id="outlined-name"
            label="Цена"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: <InputAdornment position="end">{cryptocurStore.curency}</InputAdornment>,
            }}
            type="number"
            margin="normal"
            className={classes.textField}
            value={this.state.price}
            onChange={this.handleChange('price')}
            variant="outlined"
        />
                  <TextField
            type="number"
            InputLabelProps={{ shrink: true }}
            id="outlined-name"
            // className={classes.textField}
            label="Сумма"
            margin="normal"
            value={this.state.quontity*this.state.price || 0}
            disabled
            variant="outlined"
        />

        </div>

        <div className="col">
        <TextField
            id="outlined-name"
            label="Кол-во"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: <InputAdornment position="end">{cryptocurStore.coin}</InputAdornment>,
            }}
            margin="normal"
            type="number"
            className={classes.textField}
            value={this.state.quontity}
            onChange={this.handleChange('quontity')}
            variant="outlined"
        />
              
                <button
                                   className="shopButton"
                                   size="large"
                                   onClick={()=>{
                                     cryptocurStore.buyCoin(cryptocurStore.coin,this.state.price,this.state.quontity,'buy')
                                   }}
                >
                {`Купить ${cryptocurStore.coin}`}
                </button>
          </div>
</div>
             
              </div>
          <div
            className={"col margin"}
          >
            <Typography>
            {`Продать ${cryptocurStore.coin}`}
              </Typography>
<div className="row">
<div className="col">
          <TextField
            id="outlined-name"
            label="Цена"
            InputProps={{
              endAdornment: <InputAdornment position="end">{cryptocurStore.curency}</InputAdornment>,
            }}
            type="number"
            margin="normal"
            className={classes.textField}
            value={this.state.price}
            onChange={this.handleChange('price')}
            variant="outlined"
        />
                  <TextField
            type="number"
            id="outlined-name"
            className={classes.textField}
            label="Сумма"
            margin="normal"
            value={this.state.quontity*this.state.price || 0}
            disabled
            variant="outlined"
        />

        </div>

        <div className="col">
        <TextField
            id="outlined-name"
            label="Кол-во"
            InputProps={{
              endAdornment: <InputAdornment position="end">{cryptocurStore.coin}</InputAdornment>,
            }}
            margin="normal"
            type="number"
            className={classes.textField}
            value={this.state.quontity}
            onChange={this.handleChange('quontity')}
            variant="outlined"
        />
              
                <button
                                   className="shopButton"
                                   size="large"
                                   onClick={()=>{
                                     cryptocurStore.buyCoin(cryptocurStore.coin,this.state.price,this.state.quontity,'sell')
                                   }}
                >
                {`Продать ${cryptocurStore.coin}`}
                </button>
          </div>
</div>
             
              </div>

        </div>
        
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(ShopFrame);
