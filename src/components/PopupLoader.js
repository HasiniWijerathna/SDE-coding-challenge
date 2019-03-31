import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardMedia from '@material-ui/core/CardMedia';
import spinner from '../resources/spinner.gif'; 

class PopupLoader extends React.Component {
    state = {
        open: false,
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.loading}
                    maxWidth='xs'
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Please wait..."}</DialogTitle>
                    <DialogContent>
                            <CardMedia className="error-card-container"
                                component="img"
                                alt="Please wait"
                                image={spinner}
                                title="Please wait"
                                onClick={this.navigateToHome}
                            />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

PopupLoader.propTypes = {
    loading: PropTypes.bool.isRequired,
};


export default PopupLoader;