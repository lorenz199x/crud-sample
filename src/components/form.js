import React, { Component } from 'react';

export default class Form extends Component {
    render() {
        let { action, formData, onChangeForm, onSubmitForm, updateSearch } = this.props;
        
        return (
            <div className="col-xs-12">
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="First Name" value={formData.firstName} onChange={e => onChangeForm(e, 'firstName')} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Last Name" value={formData.lastName} onChange={e => onChangeForm(e, 'lastName')} />
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" placeholder="Age" value={formData.age} onChange={e => onChangeForm(e, 'age')} />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {(action === 'edit')
                            ? <span>Update</span>
                            : <span>Add</span>
                        }
                    </button>
                </form>
            </div>
        )
    }
}