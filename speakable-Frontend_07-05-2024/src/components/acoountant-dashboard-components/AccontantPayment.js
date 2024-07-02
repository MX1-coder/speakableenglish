import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllpayments } from "../../store/actions/paymentActions";
import AdminNav from "../admin-dashboard-components/AdminNav";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AccontantPayment = () => {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payments.Allpaymentlist);
  const navigate  =  useNavigate()
    const [t, i18n] = useTranslation("global");

  useEffect(() => {
    dispatch(fetchAllpayments());
  }, [dispatch]);


    const handleDownloadInvoice = (payment) => {
      if (payment._id) {
        navigate(`/Accontant-Dashboard/Payments/Invoice/${payment._id}`, {
          state: payment,
        });
      } else {
        console.error("Payment ID is undefined, Please Check the Payment");
      }
    };


  return (
    <>
      <AdminNav />
      <div className="Student_mainPage_style">
        <div className="Student_header_style">
          <h6 className="text-dark">{t("AccontantPayment.header")}</h6>
        </div>
        <div className="Student_list_style mt-3">
          <table className="table table-hover table-responsive table-borderless">
            <thead className="table-transparent">
              <tr>
                <th className="th">{t("AccontantPayment.pl1")}</th>
                <th className="th">{t("AccontantPayment.pl2")}</th>
                <th className="th">{t("AccontantPayment.pl3")}</th>
                <th className="th">{t("AccontantPayment.pl4")}</th>
                <th className="th">{t("AccontantPayment.pl5")}</th>
                <th className="th">{t("AccontantPayment.pl6")}</th>
                <th className="th">{t("AccontantPayment.pl7")}</th>
                <th className="th">{t("AccontantPayment.pl8")}</th>
                <th className="th">{t("AccontantPayment.pl9")}</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((payment, index) => (
                <tr
                  style={{
                    boxShadow:
                      "0px 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px 0 rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                  }}
                  key={index}
                >
                  <td className="td">{index + 1}</td>
                  <td className="td">{payment?.Package_ID?.Package_Name}</td>
                  <td className="td">
                    {payment?.Package_ID?.Course_IDs?.map(
                      (val, index) =>
                        `${val.Course_Name}${
                          index < payment.Package_ID.Course_IDs.length - 1
                            ? ", "
                            : ""
                        }`
                    )}
                  </td>
                  <td className="td">
                    {payment?.Package_ID?.Teacher_IDs?.map(
                      (val, index) =>
                        `${val.Username}${
                          index < payment.Package_ID.Teacher_IDs.length - 1
                            ? ", "
                            : ""
                        }`
                    )}
                  </td>
                  <td className="td">{payment?.Student_ID?.Username}</td>
                  <td className="td">{payment?.Status}</td>
                  <td className="td">{payment?.Package_ID?.Package_Amount}</td>
                  <td className="td">{payment?.Method}</td>
                  <td className="td">
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleDownloadInvoice(payment)}
                    >
                      {t("AccontantPayment.pl9")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AccontantPayment;
