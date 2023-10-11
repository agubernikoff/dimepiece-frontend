import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <Box
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      display={'flex'}
      minHeight={'100vh'}
    >
      <div>
        <Typography variant="h3">404 Page not found</Typography>
      </div>
      <div style={{ marginTop: 18 }}>
        <Button component={Link} to="/" variant="contained">
          Back to home
        </Button>
      </div>
    </Box>
  );
}

export default PageNotFound;
