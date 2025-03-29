import { client } from "@/config/NilePostgreConfig";

export async function POST(request: Request) {
  const { eventId, userEmail } = await request.json();
  await client.connect();
  const isRegistered = await client.query(
    `select * from eventregistration where eventId=${eventId} and userEmail='${userEmail}'`
  );
  if (isRegistered.rows.length == 0) {
    const result = await client.query(
      `insert into eventregistration values(DEFAULT ,${eventId},'${userEmail}',DEFAULT)`
    );
    return Response.json(result);
  }
  await client.end();
  return Response.json(isRegistered.rows);
}

export async function GET(request: Request) {
  const email = new URL(request.url).searchParams.get("email");

  await client.connect();

  const result = await client.query(`
        select events.*,users.name as username from events
        inner join users
        on events.createdby=users.email
        inner join eventregistration
        on events.id=eventregistration.eventId
        where eventregistration.userEmail='${email}'
        order by eventregistration.id desc;
`);
  await client.end();
  return Response.json(result.rows);
}
