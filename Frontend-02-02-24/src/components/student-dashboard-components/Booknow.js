import React from 'react';

const Booknow = ({ state }) => {
  const paymentResponse = state?.paymentResponse; // Use optional chaining to avoid errors
  console.log(paymentResponse);

  if (!paymentResponse) {
    // Handle the case when paymentResponse is undefined
    return <div>No payment response available</div>;
  }

  return (
    <div>
      <h2>Payment Response</h2>
      {/* Render the rest of your component */}
    </div>
  );
};

export default Booknow;


