import { Router } from 'express';
import { z } from 'zod';
import { store } from '../store.js';
import { id, nowISO } from '../utils.js';

export const customersRouter = Router();

const createCustomerSchema = z.object({
  fullName: z.string().min(3),
  phone: z.string().min(6),
  email: z.string().email().optional(),
  notes: z.string().optional()
});

customersRouter.post('/', (req, res) => {
  const parsed = createCustomerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const customer = { id: id(), ...parsed.data, createdAt: nowISO() };
  store.customers.push(customer);
  return res.status(201).json(customer);
});

customersRouter.get('/', (_req, res) => {
  res.json(store.customers);
});
