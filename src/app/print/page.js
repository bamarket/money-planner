'use client'; // Add this line to make this component a client component

import React from 'react';

const ReceiptPage = () => {
    const handlePrint = async () => {
        const receiptData = `
            <div>
                <h1>Receipt</h1>
                <p>Item 1: $10</p>
                <p>Item 2: $20</p>
                <p>Total: $30</p>
            </div>
        `;

        try {
            const response = await fetch('https://money-planner-server.vercel.app/api/print/print-receipt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ receiptData }),
            });

            if (response.ok) {
                console.log('Receipt is being printed');
                // Optionally show a success message or update the UI
            } else {
                console.error('Failed to start printing');
                // Optionally show an error message to the user
            }
        } catch (error) {
            console.error('Error while printing:', error);
            // Optionally show an error message to the user
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Billing Receipt</h1>
            <button onClick={handlePrint} style={{ padding: '10px', fontSize: '16px' }}>
                Print Receipt
            </button>
        </div>
    );
};

export default ReceiptPage;
