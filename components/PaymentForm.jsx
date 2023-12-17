'use client'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

const PaymentForm = () => {
  const cardInfo = useSelector((state) => state.cardInfo);
  const dispatch = useDispatch();
  const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(true);

  const toggleSummaryCollapse = () => {
    setIsSummaryCollapsed(!isSummaryCollapsed);
  };

  return (
    <div className="flex h-screen">
      <div className="w-3/5 bg-gray-100 p-8">
        <div className="payment-section">
          <h2 className="text-2xl font-bold mb-4">Payment</h2>
          <div className="card-info">
            <h3 className="text-lg font-semibold mb-2">Card Information</h3>
            <div className="mb-4">
              <h4 className="text-base font-semibold mb-2">Name on Card</h4>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter name on card"
                value={cardInfo.name}
                onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <h4 className="text-base font-semibold mb-2">Card Number</h4>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                value={cardInfo.cardNumber}
                onChange={(e) => dispatch({ type: 'SET_CARD_NUMBER', payload: e.target.value })}
              />
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 mr-2">
                <h4 className="text-base font-semibold mb-2">Expiry</h4>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="MM/YYYY"
                  value={cardInfo.expiry}
                  onChange={(e) => dispatch({ type: 'SET_EXPIRY', payload: e.target.value })}
                />
              </div>
              <div className="w-1/2 ml-2">
                <h4 className="text-base font-semibold mb-2">CVV</h4>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="CVV"
                  value={cardInfo.cvv}
                  onChange={(e) => dispatch({ type: 'SET_CVV', payload: e.target.value })}
                />
              </div>
            </div>
            <div className="mb-4">
              <input
                type="checkbox"
                checked={cardInfo.saveInfo}
                onChange={() => dispatch({ type: 'TOGGLE_SAVE_INFO' })}
              />
              <label>Save card information for future use</label>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Confirm Transaction
            </button>
            <div className="mt-4">
              {/* Google Pay etc */}
            </div>
          </div>
        </div>
      </div>

      
      <div className="w-2/5 bg-gray-200 p-8">
        <div
          className={`order-summary-section ${isSummaryCollapsed ? 'collapsed' : ''}`}
        >
          <h2 className="text-2xl font-bold cursor-pointer" onClick={toggleSummaryCollapse}>
            Order Summary
          </h2>
          {/* Order summary content */}
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
