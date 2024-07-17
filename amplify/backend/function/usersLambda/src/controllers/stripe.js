const stripe = require("stripe")(process.env.STRIPE_SK);
const UserService = require("../services/user");

async function handleWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook Error");
    return res.status(400).send("Webhook Error");
  }

  // Handle the event
  try {
    if (event.type == "checkout.session.completed") {
      if (event.data.object.client_reference_id) {
        await handleSuccessfulPayment(event.data.object);
        res.status(200).json({success: true});
      } else {
        res.status(400).json({success: false, error: "User did not submit payment with a client_reference_id. Aborting."});
      }
    } else {
      res.status(400).json({success: false, error: "Received unexpected or undefined event type; expected checkout.session.completed."});
    }
  } catch (error) {
    console.error("Error processing webhook");
    res.status(500).send("Server Error encountered when processing webhook");
  }
}

async function handleSuccessfulPayment(charge) {
  console.log("Received successful payment; now handling update of DynamoDB");
  const userSk = charge.client_reference_id;
  await UserService.updateUserPaymentStatus(userSk, true, charge.payment_intent);
  console.log(`Payment successful for user ${userSk} with ID ${charge.client_reference_id}`);
}

module.exports = { handleWebhook };