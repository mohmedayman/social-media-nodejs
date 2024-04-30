import React from 'react';

const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem('User');
        window.location.href = '/login'; 
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
