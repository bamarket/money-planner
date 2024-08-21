import logo from "../../public/logo.png";
export const printReceipt = (record) => {
  console.log(record);
  const receiptHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Receipt</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 20px;
                  background-color: #f8f8f8;
              }
  
              .receipt-container {
                  background-color: #fff;
                  padding: 20px;
                  max-width: 400px;
                  margin: 0 auto;
                  border: 1px solid #ccc;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
  
              .receipt-header {
                  text-align: center;
                  margin-bottom: 20px;
              }
  
              .receipt-header img {
                  width: 100px;
                  margin-bottom: 10px;
              }
  
              .receipt-header h1 {
                  font-size: 18px;
                  margin: 0;
              }
                .company-info {
                  margin-top: 10px;
                  text-align: center;
                  font-size: 14px;
                  color: #333;
              }

              .company-info p {
                  margin: 2px 0;
              }
              .receipt-section {
                  margin-bottom: 15px;
              }
  
              .receipt-section h3 {
                  margin: 0 0 5px;
                  font-size: 16px;
                  text-transform: uppercase;
              }
  
              .receipt-section p {
                  margin: 0;
                  font-size: 14px;
                  line-height: 1.5;
              }
  
              .receipt-details {
                  width: 100%;
                  margin-bottom: 20px;
                  border-collapse: collapse;
                  font-size: 14px;
              }
  
              .receipt-details th, .receipt-details td {
                  padding: 5px 0;
                  text-align: left;
              }
  
              .receipt-footer {
                  text-align: center;
                  font-size: 12px;
                  color: #666;
                  border-top: 1px solid #ccc;
                  padding-top: 10px;
                  margin-top: 10px;
              }
          </style>
      </head>
      <body>
          <div class="receipt-container">
                <div class="company-info">
                  <h3>BA Market</h3>
              </div>
              <div class="receipt-header">
                  <h1>Pre-Order Confirmation</h1>
                  <p>Receipt / Válido Como Recibo</p>
              </div>



              <div class="receipt-section">
                  <h3>Sender / Cliente</h3>
                  <p>Name: ${record?.sender?.firstName} ${
    record?.sender?.middleName || ""
  } ${record?.sender?.lastName}</p>
                  <p>Country: ${record?.sender?.country}</p>
                  <p>City: ${record?.sender?.city}</p>
                  <p>Street: ${record?.sender?.street || "N/A"}</p>
                  <p>Zipcode: ${record?.sender?.zipcode || "N/A"}</p>
                  <p>Email: ${record?.sender?.email || "N/A"}</p>
                  <p>Phone: ${record?.sender?.phone}</p>
              </div>
  
              <div class="receipt-section">
                  <h3>Recipient / Beneficiario</h3>
                  <p>Name: ${record?.receiver?.firstName} ${
    record?.receiver?.middleName || ""
  } ${record?.receiver?.lastName}</p>
                  <p>Country: ${record?.receiver?.country}</p>
                  <p>City: ${record?.receiver?.city}</p>
                  <p>Street: ${record?.receiver?.street || "N/A"}</p>
                  <p>Zipcode: ${record?.receiver?.zipcode || "N/A"}</p>
                  <p>Email: ${record?.receiver?.email || "N/A"}</p>
                  <p>Phone: ${record?.receiver?.phone}</p>
              </div>
  
              <div class="receipt-section">
                  <h3>Transaction Details</h3>
                  <p>Sending Amount: ${record?.sendingAmount} ${
    record?.sendingCurrency
  }</p>
                  <p>Receiving Amount: ${record?.receivingAmount} ${
    record?.recievingCurrency
  }</p>
                  <p>Fee: ${record?.usdFee}</p>
                  <p>Fee after conversion: ${record?.fee} ${
    record?.recievingCurrency
  }</p>
                  <p>Total Amount: ${record?.totalAmount} ${
    record?.recievingCurrency
  }</p>
              </div>
  
              <div class="receipt-section">
                  <h3>Transaction Date</h3>
                  <p>${new Date(record?.createdAt).toLocaleString()}</p>
              </div>
  
              <div class="receipt-section">
                  <h3>Transaction ID</h3>
                  <p>${record?._id}</p>
              </div>
  
              <div class="receipt-footer">
                  <p>Recipient may recieve less due to fees charged by hte recipient's bank and foriegn taxes</p>
              </div>
              <div class="receipt-footer">
                  <p>Please verify the information above to ensure it is correct before continuing with your transaction.</p>
              </div>
          </div>
      </body>
      </html>
    `;

  const printWindow = window.open("", "_blank", "width=800,height=600");
  printWindow.document.write(receiptHTML);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};
