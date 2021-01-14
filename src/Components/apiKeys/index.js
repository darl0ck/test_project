import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from "mobx-react";

import apiKeyStore from "../../tools/stores/apiKeyStore";

import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
  paperBlock: {
      width: '36%',
  },
  inputBlocks: {
      display: 'flex',
      margin: '1em',
  },
  buttonAdd: {
      margin: '16px',
      width: '19em',
      backgroundImage: '-webkit-linear-gradient( 0deg, rgb(232,0,16) 0%, rgb(255,206,8) 100%)',
      // left: '86%',
      // top: '1vw',
    },
});

const ApiKeysView = observer(
  class ApiKeysView extends Component {
  
  render() {
    const { classes } = this.props;

    return (
<Paper className={classes.paperBlock}>
        <h4 style={{
                        textAlign: 'initial',
                        padding: '.4em',
                        
                    }}>
                        Your APIkeys
                    </h4>

        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Keys</TableCell>
              <TableCell numeric>Status</TableCell>
              <TableCell numeric>lastUse</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiKeyStore.rows.map(row => {
              return (
                <TableRow 
                onClick={()=>console.info(row)}
                hover={true}
                key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.keys}
                  </TableCell>
                  <TableCell numeric>
                  <Switch
                        checked={row.status}
                        onChange={apiKeyStore.handleChangeSwitch(row)}
                        value="checkedA"
                    />
                  </TableCell>
                  <TableCell numeric>{row.lastUse}</TableCell>
                  <IconButton
                   className={classes.button}
                    aria-label="Delete"
                    onClick={()=>{
                        apiKeyStore.deleteKey(row.id);
                    }}
                    >
                    <DeleteIcon />
                </IconButton>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Button
            variant="contained"
            size="medium" 
            color="primary" 
            className={classes.buttonAdd}
            onClick={()=>apiKeyStore.addNewAPIKey()}
        >
          Generate new APIkey
        </Button>
        </Paper>
    )
  }
}
)

export default withStyles(styles)(ApiKeysView);