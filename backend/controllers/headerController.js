import headerModel from "../models/headerModel.js";

// List all headers
const listHeaders = async (req, res) => {
  try {
    const headers = await headerModel.find({});
    res.status(200).json({ success: true, data: headers });
  } catch (error) {
    console.error("Error fetching headers:", error);
    res.status(500).json({ success: false, message: "Error fetching headers" });
  }
};

// Add header
const addHeader = async (req, res) => {
  try {
    const header = new headerModel({
      title: req.body.title,
      paragraph: req.body.paragraph,
      image: req.body.image || "", // just a text field
      visibility: req.body.visibility !== undefined ? req.body.visibility : true,
    });

    await header.save();
    res.status(200).json({ success: true, message: "Header added", data: header });
  } catch (error) {
    console.error("Error adding header:", error);
    res.status(500).json({ success: false, message: "Error adding header" });
  }
};

// Edit header
const editHeader = async (req, res) => {
  try {
    const id = req.params.id;
    const header = await headerModel.findById(id);

    if (!header) {
      return res.status(404).json({ success: false, message: "Header not found" });
    }

    if (req.body.title !== undefined) header.title = req.body.title;
    if (req.body.paragraph !== undefined) header.paragraph = req.body.paragraph;
    if (req.body.image !== undefined) header.image = req.body.image;
    if (req.body.visibility !== undefined) header.visibility = req.body.visibility;

    await header.save();
    res.status(200).json({ success: true, message: "Header updated", data: header });
  } catch (error) {
    console.error("Error updating header:", error);
    res.status(500).json({ success: false, message: "Error updating header" });
  }
};

// Remove header
const removeHeader = async (req, res) => {
  try {
    await headerModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Header removed" });
  } catch (error) {
    console.error("Error removing header:", error);
    res.status(500).json({ success: false, message: "Error removing header" });
  }
};

export { listHeaders, addHeader, editHeader, removeHeader };



// Helper to resize + compress image
// const resizeAndCompressImage = async (filePath) => {
//   const tempPath = filePath + "_tmp";

//   await sharp(filePath)
//     .resize(426, 607, { fit: "cover" })
//     .jpeg({ quality: 80 }) 
//     .toFile(tempPath);

//   fs.renameSync(tempPath, filePath);
// };