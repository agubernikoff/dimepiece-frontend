import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from '@mui/material';
import { useEffect, useState } from 'react';
import { removePost, resetDeletePost } from '../../redux/actions';

const DeletePostFeedback = () => {
  const dispatch = useDispatch();

  const [feedback, setFeedback] = useState('');

  const deletePost = useSelector((state) => state.postReducer.deletePost);

  useEffect(() => {
    setFeedback('');
  }, [deletePost]);

  const handleClose = () => {
    dispatch(resetDeletePost());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(removePost(feedback, deletePost.id));
  };

  return (
    <Dialog fullWidth maxWidth={'sm'} open={Boolean(deletePost?.id)} onClose={handleClose}>
      <DialogTitle>Are you sure you want to delete the below post ?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <strong>User ID:</strong>&nbsp;
          {deletePost?.userId}
          <br />
          <strong>Title:</strong>&nbsp;{deletePost?.title}
          <br />
          <strong>Body:</strong>&nbsp;{deletePost?.body}
        </DialogContentText>
        <form id="form-delete-post" onSubmit={handleSubmit}>
          <TextField
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            margin="normal"
            size="small"
            label="Feedback"
            type="text"
            fullWidth
            multiline
            rows={4}
            required
            helperText="Please provide valuable feedback to delete this post!"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="form-delete-post" color="primary" variant="contained">
          {'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePostFeedback;
