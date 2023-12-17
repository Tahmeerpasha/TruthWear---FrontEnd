'use client'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

const PaymentForm = () => {
  // Redux state for card information
  const cardInfo = useSelector((state) => state.cardInfo);
  const dispatch = useDispatch();

  // State for mobile view collapse
  const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(true);

  // Function to toggle mobile view collapse
  const toggleSummaryCollapse = () => {
    setIsSummaryCollapsed(!isSummaryCollapsed);
  };

  return (
    <div className="payment-page">
      <div className="payment-section">
        <h2>Payment</h2>
        <div className="card-info">
          <h3>Card Information</h3>
          <div className="name-section">
            <h4>Name on Card</h4>
            <input
              type="text"
              placeholder="Enter name on card"
              value={cardInfo.name}
              onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
            />
            {/*icon later*/}
          </div>
          <div className="card-number">
            <h4>Card Number</h4>
            <input
              type="text"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              value={cardInfo.cardNumber}
              onChange={(e) => dispatch({ type: 'SET_CARD_NUMBER', payload: e.target.value })}
            />
            {/* Card type icon */}
          </div>
          <div className="expiry-cvv">
            <div className="expiry">
              <h4>Expiry</h4>
              {/* Expiry input */}
            </div>
            <div className="cvv">
              <h4>CVV</h4>
              {/* CVV input */}
            </div>
          </div>
          <div className="save-card-info">
            <input
              type="checkbox"
              checked={cardInfo.saveInfo}
              onChange={() => dispatch({ type: 'TOGGLE_SAVE_INFO' })}
            />
            <label>Save card information for future use</label>
          </div>
          <button>Confirm Transaction</button>
          <div className="payment-options">
            {/* Google Pay etc*/}
          </div>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className={`order-summary-section ${isSummaryCollapsed ? 'collapsed' : ''}`}>
        <h2 onClick={toggleSummaryCollapse}>Order Summary</h2>
        {/* Display order summary items */}
        {/* Calculate subtotal, shipping, tax, and total */}
      </div>
    </div>
  );
};

export default PaymentForm;
