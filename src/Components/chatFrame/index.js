import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';

import { Grid,Col,Row } from 'react-bootstrap';

import { observer, inject } from "mobx-react";

import {

	MessageList,
	Message,
	MessageText,

	MessageGroup,

    ThemeProvider
} from '@livechat/ui-kit';


import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/lab/Slider';


import ReactTable from "react-table";
import 'react-table/react-table.css'

import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button';

import './styles.css';

import faqPageStore from "../../tools/stores/faqPageStore";
import { from } from 'rxjs';

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
        marginLeft: '4%',
        width: '60%',
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
        width: '30%',
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

  const chatFrame = observer(
      class chatFrame extends Component {
        state = {
            value: 50,
            checkedA: true,
            messages: [
                {
                    date: '21:33',
                    text: 'blablabla',
                    own: true
                }
        ]
          };


          handleChange(e) {
            this.setState({
              text: e.target.value,
            });
          };

          handleMessage(text){
              console.info(text)
              {faqPageStore.currentDialog.messages && faqPageStore.currentDialog.messages.push(
                    {
                    date: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    text: text,
                    own: true
                },
                    {
                    date: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    text: 'Понял, принял',
                    own: false
                },
                )}
                this.forceUpdate();

                this.state.text = '';
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
                        Чат
                    </h4>
        <div className={classes.inputBlocks}>

        <Paper className={"chatBox"}>
        <ThemeProvider>

        <MessageList>
{faqPageStore.currentDialog.messages && faqPageStore.currentDialog.messages.map((message =>{
                    return <Message date={message.date} isOwn={message.own} authorName="Visitor">
                    <MessageText className={message.own ? "own" : "messageWidth"}>
                    {message.text}
                    </MessageText>
                </Message>
                }))}
        </MessageList>
</ThemeProvider>
        </Paper>


                    
        </div>
<div className="row">
<TextField
                        label="Coin"
                        className={classes.textField}
                        value={this.state.text}
                        onChange={(e) => this.handleChange(e)}
                        margin="normal"
                        variant="outlined"
                    />

<Button
                        variant="contained"
                        size="medium" 
                        className={(classes.buttonAdd)}
                        color="primary"
                        onClick={() =>
                            this.handleMessage(this.state.text)
                        }
                        >
                        Отправить
                    </Button>
</div>
    
                </Paper>
        
      
    )
  }
}
)
export default withStyles(styles)(chatFrame);
