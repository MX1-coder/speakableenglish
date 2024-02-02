import React, { useEffect, useState } from 'react';
import AdminNav from '../admin-dashboard-components/AdminNav';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPackage } from '../../store/actions/packagesActions';
import axios from '../../helpers/axiosconfig';

const CheckDetails = () => {
  const { Package_ID } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.students.user);
  const pack = useSelector((state) => state.packages.currentPackage);
  const Desciption = pack?.Package_Name;
  const totalAmount = pack?.Package_Amount;
  const Email = user?.Email;
  const Phone = user?.Phone_Number;
  const StudentName = user?.Username;

  useEffect(() => {
    dispatch(fetchPackage(Package_ID));
  }, [Package_ID, dispatch]);

  const submitHandler = async () => {
    try {
      setLoading(true); // Set loading to true when starting the request

      // Make payment using Axios
      const response = await axios.post('Make-Payment', {
        Desciption,
        totalAmount,
        Email,
        Phone,
        StudentName,
      });
      console.log(response);
      const paymentResponseUrl = await response.data.paymentResponseUrl;

      // Redirect the window to the payment response URL
      window.location.href = paymentResponseUrl;
    } catch (error) {
      // Handle error if the payment fails
      console.error('Payment failed:', error.message);
    } finally {
      setLoading(false); // Set loading back to false after the request is complete
    }
  };

  return (
    <>
      <AdminNav />
      <div className='Student_mainPage_style'>
       
<div>
<h2>Order Details</h2>
<p>
  <strong>Description:</strong> {Desciption}
</p>
<p>
  <strong>Total Amount:</strong> {totalAmount}
</p>
</div>

<div>
<h2>Buyer Information</h2>
<p>
  <strong>Email:</strong> {Email}
</p>
<p>
  <strong>Phone:</strong> {Phone}
</p>
<p>
  <strong>Username:</strong> {StudentName}
</p>
</div>

<div>
<h2>Product Information</h2>
<p>
  <strong>Name:</strong> {Desciption}
</p>
<p>
  <strong>Unit Price:</strong> {totalAmount}
</p>
</div>

        <button onClick={submitHandler} className={`btn btn-outline-success ${loading ? 'loading' : ''}`} disabled={loading}>
          {loading ? 'Confirming...' : 'Confirm'}
        </button>
      </div>
    </>
  );
};

export default CheckDetails;






