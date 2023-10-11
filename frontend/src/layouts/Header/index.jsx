import { Add, Edit } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { selectPost, setPreEditPost } from '../../redux/actions';

function Header() {
  const dispatch = useDispatch();

  const handleAddClick = () => {
    dispatch(selectPost({}));
  };

  const handleEditClick = () => {
    dispatch(setPreEditPost(true));
  };
  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Post Manager Tool
        </Typography>
        <Tooltip title="Search and edit post">
          <IconButton onClick={handleEditClick} aria-label="Search and edit post">
            <Edit sx={{ color: '#fff' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Create new post">
          <IconButton onClick={handleAddClick} aria-label="Create new post">
            <Add sx={{ color: '#fff' }} />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
