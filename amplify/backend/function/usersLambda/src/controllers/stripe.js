const stripe = require("stripe")(process.env.STRIPE_SK);
const UserService = require("../services/user");

async function handleWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
    case "charge.succeeded":
      if (event.data.object.client_reference_id) {
        await handleSuccessfulPayment(event.data.object);
      }
      break;
    case "charge.refunded":
      await handleRefund(event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({received: true});
  } catch (error) {
    console.error(`Error processing webhook: ${error.message}`);
    res.status(500).send(`Server Error: ${error.message}`);
  }
}

async function handleSuccessfulPayment(charge) {
  const userSk = charge.client_reference_id;
  await UserService.updateUserPaymentStatus(userSk, true);
  console.log(`Payment successful for user ${userSk}`);
}

async function handleRefund(charge) {
  const userSk = charge.client_reference_id;
  await UserService.updateUserPaymentStatus(userSk, false);
  console.log(`Refund processed for user ${userSk}`);
}

module.exports = { handleWebhook };