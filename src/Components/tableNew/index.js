import React, { Component } from 'react'

import "./styles.css";

export default class TableNew extends Component {
    constructor(props) {
        super(props);
        this.state = props; 
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            columns: nextProps.columns,
            data: nextProps.data,
        };
    }

  render() {
    console.info(this.state.data,'data');

    return (
<table className="tableNew">
   <tr>
       {this.state.columns.map((el) =>{
           return <th>
               {el.Header}
            </th>
       })}
    
   </tr>
   {this.state.data.map((el) =>{
       console.info(el,'el')
           let a = Object.values(el)
                return <tr>
       <td>
                {a[1]}
            </td>
    </tr>

       })
           
       }
   
  </table>
    )
  }
}
