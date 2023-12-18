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

  const handleNameChange = (e) => {
    dispatch({ type: 'SET_NAME', payload: e.target.value });
  };

  const handleCardNumberChange = (e) => {
    const cardNumber = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    dispatch({ type: 'SET_CARD_NUMBER', payload: cardNumber });
  };

  const handleExpiryChange = (e) => {
    const expiry = e.target.value.replace(/[^\d]/g, '').replace(/(.{2})/, '$1/').trim();
    dispatch({ type: 'SET_EXPIRY', payload: expiry });
  };

  const handleCVVChange = (e) => {
    const cvv = e.target.value.replace(/[^\d]/g, '').slice(0, 3);
    dispatch({ type: 'SET_CVV', payload: cvv });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !cardInfo ||
      !cardInfo.name ||
      !cardInfo.cardNumber ||
      !cardInfo.expiry ||
      !cardInfo.cvv
    ) {
      alert('Please fill in all required fields correctly.');
      return;
    }
    console.log('Form submitted:', cardInfo);
    // Handle form submission logic here
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-3/5 bg-gray-100 p-8">
        <div className="payment-section">
          <h2 className="text-2xl font-bold mb-4">Payment</h2>
          <form onSubmit={handleSubmit}>
            <div className="card-info">
              <h3 className="text-lg font-semibold mb-2">Card Information</h3>
              <div className="mb-4">
                <h4 className="text-base font-semibold mb-2">Name on Card</h4>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter name on card"
                  value={(cardInfo && cardInfo.name) || ''}
                  onChange={handleNameChange}
                />
              </div>
              <div className="mb-4">
                <h4 className="text-base font-semibold mb-2">Card Number</h4>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={(cardInfo && cardInfo.cardNumber) || ''}
                  onChange={handleCardNumberChange}
                  maxLength="19"
                />
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 mr-2">
                  <h4 className="text-base font-semibold mb-2">Expiry</h4>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="MM/YY"
                    value={(cardInfo && cardInfo.expiry) || ''}
                    onChange={handleExpiryChange}
                    maxLength="5"
                  />
                </div>
                <div className="w-1/2 ml-2">
                  <h4 className="text-base font-semibold mb-2">CVV</h4>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="CVV"
                    value={(cardInfo && cardInfo.cvv) || ''}
                    onChange={handleCVVChange}
                    maxLength="3"
                  />
                </div>
              </div>
              <div className="mb-4">
                <input
                  type="checkbox"
                  checked={(cardInfo && cardInfo.saveInfo) || false}
                  onChange={() => dispatch({ type: 'TOGGLE_SAVE_INFO' })}
                />
                <label>Save card information for future use</label>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Confirm Transaction
              </button>
              <div className="mt-4">
                {/* Payment icons */}
              </div>
            </div>
          </form>
        </div>
      </div>

      
      <div className="w-full lg:w-2/5 bg-gray-200 p-8 mt-4 lg:mt-0 lg:ml-4">
        <div
          className={`order-summary-section ${
            isSummaryCollapsed ? 'collapsed' : ''
          }`}
        >
          <h2
            className="text-2xl font-bold cursor-pointer"
            onClick={toggleSummaryCollapse}
          >
            Order Summary
          </h2>
          {/* Order summary content */}
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
