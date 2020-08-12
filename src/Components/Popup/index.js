import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Popup = ({open, handleClose, addPoint}) => {
  const [popupData, setPopupData]  = useState({
    name: '',
    description: '',
  });

  const handleAddPoint = () => {
    addPoint(popupData);
  };

  const handleChangeInputs = (e) => {
    setPopupData({...popupData, [e.target.id]: e.target.value});
  };

  return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add marker</DialogTitle>
        <DialogContent>
          <DialogContentText>Add marker to map</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={popupData.name}
            onChange={handleChangeInputs}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={popupData.description}
            onChange={handleChangeInputs}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddPoint} color="primary">
            Add marker
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default Popup;