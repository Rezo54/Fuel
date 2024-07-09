import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import FuelKiloForm from './FuelKiloForm';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Authenticated user UID:', user.uid);
        setLoading(false); // User is authenticated, stop loading
      } else {
        navigate('/login'); // Redirect to login if no user is authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <h2>Fuel and Kilometer Capture Form</h2> */}
      <FuelKiloForm />
    </div>
  );
};

export default Dashboard;
