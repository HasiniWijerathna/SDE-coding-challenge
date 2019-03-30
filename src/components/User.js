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
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';


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
     * @param  {String} id           The selected user ID
     */
    onRemoveItem = id => {
        this.props.onRemoveItem(id)
    };

    /**
    * Update the selected users attributes
    * @param  {String} id           The selected user ID
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
                <ExpansionPanel key={this.props.userData.id}>
                    <ExpansionPanelSummary expandIcon={<EditIcon />}>
                       <Grid container spacing={24}>
                            <Grid item xs={6}>
                                <Grid container spacing={24}>
                                    <Grid item xs={4}>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"

                                            height="140"
                                            src={this.props.userData.avatar}
                                            title="Contemplative Reptile"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className="center-container">
                                            {this.props.userData.first_name + " " + this.props.userData.last_name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={24}>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={24}>

                            <Grid item xs={3}>
                                <TextField
                                    id="standard-name"
                                    label="First Name"
                                    defaultValue={this.setState.firstName ? this.setState.firstName : this.props.userData.first_name}
                                    margin="normal"
                                    onChange={this.onChangeFirstName}
                                    helperText={this.props.nameError.firstName}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="standard-name"
                                    label="Last Name"
                                    defaultValue={this.props.userData.last_name}
                                    margin="normal"
                                    onChange={this.onChangeLastName}
                                    helperText={this.props.nameError.lastName}
                                />

                                <IconButton onClick={() => this.onRemoveItem(this.props.userData.id)} >
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton onClick={() => this.onUpdateItem(this.props.userData.id)} disabled={this.props.nameError.firstName != null || this.props.nameError.lastName != null } >
                            <DoneIcon />
                        </IconButton>
                            </Grid>
                        </Grid>

                    </ExpansionPanelDetails>

                </ExpansionPanel>

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


export default User;


