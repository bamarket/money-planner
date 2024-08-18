const printReceipt = (transaction) => {
    const receiptHtml = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            .receipt-container {
              max-width: 400px;
              margin: auto;
              border: 1px solid #ddd;
              padding: 20px;
              border-radius: 5px;
              background-color: #f9f9f9;
            }
            .receipt-header {
              text-align: center;
              margin-bottom: 20px;
            }
            .receipt-item {
              margin-bottom: 10px;
            }
            .receipt-footer {
              text-align: center;
              margin-top: 20px;
              font-size: 14px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="receipt-header">
              <h2>Receipt</h2>
            </div>
            <div class="receipt-item">
              <strong>Sender:</strong> ${transaction.sender.firstName} ${transaction.sender.lastName}
            </div>
            <div class="receipt-item">
              <strong>Receiver:</strong> ${transaction.receiver.firstName} ${transaction.receiver.lastName}
            </div>
            <div class="receipt-item">
              <strong>Sending Amount:</strong> ${transaction.sendingAmount} ${transaction.sendingCurrency}
            </div>
            <div class="receipt-item">
              <strong>Receiving Amount:</strong> ${transaction.receivingAmount} ${transaction.recievingCurrency}
            </div>
            <div class="receipt-item">
              <strong>Made By:</strong> ${transaction.madeBy}
            </div>
            <div class="receipt-footer">
              Thank you for your transaction!
            </div>
          </div>
          <script>
            window.print();
            setTimeout(() => window.close(), 1000);
          </script>
        </body>
      </html>
    `;
  
    const printWindow = window.open("", "_blank");
    printWindow.document.write(receiptHtml);
    printWindow.document.close();
  };
  