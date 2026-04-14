import { Router } from 'express';
import { z } from 'zod';
import { store } from '../store.js';
import { id, nowISO } from '../utils.js';

export const quotesRouter = Router();

const createQuoteSchema = z.object({
  serviceOrderId: z.string().uuid(),
  total: z.number().nonnegative()
});

quotesRouter.post('/', (req, res) => {
  const parsed = createQuoteSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const so = store.serviceOrders.find((o) => o.id === parsed.data.serviceOrderId);
  if (!so) return res.status(404).json({ error: 'service order not found' });

  const quote = {
    id: id(),
    ...parsed.data,
    status: 'sent',
    createdAt: nowISO()
  };

  store.quotes.push(quote);
  so.status = 'awaiting_approval';

  return res.status(201).json(quote);
});

quotesRouter.post('/:id/approve', (req, res) => {
  const quote = store.quotes.find((q) => q.id === req.params.id);
  if (!quote) return res.status(404).json({ error: 'quote not found' });
  quote.status = 'approved';

  const so = store.serviceOrders.find((o) => o.id === quote.serviceOrderId);
  if (so) so.status = 'approved';

  return res.json(quote);
});
