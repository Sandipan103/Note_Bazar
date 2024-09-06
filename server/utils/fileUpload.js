import { v2 as cloudinary } from "cloudinary";

const uploadFileToCloudinary = async (file, folder, quality) => {
  const options = { folder };
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

export const pdfUpload = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);

    // Fetch file
    const pdfFile = req.files.pdfFile;

    // Upload to Cloudinary
    const response = await uploadFileToCloudinary(pdfFile, "StorePdf");

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      uploadData: response.secure_url,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
