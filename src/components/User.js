import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';


//  LOADER IS MISSING!!!!!!!
/**
 * Representing the user component functionality
 */
class User extends Component {
    /**
     * Updates the state according to the change event of new first name
     * @param  {Event} changeEvent The change event of the first name
     */
    onChangeFirstName = (changeEvent) => {
        const newFirstName = changeEvent.target.value;
        this.props.onChangeFirstName(newFirstName);
    }

    /**
     * Updates the state according to the change event of new last name
     * @param  {Event} changeEvent The change event of the last name
     */
    onChangeLastName = (changeEvent) => {
        const newLastName = changeEvent.target.value;
        this.props.onChangeLastName(newLastName);
    }

    /**
     * Remnove the selected from the users list
     * @param  {String} id      The selected user ID
     */
    onRemoveItem = id => {
        this.props.onRemoveItem(id)
    };

    /**
    * Update the selected users attributes
    * @param  {String} id       The selected user ID
    */
    onUpdateItem = (id) => {
        this.props.onUpdateItem(id);
    };

    /**
    * Describes the elements on the user compoentn
    * @return {String} HTML elements
    */
    render() {
        return (
            <div>
                <Card >
                    <CardContent>
                        <div className="form-user-card-container">
                            <div className="card-user-avatar">
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="100"
                                    width="100"
                                    image={this.props.userData.avatar}
                                    title="Contemplative Reptile"
                                />
                            </div>
                            <div className="card-user-content">
                                <ExpansionPanel key={this.props.userData.id}>
                                    <ExpansionPanelSummary expandIcon={<EditIcon />}>
                                        <div className="card-user-name">
                                            <Typography className="center-container">
                                                {this.props.userData.first_name + " " + this.props.userData.last_name}
                                            </Typography>
                                        </div>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <TextField
                                            id="standard-name"
                                            label="First Name"
                                            defaultValue={this.setState.firstName ? this.setState.firstName : this.props.userData.first_name}
                                            margin="normal"
                                            onChange={this.onChangeFirstName}
                                            helperText={this.props.nameError.firstName}
                                        />
                                        <TextField
                                            id="standard-name"
                                            label="Last Name"
                                            defaultValue={this.props.userData.last_name}
                                            margin="normal"
                                            onChange={this.onChangeLastName}
                                            helperText={this.props.nameError.lastName}
                                        />
                                        <IconButton onClick={() => this.onUpdateItem(this.props.userData.id)}
                                            disabled={this.props.nameError.firstName != null || this.props.nameError.lastName != null}
                                            style={{ backgroundColor: 'transparent' }} >
                                            <DoneIcon />
                                        </IconButton>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </div>
                        </div>
                    </CardContent>
                    <CardActions>
                        <div className="card-user-action-container">
                            <div className="card-user-action-content"></div>
                            <div className="card-user-action-button">
                                <DeleteButton variant="contained" color="primary" onClick={() => this.onRemoveItem(this.props.userData.id)}>
                                    Delete
                                </DeleteButton>
                            </div>
                        </div>
                    </CardActions>
                </Card>
            </div>
        );
    }
}
User.propTypes = {
    userData: PropTypes.object.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onChangeFirstName: PropTypes.func.isRequired,
    onChangeLastName: PropTypes.func.isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    nameError: PropTypes.object.isRequired,
};

const DeleteButton = withStyles({
    root: {
        background: '#1976D2',
        borderRadius: 3,
        "&:hover": {
            backgroundColor: "#2196F3"
        },
        border: 0,
        color: 'white',
        height: 38,
        width: 80,
        padding: '0 30px',
    },

})(Button);

export default User;