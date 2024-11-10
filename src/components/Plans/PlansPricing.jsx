import "./PlanPricing.css";
import logo from "../../assets/logo-learnlynx.png";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PlanPricing = () => {
  const navigate = useNavigate();
  const checkOutHandler = async (ammount) => {
    const verify = await axios.get("https://learnlynxbackend.onrender.com/api/verifyUser", {
      withCredentials: true,
    });
    if (verify.data.success == false) {
      toast.error("Please Login First");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      try {
        const {
          data: { order },
        } = await axios.post("https://learnlynxbackend.onrender.com/api/checkout", {
          ammount,
        });
        const {
          data: { key },
        } = await axios.get("https://learnlynxbackend.onrender.com/api/getkey");

        const options = {
          key,
          amount: order.amount,
          currency: "INR",
          name: "LearnLynx",
          description: "Testing Razorpay",
          image: `${logo}`,
          order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          // callback_url: `http://localhost:3000/api/teacherVerification/?auth=${verify.data.user._id}`,
          handler: async function (response) {
            try {
              const savePaymentData = await axios.post(
                `https://learnlynxbackend.onrender.com/api/teacherVerification/?auth=${verify.data.user._id}`,
                response,
                {
                  withCredentials: true,
                }
              );
              console.log(savePaymentData);

              if (savePaymentData.status==200) {
                // window.location.href = `http://localhost:3002/admin/dashboard/?auth=${verify.data.user._id}`;
                toast.success("Getting Access of teacher");
              } 
            } catch (error) {
              console.log(error);
              toast.error("Error in Payment Verification!");
            }
          },
          prefill: {
            name: `${verify.data.user.username}`,
            email: `${verify.data.user.email}`,
            contact: "9000090000",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#f9c365",
          },
        };

        var rzp1 = window.Razorpay(options);
        rzp1.open();
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <div className="pricing-container">
        <div className="pricing-content">
          <div className="pricing-details">
            <h1>Plans & Pricing</h1>
            <p>
              LearnLynx offers flexible subscription plans for instructors,
              enabling you to share knowledge effortlessly. Choose the plan that
              best fits your teaching needs and start reaching your students in
              no time.
            </p>
            <ul className="pricing-features">
              <li>Unlimited course creation</li>
              <li>Advanced analytics to track student progress</li>
              <li>Custom branding for your courses</li>
              <li>Priority support from our team</li>
              <li>Secure payment gateway integration</li>
            </ul>
          </div>
          <div className="pricing-card-container">
            <div className="pricing-card">
              <h2>Instructor Plan</h2>
              <p className="plan-price">₹1499/month</p>
              <ul className="plan-features">
                <li>Unlimited course access</li>
                <li>Unlimited student enrollments</li>
                <li>Dedicated support</li>
                <li>Custom course branding</li>
                <li>Advanced analytics & reporting</li>
              </ul>
              <button
                className="checkout-btn"
                onClick={() => {
                  checkOutHandler(1499);
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000} // Close after 3 seconds
        hideProgressBar={false}
      />
    </>
  );
};

export default PlanPricing;
