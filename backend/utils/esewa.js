const crypto = require('crypto');
const https = require('https');

const MERCHANT_CODE = process.env.ESEWA_MERCHANT_CODE;
const SECRET_KEY = process.env.ESEWA_SECRET_KEY;
const FORM_URL = process.env.ESEWA_FORM_URL;
const STATUS_URL = process.env.ESEWA_STATUS_URL;

// eSewa's required canonical message: comma-separated key=value pairs,
// in exactly this field order, HMAC-SHA256'd with the secret key, base64 output.
const buildSignature = (totalAmount, transactionUuid, productCode) => {
  const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
  return crypto.createHmac('sha256', SECRET_KEY).update(message).digest('base64');
};

// Builds the full set of form fields the frontend must POST (as a real
// <form> submit, not fetch/axios) to redirect the browser to eSewa's payment page.
const buildPaymentForm = ({ amount, transactionUuid, successUrl, failureUrl }) => {
  const totalAmount = amount; // no tax/service/delivery charges in this app
  const signature = buildSignature(totalAmount, transactionUuid, MERCHANT_CODE);

  return {
    formUrl: FORM_URL,
    fields: {
      amount: String(amount),
      tax_amount: '0',
      total_amount: String(totalAmount),
      transaction_uuid: transactionUuid,
      product_code: MERCHANT_CODE,
      product_service_charge: '0',
      product_delivery_charge: '0',
      success_url: successUrl,
      failure_url: failureUrl,
      signed_field_names: 'total_amount,transaction_uuid,product_code',
      signature,
    },
  };
};

// Verifies the base64 `data` query param eSewa redirects back with on success.
const decodeAndVerifyCallback = (base64Data) => {
  const json = JSON.parse(Buffer.from(base64Data, 'base64').toString('utf8'));
  const expectedSignature = buildSignature(json.total_amount, json.transaction_uuid, json.product_code);
  if (expectedSignature !== json.signature) {
    throw new Error('eSewa callback signature mismatch');
  }
  return json;
};

// The redirect alone isn't trustworthy on its own (no server-to-server
// guarantee) — always confirm against eSewa's status API before granting access.
const checkTransactionStatus = (totalAmount, transactionUuid) => {
  const url = `${STATUS_URL}?product_code=${MERCHANT_CODE}&total_amount=${totalAmount}&transaction_uuid=${transactionUuid}`;
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (err) {
            reject(err);
          }
        });
      })
      .on('error', reject);
  });
};

module.exports = { buildPaymentForm, decodeAndVerifyCallback, checkTransactionStatus };
