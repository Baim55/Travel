// src/controllers/paymentsController.js
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  const { totalAmount, metadata } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(totalAmount * 100),
            product_data: {
              name: "Tour Booking",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/success?tourId=${metadata.tourId}&userId=${metadata.userId}&date=${metadata.date}&time=${metadata.time}&guestCount=${metadata.guestCount}`,
      cancel_url: `http://localhost:5173/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Stripe session creation failed" });
  }
};
