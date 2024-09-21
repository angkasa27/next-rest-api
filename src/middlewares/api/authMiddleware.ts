const validate = (token: string | undefined) => {
  if (!token) return false;

  const validToken = true;

  if (!validToken) {
    return false;
  }

  return true;
};

export function authMiddleware(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  return { isValid: validate(token) };
}
