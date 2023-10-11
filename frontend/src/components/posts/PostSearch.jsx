import { TextField, Autocomplete, createFilterOptions, InputAdornment } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Search } from '@mui/icons-material';
import { selectPost } from '../../redux/actions';

const filter = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title
});

const PostSearch = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(null);
  const allPosts = useSelector((state) => state.postReducer.allPosts);

  const handleSelect = (value) => {
    if (value?.id || value === null) setValue(value);
    dispatch(selectPost(value));
  };

  return (
    <div style={{ minHeight: 64 }}>
      <Autocomplete
        aria-label="Search for title"
        value={value}
        onChange={(_, newValue) => handleSelect(newValue)}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options?.some((option) => inputValue === option.title);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${inputValue}"`
            });
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="posts-search-autocomplete-create"
        options={allPosts ? allPosts : []}
        getOptionLabel={(option) => option?.title || ''}
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        sx={{ width: 300, float: 'right' }}
        freeSolo
        margin="dense"
        size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            margin="dense"
            size="small"
            fullWidth
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment sx={{ marginRight: 0 }} position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            placeholder="Search for title"
          />
        )}
      />
    </div>
  );
};

export default PostSearch;
