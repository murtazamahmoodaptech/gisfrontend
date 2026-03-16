/**
 * Decodes a JWT token to extract the payload
 * JWT format: header.payload.signature
 */
export function decodeJWT(token: string): any {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error("[v0] Invalid JWT format");
      return null;
    }

    const payload = parts[1];
    // Add padding if necessary
    const paddedPayload = payload + '='.repeat((4 - (payload.length % 4)) % 4);
    
    const decodedPayload = atob(paddedPayload);
    const json = JSON.parse(decodedPayload);
    
    return json;
  } catch (error) {
    console.error("[v0] Error decoding JWT:", error);
    return null;
  }
}

/**
 * Extracts the role from a JWT token
 */
export function getRoleFromToken(token: string | null): 'admin' | 'user' | null {
  if (!token) return null;
  
  const decoded = decodeJWT(token);
  if (!decoded) return null;

  // Check for role in different possible locations in the JWT payload
  const role = decoded.role || decoded.user?.role || decoded.data?.role;
  
  if (role && (role.toLowerCase() === 'admin' || role === 'Admin')) {
    return 'admin';
  }
  
  return 'user';
}
