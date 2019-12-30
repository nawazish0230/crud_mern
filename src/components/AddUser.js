import React, { Component } from 'react';
import Axios from 'axios';
import './AddUser.css';
import $ from 'jquery';
import 'bootstrap';

class AddUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            city: '',
            dob: '',
            contact: '',
            users: [],
            adding: false
        }
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        // to hide the modal
        // $('button#btn-submit').on("click", function(event) {
        //     // submit form via ajax, then
        //     event.preventDefault();
        //     $('#exampleModal').modal('toggle');
        //     $('.modal-backdrop').remove();
        // });


    }

    onSubmitHandler = (e) => {
        console.log('heyy');
        e.preventDefault();
        this.props.addUser(this.state);
        this.setState({
            username: '',
            city: '',
            dob: '',
            contact: '',
            adding: false
        })
        // $('#exampleModal').modal('toggle');
        $('.modal-backdrop').remove();
    }


    render() {
        const { username, city, dob, contact } = this.state
        return (
            <div className="container">
                <button type="button" className="btn btn-primary my-3 text-center" data-toggle="modal" data-target="#exampleModal" onClick={() => { this.setState({ adding: true }) }}>Create User</button>

                {this.state.adding && <div className="modal modals fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.onSubmitHandler}>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" name="username" className="form-control" onChange={this.onChangeHandler} value={username} placeholder="Enter Username" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <input type="text" name="city" className="form-control" onChange={this.onChangeHandler} value={city} placeholder="Enter City" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="dob">Dob</label>
                                        <input type="text" name="dob" className="form-control" onChange={this.onChangeHandler} value={dob} placeholder="Enter DOB" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contact">Contact</label>
                                        <input type="text" name="contact" className="form-control" onChange={this.onChangeHandler} value={contact} placeholder="Enter contact" />
                                    </div>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" id="btn-submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

export default AddUser;



