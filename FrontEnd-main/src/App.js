import { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import QRcode from './pages/QRcode';
import AuthToken from './pages/AuthToken';
import Welcome from './pages/Welcome';
import Notification from './components/Notification';
import { customTheme } from './assets/mui-theme-config/theme-mui';
import { DataUserProvider } from './context/DataUserContext';

const App = () => {
	// hola
	const theme = useMemo(() => createTheme(customTheme), []);
	return (
		<>
			<ThemeProvider theme={theme}>
				<Container
					sx={{
						width: '100%',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<DataUserProvider>
						<Notification />
						<Routes>
							<Route
								path='/'
								element={<Navigate to='/login' replace={true} />}
							/>
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
							<Route path='/qrcode' element={<QRcode />} />
							<Route path='/authtoken' element={<AuthToken />} />
							<Route path='/welcome' element={<Welcome />} />
						</Routes>
					</DataUserProvider>
				</Container>
			</ThemeProvider>
		</>
	);
};

export default App;
