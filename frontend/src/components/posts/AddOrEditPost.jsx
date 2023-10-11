import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import {
  createNewPost,
  resetAddPost,
  resetEditPost,
  searchForPreEditPost,
  setPreEditPost,
  updatePost
} from '../../redux/actions';
import { Search } from '@mui/icons-material';
import { useDebounce } from '../../hooks/useDebounce';

const AddOrEditPost = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const [data, setData] = useState({});

  const preEditPost = useSelector((state) => state.postReducer.preEditPost);
  const addNew = useSelector((state) => state.postReducer.addNewPost);
  const editPost = useSelector((state) => state.postReducer.editPost);

  useEffect(() => {
    setSearch('');
  }, [preEditPost]);

  console.log('addNew', addNew);

  useEffect(() => {
    setData({ ...addNew, userId: '', body: '' });
  }, [addNew]);

  useEffect(() => {
    setData(editPost);
  }, [editPost]);

  const handleDataChange = useCallback((key, value) => {
    let temp = { ...data };
    temp[key] = value;
    setData(temp);
  });

  const handleClose = () => {
    if (preEditPost) {
      dispatch(setPreEditPost(false));
    }
    if (data.id) {
      dispatch(resetEditPost());
    }
    if (typeof addNew === 'object' && 'title' in addNew) {
      dispatch(resetAddPost());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.id) {
      dispatch(updatePost(data));
    } else {
      dispatch(createNewPost(data));
    }
  };

  const handleSearch = (value) => {
    setSearchLoading(true);
    setSearch(value);
  };

  const debouncedValue = useDebounce(search, 1000);

  useEffect(() => {
    setSearchLoading(false);
    dispatch(searchForPreEditPost(debouncedValue));
  }, [debouncedValue]);

  return (
    <Dialog
      fullWidth
      maxWidth={'sm'}
      open={Boolean(
        preEditPost || (typeof addNew === 'object' && 'title' in addNew) || editPost?.id
      )}
      onClose={handleClose}>
      <DialogTitle>
        {preEditPost
          ? 'Search a title'
          : editPost?.id
          ? `Update post #${editPost?.id}`
          : 'Create new post'}
      </DialogTitle>
      <DialogContent>
        <form id="form-add-or-update-post" onSubmit={handleSubmit}>
          {preEditPost ? (
            <div style={{ position: 'relative' }}>
              <TextField
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: <Search htmlColor="gray" sx={{ marginRight: 1 }} />,
                  inputProps: { 'data-testid': 'add-or-edit-post-search' }
                }}
                size="small"
                autoFocus
                margin="dense"
                placeholder="Search for exact title to edit"
                type="text"
                fullWidth
                required
              />
              <LinearProgress
                sx={{
                  position: 'absolute',
                  bottom: '4px',
                  right: '2px',
                  width: '99%',
                  visibility: searchLoading ? 'visible' : 'hidden'
                }}
              />
            </div>
          ) : (
            <>
              <TextField
                value={data?.userId ? data.userId : ''}
                onChange={(e) => handleDataChange('userId', e.target.value)}
                InputProps={{
                  inputProps: { min: 1 }
                }}
                size="small"
                autoFocus
                margin="dense"
                label="User ID"
                type="number"
                fullWidth
                required
              />
              <TextField
                value={data?.title ? data.title : ''}
                onChange={(e) => handleDataChange('title', e.target.value)}
                size="small"
                margin="normal"
                label="Title"
                type="text"
                fullWidth
                multiline
                required
              />
              <TextField
                value={data?.body ? data.body : ''}
                onChange={(e) => handleDataChange('body', e.target.value)}
                margin="normal"
                size="small"
                label="Body"
                type="text"
                fullWidth
                multiline
                rows={4}
                required
              />
            </>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {!preEditPost && (
          <Button type="submit" form="form-add-or-update-post" color="primary" variant="contained">
            {editPost?.id ? 'Update' : 'Create'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddOrEditPost;
