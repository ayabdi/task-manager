import { getUserByEmail, createUser } from "@/services/userService";

export async function POST(req: Request) {
  const body = await req.json(); // Parse the request body
  const { email, password, name } = body;

  // Validate input
  if (!email || !password || !name) {
    return Response.json(
      { error: "Email, password, and first name are required" },
      { status: 400 }
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json({ error: "Invalid email format" }, { status: 400 });
  }

  // Validate password strength
  const passwordRegex =
    /^.{8,}$/;
  if (!passwordRegex.test(password)) {
    return Response.json(
      {
        error:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&#-_)",
      },
      { status: 400 }
    );
  }
  // Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return Response.json({ error: "User already exists" }, { status: 409 });
  }

  const user = await createUser(body);
  return Response.json(user);
}