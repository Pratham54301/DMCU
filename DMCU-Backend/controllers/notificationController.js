const Notification = require("../models/Notification");

exports.getUserNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({
      $or: [{ user: req.user.id }, { user: null }]
    }).sort({ createdAt: -1 }).limit(20);

    res.json({
      success: true,
      data: notifications
    });
  } catch (error) {
    next(error);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }
    
    // Only user-specific notifications can be marked read by that user
    if (notification.user && notification.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    notification.isRead = true;
    await notification.save();

    res.json({ success: true, message: "Marked as read" });
  } catch (error) {
    next(error);
  }
};

exports.createNotification = async (req, res, next) => {
  try {
    const { userId, title, message, type, actionLink } = req.body;
    
    const notification = await Notification.create({
      user: userId || null, // null means global announcement
      title,
      message,
      type: type || "announcement",
      actionLink: actionLink || ""
    });

    res.status(201).json({
      success: true,
      data: notification
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteNotification = async (req, res, next) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Notification removed" });
  } catch (error) {
    next(error);
  }
};
