import { useState } from "react";
import supabase from "../config/SupabaseClient";

const ImageUploader = ({ onUpload }) => {
  const [uploading, setUploading] = useState();

  const hanldeUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }
    const filePath = `${Date.now()}_${file.name}`;
    setUploading(true);

    const { data, error } = await supabase.storage
      .from("smoothyimages")
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

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
