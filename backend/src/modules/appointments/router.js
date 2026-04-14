import { Router } from 'express';
import { z } from 'zod';
import { store } from '../store.js';
import { id, nowISO } from '../utils.js';

export const appointmentsRouter = Router();

const createAppointmentSchema = z.object({
  customerId: z.string().uuid(),
  vehicleId: z.string().uuid(),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  reason: z.string().optional()
});

appointmentsRouter.post('/', (req, res) => {
  const parsed = createAppointmentSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const start = new Date(parsed.data.startAt).getTime();
  const end = new Date(parsed.data.endAt).getTime();
  if (start >= end) return res.status(400).json({ error: 'endAt must be after startAt' });

  const conflict = store.appointments.find((a) => {
    const aStart = new Date(a.startAt).getTime();
    const aEnd = new Date(a.endAt).getTime();
    return aStart < end && aEnd > start;
  });
  if (conflict) return res.status(409).json({ error: 'appointment conflict detected' });

  const appointment = {
    id: id(),
    ...parsed.data,
    status: 'pending',
    createdAt: nowISO()
  };

  store.appointments.push(appointment);
  return res.status(201).json(appointment);
});

appointmentsRouter.get('/', (_req, res) => {
  res.json(store.appointments);
});
