import { createContext, useState } from 'react';

export const DataUserContext = createContext();

const initialData = {
	idUser: '',
	name: '',
	lastName: '',
	email: '',
	isVerificated: false,
};

const initialNotification = {
	type: '',
	messagge: '',
	open: false,
};

export const DataUserProvider = ({ children }) => {
	const [dataUser, setDataUser] = useState(initialData);
	const [notification, setNotification] = useState(initialNotification);
	const [qrCodeKey, setQRCodeKey] = useState('');

	return (
		<DataUserContext.Provider
			value={{ dataUser, setDataUser, notification, setNotification, qrCodeKey, setQRCodeKey }}
		>
			{children}
		</DataUserContext.Provider>
	);
};
