export interface JwtPayload {
  iss: string;
  sub: string;
  aud: string[];
  azp: string;
  exp: number;
  iat: number;
  scope: string;
}
