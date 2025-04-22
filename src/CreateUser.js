import React, { useState } from 'react';
import axios from 'axios';

function CreateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        };

        // Make POST request to Rails API
        axios.post('http://localhost:3001/users', { user: userData })
            .then((response) => {
                setSuccessMessage('User created successfully!');
                setName('');
                setEmail('');
                setPassword('');
                setPasswordConfirmation('');
            })
            .catch((error) => {
                setErrorMessage('There was an error creating the user:')
                // console.error('There was an error creating the user:', error);
            });
    };

    return (
        <div>
            <h2>Create a New User</h2>

            {/* Display success or error message */}
            {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
            {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}


            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
                </div>
                <button type="submit">Create User</button>
            </form>
        </div>
    );
}

export default CreateUser;
