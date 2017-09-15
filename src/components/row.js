import React, { Component } from 'react';

export default class Row extends Component {
    render() {
        let { data, edit, onDelete } = this.props;

        return (
            <tr>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.age}</td>
                <td>
                    <button className="btn btn-info" onClick={e => edit(e, data)}>Edit</button>
                    <button className="btn btn-danger" onClick={e => onDelete(e, data)}>Delete</button>
                </td>
            </tr>
        )
    }
}