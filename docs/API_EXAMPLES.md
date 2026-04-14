# API examples

## 1) Create customer
`POST /api/v1/customers`

```json
{
  "fullName": "Juan Perez",
  "phone": "+52 5511111111",
  "email": "juan@mail.com"
}
```

## 2) Create vehicle
`POST /api/v1/vehicles`

```json
{
  "customerId": "<uuid>",
  "plate": "ABC123",
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2019,
  "mileage": 68000
}
```

## 3) Create appointment
`POST /api/v1/appointments`

```json
{
  "customerId": "<uuid>",
  "vehicleId": "<uuid>",
  "startAt": "2026-04-15T15:00:00.000Z",
  "endAt": "2026-04-15T16:00:00.000Z",
  "reason": "Mantenimiento 10,000 km"
}
```
