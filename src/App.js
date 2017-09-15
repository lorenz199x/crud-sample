import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Form from './components/form';
import Header from './components/header';
import Table from './components/table';

var defaults = {
	firstName: '',
	lastName: '',
	age: ''
};

export default class App extends Component {
	constructor() {
		super();

		this.state = {
			customers: [],
			action: 'add',
			formData: { ...defaults },
			search: ''
		};

		this.onChangeForm = this.onChangeForm.bind(this);
		this.edit = this.edit.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onSubmitForm = this.onSubmitForm.bind(this);
	}

	componentDidMount() {
		axios({
			url: 'http://localhost:4000/customers',
			method: 'GET'
		}).then(response => {
			this.setState({ customers: response.data });
		}).catch(error => {
			console.log(error);
		});
	}

	onChangeForm(e, field) {
		this.setState({
			formData: {
				...this.state.formData,
				[field]: e.target.value
			}
		});
	}
	
	edit(e, data) {
		this.setState({ action: 'edit', formData: data });
	}

	onDelete(e, data) {
		axios({
			url: `http://localhost:4000/customers/${data.id}`,
			method: 'DELETE'
		}).then(response => {
			let customers = [...this.state.customers];
			customers === customers.filter(d => {
				if (d.id !== data.id) {
					return true;
				}
				//return false;
			});
			this.setState({ customers })
		}).catch(error => {
			console.log(error);
		});
	}

	onSubmitForm(e) {
		let { action, customers, formData } = this.state;

		if (formData.firstName === '' || formData.lastName === '' || formData.age === '') {
			console.log('all fields are required');
		} else {
			if (action === 'edit') {
				axios({
					url: `http://localhost:4000/customers/${formData.id}`,
					method: 'PUT',
					data: formData
				}).then(response => {
					customers = [...customers];
					customers = customers.map(d => {
						if (d.id === response.data.id) {
							d = response.data;
						}
						return d;
					});
					this.setState({ customers, action: 'add', formData: { ...defaults } })
				}).catch(error => {
					console.log(error);
				});
			} else {
				axios({
					url: 'http://localhost:4000/customers',
					method: 'POST',
					data: formData
				}).then(response => {
					this.setState({ customers: [...customers, response.data], action: 'add', formData: { ...defaults } })
				}).catch(error => {
					console.log(error);
				});
			}
		}
		e.preventDefault();
	}

	render() {
		let { action, customers, formData } = this.state;

		return (
			<div className="App">
				 <Header /> 
				<div className="App-intro">
					<div className="container">
						<Form formData={formData} onChangeForm={this.onChangeForm} onSubmitForm={this.onSubmitForm} action={action} />

						<div className="col-xs-12">
							<Table customers={customers} edit={this.edit} onDelete={this.onDelete} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
