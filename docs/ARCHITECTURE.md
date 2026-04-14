# Architecture Overview

## High-level

```text
[Web / Admin UI]
      |
      v
[API Gateway - Express]
      |
      +--> Auth Module
      +--> Scheduling Module (Appointments)
      +--> CRM Module (Customers, Vehicles)
      +--> Operations Module (Service Orders)
      +--> Commercial Module (Quotes, Payments)
      |
      v
[PostgreSQL]   [Redis Queue]   [External: WhatsApp/Email]
```

## Bounded contexts
- **Scheduling**: booking, conflicts, reminders.
- **Operations**: diagnostics, service lifecycle.
- **Commercial**: quotes, approval, payment closing.
- **CRM**: customers and vehicle history.

## Status flow

```text
Appointment: pending -> confirmed -> in_progress -> completed -> delivered
Service Order: open -> awaiting_approval -> approved -> in_service -> ready -> closed
Quote: draft -> sent -> approved/rejected
```

## Scale plan
1. Replace in-memory store with repositories on Postgres.
2. Add Redis/BullMQ for reminders and async notifications.
3. Add JWT + RBAC and workshop-level tenancy.
4. Add observability (Sentry + logs + metrics).
