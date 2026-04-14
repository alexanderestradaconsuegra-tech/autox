import { randomUUID } from 'crypto';

export function id() {
  return randomUUID();
}

export function nowISO() {
  return new Date().toISOString();
}
