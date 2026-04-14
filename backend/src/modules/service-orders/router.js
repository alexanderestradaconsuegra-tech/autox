import { Router } from 'express';
import { z } from 'zod';
import { store } from '../store.js';
import { id, nowISO } from '../utils.js';

export const serviceOrdersRouter = Router();

const createServiceOrderSchema = z.object({
  appointmentId: z.string().uuid(),
  diagnosis: z.string().min(3).optional()
});

serviceOrdersRouter.post('/', (req, res) => {
  const parsed = createServiceOrderSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const appointment = store.appointments.find((a) => a.id === parsed.data.appointmentId);
  if (!appointment) return res.status(404).json({ error: 'appointment not found' });

  const serviceOrder = {
    id: id(),
    appointmentId: parsed.data.appointmentId,
    diagnosis: parsed.data.diagnosis || '',
    status: 'open',
    createdAt: nowISO()
  };

  store.serviceOrders.push(serviceOrder);
  return res.status(201).json(serviceOrder);
});

serviceOrdersRouter.get('/', (_req, res) => {
  res.json(store.serviceOrders);
});
