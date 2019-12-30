import React, { Component } from 'react';
import Axios from 'axios';
import AddUser from './AddUser';
import './UserList.css'


class UserList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            currentPage: 1,
            usersPerPage: 15,
            updating: false,
            id: '',
            username: '',
            city: '',
            dob: '',
            contact: '',
        }
        this.handleClick = this.handleClick.bind(this);
        this.addUser = this.addUser.bind(this);

    }




    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    componentDidMount() {
        // list of user
        this.getUser();
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        // list of user
        this.getUser();
    }

    addUser(data) {
        Axios.post('http://localhost:5000/users/add', data)
            .then(response => {
                // console.log(response.data);
                // this.setState(
                //     response.data
                // )
                const newUser = [...this.state.users, response.data];
                console.log(newUser);
                this.setState({ users: newUser });
            })
            .catch(err => console.log('err'))
    }

    getUser() {
        Axios.get('http://localhost:5000/users/findUsers')
            .then(usersList => {
                // console.log(usersList.data)
                this.setState({ users: usersList.data })
            })
            .catch(err => console.log(err))
    }


    // delete the user
    deleteHandler(userId) {
        let { users } = this.state;
        console.log(users);
        Axios.post(`http://localhost:5000/users/deleteUser/${userId}`)
            .then(usersDeleted => {
                this.setState({
                    users: users.filter(user => user._id !== userId)
                })
            })
            .catch(err => console.log(err))
    }

    // update
    UpdateUser(id) {
        const user = this.state.users.find(user => user._id === id);
        this.setState({ username: user.username, city: user.city, dob: user.dob, contact: user.contact, id: user._id });
        this.setState({ updating: true })
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state);
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        // console.log(this.state);
        Axios.post(`http://localhost:5000/users/updateUser/${this.state.id}`, this.state)
            .then(response => {
                console.log(response)
                // $('#exampleModal').modal('toggle');
                // $('.modal-backdrop').remove();
                var user;
                const { username, city, dob, contact } = response.data;
                for (user of this.state.users) {
                    if (user._id === this.state.id) {
                        user.username = username;
                        user.city = city;
                        user.dob = dob;
                        user.contact = contact
                        break;
                    }
                }

                this.setState({ updating: false })
                // this.props.history.push('/');
            })
            .catch(err => console.log('err'))
        // console.log(this.state);
    }

    updating() {
        const { username, city, dob, contact } = this.state
        return (
            <div className="container">
                {/* <button type="button" className="btn btn-primary my-3 text-center" data-toggle="modal" data-target="#exampleModal">Update User</button> */}
                {/* <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"> */}
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Updating User</h5>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => { this.setState({ updating: false }) }} aria-label="Close">
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
                {/* </div> */}
            </div>
        )
    }

    displaying() {
        // const { users } = this.state
        const { users, currentPage, usersPerPage } = this.state;

        // Logic for displaying todos
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        const currentTodos = users.slice(indexOfFirstUser, indexOfLastUser);
        // console.log(users,currentPage, usersPerPage ,indexOfLastUser,indexOfFirstUser, currentTodos);

        const renderTodos = currentTodos.reverse().map((todo, index) => {
            // console.log(todo.username)  to={`update/${todo._id}`}
            return (
                    <tbody key={todo._id}>
                        <tr>
                            <td>{todo.username}</td>
                            <td>{todo.city}</td>
                            <td>{todo.dob}</td>
                            <td>{todo.contact}</td>
                            <td>{todo.postedAt.substring(0, 10)}</td>
                            <td onClick={() => this.deleteHandler(todo._id)}><span className="btn btn-danger">delete</span></td>
                            <td><button onClick={() => { this.UpdateUser(todo._id) }} className="btn btn-warning" >Edit</button></td>
                        </tr>
                    </tbody>
            );
        });


        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                    <li
                        className="page-link"
                        key={number}
                        id={number}
                        onClick={this.handleClick}
                    >
                        {number}
                    </li>
            );
        });

        return (
            <div className="container mt-4">
                <h2 className="text-center text-info">CRUD Using MERN stack</h2>
                <AddUser addUser={this.addUser} />
                <table className="table table-striped table-hover">
                    <thead>
                        <tr className="text-dark">
                            <th>Username</th>
                            <th>City</th>
                            <th>DOB</th>
                            <th>Contact</th>
                            <th>Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    {renderTodos}
                </table>
                <ul id="page-numbers" className="pagination">
                    {renderPageNumbers}
                </ul>
            </div>
        )
    }

    render() {
        return (
            this.state.updating ? this.updating() : this.displaying()
        )

    }
}

export default UserList;
