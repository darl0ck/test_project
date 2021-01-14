import React, { Component } from 'react'

import { Grid,Col,Row } from 'react-bootstrap';

import { observer, inject } from "mobx-react";

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';

import CreditExamples from '../creditExamples';
import GivedCredit from '../givedCredit';
import MakeCredit from '../makeCredit'
import creditPageStore from "../../tools/stores/creditPageStore";

import './styles.css';
import DialogHistory from '../dialogHistory';
import ChatFrame from '../chatFrame';

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

  const FaqPage = observer(
  class FaqPage extends Component {
    state = {
        status: false,
        activeCategory: [],
        faq: [
            {
            category: 'Access to page',
            questions: ['Вопрос 1','Вопрос 1fww','awfag']
        },
            {
            category: 'Access to profile',
            questions: ['Вопрос 1','Вопрос 1fww','awfag']
        },
            {
            category: 'Access to help',
            questions: ['Вопрос 1','Вопрос 1fww','awfag']
        },
            {
            category: 'Access to page',
            questions: ['Вопрос 1','Вопрос 1fww','awfag']
        },
            {
            category: 'Access to page',
            questions: ['Вопрос 1','Вопрос 1fww','awfag']
        },
            {
            category: 'Access to page',
            questions: ['Вопрос 1','Вопрос 1fww','awfag']
        },
            {
            category: 'Access to page',
            questions: ['Вопрос 1','Вопрос 1fww','awfag']
        },
    ]
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
                
                <Paper style={{height: '98.5%',}}>
        <div className="d-md-flex">
        <Typography style={{marginLeft: "1em"}} align={'left'} variant={'title'}>
        FAQ
</Typography>

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
                    <div className="row" hidden={this.state.status}>


                            {this.state.faq.map((el)=>{
                            return <div className="col-sm-3 margin">
                            <Typography variant={'h6'}>
                                    {el.category}
                            </Typography>
                            {el.questions.map((question) => {
                            return <Typography   variant={'heading'}>
                                    {question}
                            </Typography>
                        })}
                        <Typography component="a" color="textSecondary" variant={'subtitle2'}
                                    onClick={()=>{
                                        console.info(el.category)
                                        const activeCategoryNew = this.state.faq.find(obj => obj.category === el.category);
                                        console.info(activeCategoryNew,'category active')
                                        this.setState({
                                            status: !this.state.status,
                                            activeCategory: Array(activeCategoryNew) ,

                                        })
                                        this.state.activeCategory = Array(activeCategoryNew);
                                        console.info(this.state.activeCategory,'state category active')

                                    }}

                        >
                                    Show all >
                            </Typography>
                            </div>
                            })}


</div>
                       
                    <div className="row" hidden={!this.state.status}>

                            {this.state.status ? this.state.activeCategory.map((el)=>{
                            return <div className="margin">
                        <Typography component="a" color="textSecondary" align={"left"} variant={'h5'}
                                    onClick={()=>{
                                        console.info(el.category)
                                        this.setState({
                                            status: !this.state.status
                                        })
                                    }}

                        >
                                    {`<Back`}
                            </Typography>
                            <br />
                            <Typography variant={'h6'}>
                                    {el.category}
                            </Typography>
                            {el.questions.map((question) => {
                            return       <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography className={classes.heading}>{question}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        })}
                            </div>
                            }): ''}


</div>
                       
                       </Paper>
                    
                    </div>
                <div className='col'>
                <ChatFrame/>     

                <DialogHistory/>   


                </div>
            </div>
    )
  }
}
  )
export default withStyles(styles)(FaqPage);
