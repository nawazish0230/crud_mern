import React, { Component } from 'react';
import Axios from 'axios';
import $ from 'jquery';
import 'bootstrap';

class UpdateUser extends Component {

    constructor(props) {

        super(props);

        this.state = {
            username: '',
            city: '',
            dob: '',
            contact: '',
        }
    }

    componentDidMount() {
        // console.log(this.props.match;)
        Axios.get('http://localhost:5000/users/getUser/' + this.props.match.params.id)
            .then(response => {
                const { username, city, dob, contact } = response.data
                this.setState({ username, city, dob, contact });
                // console.log(this.state)
            })
            .catch(err => {
                console.log(err);
            })
    }


    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        // console.log(this.state);
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        // console.log(this.state);
        Axios.post(`http://localhost:5000/users/updateUser/${this.props.match.params.id}`, this.state)
            .then(response => {
                console.log(response)
                $('#exampleModal').modal('toggle');
                $('.modal-backdrop').remove();
                this.props.history.push('/');
            })
            .catch(err => console.log('err'))
        // console.log(this.state);
    }


    render() {
        const { username, city, dob, contact } = this.state
        return (
            <div className="container">
                <button type="button" className="btn btn-primary my-3 text-center" data-toggle="modal" data-target="#exampleModal">Update User</button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
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
                                    <button type="submit" className="btn btn-primary btn-update">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateUser;
