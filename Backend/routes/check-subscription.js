// const express = require('express');
// const router = express.Router();
// const Subscription = require('../models/Subscription');

// // Debug: Log when the route file is loaded
// console.log('Check-subscription route file loaded');

// // Route to check subscription
// router.post('/check-subscription', async (req, res) => {
//   const { email } = req.body;

//   // Debug: Log the received email
//   console.log('Received email for subscription check:', email);

//   try {
//     const subscription = await Subscription.findOne({
//       userId: { $regex: new RegExp(`^${email}$`, "i") }, // Case-insensitive match
//     });

//     if (!subscription) {
//       console.log('No subscription found for email:', email);
//       return res.status(200).json({ active: false, message: 'No active subscription found' });
//     }

//     // Debug: Log the found subscription
//     console.log('Subscription found:', subscription);
//     res.status(200).json({ active: true, message: 'Subscription is active', subscription });

//   } catch (error) {
//     console.error('Error checking subscription:', error);
//     res.status(500).json({ message: 'Error checking subscription' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// Route to check subscription
router.post('/check-subscription', async (req, res) => {
  const { email } = req.body;

  try {
    const subscription = await Subscription.findOne({
      userId: { $regex: new RegExp(`^${email}$`, 'i') }
    });

    if (!subscription) {
      return res
        .status(200)
        .json({ active: false, message: 'No active subscription found' });
    }

    const now = new Date();
    // Compute whether we're within the subscription window
    const active = now >= subscription.startDate && now <= subscription.endDate;

    // (Optional) Persist this computed state back to the document
    if (subscription.isActive !== active) {
      subscription.isActive = active;
      await subscription.save();
    }

    return res.status(200).json({
      active,
      message: active
        ? 'Subscription is active'
        : 'Subscription has expired',
      subscription
    });
  } catch (error) {
    console.error('Error checking subscription:', error);
    return res.status(500).json({ message: 'Error checking subscription' });
  }
});

module.exports = router;
