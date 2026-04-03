import cloudinary from "./cloudinary.js";
import fetch from "node-fetch";

export const generateLogoImage = async ({
  brandName,
  industry,
  logoStyle,
  colorScheme,
  targetAudience,
  shape,
  purpose,
  categoryType,
}) => {
  try {
    const isValid = (val) =>
      val && val.trim().length > 0 && !val.toLowerCase().includes("other");

    let prompt = "";

    if (categoryType === "logo_from_logo") {
      prompt = isValid(brandName)
        ? `Professional Logo Refinement: Using the provided source image as a strict structural template, modify the logo based on this request: ${brandName}. You must maintain 100% of the original geometry, silhouette, and layout of the provided logo. Style: High-definition vector, clean lines, minimalist.`
        : "Modernize this logo. Create a visibly fresh version while keeping the original structure and color palette. Professional flat vector style.";
    } else {
      const parts = [];

      if (isValid(logoStyle) && isValid(shape)) {
        parts.push(`${logoStyle} ${shape}`);
      } else if (isValid(logoStyle)) {
        parts.push(`${logoStyle} logo`);
      } else if (isValid(shape)) {
        parts.push(`${shape} logo`);
      } else {
        parts.push("Professional logo");
      }
      if (isValid(brandName)) parts.push(`for a brand named '${brandName}'`);
      if (isValid(industry)) parts.push(`in the ${industry} sector`);
      if (isValid(colorScheme)) parts.push(`using ${colorScheme} colors`);
      if (isValid(targetAudience))
        parts.push(`designed for a ${targetAudience} audience`);
      if (isValid(purpose)) parts.push(`suitable for ${purpose}`);

      prompt =
        parts.join(", ") +
        ". Minimalist, flat vector art, white background, high contrast, professional graphic design, centered, 8k resolution. Make sure the generated output image must be logo.";
    }

    const response = await fetch(process.env.CURL_lOCATION, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DASHSCOPE_API_KEY_2}`,
      },
      body: JSON.stringify({
        model: process.env.DASHSCOPE_MODEL_2,
        input: {
          messages: [
            {
              role: "user",
              content: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
        parameters: {
          negative_prompt: "",
          prompt_extend: true,
          watermark: false,
          n: 1,
          size: "1328*1328",
        },
      }),
    });

    const data = await response.json();

    console.log("Dashscope response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      console.error("Dashscope error:", JSON.stringify(data, null, 2));
      throw new Error(`Dashscope failed: ${JSON.stringify(data)}`);
    }

    const imageUrl = data?.output?.choices?.[0]?.message?.content?.[0]?.image;

    if (!imageUrl) {
      console.error("Full data:", JSON.stringify(data, null, 2));
      throw new Error("No image returned from Dashscope");
    }

    const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
      folder: "ai-logos",
    });

    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Logo Image Generation Error:", error);
    throw new Error("Image generation failed");
  }
};

export const generateLogoFromLogo = async ({ brandName, imageBase64 }) => {
  const sourceUpload = await cloudinary.uploader.upload(imageBase64, {
    folder: "ai-logos-source",
  });

  const sourceImageUrl = sourceUpload.secure_url;

  const prompt = brandName
    ? `Redesign this logo for brand '${brandName}'. Keep structure same, modern style, flat vector, white background.`
    : `Modernize this logo while keeping original structure. Flat vector style.`;

  const response = await fetch(process.env.CURL_lOCATION, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DASHSCOPE_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.DASHSCOPE_MODEL,
      input: {
        messages: [
          {
            role: "user",
            content: [{ image: sourceImageUrl }, { text: prompt }],
          },
        ],
      },
      parameters: {
        size: "1024*1024",
      },
    }),
  });

  const data = await response.json();

  console.log("Qwen response:", JSON.stringify(data, null, 2));

  const imageUrl = data?.output?.choices?.[0]?.message?.content?.[0]?.image;

  if (!imageUrl) {
    throw new Error("No image returned from Qwen");
  }

  const finalUpload = await cloudinary.uploader.upload(imageUrl, {
    folder: "ai-logos",
  });

  return finalUpload.secure_url;
};


export const generateLogoFromPrompt = async ({ sourceImageUrl, editPrompt }) => {
  const prompt = `Edit this logo: ${editPrompt}. Keep the overall structure intact. Flat vector style, white background, professional.`;

  const response = await fetch(process.env.CURL_lOCATION, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DASHSCOPE_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.DASHSCOPE_MODEL,
      input: {
        messages: [
          {
            role: "user",
            content: [{ image: sourceImageUrl }, { text: prompt }],
          },
        ],
      },
      parameters: { size: "1024*1024" },
    }),
  });

  const data = await response.json();
  const imageUrl = data?.output?.choices?.[0]?.message?.content?.[0]?.image;
  if (!imageUrl) throw new Error("No image returned");

  const finalUpload = await cloudinary.uploader.upload(imageUrl, {
    folder: "ai-logos",
  });
  return finalUpload.secure_url;
};