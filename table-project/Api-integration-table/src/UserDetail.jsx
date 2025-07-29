import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, CircularProgress, Card, CardContent } from '@mui/material';
import styles from './UserDetail.module.css';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress />;

  return (
    <Box p={3} className={styles.detailPage}>
      <Card className={styles.userCard}>
        <CardContent>
          <Typography variant="h4" gutterBottom>User Detail</Typography>
          <Typography variant="h6">Name: {user.firstName} {user.lastName}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Phone: {user.phone}</Typography>
          <Typography>
            Address: {user.address?.address}, {user.address?.city}, {user.address?.country}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserDetail;
