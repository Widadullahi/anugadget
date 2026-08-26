import { supabase } from "@/integrations/supabase/client";

export type Audience = "male" | "female" | "all";

export async function queueRestockEmail({
  title,
  body,
  imageUrl,
  audience = "all",
}: {
  title: string;
  body: string;
  imageUrl?: string;
  audience?: Audience;
}) {
  // Store campaign in a table `email_campaigns` for a server worker to process.
  // Fields: id, title, body, image_url, audience, status, created_at
  const { error } = await supabase.from("email_campaigns").insert([
    {
      title,
      body,
      image_url: imageUrl,
      audience,
      status: "queued",
    },
  ]);

  if (error) {
    console.warn("Failed to queue restock email campaign:", error.message);
    throw error;
  }

  return true;
}

export async function listSubscribers(audience: Audience = "all") {
  const query = supabase.from("customers").select("email, full_name, gender, subscribed").eq("subscribed", true);

  if (audience === "female") {
    query.eq("gender", "female");
  } else if (audience === "male") {
    query.eq("gender", "male");
  }

  const { data, error } = await query;

  if (error) {
    console.warn("Failed to list subscribers:", error.message);
    return [];
  }

  return data ?? [];
}
