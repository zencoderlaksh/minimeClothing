import DodoPayments from 'dodopayments';
import dotenv from 'dotenv';

dotenv.config();

// Ensure DODO_PAYMENTS_API_KEY is defined in .env
const dodo = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY || "YOUR_DODO_PAYMENTS_API_KEY",
  environment: 'test_mode', // or 'live_mode'
});

export default dodo;
