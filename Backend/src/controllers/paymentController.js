const Razorpay = require("razorpay");
const User = require("../models/schema");
const Appointment = require("../models/appointment");
const crypto = require("crypto");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});



const verifyPayment = async (req, res) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      doctorId,
      appointmentDate,
      patientId,
      timeSlot
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {

      const appointment = await Appointment.create({
        patient: patientId,
        doctorId,
        appointmentDate,
        timeSlot,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        paymentStatus: "Paid"
      });

      return res.status(200).json({
        success: true,
        appointment
      });

    }

    return res.status(400).json({
      success: false,
      message: "Signature verification failed"
    });

  } catch (error) {

    console.log("VERIFY PAYMENT ERROR:", error);

    return res.status(500).json({
      success: false
    });

  }

};
const createOrder = async (req,res)=>{

  try{

    const { doctorId } = req.body;

    const doctor = await User.findById(doctorId);

    if(!doctor){
      return res.status(404).json({success:false,message:"Doctor not found"});
    }

    const amount = doctor.fees;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({
      success:true,
      order
    });

  }catch(error){

    console.log("CREATE ORDER ERROR:",error);

    res.status(500).json({
      success:false
    });

  }

};
module.exports = { createOrder,verifyPayment };