import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const column_id = process.argv.length > 2 ? parseInt(process.argv[2]) : 1;
const count = process.argv.length > 3 ? parseInt(process.argv[3]) : 100;
const cards: any[] = [];
for (let i = 0; i < count; i++) {
  cards.push({
    column_id,
    position: i,
    title: `Card ${i}`,
    description: `Description for card ${i}`,
  });
}

const { error } = await supabaseAdmin.from("cards").insert(cards);
if (error) {
    console.error(error);
    process.exit(1);
}

console.log("Cards seeded successfully");
