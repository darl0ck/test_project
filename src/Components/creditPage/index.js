import React, { Component } from 'react'

import { Grid,Col,Row } from 'react-bootstrap';

import { observer, inject } from "mobx-react";

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import CreditExamples from '../creditExamples';
import GivedCredit from '../givedCredit';
import MakeCredit from '../makeCredit'
import creditPageStore from "../../tools/stores/creditPageStore";

import './styles.css';

const styles = theme => ({
    root: {
      flexGrow: 1,
    //   maxWidth: '500px',
      margin: '3em 12%',
      minWidth: '68em',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        display: 'flex',
      },
    paperBlock: {
        height: 'fit-content',
    },
    inputBlocks: {
        display: 'flex',
    },
    buttonAdd: {
        margin: theme.spacing.unit,
        left: '86%',
        top: '1vw',
      },
  });

  const CreditPage = observer(
  class CreditPage extends Component {
    state = {
        value: 0,
        checkedA: true,
      };
    handleChange = name => event => {
        console.info(event.target.value);
      this.setState({
        [name]: event.target.value,
      });
    };

  render() {
    const { classes } = this.props;

    return (
        <div className={'alignItem row'}>
                <div className='col' >
                <CreditExamples/>   
                <MakeCredit/>     
                    </div>
                <div className='col'>
                <GivedCredit
                    creditStore = {creditPageStore.givedCredits}
                />    
                </div>
            </div>
    )
  }
}
  )
export default withStyles(styles)(CreditPage);
