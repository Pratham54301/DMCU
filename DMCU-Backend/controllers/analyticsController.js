const User = require('../models/User');
const Order = require('../models/Order');
const Character = require('../models/Character');
const Blog = require('../models/Blog');

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
exports.getDashboardStats = async (req, res, next) => {
  try {
    const [userCount, orderCount, characterCount, blogCount, totalRevenue] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Character.countDocuments(),
      Blog.countDocuments(),
      Order.aggregate([{ $match: { status: 'paid' } }, { $group: { _id: null, total: { $sum: "$totalAmount" } } }])
    ]);

    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

    // Engagement: Latest 5 users
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      data: {
        counts: {
          users: userCount,
          orders: orderCount,
          characters: characterCount,
          blogs: blogCount
        },
        revenue,
        recentUsers
      }
    });
  } catch (error) {
    next(error);
  }
};
