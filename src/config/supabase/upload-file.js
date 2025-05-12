import supabase from "./supabase.js";

async function uploadFileToSupabase(bucket, file) {
  if (!file) return null;

  const fileExt = file.originalname.split(".").pop();
  const fileName = `cv_${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (uploadError) throw uploadError;

  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return publicUrlData.publicUrl;
}

export default uploadFileToSupabase;