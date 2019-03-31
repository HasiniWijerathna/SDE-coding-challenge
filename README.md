
# SDE Coding Challange

A React JS application to fetch users from API.

## Getting Started
### Instalation

```sh
$ $ git clone git@github.com:HasiniWijerathna/SDE-coding-challenge.git
$ cd SDE-coding-challenge
$ npm install 
```

### Development

This application requires [Node.js] 84+ to run.
Install the dependencies and devDependencies and start the server.

```sh
$ npm start
```

### Developer Testing

This application use React Testing Library for develoepr testing
```sh
$ npm test
```


### Pre requisites

- Node.js (v6.0.0 or greater)

### Technologies and Stack

* React JS
* Material UI
* Axios JS
* React Tesing Library/ Jest

### Features
1. Includes a Registration and Login page which takes user email and password
*  Registration validation
     > Pattern:
Email validation
password at least should contains 6 characters
Password and confirm password should be matched

2. After successful login attempt navigates to users page where users are listed down
3. Use delayed response of 5seconds to show a loader icon on a popup*
4. The users List page contains following
    * Search by first name and filtwerwerwer
    * A Tabular view to show each items divided by rows
    * Add Pagination support. Each page contains have maximum 1 item to show.
5. The individual rows of resources in the list, contains following
    * user profile image/ avatar, first name, last name
      *  Each row contains option to Edit the item, or Delete the item from the list
    * On click of Edit provide a collapsible section with editable form to edit first name and last name
      *  Name validation
        > Pattern:
Names should not contain any digit or special charchter
Names must start with capital case (e.g - John)
First and last name should not be multi-word input (e.g: A valid first name attribute should not look like John Doe)
Once updated, the row reflects the change

         *  Each row contains option to Edit the item, or Delete the item from the list
* On click of Delete
The item can be deleted from the list of users
On click of Logout button, the user natigates to login page
If users try to navigate to a route which does not exists, show a custom error message

### Assumptions

1. Logged in user can delete and edit any of the listed users

### Limitations
1. Search and sort actions are performed on currently displayed user records
2. **API** does not persist edit and delete actions (on page reload)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


