import { Router } from 'express';
import { z } from 'zod';
import { store } from '../store.js';
import { id, nowISO } from '../utils.js';

export const paymentsRouter = Router();

const createPaymentSchema = z.object({
  serviceOrderId: z.string().uuid(),
  amount: z.number().positive(),
  method: z.enum(['cash', 'card', 'transfer'])
});

paymentsRouter.post('/', (req, res) => {
  const parsed = createPaymentSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const so = store.serviceOrders.find((o) => o.id === parsed.data.serviceOrderId);
  if (!so) return res.status(404).json({ error: 'service order not found' });

  const payment = {
    id: id(),
    ...parsed.data,
    status: 'paid',
    createdAt: nowISO()
  };

  store.payments.push(payment);
  so.status = 'closed';

  return res.status(201).json(payment);
});
