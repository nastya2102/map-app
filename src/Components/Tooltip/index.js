import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const CustomTooltip = ({name, description}) => {
  return (
    <CardContent>
      <Typography color="textSecondary" gutterBottom>Name</Typography>
      <Typography variant="h5" component="h2" color="textPrimary">{name}</Typography>
      {description && <>
        <Typography color="textSecondary" gutterBottom>Description</Typography>
        <Typography variant="h5" component="h2" color="textPrimary">{description}</Typography>
      </>}
    </CardContent>
  );
};

export default CustomTooltip;