import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import ReactTable from "react-table";
import 'react-table/react-table.css';

import './styles.css';

let id = 0;
function createData(name, category, mark) {
  id += 1;
  return { id, name, category, mark};
}

export default class voitingPage extends Component {
    state ={
        projectInfo:[{
            name: 'TCH',
            people: ['asd','fwq','q3gw'],
            text: 'fsegejgsjlekgjwlk',
            category: 'Финансы',
            mark: true,
        },
        {
            name: 'ETH',
            people: ['asd','fwq','sdf'],
            text: 'asdasfa',
            category: 'Финансы',
            mark: false,
        }],
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

  render() {
      const rows = [];
      console.info('proj: ',this.state.choosedProject);
        this.state.projectInfo.map((el)=>{
            rows.push(createData(el.name, el.category, el.mark ? 'Нравится' : 'Не нравится'))
        })

    const columns = [{
        Header: 'Название',
        accessor: 'name' // String-based value accessors!
      }, {
        Header: 'Категория',
        accessor: 'category',
      }, {
        id: 'Amount', // Required because our accessor is not a string
        Header: 'Оценка',
        accessor: 'mark' // Custom value accessors!
      }]

      console.info(rows)
    return (
        <div className="container-fluid ">
      <div className="row">

                <Paper className={'voitingTab'}>
        <Typography style={{marginLeft: "1em"}} align={'left'} variant={'title'}>
          Голосование
        </Typography>
        <ReactTable
            data={rows}
            columns={columns}
            style={{
            //   height: "400px", // This will force the table body to overflow and scroll, since there is not enough room
              marginTop: "1em"
            }}
            showPagination = {false}
            showPaginationBottom={false}
            showPageSizeOptions={false}
            className="-striped -highlight"
            getTdProps={(state, rowInfo, column, instance) => {
                return {
                    onClick: (e, handleOriginal) => {
                    // console.log("It was in this row:", rowInfo.row.name);
                    if (rowInfo){
                        this.setState({
                            project: rowInfo.row.name,
                        });
                        this.chooseProject(rowInfo.row.name);
                    }
                    
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

      
                <Paper className={'voteInfo'}>
                <div style={{display: "flex"}}>
        <Typography style={{marginLeft: "1em",marginTop: "8px"}} align={'left'} variant={'title'}>
            Проект: {this.state.project ? this.state.project : 'Не выбрано'}
            
        </Typography>
        <Button onClick={() => {
                this.handleVote(this.state.choosedProject[0],true)
           }}
           style={{marginLeft: "auto"}}
           color={this.state.choosedProject ? this.state.choosedProject[0].mark ? 'primary'  : '' : '' }
           >
             Нравится
             </Button>
           <Button onClick={() => {
                this.handleVote(this.state.choosedProject[0],false)

           }}
           color={this.state.choosedProject ? !this.state.choosedProject[0].mark ? 'secondary'  : '' : '' }

           >
             Не нравится
             </Button>
                </div>
        <Typography style={{marginTop: "2em"}} color="textSecondary">
         Участники:
        </Typography>
        
            {this.state.choosedProject ? this.state.choosedProject[0].people.map((man)=>{
                return <Typography variant="p" color="textSecondary">
                    {man}
        </Typography>

            }) : 'Нет информации' }
        <Typography style={{marginTop: "2em"}} color="textSecondary">
         Описание:
        </Typography>
        <Typography variant="h5">
            {this.state.choosedProject ? this.state.choosedProject[0].text : 'Нет информации' }
        </Typography>
        <Typography style={{marginTop: "2em"}} color="textSecondary">
         Экономическое обоснование:
        </Typography>
        <Typography variant="h5">
            {this.state.choosedProject ? this.state.choosedProject[0].text : 'Нет информации' }
        </Typography>
                      </Paper>
      
      </div>
      </div>
    )
  }
}
