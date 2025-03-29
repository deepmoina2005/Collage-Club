import { client } from "@/config/NilePostgreConfig";

export async function POST(request: Request) {
  const { eventId, userEmail} = await request.json();
  await client.connect();
  const result = await client.query(
    `insert into eventregistration values(DEFAULT ,${eventId},'${userEmail}',DEFAULT)`
  );
  await client.end();

  return Response.json(result);
}