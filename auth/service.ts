// Minimal auth service skeleton — implement according to project_contract.md

import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { storeRefreshJti, getRefreshJtiOwner, revokeRefreshJti } from './store';

const ACCESS_TTL_SECONDS = 900; // 15m
const REFRESH_TTL_SECONDS = 60 * 60 * 24 * 30; // 30d

function getSecret() {
  const secret = process.env.AUTH_JWT_SECRET;
  if (!secret) throw new Error('Missing AUTH_JWT_SECRET');
  return secret;
}

export async function issueTokens(userId: string) {
  const secret = getSecret();
  const jti = randomUUID();
  const accessToken = jwt.sign({ sub: userId, typ: 'access' }, secret, { expiresIn: ACCESS_TTL_SECONDS });
  const refreshToken = jwt.sign({ sub: userId, typ: 'refresh' }, secret, { jwtid: jti, expiresIn: REFRESH_TTL_SECONDS });
  // persist refresh token id (jti) to allow revocation and rotation
  await storeRefreshJti(jti, userId, REFRESH_TTL_SECONDS);
  return { accessToken, refreshToken, expiresIn: ACCESS_TTL_SECONDS };
}

export async function verifyToken(token: string) {
  const secret = getSecret();
  try {
    const payload = jwt.verify(token, secret);
    return { ok: true, payload };
  } catch (err) {
    return { ok: false, error: err };
  }
}

export async function refreshTokens(refreshToken: string) {
  const secret = getSecret();
  try {
    const payload: any = jwt.verify(refreshToken, secret, { ignoreExpiration: false });
    if (payload.typ !== 'refresh') throw new Error('Invalid token type');
    const jti = (payload as any).jti || (payload as any).jti;
    if (!jti) throw new Error('Missing jti in refresh token');
    const owner = await getRefreshJtiOwner(jti);
    if (!owner) throw new Error('Refresh token revoked or not found');
    // rotate: revoke old jti and issue new tokens
    await revokeRefreshJti(jti);
    return issueTokens(owner);
  } catch (err) {
    throw err;
  }
}

export async function revokeRefreshTokenByJti(jti: string) {
  return revokeRefreshJti(jti);
}

export async function revokeRefreshToken(refreshToken: string) {
  try {
    const secret = getSecret();
    const payload: any = jwt.decode(refreshToken, { complete: false });
    const jti = payload && payload.jti;
    if (!jti) throw new Error('Missing jti');
    return revokeRefreshJti(jti);
  } catch (err) {
    throw err;
  }
}
