const Submission = require("../models/Submission");
const Notification = require("../models/Notification");

exports.createSubmission = async (req, res, next) => {
  try {
    const { title, content, type, contactDetails } = req.body;
    
    const submission = await Submission.create({
      user: req.user.id,
      title,
      content,
      type,
      contactDetails
    });

    // Notify user that submission was received
    await Notification.create({
      user: req.user.id,
      title: "Intel Received",
      message: `Your ${type} submission "${title}" has been safely archived in the DMCU vaults for review.`,
      type: "update"
    });

    res.status(201).json({
      success: true,
      data: submission
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserSubmissions = async (req, res, next) => {
  try {
    const submissions = await Submission.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: submissions });
  } catch (error) {
    next(error);
  }
};

exports.getAllSubmissions = async (req, res, next) => {
  try {
    const submissions = await Submission.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json({ success: true, data: submissions });
  } catch (error) {
    next(error);
  }
};

exports.updateSubmissionStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;
    const submission = await Submission.findById(req.params.id);
    
    if (!submission) return res.status(404).json({ success: false, message: "Submission not found" });

    submission.status = status;
    submission.adminNotes = adminNotes || submission.adminNotes;
    await submission.save();

    // Notify user of the status change
    await Notification.create({
      user: submission.user,
      title: "Intel Review Complete",
      message: `The Status of your submission "${submission.title}" has been updated to: ${status.toUpperCase()}.`,
      type: "opportunity",
      actionLink: "/dashboard"
    });

    res.json({ success: true, data: submission });
  } catch (error) {
    next(error);
  }
};
