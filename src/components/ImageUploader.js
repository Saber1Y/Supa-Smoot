import { useState } from "react";
import supabase from "../config/SupabaseClient";

const ImageUploader = ({ onUpload }) => {
  const [uploading, setUploading] = useState();

  function sanitizeFileName(name) {
    return name
      .normalize("NFKD") // decompose accents
      .replace(/[^\w.\-() ]/g, "") // remove invalid characters
      .replace(/ /g, "_"); // optional: replace spaces with underscore
  }

  const hanldeUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const sanitizedName = sanitizeFileName(file.name);
    const filePath = `${Date.now()}_${sanitizedName}`;
    setUploading(true);

    const { data, error } = await supabase.storage
      .from("smoothyimages")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    setUploading(false);

    if (error) return console.error("Upload error:", error);

    const { publicURL, error: urlError } = supabase.storage
      .from("smoothyimages")
      .getPublicUrl(data.path);

    if (urlError) return console.error("URL error:", urlError);
    onUpload(publicURL);
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={hanldeUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </>
  );
};

export default ImageUploader;
