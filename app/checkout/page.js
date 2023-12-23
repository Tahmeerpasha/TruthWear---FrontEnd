'use client'
import CheckoutForm from '@/components/CheckoutForm'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import PaymentForm from '@/components/PaymentForm'
import React from 'react'

const stripePromise = loadStripe('pk_test_51OQQW4SIR3mBMPrhBI95K6pDvDsH6l9d8BEFfULBTK1T7iQyqdM1qxEaF0KyRboRY6wu2Z0fOv4lcDrWjNxHGBPs00xtdE36U5')
const page = () => {
  // const cartItems = useSelector((state) => state.cart.cartItems);
  // const dispatch = useDispatch();
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const stripe = await stripePromise;
  //     const lineItems = cartItems.map((item) => ({
  //       price: item.product.price + '', // Access product price from the nested object
  //       quantity: item.qty,
  //       // Add other necessary product details from item.product
  //     }));

  //     const session = await stripe.redirectToCheckout({
  //       lineItems,
  //       mode: 'payment',
  //       successUrl: window.location.origin + '/success',
  //     });

  //     window.location.href = session.url;
  //   } catch (error) {
  //     console.error('Error creating Stripe session:', error);
  //     // Handle errors gracefully
  //   }
  // };
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default page