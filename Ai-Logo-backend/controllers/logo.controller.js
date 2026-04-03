import loginSchema from "../models/login.js";
import {
  generateLogoImage,
  generateLogoFromLogo,
  generateLogoFromPrompt,
} from "../utils/imageGenerator.js";
export const generateLogo = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await loginSchema.findById(userId);

    if (
      user.isPremium &&
      user.premiumExpiryDate &&
      new Date() > user.premiumExpiryDate
    ) {
      await loginSchema.findByIdAndUpdate(userId, {
        isPremium: false,
        premiumExpiryDate: null,
      });
      user.isPremium = false;
    }

    if (!user.isPremium && user.logoCredits <= 0) {
      return res.status(403).json({
        status: "error",
        message: "No credits remaining",
        needsPremium: true,
      });
    }
    const {
      brandName,
      industry,
      logoStyle,
      colorScheme,
      targetAudience,
      shape,
      purpose,
      categoryType,
    } = req.body;

    if (!brandName) {
      return res.status(400).json({
        status: "error",
        message: "Brand name is required",
      });
    }
    const imageUrl = await generateLogoImage({
      brandName,
      industry,
      logoStyle,
      colorScheme,
      targetAudience,
      shape,
      purpose,
      categoryType,
    });

    await loginSchema.findByIdAndUpdate(userId, {
      $push: {
        logoHistory: {
          imageUrl,
          brandName: brandName || "",
          createdAt: new Date(),
        },
      },
    });

    if (!user.isPremium) {
      await loginSchema.findByIdAndUpdate(userId, {
        $inc: { logoCredits: -1 },
      });
    }

    return res.status(200).json({
      status: "success",
      imageUrl: imageUrl,
      creditsRemaining: user.isPremium ? null : user.logoCredits - 1,
    });
  } catch (error) {
    console.error("Logo generation error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const generateLogoFromLogoController = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await loginSchema.findById(userId);

    if (!user.isPremium && user.logoCredits <= 0) {
      return res.status(403).json({
        status: "error",
        message: "No credits remaining",
        needsPremium: true,
      });
    }
    const { brandName, imageBase64 } = req.body;
    if (!imageBase64) {
      return res
        .status(400)
        .json({ status: "error", message: "Image is required" });
    }
    const imageUrl = await generateLogoFromLogo({ brandName, imageBase64 });
    await loginSchema.findByIdAndUpdate(userId, {
      $push: {
        logoHistory: {
          imageUrl,
          brandName: brandName || "",
          createdAt: new Date(),
        },
      },
    });
    if (!user.isPremium) {
      await loginSchema.findByIdAndUpdate(userId, {
        $inc: { logoCredits: -1 },
      });
    }
    return res.status(200).json({
      status: "success",
      imageUrl,
      creditsRemaining: user.isPremium ? null : user.logoCredits - 1,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getLogoHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await loginSchema.findById(userId).select("logoHistory");

    return res.status(200).json({
      status: "success",
      history: user.logoHistory.reverse(), // latest pehle
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const editLogoFromPrompt = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await loginSchema.findById(userId);

    // Credits check
    if (!user.isPremium && user.logoCredits <= 0) {
      return res.status(403).json({
        status: "error",
        message: "No credits remaining",
        needsPremium: true,  // ← frontend is se popup dikhayega
      });
    }

    const { sourceImageUrl, editPrompt, brandName } = req.body;

    if (!sourceImageUrl || !editPrompt) {
      return res.status(400).json({ status: "error", message: "Image and prompt required" });
    }

    const imageUrl = await generateLogoFromPrompt({ sourceImageUrl, editPrompt });

    // History mein save karo
    await loginSchema.findByIdAndUpdate(userId, {
      $push: {
        logoHistory: {
          imageUrl,
          brandName: brandName || "",
          createdAt: new Date(),
        },
      },
    });

    // Credit ghataao
    if (!user.isPremium) {
      await loginSchema.findByIdAndUpdate(userId, { $inc: { logoCredits: -1 } });
    }

    return res.status(200).json({
      status: "success",
      imageUrl,
      creditsRemaining: user.isPremium ? null : user.logoCredits - 1,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};