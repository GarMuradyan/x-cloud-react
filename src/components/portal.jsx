import React from 'react';
import ReactDOM from 'react-dom';

function Portal ({ element }) {
    return ReactDOM.createPortal(
        <>{element}</>,
        document.getElementById('root')
    );
}

export default Portal;