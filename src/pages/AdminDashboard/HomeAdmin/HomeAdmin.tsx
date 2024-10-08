import { Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
const cardStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
};
export default function HomeAdmin() {
    const [departmentsTotal, setDepartmentsTotal] = useState(0);
    const [employeesTotal, setEmployeesTotal] = useState(0);
    const [activeComponent, setActiveComponent] = useState('');
    const attendanceTotal = 85;
    const handleComponentChange = (component) => {
        setActiveComponent(component);
        setShowWelcome(false);
    };


    useEffect(() => {
        // Fetch data for departments
        const fetchDepartments = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/departments/get-all-departments');
                const data = await response.json();

                if (data.status === 'success') {
                    // Set the total number of departments
                    setDepartmentsTotal(data?.data?.length);
                } else {
                    console.error('Error fetching departments:', data.status);
                }
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        // Fetch data for employees
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/users/get-all-users');
                const data = await response.json();

                if (data.status === 'success') {
                    // Set the total number of employees
                    setEmployeesTotal(data?.data?.length);
                } else {
                    console.error('Error fetching employees:', data.status);
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        // Call both fetch functions
        fetchDepartments();
        fetchEmployees();
    }, []);
  return (
    <div>
          <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                  <Card onClick={() => handleComponentChange('addDepartments')} style={{ backgroundColor: '#2196f3', ...cardStyles }}>
                      <CardContent>
                          <GroupIcon fontSize="large" style={{ color: 'white' }} />
                          <Typography variant="h5" component="div" style={{ color: 'white' }}>
                              Departments
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary">
                              {departmentsTotal}
                          </Typography>
                      </CardContent>
                  </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                  <Card onClick={() => handleComponentChange('userProfile')} style={{ backgroundColor: '#4caf50', ...cardStyles }}>
                      <CardContent>
                          <PersonIcon fontSize="large" style={{ color: 'white' }} />
                          <Typography variant="h5" component="div" style={{ color: 'white' }}>
                              Employees
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary">
                              {employeesTotal}
                          </Typography>
                      </CardContent>
                  </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                  <Card style={{ backgroundColor: '#ff9800', ...cardStyles }}>
                      <CardContent>
                          <EventAvailableIcon fontSize="large" style={{ color: 'white' }} />
                          <Typography variant="h5" component="div" style={{ color: 'white' }}>
                              Attendance
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary">
                              {attendanceTotal}%
                          </Typography>
                      </CardContent>
                  </Card>
              </Grid>
          </Grid>
    </div>
  )
}
