import React, { useState } from 'react';
import QRCode from 'qrcode.react';

function QRCodeGenerator () {
    const [text, setText] = useState(''); // The text for the QR code

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div className='login-qr-parent'>
            <QRCode value='http://192.168.8.177:8060' className='login-qr-code' />
            <p className='login-qr-desc'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic totam voluptate velit, corporis suscipit, amet maxime, voluptas nam ad obcaecati sunt illo saepe aliquid quas rem! Ut pariatur asperiores voluptatem?</p>
            <p className='login-qr-desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo fugiat eveniet dolorem ea necessitatibus, voluptates libero provident nesciunt voluptatem ullam sed, aperiam illum beatae, dolore perspiciatis ipsam fugit earum recusandae?</p>
        </div>
    );
}

export default QRCodeGenerator;