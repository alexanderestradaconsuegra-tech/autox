import { Router } from 'express';
import { z } from 'zod';
import { store } from '../store.js';
import { id, nowISO } from '../utils.js';

export const vehiclesRouter = Router();

const createVehicleSchema = z.object({
  customerId: z.string().uuid(),
  plate: z.string().min(4),
  brand: z.string().min(2),
  model: z.string().min(1),
  year: z.number().int().min(1970).max(2100).optional(),
  mileage: z.number().int().nonnegative().optional()
});

vehiclesRouter.post('/', (req, res) => {
  const parsed = createVehicleSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const existsCustomer = store.customers.some((c) => c.id === parsed.data.customerId);
  if (!existsCustomer) return res.status(404).json({ error: 'customer not found' });

  const vehicle = { id: id(), ...parsed.data, createdAt: nowISO() };
  store.vehicles.push(vehicle);
  return res.status(201).json(vehicle);
});

vehiclesRouter.get('/', (_req, res) => {
  res.json(store.vehicles);
});
