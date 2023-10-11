import { Delete, Edit } from '@mui/icons-material';
import {
  Avatar,
  Typography,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Tooltip
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { number, string } from 'prop-types';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { setDeletePost, setEditPost } from '../../redux/actions';

const PostCardItem = ({ userId, id, title, body }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setEditPost({ userId, id, title, body }));
  };

  const handleDelete = () => {
    dispatch(setDeletePost({ userId, id, title, body }));
  };

  return (
    <Card id={`post-item-${id}`} sx={{ marginBottom: 2 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ width: 32, height: 32, fontSize: 14, bgcolor: blue[700] }}
            aria-label="user-id">
            {userId}
          </Avatar>
        }
        action={
          <>
            <Tooltip title="Edit post" placement="top">
              <IconButton aria-label="edit" size="medium" color="primary" onClick={handleEdit}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete post" placement="top">
              <IconButton aria-label="edit" size="medium" color="error" onClick={handleDelete}>
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        }
        title={
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        }
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <Typography>{body}</Typography>
      </CardContent>
    </Card>
  );
};

PostCardItem.propTypes = {
  userId: number.isRequired,
  id: number.isRequired,
  title: string.isRequired,
  body: string.isRequired
};

export default memo(PostCardItem);
