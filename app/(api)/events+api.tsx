import { client } from "@/config/NilePostgreConfig";

export async function POST(request: Request) {
  const { eventName, location, bannerUrl, link, eventDate, eventTime, email } =
    await request.json();
  await client.connect();
  const result = await client.query(`
        INSERT INTO events VALUES(
        DEFAULT,
        '${eventName}',
        '${location}}',
        '${bannerUrl}',
        '${link}',
        '${eventDate}',
        '${eventTime}',
        '${email}',
        DEFAULT
        )
        `);
  await client.end();

  return Response.json(result);
}
