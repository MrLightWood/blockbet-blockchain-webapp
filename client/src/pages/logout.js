import React from 'react';

function Logout(props) {
    props.state.userActions.logout();
    return (
        <>
            <h1>LOGOUT</h1>
        </>
    )
}

export default Logout;