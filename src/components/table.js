import React, { Component } from 'react';

import Row from './row';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

	// updateSearch(e){
	// 	/*this.setState({search: e.target.value.substr(0,20)});*/
	// 	console.log(   e.target.value.substr(0,20) );
	// }
      handleChange = (event) => {
        this.setState({
        search:event.target.value
        })
    }

    render() {
        let { onDelete, customers, edit } = this.props;
       // console.log(customers);
        // let filteredCustomers = this.props.customers.filter(
        //     (customers) => {
        //     //     return customers.firstName.toLowerCase().indexOf(this.state.handleChange.toLowerCase()) !== -1;
        //     console.log(customers);
        // }
        // );

       let  customers2 = [];
     
 
        this.props.customers.forEach((item,index) => {
            // console.log(data.firstName);
        if(item.firstName.toLowerCase().indexOf(this.state.search) > -1){
        customers2.push(
            
            // <Row key={index} data={this.props.customers[index]} edit={edit} onDelete={onDelete} />
            this.props.customers[index]
            );
    } 
        })

        return (
            <table className="table table-inverse">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Actions</th>
                        <th> <input type="text" className="form-control" placeholder="Search" onChange={(val)=>{this.handleChange(val)}}/> </th>
                    </tr>
                </thead>
                <tbody>
                    {customers2.map((d, i) => {
                        //console.log(d + "  i: "+ i);
                        return <Row key={i} data={d} edit={edit} onDelete={onDelete} />;
                    })}
                    {/*{customers2}*/}
                </tbody>
            </table>
        )   
    }
}