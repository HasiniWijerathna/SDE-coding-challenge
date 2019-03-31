import React from 'react';

import { modelURL } from '../services/urlFactory';
import BaseContainer from './BaseContainer';
import User from '../components/User';
import PopupLoader from '../components/PopupLoader';
import { nameValidator } from '../utilities/validator';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import HeaderBar from '../components/HeaderBar';

/**
 * Representing the logic of updating and deleting user functionality
 */
class Users extends BaseContainer {
    /**
     * Class constructor
     * @param {Object} props User define component
     */
    constructor(props) {
        super(props);

        this.state = {
            usersData: [],
            open: false,
            message: '',
            completed: 5000,
            loading: false,
            editable: false,

            firstName: '',
            lastName: '',
            error: {
                firstName: null,
                lastName: null
            },
            displayedContacts: [],

            // State attributes for pagination
            currentPage: 1,
            // Considered 1 element per page
            usersPerPage: 4,
            filterValue: '',
            name: 'firstName',
            searchTerm: '',
            totalPages: 0
        };
    }

    /**
     * Called after the component is mounted
     */
    componentDidMount() {
        const url = modelURL('/users?delay=5');
        this.requestData(url);
    }
    /**
     * Request all data from the API
     */
    requestData = (url) => {
        this.fetchData(url, true);
    }
    /**
     * Abstract function to fetch user data from the API
     * @param  {String} url           The URL to GET from
     */
    fetchData = (url) => {
        this.setState({
            loading: true,
        });
        this.makeGETRequest(url)
            .then((response) => {
                this.setState({
                    loading: false,
                    usersData: response.data,
                    displayedContacts: response.data,
                    totalPages: response.total_pages
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    message: 'Oops something went wrong!',
                });
            });
    }
    /**
     * Abstract function to update user data from the API
     * @param  {String} url           The URL to PUT from
     * @param  {String} id            User ID
     */
    updateData = (url, id) => {
        this.setState({
            loading: true,
        });
        this.makePUTrequest(url, id)
            .then((response) => {
                this.setState({
                    firstName: '',
                    lastName: '',
                    loading: false,
                })
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    message: 'Oops something went wrong!',
                });
            });
    }
    /**
    * Abstract function to delete user data from the API
    * @param  {String} url           The URL to PUT from
    * @param  {String} id            User ID
    * @param  {Array}  filtredData   filteredUsers
    */

    deleteData = (url, filtredData, id) => {
        this.setState({
            loading: true,
        });
        this.makeDELETErequest(url, id)
            .then((response) => {
                this.setState({
                    displayedContacts: filtredData,
                    loading: false,
                })
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    message: 'Oops something went wrong!',
                });
            });
    }

    /**
     * Checks for the name validity
     */
    validateName = (name) => {
        let error = null;
        error = nameValidator(name);
        return error;
    }
    /**
     * Update the selected users attributes
     * @param  {String} id           The selected user ID
     */
    onUpdateItem = (id) => {
        if (this.state.firstName || this.state.lastName) {
            this.setState(state => {
                const list = state.displayedContacts.map((user) => {
                    if (user.id === id) {
                        user.first_name = this.state.firstName ? this.state.firstName : user.first_name;
                        user.last_name = this.state.lastName ? this.state.lastName : user.last_name;
                        return user;
                    } else {
                        return user;
                    }
                });
                return {
                    list,
                };
            });
            const url = modelURL('/users/' + id);
            this.updateData(url, id)
        }
    };
    /**
     * Updates the state according to the change event of new first name
     * @param  {Event} firstName The changed firstname value from props
     */
    onChangeFirstName = (firstName) => {

        const error = this.state.error
        error.firstName = this.validateName(firstName)

        this.setState({
            firstName,
            error
        });
    }
    /**
     * Updates the state according to the change event of new last name
     * @param  {Event} changeEvent The changed lastname value from props
     */
    onChangeLastName = (lastName) => {

        const error = this.state.error
        error.lastName = this.validateName(lastName)

        this.setState({
            lastName,
            error
        });
    }
    /**
     * Remove the selected from the users list
     * @param  {String} id           The selected user ID
     */
    onRemoveItem = id => {
        const filtredData = this.state.displayedContacts.filter((item) => {
            return item.id !== id
        });

        const url = modelURL('/users/' + id);
        this.deleteData(url, filtredData, id);
    };
    /**
     * Handle pagination page click event
     * @param  {String} event  The page click event
     */
    handlePagination = (event) => {
        const url = modelURL('/users?page=' + Number(event.target.id));
        this.requestData(url);


    }
    /**
     * Inject users per page
     */
    injectPagination = () => {
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= this.state.totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers
    }

    /**
     * Handls search filter 
     */
    searchHandler = (event) => {

        let searchQuery = event.target.value.toLowerCase(),
            filteredBySearch = this.state.usersData.filter((user) => {
                let searchValue = user.first_name.toLowerCase();
                return searchValue.indexOf(searchQuery) !== -1;
            });
        this.setState({
            displayedContacts: filteredBySearch,
            searchTerm: searchQuery
        })
    }
    /**
     * Handles select sory by firstname and lastname
     */
    handleSortBy = event => {
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.value === 'firstName') {
            this.sortByFirstName();
        } else if (event.target.value === 'lastName')
            this.sortByLastName();
    };

    sortByFirstName = () => {
        const sortedByFirstName = this.state.displayedContacts.sort((a, b) => a.first_name.localeCompare(b.first_name))
        this.setState({
            displayedContacts: sortedByFirstName
        })
    }
    sortByLastName = () => {
        const sortedByLasttName = this.state.displayedContacts.sort((a, b) => a.last_name.localeCompare(b.last_name))
        this.setState({
            displayedContacts: sortedByLasttName
        })
    }
    /**
     * Describes the elements on the Users page
     * @return {String} HTML elements
     */
    render() {
        const { currentPage, usersPerPage, displayedContacts } = this.state;
        const pageNumbers = this.injectPagination()
        // Logic for the pagination
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        const currentUsers = displayedContacts.slice(indexOfFirstUser, indexOfLastUser);
        let content = null
        const renderUsers = currentUsers.map((user, index) => {
            return <div key={index}>
                <User
                    key={user.id}
                    userData={user}
                    onRemoveItem={() => this.onRemoveItem(user.id)}
                    onChangeFirstName={this.onChangeFirstName}
                    onChangeLastName={this.onChangeLastName}
                    onUpdateItem={() => this.onUpdateItem(user.id)}
                    nameError={this.state.error}
                />

            </div>;
        });
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <a key={number}
                    id={number}
                    onClick={this.handlePagination}>
                    {number}
                </a>
            );
        });

        if (!this.state.loading) {
            content = (
                <div>
                    <div className="card-container">
                        <Card className="row">
                            <CardContent >
                                <div className="card-card-container">
                                    <div className="card-header">
                                        <div className="card-user-action-container">
                                            <div className=" flex-2">
                                                <TextField
                                                    id="outlined-uncontrolled"
                                                    label="Search"
                                                    margin="normal"
                                                    type="search"
                                                    variant="outlined"
                                                    onChange={this.searchHandler}
                                                />
                                            </div>
                                            <div className="card-user-action-button card-header-filter">
                                                <div className="">
                                                    <form>
                                                        <FormControl>
                                                            <InputLabel htmlFor="age-helper">Sort By</InputLabel>
                                                            <Select
                                                                value={this.state.filterValue}
                                                                onChange={this.handleSortBy}
                                                                input={<Input name="filterValue"
                                                                    id="age-helper" />}>
                                                                <MenuItem value={'firstName'}>First
                                                                            name</MenuItem>
                                                                <MenuItem value={'lastName'}>Last
                                                                            name</MenuItem>
                                                            </Select>
                                                            <FormHelperText>Sort Users List </FormHelperText>
                                                        </FormControl>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-content card-scroll">
                                        {renderUsers}
                                    </div>
                                    <div className="card-footer">
                                        <div className="pagination">
                                            <span></span>
                                            {renderPageNumbers}
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

            )
        } else {
            content = (
                <PopupLoader
                    loading={this.state.loading}
                />
            )
        }

        return (
            <div>
                <div>
                    <Grid container spacing={24}>
                        <Grid item xs={12} className="search-bar">
                        <HeaderBar/>   
                        </Grid>
                        <Grid item xs={3}>
                        </Grid>
                        <Grid item xs={6}>
                            <div >
                                {content}
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
export default Users;