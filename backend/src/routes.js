import { Router } from 'express';
import { appointmentsRouter } from './modules/appointments/router.js';
import { customersRouter } from './modules/customers/router.js';
import { vehiclesRouter } from './modules/vehicles/router.js';
import { serviceOrdersRouter } from './modules/service-orders/router.js';
import { quotesRouter } from './modules/quotes/router.js';
import { paymentsRouter } from './modules/payments/router.js';

export function registerRoutes(app) {
  const api = Router();

  api.use('/appointments', appointmentsRouter);
  api.use('/customers', customersRouter);
  api.use('/vehicles', vehiclesRouter);
  api.use('/service-orders', serviceOrdersRouter);
  api.use('/quotes', quotesRouter);
  api.use('/payments', paymentsRouter);

  app.use('/api/v1', api);
}
