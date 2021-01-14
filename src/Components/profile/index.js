import React, { Component } from 'react'

import { Grid,Col,Row } from 'react-bootstrap';
import { observer, inject } from "mobx-react";

import apiKeyStore from "../../tools/stores/apiKeyStore";

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ReactTable from "react-table";
import 'react-table/react-table.css'

import ApiKeysView from '../apiKeys'

import './styles.css';

let id = 0;
function createData(name, price, dynamic) {
  id += 1;
  return { id, name, price, dynamic};
}

  const styles = theme => ({
    root: {
      flexGrow: 1,
      paddingLeft: '2%',
      paddingRight: '2%',
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
        width: '58%',
        height: '168px',
        marginRight: '2%',
    },
    paperBlock2FA: {
        height: '168px',
        width: '40%'
        },
    paperBlockPass: {
        width: '30%',
        marginRight: '2%',
        },
    paperBlockSessions: {
        width: '36%'
        },
    paperBlockWhitelist: {
        width: '62%',
        marginRight: '2%'
        },
    inputBlocks: {
        display: 'flex',
        margin: '1em',
    },
    buttonAdd: {
        margin: '16px',
        height: '5%',
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
  });

  const Profile = observer(
class Profile extends Component {
    state = {
        value: 0,
        show: true,
        emails2FA: ['asdasdw@gmail.com'],
        rows: [
            createData('Frozen yoghurt', 159, 6.0),
            createData('Frozen ETH', 159, 6.0),
            createData('Frozen ETH', 159, 6.0),
            createData('Frozen ETH', 159, 6.0),
            createData('Frozen ETH', 159, 6.0),
            createData('Frozen ETH', 159, 6.0),
          ],
      };
    
      handleChange = name => event => {
          console.info(event.target.value);
        this.setState({
          [name]: event.target.value,
        });
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

    // let rows = [
    //     createData('Frozen yoghurt', 159, 6.0),
    //     createData('Frozen ETH', 159, 6.0),
    //     createData('Frozen ETH', 159, 6.0),
    //     createData('Frozen ETH', 159, 6.0),
    //     createData('Frozen ETH', 159, 6.0),
    //     createData('Frozen ETH', 159, 6.0),
    //   ];

      const columns = [{
        Header: 'Дата',
        accessor: 'name' // String-based value accessors!
      }, {
        Header: 'Время',
        accessor: 'price',
      }, {
        id: 'Amount', // Required because our accessor is not a string
        Header: 'IP',
        accessor: 'dynamic' // Custom value accessors!
      }, {
        Header: 'Устройство', // Custom header components!
        accessor: 'dynamic'
      }]

    return (
    <div className={classes.root}>
        <div className="row">


        <Paper className={classes.paperBlock}>
        
            <h4 style={{
                        textAlign: 'initial',
                        padding: '.4em',

                    }}>
                        Profile
                    </h4>
        <div className={classes.inputBlocks}>

                    <TextField
                        label="Nick"
                        className={classes.textField}
                        value={this.state.nick}
                        onChange={this.handleChange('nick')}
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
                        label="Date"
                        className={classes.textField}
                        value={this.state.Date}
                        onChange={this.handleChange('Date')}
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
                        label="Password"
                        className={classes.textField}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        margin="normal"
                        type="password"
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        size="medium" 
                        className={(classes.buttonAdd)}
                        color="primary" >
                        Save
                    </Button>
                    
</div>
                </Paper>
        
        
        
        <Paper className={classes.paperBlock2FA}>
        
        <h4 style={{
                    textAlign: 'initial',
                    padding: '.4em',

                }}>
                    Two-factor auth
                </h4>
                <div className="gridBlock">

                    <div className="emailList2FA">
                    {this.state.emails2FA.map((email)=>{
                       return <p
                        className="emails2FA">
                                {email}
                                <span
                                onClick = {(e,i)=> {
                                    console.info(email);
                                    let index = this.state.emails2FA.findIndex((el) => el === email);
                                    this.state.emails2FA.splice(index,1)
                                    this.forceUpdate();
                                    }
                                }
                                style={{color: 'red',
                                        fontSize: '2em',
                                        }}> x</span>
                        </p>
                    })}


                </div>
                <div className={classes.inputBlocks}>
                <Button
                    variant="contained"
                    size="medium" 
                    className={classes.buttonAdd}
                    color="primary"
                    onClick={()=>{
                        let newEmail = prompt('Введите новую почту','');
                        this.state.emails2FA.push(newEmail);
                        let newArr=this.state.emails2FA;
                        this.setState({emails2FA: newArr} )
                        console.info(this.state.emails2FA)
                    }}
                    >
                    + Add new
                </Button>
                </div>
                
</div>
            </Paper>
    



        </div>

       <div className="row marginTop">

            <Paper className={classes.paperBlockPass }>
        
        <h4 style={{
                    textAlign: 'initial',
                    padding: '.4em',

                }}>
                    Password
                </h4>

<div>
          <TextField
                        label="Old"
                        className={classes.textFieldPass}
                        value={this.state.old}
                        onChange={this.handleChange('old')}
                        type="password"
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
                        label="Confirm"
                        className={classes.textFieldPass}
                        value={this.state.oldConfirm}
                        onChange={this.handleChange('oldConfirm')}
                        type="password"
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
                        label="New"
                        className={classes.textFieldPass}
                        value={this.state.newPass}
                        onChange={this.handleChange('newPass')}
                        margin="normal"
                        type="password"
                        variant="outlined"
                    />
                <Button
                    variant="contained"
                    size="medium" 
                    className={classes.buttonAdd}
                    color="primary" 
                    onClick={()=> {
                        this.state.old === this.state.oldConfirm 
                        ? alert('Password has been changed')
                        : alert('Error: old !== confirmPass')
                    }}
                    >
                    Save
                </Button>
</div>
            </Paper>

            <Paper className={classes.paperBlockPass}>
        
        <h4 style={{
                    textAlign: 'initial',
                    padding: '.4em',

                }}>
                    Auto logout
                </h4>
                <div className="row">

<div className="passTextFields">
          <TextField
                        label="Nick"
                        className={classes.textFieldPass}
                        value={this.state.nick}
                        onChange={this.handleChange('nick')}
                        margin="normal"
                        variant="outlined"
                    />

                <Button
                    variant="contained"
                    size="medium" 
                    className={classes.buttonAdd}
                    color="primary" >
                    Save
                </Button>
                <Button
                    variant="contained"
                    size="medium" 
                    className={classes.buttonTerminate}
                    color="primary"
                    onClick={()=>{
                        this.setState({
                            rows:[]
                        })
                    }}
                     >
                    Terminate all sessions
                </Button>
                </div>
       
</div>
            </Paper>

            <Paper className={classes.paperBlockSessions}>
        
        <h4 style={{
                    textAlign: 'initial',
                    padding: '.4em',

                }}>
                    Active sessions
                </h4>
                <ReactTable
            data={this.state.rows}
            columns={columns}
            style={{
            //   height: "164px", // This will force the table body to overflow and scroll, since there is not enough room
              marginTop: "1em"
            }}
            showPagination = {false}
            minRows = {this.state.rows.length}
            showPaginationBottom={false}
            showPageSizeOptions={false}
            className="-striped -highlight"
  />
       
            </Paper>

       </div>

        <div className="row marginTop">
            <Paper className={classes.paperBlockWhitelist}>
        
        <h4 style={{
                    textAlign: 'initial',
                    padding: '.4em',

                }}>
                    Whitelist
                </h4>
                <ReactTable
            data={this.state.rows}
            columns={columns}
            style={{
              height: "20em", // This will force the table body to overflow and scroll, since there is not enough room
              marginTop: "1em"
            }}
            showPagination = {false}
            showPaginationBottom={false}
            minRows = {this.state.rows.length}
            showPageSizeOptions={false}
            className="-striped -highlight"
  />
       
            </Paper>
            <ApiKeysView/>
        </div>
       </div>

    )
  }
}
  )

export default withStyles(styles)(Profile);