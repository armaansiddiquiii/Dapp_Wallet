import { ed25519 } from '@noble/curves/ed25519';
import bs58 from 'bs58';
import React from 'react';
import ButtonComponent from './Button';

export function SignMessage({wallet}) {
    const { publicKey, signMessage } = wallet;

    async function onClick() {
        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');
        
        const message = document.getElementById("message").value;
        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
        alert('success', `Message signature: ${bs58.encode(signature)}`);
    };

    return (
        <div className="sign-message">
            <h1>Sign Message</h1>
            <div className='sign-message-input'>
                <input style={{padding: '0.5rem 1rem', borderRadius: '20px'}} id="message" type="text" placeholder="Message" />
                {/* <button onClick={onClick}>
                    
                </button> */}
                <ButtonComponent onClickFunction={onClick} text={"Sign Message"} />
            </div>
        </div>
    );
};