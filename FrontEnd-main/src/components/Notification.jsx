import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef, useContext } from 'react';
import { DataUserContext } from '../context/DataUserContext';

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Notification = () => {
	const { notification, setNotification } = useContext(DataUserContext);
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setNotification(false);
	};

	return (
		<>
			{notification.type === 'success' && (
				<Snackbar
					autoHideDuration={3000}
					onClose={handleClose}
					open={notification.open}
				>
					<Alert
						severity='success'
						onClose={handleClose}
						sx={{ width: '100%' }}
					>
						{notification.messagge}
					</Alert>
				</Snackbar>
			)}
			{notification.type === 'error' && (
				<Snackbar
					autoHideDuration={3000}
					onClose={handleClose}
					open={notification.open}
				>
					<Alert severity='error' onClose={handleClose} sx={{ width: '100%' }}>
						{notification.messagge}
					</Alert>
				</Snackbar>
			)}

			{/* <Alert severity='error'>This is an error message!</Alert>
			<Alert severity='warning'>This is a warning message!</Alert>
			<Alert severity='info'>This is an information message!</Alert>
			<Alert severity='success'>This is a success message!</Alert> */}
		</>
	);
};

export default Notification;
