import { useState, Fragment } from "react";
import {
  LayoutDashboard, Car, Package, Wrench, Bell, Search, X,
  CheckCircle, AlertTriangle, Truck, User, FileText,
  ArrowRight, ArrowLeft, ChevronDown, ChevronUp,
  Camera, QrCode, Phone, MessageSquare, Users,
  Plus, Star, Activity, Shield, Clock, RefreshCw, List,
  Zap, BarChart2, ChevronRight, DollarSign, Receipt,
  Building2, Mail, MapPin, Hash, CreditCard, Calendar,
  TrendingUp, Eye, Send, ClipboardList
} from "lucide-react";

// ─── DATA ───────────────────────────────────────────────────────
const CLIENTS = [
  { id:1, name:"Carlos Mendoza",   phone:"+56 9 8234 5678", email:"cmendoza@gmail.com",    rut:"14.567.890-2", address:"Av. Las Condes 1234, Santiago", joined:"15/01/2023", notes:"Cliente frecuente. Prefiere comunicación por WhatsApp." },
  { id:2, name:"Valentina Rojas",  phone:"+56 9 7123 4567", email:"vrojas@outlook.com",    rut:"16.234.890-K", address:"Calle Providencia 567, Santiago", joined:"03/04/2023", notes:"Paga siempre con tarjeta." },
  { id:3, name:"Diego Fernández",  phone:"+56 9 6012 3456", email:"dfernandez@empresa.cl", rut:"12.890.345-5", address:"Av. Vitacura 890, Santiago", joined:"20/06/2023", notes:"Empresa. Requiere factura siempre." },
  { id:4, name:"Andrea Muñoz",     phone:"+56 9 9345 6789", email:"amunoz@gmail.com",      rut:"17.456.123-8", address:"Los Leones 234, Providencia", joined:"08/09/2023", notes:"" },
  { id:5, name:"Rodrigo Castro",   phone:"+56 9 5678 9012", email:"rcastro@hotmail.com",   rut:"11.234.789-3", address:"Av. Grecia 1122, Ñuñoa", joined:"14/11/2023", notes:"Mecánico aficionado. Muy detallista." },
];

const VEHICLES = [
  { id:1, clientId:1, plate:"BCKF-92", brand:"Toyota",    model:"Corolla", year:2019, vin:"JT2BF22K1W0078624", km:67400, color:"Blanco" },
  { id:2, clientId:2, plate:"HPKS-31", brand:"Chevrolet", model:"Tracker", year:2021, vin:"3GNAXUEV2ML123456", km:34200, color:"Rojo"   },
  { id:3, clientId:3, plate:"RVJM-15", brand:"Mazda",     model:"CX-5",    year:2020, vin:"JM3KFBDM8L0789012", km:52100, color:"Gris"   },
  { id:4, clientId:4, plate:"TPNL-44", brand:"Hyundai",   model:"Tucson",  year:2022, vin:"KM8JUCAL0NU345678", km:21800, color:"Negro"  },
  { id:5, clientId:5, plate:"KBCH-77", brand:"Ford",      model:"Ranger",  year:2018, vin:"1FTFX1E58JKE12345", km:89300, color:"Azul"   },
];

const SERVICES_LIST = [
  { id:1,  name:"Cambio de Aceite y Filtro",       cat:"Mantenimiento", hrs:1,   price:35000,  rec:180  },
  { id:2,  name:"Revisión y Ajuste de Frenos",     cat:"Seguridad",     hrs:2.5, price:85000,  rec:365  },
  { id:3,  name:"Diagnóstico Electrónico OBD2",    cat:"Diagnóstico",   hrs:1.5, price:45000,  rec:null },
  { id:4,  name:"Afinamiento Mayor",               cat:"Mantenimiento", hrs:3,   price:120000, rec:365  },
  { id:5,  name:"Cambio Correa de Distribución",   cat:"Motor",         hrs:4,   price:280000, rec:730  },
  { id:6,  name:"Revisión Suspensión Completa",    cat:"Seguridad",     hrs:2,   price:65000,  rec:null },
  { id:7,  name:"Cambio de Pastillas de Freno",    cat:"Seguridad",     hrs:1.5, price:75000,  rec:365  },
  { id:8,  name:"Limpieza de Inyectores",          cat:"Motor",         hrs:2,   price:95000,  rec:365  },
  { id:9,  name:"Sistema de Refrigeración",        cat:"Motor",         hrs:1.5, price:55000,  rec:null },
  { id:10, name:"Cambio de Batería",               cat:"Eléctrico",     hrs:0.5, price:0,      rec:null },
];

const SUPPLIERS = [
  { id:1, name:"AutoParts CL",   rut:"76.543.210-1", phone:"+56 2 2345 6789", email:"ventas@autoparts.cl",  address:"Av. Matta 450, Santiago", category:"Repuestos generales", contact:"Jorge Soto",    payDays:30, rating:4, active:true,  products:["Filtros","Pastillas","Aceites","Baterías"] },
  { id:2, name:"LubriCenter",    rut:"77.123.456-K", phone:"+56 2 2567 8901", email:"pedidos@lubricenter.cl",address:"Ruta 5 Sur km 8",        category:"Lubricantes",          contact:"Patricia Vidal",payDays:15, rating:5, active:true,  products:["Aceites 5W-30","Aceites 10W-40","Grasas","Líquido de frenos"] },
  { id:3, name:"FrenoBrake",     rut:"75.987.654-3", phone:"+56 9 8123 4567", email:"info@frenobrake.cl",   address:"Av. Kennedy 7890",        category:"Frenos",               contact:"Luis Herrera",  payDays:30, rating:3, active:true,  products:["Pastillas","Discos","Drums","Hidráulica"] },
  { id:4, name:"MazdaPartes",    rut:"96.234.567-8", phone:"+56 2 2890 1234", email:"repuestos@mazda.cl",   address:"Av. Vitacura 5600",       category:"Repuestos originales", contact:"Carla Moreno",  payDays:45, rating:4, active:true,  products:["Correas","Filtros OEM","Sensores","Juntas"] },
  { id:5, name:"RepSur",         rut:"78.456.123-5", phone:"+56 9 7654 3210", email:"repsur@gmail.com",     address:"Los Aromos 123, Maipú",   category:"Repuestos generales", contact:"Mario Pizarro",  payDays:7,  rating:3, active:false, products:["Filtros","Amortiguadores","Bujes"] },
];

const PARTS = [
  { id:1, sku:"FO-TOY-001", name:"Filtro aceite Toyota Corolla",    stock:8,  min:3, supplierId:1, suppliers:[{name:"AutoParts CL",price:4200,days:1},{name:"RepSur",price:3800,days:3}] },
  { id:2, sku:"PF-UNI-045", name:"Pastillas freno delant. (juego)", stock:2,  min:4, supplierId:3, suppliers:[{name:"AutoParts CL",price:28500,days:1},{name:"FrenoBrake",price:24800,days:4}] },
  { id:3, sku:"CD-MAZ-CX5", name:"Correa distribución Mazda CX-5", stock:1,  min:2, supplierId:4, suppliers:[{name:"MazdaPartes",price:42000,days:2},{name:"AutoParts CL",price:48000,days:1}] },
  { id:4, sku:"AC-SIN-5W30",name:"Aceite 5W-30 sintético 4L",      stock:15, min:5, supplierId:2, suppliers:[{name:"LubriCenter",price:18500,days:0},{name:"AutoParts CL",price:21000,days:1}] },
];

const MECHANICS = ["Roberto Salinas","Luis Contreras","Patricia Vega","Marco Díaz"];
const BRANDS = ["Toyota","Chevrolet","Mazda","Hyundai","Ford","Honda","Kia","Nissan","Volkswagen","Mitsubishi","Suzuki","Subaru"];

const COLS = [
  { id:"ingreso",     label:"Ingreso",       color:"#6366F1", light:"#EEF2FF" },
  { id:"diagnostico", label:"Diagnóstico",   color:"#F59E0B", light:"#FFFBEB" },
  { id:"reparacion",  label:"En Reparación", color:"#0EA5E9", light:"#F0F9FF" },
  { id:"calidad",     label:"Ctrl. Calidad", color:"#8B5CF6", light:"#F5F3FF" },
  { id:"entrega",     label:"Listo Entrega", color:"#10B981", light:"#ECFDF5" },
];
const COL_NEXT = { ingreso:"diagnostico",diagnostico:"reparacion",reparacion:"calidad",calidad:"entrega",entrega:null };

const INIT_ORDERS = [
  { id:"OS-0891", vehicleId:1, status:"reparacion", mechanic:"Roberto Salinas", serviceIds:[2,7], parts:[{partId:2,qty:1}], total:160000, approved:true,  created:"20/03", km:67400, photos:2, urgent:true,  fault:"Ruido al frenar lado derecho. Fisura parabrisas preexistente." },
  { id:"OS-0892", vehicleId:2, status:"diagnostico",mechanic:"Luis Contreras",  serviceIds:[3,9], parts:[],               total:100000, approved:false, created:"20/03", km:34200, photos:0, urgent:false, fault:"Motor se recalienta. Revisar sistema de refrigeración." },
  { id:"OS-0893", vehicleId:3, status:"calidad",    mechanic:"Patricia Vega",   serviceIds:[4,5,1],parts:[{partId:3,qty:1},{partId:4,qty:1}],total:435000,approved:true,created:"18/03",km:52100,photos:3,urgent:false,fault:"Mantención mayor 50.000 km." },
  { id:"OS-0894", vehicleId:4, status:"entrega",    mechanic:"Roberto Salinas", serviceIds:[1],   parts:[{partId:4,qty:1}],total:53500, approved:true,  created:"17/03", km:21800, photos:0, urgent:false, fault:"Cambio de aceite y filtro rutinario." },
  { id:"OS-0895", vehicleId:5, status:"ingreso",    mechanic:null,              serviceIds:[],    parts:[],               total:0,      approved:false, created:"21/03", km:89300, photos:1, urgent:false, fault:"Recién ingresado. Pendiente diagnóstico." },
];

const INIT_QUOTES = [
  { id:"COT-0041", orderId:"OS-0893", clientId:3, vehicleId:3, items:[{desc:"Afinamiento Mayor",qty:1,price:120000},{desc:"Correa de distribución",qty:1,price:280000},{desc:"Cambio de Aceite",qty:1,price:35000}], total:435000, status:"aprobada",  created:"18/03", validUntil:"25/03", notes:"Incluye mano de obra y repuestos.",sentWA:true },
  { id:"COT-0042", orderId:"OS-0892", clientId:2, vehicleId:2, items:[{desc:"Diagnóstico OBD2",qty:1,price:45000},{desc:"Sistema refrigeración",qty:1,price:55000}],    total:100000, status:"pendiente", created:"20/03", validUntil:"27/03", notes:"",sentWA:true },
  { id:"COT-0043", orderId:"OS-0891", clientId:1, vehicleId:1, items:[{desc:"Revisión de frenos",qty:1,price:85000},{desc:"Pastillas delantera",qty:1,price:75000}],    total:160000, status:"aprobada",  created:"20/03", validUntil:"27/03", notes:"Precio incluye repuestos.",sentWA:true },
  { id:"COT-0044", orderId:null,      clientId:4, vehicleId:4, items:[{desc:"Suspensión completa",qty:1,price:65000}],                                                   total:65000,  status:"borrador",  created:"21/03", validUntil:"28/03", notes:"",sentWA:false },
  { id:"COT-0045", orderId:null,      clientId:5, vehicleId:5, items:[{desc:"Diagnóstico OBD2",qty:1,price:45000}],                                                      total:45000,  status:"rechazada", created:"15/03", validUntil:"22/03", notes:"Cliente consulta repuesto propio.",sentWA:true },
];

const INIT_INVOICES = [
  { id:"F-0021", type:"factura",  clientId:3, orderId:"OS-0893", quoteId:"COT-0041", items:[{desc:"Afinamiento Mayor",qty:1,price:120000},{desc:"Correa distribución",qty:1,price:280000},{desc:"Cambio de Aceite",qty:1,price:35000}], subtotal:435000, iva:82650, total:517650, status:"pagada",   issued:"18/03", due:"25/03", paidDate:"22/03", payMethod:"Transferencia" },
  { id:"B-0087", type:"boleta",   clientId:4, orderId:"OS-0894", quoteId:null,       items:[{desc:"Cambio de Aceite y Filtro",qty:1,price:53500}],                                                                                      subtotal:53500,  iva:0,      total:53500,  status:"pagada",   issued:"17/03", due:"17/03", paidDate:"17/03", payMethod:"Efectivo" },
  { id:"F-0022", type:"factura",  clientId:1, orderId:"OS-0891", quoteId:"COT-0043", items:[{desc:"Revisión de frenos",qty:1,price:85000},{desc:"Pastillas delantera",qty:1,price:75000}],                                             subtotal:160000, iva:30400, total:190400, status:"pendiente",issued:"20/03", due:"27/03", paidDate:null,     payMethod:null },
  { id:"B-0088", type:"boleta",   clientId:2, orderId:null,       quoteId:"COT-0042", items:[{desc:"Diagnóstico OBD2",qty:1,price:45000},{desc:"Sistema refrigeración",qty:1,price:55000}],                                            subtotal:100000, iva:0,      total:100000, status:"emitida",  issued:"21/03", due:"28/03", paidDate:null,     payMethod:null },
  { id:"F-0020", type:"factura",  clientId:3, orderId:null,       quoteId:null,       items:[{desc:"Diagnóstico General",qty:1,price:45000}],                                                                                           subtotal:45000,  iva:8550,   total:53550,  status:"vencida",  issued:"01/03", due:"08/03", paidDate:null,     payMethod:null },
];

const INIT_PURCHASE_ORDERS = [
  { id:"OC-0011", supplierId:3, items:[{partId:2, qty:8, price:24800}], total:198400, status:"pendiente", created:"21/03", expectedDate:"25/03" },
  { id:"OC-0012", supplierId:4, items:[{partId:3, qty:3, price:42000}], total:126000, status:"recibida",  created:"18/03", expectedDate:"20/03" },
];

// ─── HELPERS ────────────────────────────────────────────────────
const clp = n => `$${Number(n).toLocaleString("es-CL")}`;
const getV = id => VEHICLES.find(v=>v.id===id);
const getC = vid => { const v=getV(vid); return v?CLIENTS.find(c=>c.id===v.clientId):null; };
const getSvcs = ids => SERVICES_LIST.filter(s=>ids.includes(s.id));
const nextOS = orders => `OS-${String(900+orders.length).padStart(4,"0")}`;
const clientOrders = (clientId, orders) => {
  const vIds = VEHICLES.filter(v=>v.clientId===clientId).map(v=>v.id);
  return orders.filter(o=>vIds.includes(o.vehicleId));
};
const clientSpent = (clientId, orders) =>
  clientOrders(clientId, orders).filter(o=>o.approved).reduce((a,b)=>a+b.total,0);

const Q_STATUS = {
  borrador: { label:"Borrador",  c:"#6B7280", bg:"#F3F4F6" },
  pendiente:{ label:"Pendiente", c:"#D97706", bg:"#FFFBEB" },
  aprobada: { label:"Aprobada",  c:"#059669", bg:"#ECFDF5" },
  rechazada:{ label:"Rechazada", c:"#DC2626", bg:"#FEF2F2" },
};
const I_STATUS = {
  emitida:  { label:"Emitida",   c:"#2563EB", bg:"#EFF6FF" },
  pendiente:{ label:"Pendiente", c:"#D97706", bg:"#FFFBEB" },
  pagada:   { label:"Pagada",    c:"#059669", bg:"#ECFDF5" },
  vencida:  { label:"Vencida",   c:"#DC2626", bg:"#FEF2F2" },
};

// ─── CSS ────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#EDEEF3;--surf:#FFFFFF;--surf2:#F5F7FC;
  --bdr:#DDE1ED;--bdr2:#E8EBF4;
  --txt:#0F1117;--txt2:#4B5563;--txt3:#9CA3AF;
  --or:#FF5500;--or-l:#FFF2EC;
  --gr:#059669;--gr-l:#ECFDF5;
  --bl:#0EA5E9;--bl-l:#F0F9FF;
  --yl:#D97706;--yl-l:#FFFBEB;
  --re:#DC2626;--re-l:#FEF2F2;
  --pu:#7C3AED;--pu-l:#F5F3FF;
  --in:#4F46E5;--in-l:#EEF2FF;
  --sans:'Outfit',sans-serif;--mono:'JetBrains Mono',monospace;
  --sh:0 1px 4px rgba(0,0,0,0.07),0 1px 2px rgba(0,0,0,0.04);
  --sh2:0 4px 18px rgba(0,0,0,0.10),0 2px 6px rgba(0,0,0,0.05);
  --sh3:0 14px 48px rgba(0,0,0,0.16),0 4px 14px rgba(0,0,0,0.07);
}
body{background:var(--bg);color:var(--txt);font-family:var(--sans);font-size:14px;line-height:1.5;}
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:var(--bdr);border-radius:3px;}
.app{display:flex;height:100vh;overflow:hidden;}
.sb{width:220px;min-width:220px;background:var(--surf);border-right:1.5px solid var(--bdr);display:flex;flex-direction:column;}
.sb-logo{padding:18px 16px 14px;border-bottom:1.5px solid var(--bdr2);}
.logo-row{display:flex;align-items:center;gap:10px;}
.logo-icon{width:36px;height:36px;border-radius:9px;background:var(--or);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;color:#fff;flex-shrink:0;}
.logo-name{font-size:19px;font-weight:900;letter-spacing:-.5px;}
.logo-name em{color:var(--or);font-style:normal;}
.logo-sub{font-size:10px;color:var(--txt3);font-family:var(--mono);letter-spacing:1px;margin-top:1px;}
.nav{flex:1;padding:10px 9px;overflow-y:auto;display:flex;flex-direction:column;gap:1px;}
.nlbl{font-size:9px;font-weight:700;color:var(--txt3);letter-spacing:2px;padding:8px 9px 4px;font-family:var(--mono);}
.ni{display:flex;align-items:center;gap:9px;padding:9px 10px;border-radius:8px;cursor:pointer;color:var(--txt2);transition:all .15s;font-weight:600;font-size:13px;}
.ni:hover{color:var(--txt);background:var(--surf2);}
.ni.active{color:var(--or);background:var(--or-l);font-weight:700;}
.ni.dim{opacity:.38;pointer-events:none;}
.nsep{height:1px;background:var(--bdr2);margin:6px 3px;}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0;}
.topbar{height:56px;min-height:56px;background:var(--surf);border-bottom:1.5px solid var(--bdr);display:flex;align-items:center;padding:0 20px;gap:10px;box-shadow:var(--sh);}
.tb-title{font-size:18px;font-weight:800;flex:1;letter-spacing:-.3px;}
.srch{display:flex;align-items:center;gap:7px;background:var(--surf2);border:1.5px solid var(--bdr);border-radius:9px;padding:7px 12px;transition:border-color .15s;}
.srch:focus-within{border-color:var(--or);}
.srch input{background:none;border:none;outline:none;color:var(--txt);font-size:13px;width:160px;font-family:var(--sans);}
.ib{width:34px;height:34px;border-radius:8px;background:var(--surf2);border:1.5px solid var(--bdr);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--txt2);flex-shrink:0;transition:all .15s;position:relative;}
.ib:hover{border-color:var(--or);color:var(--or);}
.av{width:32px;height:32px;border-radius:50%;background:var(--or);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:900;color:#fff;cursor:pointer;flex-shrink:0;}
.content{flex:1;overflow-y:auto;overflow-x:hidden;}
.btn{padding:8px 15px;border-radius:8px;border:none;font-size:12px;font-family:var(--sans);cursor:pointer;display:inline-flex;align-items:center;gap:6px;font-weight:700;transition:all .15s;white-space:nowrap;}
.btn-p{background:var(--or);color:#fff;box-shadow:0 2px 8px rgba(255,85,0,.28);}
.btn-p:hover{background:#e64900;transform:translateY(-1px);}
.btn-s{background:var(--surf2);color:var(--txt2);border:1.5px solid var(--bdr);}
.btn-s:hover{border-color:var(--or);color:var(--or);}
.btn-g{background:var(--gr-l);color:#065F46;border:1.5px solid #A7F3D0;}
.btn-g:hover{background:#d1fae5;}
.btn-gh{background:none;color:var(--txt3);border:1.5px solid var(--bdr);}
.btn-gh:hover{color:var(--txt);border-color:#94a3b8;}
.btn-d{background:var(--re-l);color:#991B1B;border:1.5px solid #FECACA;}
.btn-in{background:var(--in-l);color:#3730A3;border:1.5px solid #C7D2FE;}
.badge{font-size:10px;font-weight:700;font-family:var(--mono);padding:2px 7px;border-radius:5px;display:inline-flex;align-items:center;gap:3px;white-space:nowrap;}
.b-or{background:var(--or-l);color:#C14400;}
.b-gr{background:var(--gr-l);color:#065F46;}
.b-bl{background:var(--bl-l);color:#075985;}
.b-yl{background:var(--yl-l);color:#92400E;}
.b-re{background:var(--re-l);color:#991B1B;}
.b-pu{background:var(--pu-l);color:#5B21B6;}
.b-in{background:var(--in-l);color:#3730A3;}
.b-mu{background:var(--surf2);color:var(--txt2);border:1px solid var(--bdr);}
.kb{display:flex;gap:13px;padding:16px;min-height:100%;overflow-x:auto;}
.kcol{flex:0 0 224px;background:var(--surf2);border:1.5px solid var(--bdr);border-radius:13px;display:flex;flex-direction:column;}
.col-hd{padding:11px 13px;border-bottom:1.5px solid var(--bdr);display:flex;align-items:center;gap:7px;}
.col-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;}
.col-lbl{font-size:11px;font-weight:800;flex:1;letter-spacing:.3px;}
.col-cnt{font-family:var(--mono);font-size:11px;font-weight:600;padding:2px 7px;border-radius:12px;background:var(--bdr2);color:var(--txt2);}
.col-body{flex:1;overflow-y:auto;padding:9px;display:flex;flex-direction:column;gap:8px;}
.kc{background:var(--surf);border:1.5px solid var(--bdr);border-radius:10px;padding:11px 12px;cursor:pointer;transition:all .15s;position:relative;overflow:hidden;box-shadow:var(--sh);}
.kc:hover{transform:translateY(-2px);box-shadow:var(--sh2);border-color:#CBD5E1;}
.kc-bar{position:absolute;left:0;top:0;bottom:0;width:4px;border-radius:10px 0 0 10px;}
.kc-id{font-family:var(--mono);font-size:10px;color:var(--txt3);font-weight:500;margin-bottom:4px;}
.kc-plate{font-family:var(--mono);font-size:15px;font-weight:800;letter-spacing:2px;}
.kc-veh{font-size:12px;color:var(--txt2);margin-top:2px;font-weight:500;}
.kc-cli{font-size:11px;color:var(--txt3);margin-top:5px;display:flex;align-items:center;gap:4px;font-weight:500;}
.kc-meta{display:flex;gap:4px;margin-top:7px;flex-wrap:wrap;}
.kc-foot{display:flex;align-items:center;justify-content:space-between;margin-top:8px;padding-top:7px;border-top:1px solid var(--bdr2);}
.kc-price{font-family:var(--mono);font-size:13px;font-weight:800;color:var(--or);}
.urg{position:absolute;top:9px;right:9px;width:7px;height:7px;border-radius:50%;background:#EF4444;animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.5)}50%{box-shadow:0 0 0 5px rgba(239,68,68,0)}}
.adv-btn{width:100%;margin-top:5px;padding:5px;background:none;border:1.5px dashed var(--bdr);border-radius:7px;cursor:pointer;font-size:11px;font-weight:700;font-family:var(--sans);color:var(--txt3);display:flex;align-items:center;justify-content:center;gap:4px;transition:all .15s;}
.adv-btn:hover{border-color:var(--or);color:var(--or);background:var(--or-l);}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:13px;padding:16px 16px 0;}
.stat{background:var(--surf);border:1.5px solid var(--bdr);border-radius:13px;padding:16px;box-shadow:var(--sh);}
.stat-lbl{font-size:10px;font-weight:800;color:var(--txt3);letter-spacing:1px;margin-bottom:7px;font-family:var(--mono);}
.stat-val{font-family:var(--mono);font-size:28px;font-weight:800;line-height:1;}
.stat-sub{font-size:11px;color:var(--txt3);margin-top:5px;font-weight:500;}
.stat-bar{width:36px;height:4px;border-radius:2px;margin-top:9px;}
.modal-bg{position:fixed;inset:0;z-index:100;background:rgba(15,17,23,.6);display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(3px);}
.modal{background:var(--surf);border:1.5px solid var(--bdr);border-radius:16px;width:720px;max-height:88vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:var(--sh3);}
.m-head{padding:16px 20px;border-bottom:1.5px solid var(--bdr);display:flex;align-items:center;gap:11px;}
.m-body{flex:1;overflow-y:auto;padding:20px;}
.m-foot{padding:13px 20px;border-top:1.5px solid var(--bdr);display:flex;gap:8px;justify-content:flex-end;background:var(--surf2);}
.tabs{display:flex;border-bottom:2px solid var(--bdr2);margin-bottom:16px;}
.tab{padding:8px 13px;font-size:13px;font-weight:700;cursor:pointer;color:var(--txt3);border-bottom:3px solid transparent;margin-bottom:-2px;transition:all .12s;border-radius:7px 7px 0 0;}
.tab:hover:not(.active){color:var(--txt2);background:var(--surf2);}
.tab.active{color:var(--or);border-bottom-color:var(--or);}
.fg{margin-bottom:14px;}
.fl{display:block;font-size:12px;font-weight:700;color:var(--txt2);margin-bottom:4px;letter-spacing:.3px;}
.fl em{color:var(--re);font-style:normal;margin-left:2px;}
.fi{width:100%;padding:9px 12px;border:1.5px solid var(--bdr);border-radius:8px;font-size:13px;font-family:var(--sans);background:var(--surf);color:var(--txt);outline:none;transition:border-color .15s;}
.fi:focus{border-color:var(--or);box-shadow:0 0 0 3px rgba(255,85,0,.09);}
.fi::placeholder{color:var(--txt3);}
.fi-sel{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:32px;}
.fi-ta{resize:vertical;min-height:80px;line-height:1.6;}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:13px;}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:13px;}
.wiz-bg{position:fixed;inset:0;z-index:200;background:rgba(15,17,23,.65);display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px);}
.wiz{background:var(--surf);border-radius:16px;width:740px;max-height:92vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:var(--sh3);}
.wiz-hd{padding:20px 24px 0;}
.wiz-steps{display:flex;align-items:center;margin-bottom:20px;}
.ws-n{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0;transition:all .2s;}
.ws-n.done{background:var(--gr);color:#fff;}
.ws-n.active{background:var(--or);color:#fff;box-shadow:0 0 0 4px rgba(255,85,0,.18);}
.ws-n.pend{background:var(--bdr2);color:var(--txt3);}
.ws-lbl{font-size:11px;font-weight:700;color:var(--txt3);margin-left:7px;}
.ws-lbl.active{color:var(--or);}
.ws-lbl.done{color:var(--gr);}
.ws-line{flex:1;height:2px;background:var(--bdr);margin:0 10px;border-radius:1px;transition:background .3s;}
.ws-line.done{background:var(--gr);}
.wiz-title{font-size:20px;font-weight:900;letter-spacing:-.4px;margin-bottom:2px;}
.wiz-sub{font-size:13px;color:var(--txt3);margin-bottom:18px;font-weight:500;}
.wiz-body{flex:1;overflow-y:auto;padding:0 24px;}
.wiz-ft{padding:16px 24px;border-top:1.5px solid var(--bdr2);display:flex;justify-content:space-between;gap:10px;background:var(--surf2);}
.cr{display:flex;align-items:center;gap:11px;padding:11px 13px;border:1.5px solid var(--bdr);border-radius:9px;cursor:pointer;transition:all .15s;background:var(--surf);margin-bottom:7px;}
.cr:hover,.cr.sel{border-color:var(--or);background:var(--or-l);}
.cav{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;flex-shrink:0;transition:all .2s;}
.blk{background:var(--surf2);border:1.5px solid var(--bdr2);border-radius:9px;padding:13px;}
.blk-t{font-size:10px;font-weight:800;color:var(--txt3);letter-spacing:1px;margin-bottom:9px;font-family:var(--mono);}
.ir{display:flex;justify-content:space-between;align-items:center;padding:4px 0;}
.ik{color:var(--txt3);font-size:12px;font-weight:500;}
.iv{font-family:var(--mono);font-size:12px;font-weight:600;}
.sec-t{font-size:13px;font-weight:800;color:var(--txt2);margin-bottom:11px;display:flex;align-items:center;gap:7px;}
.tbl{width:100%;border-collapse:collapse;}
.tbl th{text-align:left;padding:10px 13px;font-size:10px;font-weight:800;color:var(--txt3);border-bottom:2px solid var(--bdr);background:var(--surf2);letter-spacing:.8px;font-family:var(--mono);white-space:nowrap;}
.tbl td{padding:11px 13px;border-bottom:1px solid var(--bdr2);font-size:13px;font-weight:500;}
.tbl tr:hover td{background:#FAFBFD;}
.divider{height:1px;background:var(--bdr2);margin:14px 0;}
.fp{padding:16px;}
.pg-t{font-size:21px;font-weight:900;letter-spacing:-.3px;margin-bottom:14px;}
.pg-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
.wa-bub{background:#DCF8C6;border-radius:0 12px 12px 12px;padding:12px 16px;font-size:13px;line-height:1.8;color:#1A3D1A;max-width:360px;border:1px solid #B5EDA0;}
.tz{position:fixed;bottom:18px;right:18px;display:flex;flex-direction:column;gap:7px;z-index:300;pointer-events:none;}
.toast{background:#fff;border:1.5px solid var(--bdr);border-left:4px solid var(--or);border-radius:9px;padding:10px 14px;font-size:12px;font-weight:600;display:flex;align-items:center;gap:8px;box-shadow:var(--sh2);animation:sIn .2s ease-out;color:var(--txt2);max-width:360px;}
.toast-wa{border-left-color:#25D366;}
.toast-ok{border-left-color:var(--gr);}
.toast-in{border-left-color:var(--in);}
@keyframes sIn{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}
.cli-card{background:var(--surf);border:1.5px solid var(--bdr);border-radius:13px;padding:16px;box-shadow:var(--sh);cursor:pointer;transition:all .15s;}
.cli-card:hover{transform:translateY(-2px);box-shadow:var(--sh2);border-color:#CBD5E1;}
.sup-row{display:flex;align-items:center;gap:12px;padding:13px;border-bottom:1px solid var(--bdr2);cursor:pointer;transition:background .12s;}
.sup-row:hover{background:var(--surf2);}
.pill{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:800;}
`;

// ─── WIZARD ─────────────────────────────────────────────────────
const WIZ_STEPS=[{n:1,label:"Propietario"},{n:2,label:"Vehículo"},{n:3,label:"Falla y Servicio"},{n:4,label:"Confirmación"}];
const EMPTY={clientMode:"existing",clientId:null,clientName:"",clientPhone:"",clientEmail:"",clientRut:"",plate:"",brand:"",model:"",year:"",vin:"",km:"",color:"",isNew:true,fault:"",serviceIds:[],mechanic:"",urgent:false};

function CheckInWizard({orders,addOrder,close}){
  const [step,setStep]=useState(1);
  const [f,setF]=useState(EMPTY);
  const [search,setSearch]=useState("");
  const [done,setDone]=useState(false);
  const newId=nextOS(orders);
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const toggleSvc=id=>set("serviceIds",f.serviceIds.includes(id)?f.serviceIds.filter(x=>x!==id):[...f.serviceIds,id]);
  const filtered=CLIENTS.filter(c=>c.name.toLowerCase().includes(search.toLowerCase())||c.phone.includes(search)||c.rut.includes(search));
  const selClient=f.clientId?CLIENTS.find(c=>c.id===f.clientId):null;
  const clientVehs=f.clientId?VEHICLES.filter(v=>v.clientId===f.clientId):[];
  const total=getSvcs(f.serviceIds).reduce((a,s)=>a+s.price,0);

  const submit=()=>{
    const baseVeh=!f.isNew?VEHICLES.find(v=>v.plate===f.plate):null;
    addOrder({id:newId,vehicleId:baseVeh?baseVeh.id:1,status:"ingreso",mechanic:f.mechanic||null,serviceIds:f.serviceIds,parts:[],total,approved:false,created:new Date().toLocaleDateString("es-CL").slice(0,5),km:parseInt(f.km)||0,photos:0,urgent:f.urgent,fault:f.fault||"Sin descripción."});
    setDone(true);
  };

  if(done)return(
    <div className="wiz-bg" onClick={close}>
      <div className="wiz" style={{maxWidth:500,padding:40,textAlign:"center"}} onClick={e=>e.stopPropagation()}>
        <div style={{width:76,height:76,borderRadius:"50%",background:"var(--gr-l)",border:"3px solid var(--gr)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}><CheckCircle size={38} style={{color:"var(--gr)"}}/></div>
        <div style={{fontSize:26,fontWeight:900,letterSpacing:-.5,marginBottom:5}}>¡Vehículo Ingresado!</div>
        <div style={{fontSize:13,color:"var(--txt3)",marginBottom:14}}>Orden de servicio generada correctamente.</div>
        <div style={{display:"inline-block",background:"var(--or-l)",border:"2px solid var(--or)",borderRadius:11,padding:"10px 28px",fontFamily:"var(--mono)",fontSize:24,fontWeight:800,color:"var(--or)",marginBottom:18}}>{newId}</div>
        <div style={{background:"var(--surf2)",border:"1.5px solid var(--bdr)",borderRadius:10,padding:"12px 18px",marginBottom:22,fontSize:13,color:"var(--txt2)",lineHeight:1.8,textAlign:"left"}}>
          <div><strong>Placa:</strong> <span style={{fontFamily:"var(--mono)",fontWeight:800}}>{f.plate.toUpperCase()}</span></div>
          {f.brand&&<div><strong>Vehículo:</strong> {f.brand} {f.model} {f.year}</div>}
          <div><strong>Cliente:</strong> {selClient?.name||f.clientName}</div>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"center"}}>
          <button className="btn btn-s" onClick={close}>Ver Tablero</button>
          <button className="btn btn-p" onClick={()=>{setF(EMPTY);setStep(1);setDone(false);}}><Plus size={13}/>Nuevo Ingreso</button>
        </div>
      </div>
    </div>
  );

  return(
    <div className="wiz-bg" onClick={close}>
      <div className="wiz" onClick={e=>e.stopPropagation()}>
        <div className="wiz-hd">
          <div className="wiz-steps">
            {WIZ_STEPS.map((s,i)=>(
              <div key={s.n} style={{display:"flex",alignItems:"center",flex:i<WIZ_STEPS.length-1?1:"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:0}}>
                  <div className={`ws-n ${step>s.n?"done":step===s.n?"active":"pend"}`}>{step>s.n?<CheckCircle size={14}/>:s.n}</div>
                  <span className={`ws-lbl ${step===s.n?"active":step>s.n?"done":""}`}>{s.label}</span>
                </div>
                {i<WIZ_STEPS.length-1&&<div className={`ws-line${step>s.n?" done":""}`} style={{flex:1,margin:"0 10px"}}/>}
              </div>
            ))}
          </div>
          {step===1&&<><div className="wiz-title">Datos del Propietario</div><div className="wiz-sub">Busca si el cliente ya existe o regístralo nuevo.</div></>}
          {step===2&&<><div className="wiz-title">Datos del Vehículo</div><div className="wiz-sub">Ingresa los datos completos del vehículo.</div></>}
          {step===3&&<><div className="wiz-title">Falla y Servicios</div><div className="wiz-sub">Describe el problema y selecciona servicios.</div></>}
          {step===4&&<><div className="wiz-title">Confirmar Orden</div><div className="wiz-sub">Revisa antes de generar la orden de servicio.</div></>}
        </div>
        <div className="wiz-body">
          {step===1&&(
            <div>
              <div style={{display:"flex",gap:8,marginBottom:16}}>
                <button className={`btn ${f.clientMode==="existing"?"btn-p":"btn-s"}`} onClick={()=>set("clientMode","existing")}><Search size={12}/>Cliente existente</button>
                <button className={`btn ${f.clientMode==="new"?"btn-p":"btn-s"}`} onClick={()=>{set("clientMode","new");set("clientId",null);}}><Plus size={12}/>Cliente nuevo</button>
              </div>
              {f.clientMode==="existing"?(
                <>
                  <div className="fg"><label className="fl">Buscar por nombre, teléfono o RUT</label>
                    <div style={{position:"relative"}}><Search size={13} style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:"var(--txt3)"}}/><input className="fi" style={{paddingLeft:34}} placeholder="Ej: Carlos, +56 9..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
                  </div>
                  {filtered.map(c=>(
                    <div key={c.id} className={`cr${f.clientId===c.id?" sel":""}`} onClick={()=>set("clientId",c.id)}>
                      <div className="cav" style={{background:f.clientId===c.id?"var(--or)":"var(--in-l)",color:f.clientId===c.id?"#fff":"var(--in)"}}>{c.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                      <div style={{flex:1}}><div style={{fontWeight:800,fontSize:14}}>{c.name}</div><div style={{fontSize:11,color:"var(--txt3)"}}>{c.phone} · {c.rut} · {VEHICLES.filter(v=>v.clientId===c.id).length} vehículo(s)</div></div>
                      {f.clientId===c.id&&<CheckCircle size={18} style={{color:"var(--or)"}}/>}
                    </div>
                  ))}
                </>
              ):(
                <>
                  <div className="g2"><div className="fg"><label className="fl">Nombre completo <em>*</em></label><input className="fi" placeholder="Juan Pérez González" value={f.clientName} onChange={e=>set("clientName",e.target.value)}/></div><div className="fg"><label className="fl">RUT <em>*</em></label><input className="fi" placeholder="12.345.678-9" value={f.clientRut} onChange={e=>set("clientRut",e.target.value)}/></div></div>
                  <div className="g2"><div className="fg"><label className="fl">Teléfono <em>*</em></label><input className="fi" placeholder="+56 9 8765 4321" value={f.clientPhone} onChange={e=>set("clientPhone",e.target.value)}/></div><div className="fg"><label className="fl">Email</label><input className="fi" placeholder="correo@email.com" value={f.clientEmail} onChange={e=>set("clientEmail",e.target.value)}/></div></div>
                </>
              )}
            </div>
          )}
          {step===2&&(
            <div>
              {f.clientId&&clientVehs.length>0&&(
                <>
                  <div className="sec-t"><Car size={13}/> Vehículos previos del cliente</div>
                  {clientVehs.map(v=>(
                    <div key={v.id} className={`cr${!f.isNew&&f.plate===v.plate?" sel":""}`} onClick={()=>{set("isNew",false);set("plate",v.plate);set("brand",v.brand);set("model",v.model);set("year",String(v.year));set("vin",v.vin);set("km",String(v.km));set("color",v.color);}}>
                      <div className="cav" style={{background:"var(--bl-l)",color:"var(--bl)",borderRadius:9}}><Car size={18}/></div>
                      <div style={{flex:1}}><div style={{fontFamily:"var(--mono)",fontWeight:800,fontSize:15,letterSpacing:1.5}}>{v.plate}</div><div style={{fontSize:11,color:"var(--txt3)"}}>{v.brand} {v.model} {v.year} · {v.km.toLocaleString("es-CL")} km</div></div>
                      {!f.isNew&&f.plate===v.plate&&<CheckCircle size={18} style={{color:"var(--bl)"}}/>}
                    </div>
                  ))}
                  <button className="btn btn-s" style={{width:"100%",justifyContent:"center",marginBottom:12}} onClick={()=>{set("isNew",true);set("plate","");set("brand","");set("model","");set("year","");set("vin","");set("km","");set("color","");}}><Plus size={12}/>Registrar vehículo diferente</button>
                </>
              )}
              {(f.isNew||!f.clientId)&&(
                <>
                  <div className="sec-t"><Car size={13}/> Datos del vehículo</div>
                  <div className="g3"><div className="fg"><label className="fl">Patente <em>*</em></label><input className="fi" style={{fontFamily:"var(--mono)",fontWeight:800,letterSpacing:2,textTransform:"uppercase",fontSize:15}} placeholder="BBCC-12" value={f.plate} onChange={e=>set("plate",e.target.value.toUpperCase())}/></div><div className="fg"><label className="fl">Marca <em>*</em></label><select className="fi fi-sel" value={f.brand} onChange={e=>set("brand",e.target.value)}><option value="">Seleccionar...</option>{BRANDS.map(b=><option key={b}>{b}</option>)}</select></div><div className="fg"><label className="fl">Modelo <em>*</em></label><input className="fi" placeholder="Corolla..." value={f.model} onChange={e=>set("model",e.target.value)}/></div></div>
                  <div className="g3"><div className="fg"><label className="fl">Año</label><input className="fi" type="number" placeholder="2020" min="1990" max="2025" value={f.year} onChange={e=>set("year",e.target.value)}/></div><div className="fg"><label className="fl">Color</label><input className="fi" placeholder="Blanco..." value={f.color} onChange={e=>set("color",e.target.value)}/></div><div className="fg"><label className="fl">Kilometraje <em>*</em></label><input className="fi" type="number" placeholder="65000" value={f.km} onChange={e=>set("km",e.target.value)}/></div></div>
                  <div className="fg"><label className="fl">VIN / Chasis</label><input className="fi" style={{fontFamily:"var(--mono)",fontSize:13}} placeholder="JT2BF22K1W0078624" value={f.vin} onChange={e=>set("vin",e.target.value.toUpperCase())}/></div>
                </>
              )}
            </div>
          )}
          {step===3&&(
            <div>
              <div className="fg"><label className="fl">Descripción de la falla o motivo de ingreso <em>*</em></label><textarea className="fi fi-ta" placeholder="Ej: Ruido al frenar en curva derecha, motor con humo blanco, mantención 60.000 km..." value={f.fault} onChange={e=>set("fault",e.target.value)}/></div>
              <div className="divider"/>
              <div className="sec-t"><Wrench size={13}/> Servicios (opcional)</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:14}}>
                {SERVICES_LIST.map(s=>{const on=f.serviceIds.includes(s.id);return(
                  <div key={s.id} onClick={()=>toggleSvc(s.id)} style={{display:"flex",alignItems:"center",gap:9,padding:"10px 12px",border:`2px solid ${on?"var(--or)":"var(--bdr)"}`,borderRadius:9,cursor:"pointer",background:on?"var(--or-l)":"var(--surf)",transition:"all .15s"}}>
                    <div style={{width:18,height:18,borderRadius:4,border:`2px solid ${on?"var(--or)":"var(--bdr)"}`,background:on?"var(--or)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{on&&<CheckCircle size={11} style={{color:"#fff"}}/>}</div>
                    <div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:700,color:on?"var(--or)":"var(--txt)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.name}</div><div style={{fontSize:10,color:"var(--txt3)"}}>{s.hrs}h · {s.price>0?clp(s.price):"Variable"}</div></div>
                  </div>
                );})}
              </div>
              <div className="g2">
                <div className="fg"><label className="fl">Mecánico asignado</label><select className="fi fi-sel" value={f.mechanic} onChange={e=>set("mechanic",e.target.value)}><option value="">Asignar más tarde...</option>{MECHANICS.map(m=><option key={m}>{m}</option>)}</select></div>
                <div className="fg"><label className="fl">Prioridad</label><div style={{display:"flex",gap:7,marginTop:2}}><button className="btn" style={{flex:1,justifyContent:"center",background:!f.urgent?"var(--gr-l)":"var(--surf2)",color:!f.urgent?"#065F46":"var(--txt2)",border:`2px solid ${!f.urgent?"#A7F3D0":"var(--bdr)"}`}} onClick={()=>set("urgent",false)}>Normal</button><button className="btn" style={{flex:1,justifyContent:"center",background:f.urgent?"var(--re-l)":"var(--surf2)",color:f.urgent?"#991B1B":"var(--txt2)",border:`2px solid ${f.urgent?"#FECACA":"var(--bdr)"}`}} onClick={()=>set("urgent",true)}>🔴 Urgente</button></div></div>
              </div>
            </div>
          )}
          {step===4&&(
            <div>
              <div style={{background:"var(--or-l)",border:"2px solid var(--or)",borderRadius:11,padding:"14px 18px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:46,height:46,borderRadius:11,background:"var(--or)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><FileText size={22} style={{color:"#fff"}}/></div>
                <div style={{flex:1}}><div style={{fontFamily:"var(--mono)",fontSize:22,fontWeight:900,color:"var(--or)"}}>{newId}</div><div style={{fontSize:11,color:"var(--txt3)"}}>Nueva orden · {new Date().toLocaleDateString("es-CL")}</div></div>
                {f.urgent&&<span className="badge b-re">URGENTE</span>}
              </div>
              <div className="g2" style={{marginBottom:12}}>
                <div className="blk"><div className="blk-t">PROPIETARIO</div><div className="ir"><span className="ik">Nombre</span><span style={{fontWeight:700}}>{selClient?.name||f.clientName}</span></div><div className="ir"><span className="ik">RUT</span><span className="iv">{selClient?.rut||f.clientRut}</span></div><div className="ir"><span className="ik">Teléfono</span><span className="iv">{selClient?.phone||f.clientPhone}</span></div></div>
                <div className="blk"><div className="blk-t">VEHÍCULO</div><div className="ir"><span className="ik">Patente</span><span style={{fontFamily:"var(--mono)",fontWeight:900,fontSize:15,letterSpacing:1.5}}>{f.plate}</span></div><div className="ir"><span className="ik">Vehículo</span><span style={{fontWeight:700}}>{f.brand} {f.model} {f.year}</span></div><div className="ir"><span className="ik">KM</span><span className="iv">{parseInt(f.km||0).toLocaleString("es-CL")}</span></div></div>
              </div>
              <div className="blk" style={{marginBottom:12}}><div className="blk-t">FALLA REPORTADA</div><div style={{fontSize:13,color:"var(--txt2)",lineHeight:1.7}}>{f.fault||<span style={{color:"var(--txt3)"}}>Sin descripción</span>}</div></div>
              {f.serviceIds.length>0&&<div className="blk"><div className="blk-t">SERVICIOS</div>{getSvcs(f.serviceIds).map(s=><div key={s.id} className="ir"><span style={{fontSize:13}}>{s.name}</span><span style={{fontFamily:"var(--mono)",fontSize:13,fontWeight:800,color:"var(--or)"}}>{clp(s.price)}</span></div>)}<div style={{borderTop:"2px solid var(--bdr)",marginTop:7,paddingTop:7,display:"flex",justifyContent:"space-between"}}><span style={{fontWeight:800}}>Total estimado</span><span style={{fontFamily:"var(--mono)",fontSize:16,fontWeight:900,color:"var(--or)"}}>{clp(total)}</span></div></div>}
            </div>
          )}
        </div>
        <div className="wiz-ft">
          <button className="btn btn-gh" onClick={step===1?close:()=>setStep(s=>s-1)}>{step===1?<><X size={12}/>Cancelar</>:<><ArrowLeft size={12}/>Atrás</>}</button>
          {step<4?<button className="btn btn-p" onClick={()=>setStep(s=>s+1)} disabled={step===1&&f.clientMode==="existing"&&!f.clientId}>Siguiente <ArrowRight size={12}/></button>:<button className="btn btn-p" onClick={submit}><CheckCircle size={12}/>Generar Orden</button>}
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ────────────────────────────────────────────────────
function Sidebar({view,setView}){
  const nav=[
    {id:"dashboard",label:"Dashboard",Icon:LayoutDashboard},
    {id:"kanban",   label:"Tablero",   Icon:List},
    {id:"clientes", label:"Clientes",  Icon:Users},
    {id:"vehicles", label:"Vehículos", Icon:Car},
    {id:"catalog",  label:"Catálogo",  Icon:Wrench},
  ];
  const nav2=[
    {id:"cotizaciones",label:"Cotizaciones", Icon:ClipboardList},
    {id:"facturacion", label:"Facturación",  Icon:Receipt},
    {id:"inventory",   label:"Inventario",   Icon:Package},
    {id:"proveedores", label:"Proveedores",  Icon:Building2},
  ];
  return(
    <div className="sb">
      <div className="sb-logo">
        <div className="logo-row"><div className="logo-icon">T</div><div><div className="logo-name">TALLER<em>OS</em></div><div className="logo-sub">GESTIÓN TALLER</div></div></div>
      </div>
      <div className="nav">
        <div className="nlbl">OPERACIONES</div>
        {nav.map(({id,label,Icon})=><div key={id} className={`ni${view===id?" active":""}`} onClick={()=>setView(id)}><Icon size={15}/>{label}</div>)}
        <div className="nsep"/>
        <div className="nlbl">ADMINISTRACIÓN</div>
        {nav2.map(({id,label,Icon})=><div key={id} className={`ni${view===id?" active":""}`} onClick={()=>setView(id)}><Icon size={15}/>{label}</div>)}
        <div className="nsep"/>
        <div className="nlbl">INTEGRACIÓN</div>
        <div className="ni dim"><Zap size={15}/>Automatización</div>
        <div className="ni dim"><MessageSquare size={15}/>WhatsApp</div>
        <div className="nsep"/>
        <div className="ni dim"><Shield size={15}/>Configuración</div>
      </div>
    </div>
  );
}

// ─── KANBAN ─────────────────────────────────────────────────────
function KCard({order,onClick,moveOrder}){
  const v=getV(order.vehicleId),c=getC(order.vehicleId);
  const col=COLS.find(x=>x.id===order.status);
  const nextId=COL_NEXT[order.status],nextCol=COLS.find(x=>x.id===nextId);
  return(
    <div className="kc" onClick={onClick}>
      <div className="kc-bar" style={{background:col?.color}}/>
      {order.urgent&&<div className="urg"/>}
      <div className="kc-id">{order.id} · {order.created}</div>
      <div className="kc-plate">{v?.plate}</div>
      <div className="kc-veh">{v?.brand} {v?.model} {v?.year}</div>
      <div className="kc-cli"><User size={10}/>{c?.name}</div>
      <div className="kc-meta">
        {order.serviceIds.length>0&&<span className="badge b-mu"><Wrench size={7}/>{order.serviceIds.length}</span>}
        {order.approved?<span className="badge b-gr"><CheckCircle size={7}/>OK</span>:order.total>0?<span className="badge b-yl">Pend.</span>:null}
        {order.photos>0&&<span className="badge b-mu"><Camera size={7}/>{order.photos}</span>}
        {order.urgent&&<span className="badge b-re">URG</span>}
      </div>
      <div className="kc-foot">
        <span className="kc-price">{order.total>0?clp(order.total):<span style={{color:"var(--txt3)",fontFamily:"var(--mono)",fontSize:11}}>Sin cotizar</span>}</span>
        {order.mechanic&&<span style={{fontSize:10,color:"var(--txt3)",fontWeight:600}}>{order.mechanic.split(" ")[0]}</span>}
      </div>
      {nextCol&&<button className="adv-btn" onClick={e=>{e.stopPropagation();moveOrder(order.id,nextId);}}><ChevronRight size={11}/>→ {nextCol.label}</button>}
    </div>
  );
}
function KanbanView({orders,moveOrder,openOrder}){
  return(
    <div className="kb">
      {COLS.map(col=>{
        const co=orders.filter(o=>o.status===col.id);
        return(
          <div key={col.id} className="kcol">
            <div className="col-hd"><div className="col-dot" style={{background:col.color}}/><span className="col-lbl" style={{color:col.color}}>{col.label}</span><span className="col-cnt">{co.length}</span></div>
            <div className="col-body">
              {co.length===0&&<div style={{textAlign:"center",padding:"18px 10px",color:"var(--txt3)",fontSize:11,fontWeight:500}}>Sin órdenes</div>}
              {co.map(o=><KCard key={o.id} order={o} onClick={()=>openOrder(o)} moveOrder={moveOrder}/>)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── DASHBOARD ──────────────────────────────────────────────────
function Dashboard({orders,quotes,invoices}){
  const active=orders.filter(o=>o.status!=="entrega").length;
  const ready=orders.filter(o=>o.status==="entrega").length;
  const rev=invoices.filter(i=>i.status==="pagada").reduce((a,b)=>a+b.total,0);
  const pendCobro=invoices.filter(i=>["emitida","pendiente"].includes(i.status)).reduce((a,b)=>a+b.total,0);
  const feed=[
    {Icon:CheckCircle,bg:"var(--gr-l)",ic:"var(--gr)",msg:"OS-0894 lista para retiro — F-0021 cobrada",wa:true,t:"2h"},
    {Icon:Receipt,bg:"var(--in-l)",ic:"var(--in)",msg:"Factura F-0022 emitida a Carlos Mendoza",wa:false,t:"3h"},
    {Icon:ClipboardList,bg:"var(--or-l)",ic:"var(--or)",msg:"COT-0043 aprobada por WhatsApp",wa:true,t:"4h"},
    {Icon:Truck,bg:"var(--pu-l)",ic:"var(--pu)",msg:"OC-0012 recibida de MazdaPartes",wa:false,t:"5h"},
    {Icon:Car,bg:"var(--bl-l)",ic:"var(--bl)",msg:"KBCH-77 ingresado — OS-0895 creada",wa:false,t:"6h"},
  ];
  return(
    <div>
      <div className="stats">
        {[
          {lbl:"ÓRDENES ACTIVAS",val:active,sub:"En proceso",c:"var(--in)"},
          {lbl:"LISTAS ENTREGA",val:ready,sub:"Esperando retiro",c:"var(--gr)"},
          {lbl:"RECAUDADO MES",val:clp(rev),sub:"Facturas + boletas",c:"var(--or)",sm:true},
          {lbl:"POR COBRAR",val:clp(pendCobro),sub:"Documentos emitidos",c:"var(--yl)",sm:true},
        ].map((s,i)=>(
          <div key={i} className="stat"><div className="stat-lbl">{s.lbl}</div><div className="stat-val" style={{color:s.c,fontSize:s.sm?20:28}}>{s.val}</div><div className="stat-sub">{s.sub}</div><div className="stat-bar" style={{background:s.c}}/></div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:13,padding:"13px 16px 16px"}}>
        <div style={{background:"var(--surf)",border:"1.5px solid var(--bdr)",borderRadius:13,padding:16,boxShadow:"var(--sh)"}}>
          <div className="sec-t"><Activity size={13}/> Actividad Reciente</div>
          {feed.map((a,i)=>(
            <div key={i} style={{display:"flex",alignItems:"flex-start",gap:9,padding:"8px 0",borderBottom:"1px solid var(--bdr2)"}}>
              <div style={{width:28,height:28,borderRadius:7,background:a.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><a.Icon size={13} style={{color:a.ic}}/></div>
              <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600}}>{a.msg}</div><div style={{fontSize:10,color:"var(--txt3)"}}>hace {a.t}</div></div>
              {a.wa&&<MessageSquare size={12} style={{color:"#25D366",flexShrink:0}}/>}
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:13}}>
          <div style={{background:"var(--surf)",border:"1.5px solid var(--bdr)",borderRadius:13,padding:16,boxShadow:"var(--sh)"}}>
            <div className="sec-t"><AlertTriangle size={13} style={{color:"var(--re)"}}/> Alertas</div>
            {[
              {c:"var(--re-l)",bc:"#FECACA",ic:"var(--re)",Icon:AlertTriangle,bold:"F-0020",rest:" factura vencida — cobro pendiente"},
              {c:"var(--yl-l)",bc:"#FDE68A",ic:"var(--yl)",Icon:Package,bold:"2 repuestos",rest:" bajo stock mínimo"},
              {c:"var(--bl-l)",bc:"#BAE6FD",ic:"var(--bl)",Icon:ClipboardList,bold:"COT-0042",rest:" pendiente de aprobación (8h)"},
            ].map((a,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:a.c,border:`1.5px solid ${a.bc}`,borderRadius:8,marginBottom:6,fontSize:12,fontWeight:500}}><a.Icon size={12} style={{color:a.ic,flexShrink:0}}/><span><strong style={{color:a.ic}}>{a.bold}</strong>{a.rest}</span></div>
            ))}
          </div>
          <div style={{background:"var(--surf)",border:"1.5px solid var(--bdr)",borderRadius:13,padding:16,boxShadow:"var(--sh)"}}>
            <div className="sec-t"><BarChart2 size={13}/> Estado del Taller</div>
            {COLS.map(col=>{
              const cnt=orders.filter(o=>o.status===col.id).length;
              return(
                <div key={col.id} style={{marginBottom:9}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:12,fontWeight:700,marginBottom:3}}><span>{col.label}</span><span style={{fontFamily:"var(--mono)",color:col.color,fontWeight:800}}>{cnt}</span></div>
                  <div style={{height:7,background:"var(--bdr2)",borderRadius:4}}><div style={{width:`${orders.length?(cnt/orders.length)*100:0}%`,height:"100%",background:col.color,borderRadius:4,transition:"width .5s"}}/></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CLIENTES ───────────────────────────────────────────────────
function ClientesView({orders,toast}){
  const [sel,setSel]=useState(null);
  const [tab,setTab]=useState("historial");
  const colors=["var(--in)","var(--bl)","var(--pu)","var(--gr)","var(--or)"];

  if(sel){
    const c=sel;
    const vehs=VEHICLES.filter(v=>v.clientId===c.id);
    const ords=clientOrders(c.id,orders);
    const spent=clientSpent(c.id,orders);
    return(
      <div className="fp">
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <button className="btn btn-s" onClick={()=>setSel(null)}><ArrowLeft size={12}/>Volver</button>
          <div style={{flex:1}}/>
          <button className="btn btn-g" onClick={()=>toast(`WhatsApp → ${c.phone}`,"wa")}><MessageSquare size={12}/>WhatsApp</button>
          <button className="btn btn-s"><Phone size={12}/>Llamar</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:16}}>
          <div>
            <div style={{background:"var(--surf)",border:"1.5px solid var(--bdr)",borderRadius:13,padding:20,boxShadow:"var(--sh)",marginBottom:13,textAlign:"center"}}>
              <div style={{width:64,height:64,borderRadius:"50%",background:"var(--or)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:24,color:"#fff",margin:"0 auto 12px"}}>{c.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
              <div style={{fontWeight:900,fontSize:18,marginBottom:2}}>{c.name}</div>
              <div style={{fontSize:12,color:"var(--txt3)",marginBottom:14}}>{c.rut}</div>
              <div style={{display:"flex",justifyContent:"center",gap:20,padding:"12px 0",borderTop:"1px solid var(--bdr2)",borderBottom:"1px solid var(--bdr2)",marginBottom:14}}>
                <div style={{textAlign:"center"}}><div style={{fontFamily:"var(--mono)",fontWeight:800,fontSize:18,color:"var(--or)"}}>{ords.length}</div><div style={{fontSize:10,color:"var(--txt3)"}}>ÓRDENES</div></div>
                <div style={{textAlign:"center"}}><div style={{fontFamily:"var(--mono)",fontWeight:800,fontSize:18,color:"var(--gr)"}}>{clp(spent)}</div><div style={{fontSize:10,color:"var(--txt3)"}}>GASTADO</div></div>
                <div style={{textAlign:"center"}}><div style={{fontFamily:"var(--mono)",fontWeight:800,fontSize:18,color:"var(--bl)"}}>{vehs.length}</div><div style={{fontSize:10,color:"var(--txt3)"}}>VEHÍCULOS</div></div>
              </div>
              <div style={{fontSize:12,color:"var(--txt2)",display:"flex",flexDirection:"column",gap:7,textAlign:"left"}}>
                <div style={{display:"flex",gap:7,alignItems:"center"}}><Phone size={12} style={{color:"var(--txt3)",flexShrink:0}}/>{c.phone}</div>
                <div style={{display:"flex",gap:7,alignItems:"center"}}><Mail size={12} style={{color:"var(--txt3)",flexShrink:0}}/>{c.email}</div>
                <div style={{display:"flex",gap:7,alignItems:"flex-start"}}><MapPin size={12} style={{color:"var(--txt3)",flexShrink:0,marginTop:2}}/>{c.address}</div>
                <div style={{display:"flex",gap:7,alignItems:"center"}}><Calendar size={12} style={{color:"var(--txt3)",flexShrink:0}}/><span style={{color:"var(--txt3)"}}>Cliente desde</span> {c.joined}</div>
              </div>
              {c.notes&&<div style={{marginTop:12,padding:"9px 11px",background:"var(--yl-l)",border:"1px solid #FDE68A",borderRadius:8,fontSize:11,color:"#92400E"}}>{c.notes}</div>}
            </div>
            <div style={{background:"var(--surf)",border:"1.5px solid var(--bdr)",borderRadius:13,padding:16,boxShadow:"var(--sh)"}}>
              <div className="sec-t"><Car size={13}/> Vehículos</div>
              {vehs.map(v=>(
                <div key={v.id} style={{display:"flex",gap:10,padding:"9px 0",borderBottom:"1px solid var(--bdr2)",alignItems:"center"}}>
                  <div style={{width:34,height:34,borderRadius:8,background:"var(--bl-l)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Car size={16} style={{color:"var(--bl)"}}/></div>
                  <div><div style={{fontFamily:"var(--mono)",fontWeight:800,fontSize:14,letterSpacing:1}}>{v.plate}</div><div style={{fontSize:11,color:"var(--txt3)"}}>{v.brand} {v.model} {v.year}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:"var(--surf)",border:"1.5px solid var(--bdr)",borderRadius:13,padding:0,boxShadow:"var(--sh)",overflow:"hidden"}}>
            <div style={{padding:"0 20px",borderBottom:"2px solid var(--bdr2)"}}>
              <div className="tabs" style={{margin:0}}>
                {[["historial","Historial de Órdenes"],["docs","Documentos"]].map(([t,l])=>(
                  <div key={t} className={`tab${tab===t?" active":""}`} onClick={()=>setTab(t)}>{l}</div>
                ))}
              </div>
            </div>
            <div style={{padding:20}}>
              {tab==="historial"&&(
                ords.length===0?<div style={{textAlign:"center",padding:32,color:"var(--txt3)"}}>Sin órdenes</div>:
                <table className="tbl"><thead><tr><th>ORDEN</th><th>VEHÍCULO</th><th>FALLA</th><th>ESTADO</th><th>TOTAL</th><th>FECHA</th></tr></thead>
                <tbody>{ords.map(o=>{const v=getV(o.vehicleId);const col=COLS.find(x=>x.id===o.status);return(<tr key={o.id}><td><span style={{fontFamily:"var(--mono)",fontWeight:800}}>{o.id}</span></td><td>{v?.plate}</td><td style={{maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{o.fault}</td><td><span style={{background:col?.light,color:col?.color,padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:800}}>● {col?.label}</span></td><td><span style={{fontFamily:"var(--mono)",fontWeight:800,color:"var(--or)"}}>{clp(o.total)}</span></td><td style={{color:"var(--txt3)"}}>{o.created}</td></tr>);})}</tbody></table>
              )}
              {tab==="docs"&&(
                <div style={{textAlign:"center",padding:32,color:"var(--txt3)"}}>
                  <Receipt size={32} style={{margin:"0 auto 10px",opacity:.3}}/><div style={{fontSize:13}}>Facturas y boletas del cliente aparecerán aquí</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return(
    <div className="fp">
      <div className="pg-hd"><div className="pg-t">Clientes</div><button className="btn btn-p"><Plus size={13}/>Nuevo Cliente</button></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:13}}>
        {CLIENTS.map((c,i)=>{
          const vehs=VEHICLES.filter(v=>v.clientId===c.id);
          const spent=clientSpent(c.id,orders);
          const ords=clientOrders(c.id,orders);
          return(
            <div key={c.id} className="cli-card" onClick={()=>setSel(c)}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                <div style={{width:46,height:46,borderRadius:"50%",background:colors[i%colors.length],display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:16,color:"#fff",flexShrink:0}}>{c.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                <div style={{flex:1}}><div style={{fontWeight:800,fontSize:15}}>{c.name}</div><div style={{fontSize:11,color:"var(--txt3)"}}>{c.rut}</div></div>
                <ChevronRight size={16} style={{color:"var(--txt3)"}}/>
              </div>
              <div style={{display:"flex",gap:8,marginBottom:12}}>
                <div style={{flex:1,background:"var(--surf2)",border:"1px solid var(--bdr2)",borderRadius:8,padding:"8px 10px",textAlign:"center"}}><div style={{fontFamily:"var(--mono)",fontWeight:800,fontSize:16,color:"var(--or)"}}>{clp(spent)}</div><div style={{fontSize:10,color:"var(--txt3)"}}>GASTADO</div></div>
                <div style={{flex:1,background:"var(--surf2)",border:"1px solid var(--bdr2)",borderRadius:8,padding:"8px 10px",textAlign:"center"}}><div style={{fontFamily:"var(--mono)",fontWeight:800,fontSize:16,color:"var(--in)"}}>{ords.length}</div><div style={{fontSize:10,color:"var(--txt3)"}}>ÓRDENES</div></div>
                <div style={{flex:1,background:"var(--surf2)",border:"1px solid var(--bdr2)",borderRadius:8,padding:"8px 10px",textAlign:"center"}}><div style={{fontFamily:"var(--mono)",fontWeight:800,fontSize:16,color:"var(--bl)"}}>{vehs.length}</div><div style={{fontSize:10,color:"var(--txt3)"}}>VEHÍCULOS</div></div>
              </div>
              <div style={{fontSize:12,color:"var(--txt2)",display:"flex",flexDirection:"column",gap:4}}>
                <div style={{display:"flex",gap:6,alignItems:"center"}}><Phone size={11} style={{color:"var(--txt3)"}}/>{c.phone}</div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}><Mail size={11} style={{color:"var(--txt3)"}}/>{c.email}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── VEHÍCULOS ──────────────────────────────────────────────────
function VehiclesView(){
  const cols=["var(--in)","var(--bl)","var(--pu)","var(--gr)","var(--or)"];
  return(
    <div className="fp">
      <div className="pg-hd"><div className="pg-t">Vehículos</div><button className="btn btn-p"><Plus size={13}/>Nuevo Vehículo</button></div>
      <div style={{background:"var(--surf)",border:"1.5px solid var(--bdr)",borderRadius:13,overflow:"hidden",boxShadow:"var(--sh)"}}>
        <table className="tbl">
          <thead><tr><th>PATENTE</th><th>VEHÍCULO</th><th>AÑO</th><th>COLOR</th><th>KILOMETRAJE</th><th>PROPIETARIO</th><th>TELÉFONO</th><th>VIN</th></tr></thead>
          <tbody>
            {VEHICLES.map((v,i)=>{
              const c=CLIENTS.find(cl=>cl.id===v.clientId);
              const pct=Math.min((v.km/200000)*100,100);
              return(
                <tr key={v.id} style={{cursor:"pointer"}}>
                  <td><span style={{fontFamily:"var(--mono)",fontWeight:900,fontSize:14,letterSpacing:1.5,background:"var(--surf2)",padding:"3px 8px",borderRadius:6,border:"1.5px solid var(--bdr)"}}>{v.plate}</span></td>
                  <td><strong>{v.brand}</strong> <span style={{color:"var(--txt2)"}}>{v.model}</span></td>
                  <td><span style={{fontFamily:"var(--mono)",fontWeight:700}}>{v.year}</span></td>
                  <td><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:11,height:11,borderRadius:"50%",background:cols[i%cols.length]}}/><span style={{fontSize:12,color:"var(--txt2)"}}>{v.color}</span></div></td>
                  <td><div style={{fontFamily:"var(--mono)",fontSize:13,fontWeight:700}}>{v.km.toLocaleString("es-CL")} km</div><div style={{width:68,height:4,background:"var(--bdr2)",borderRadius:2,marginTop:3}}><div style={{width:`${pct}%`,height:"100%",background:v.km>100000?"var(--yl)":"var(--gr)",borderRadius:2}}/></div></td>
                  <td style={{fontWeight:600}}>{c?.name}</td>
                  <td><span style={{fontFamily:"var(--mono)",fontSize:12,color:"var(--txt2)"}}>{c?.phone}</span></td>
                  <td><span style={{fontFamily:"var(--mono)",fontSize:10,color:"var(--txt3)"}}>{v.vin}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── CATÁLOGO ───────────────────────────────────────────────────
function CatalogView(){
  const [cat,setCat]=useState("all");
  const cats=["all","Mantenimiento","Seguridad","Motor","Diagnóstico","Eléctrico"];
  const filtered=cat==="all"?SERVICES_LIST:SERVICES_LIST.filter(s=>s.cat===cat);
  const cc={Mantenimiento:"var(--bl)",Seguridad:"var(--or)",Motor:"var(--re)",Diagnóstico:"var(--pu)",Eléctrico:"var(--yl)"};
  return(
    <div className="fp">
      <div className="pg-t">Catálogo de Servicios</div>
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        {cats.map(c=><button key={c} className={`btn ${cat===c?"btn-p":"btn-s"}`} onClick={()=>setCat(c)}>{c==="all"?"Todos":c}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(265px,1fr))",gap:13}}>
        {filtered.map(s=>{const c=cc[s.cat]||"var(--txt2)";return(
          <div key={s.id} style={{background:"var(--surf)",border:"1.5px solid var(--bdr)",borderTop:`4px solid ${c}`,borderRadius:13,padding:16,boxShadow:"var(--sh)",cursor:"pointer",transition:"all .15s"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="var(--sh2)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="var(--sh)"}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span style={{fontSize:10,fontWeight:800,padding:"3px 8px",borderRadius:5,background:c==="var(--bl)"?"#EFF6FF":c==="var(--or)"?"#FFF2EC":c==="var(--re)"?"#FEF2F2":c==="var(--pu)"?"#F5F3FF":"#FFFBEB",color:c}}>{s.cat}</span>{s.rec&&<span className="badge b-gr"><RefreshCw size={7}/>Recurrente</span>}</div>
            <div style={{fontWeight:800,fontSize:14,lineHeight:1.3,marginBottom:5}}>{s.name}</div>
            {s.rec&&<div style={{fontSize:10,color:"var(--txt3)",marginBottom:8}}>Recordatorio automático cada {s.rec} días</div>}
            <div style={{display:"flex",gap:18,paddingTop:10,borderTop:"1.5px solid var(--bdr2)"}}>
              <div><div style={{fontSize:9,fontWeight:800,color:"var(--txt3)",letterSpacing:.5}}>DURACIÓN</div><div style={{fontFamily:"var(--mono)",fontSize:15,fontWeight:800,marginTop:1}}>{s.hrs}h</div></div>
              <div><div style={{fontSize:9,fontWeight:800,color:"var(--txt3)",letterSpacing:.5}}>PRECIO BASE</div><div style={{fontFamily:"var(--mono)",fontSize:15,fontWeight:800,color:s.price>0?c:"var(--txt3)",marginTop:1}}>{s.price>0?clp(s.price):"Variable"}</div></div>
            </div>
          </div>
        );})}
      </div>
    </div>
  );
}

// ─── COTIZACIONES ────────────────────────────────────────────────
function CotizacionesView({quotes,setQuotes,toast}){
  const [sel,setSel]=useState(null);
  const [filter,setFilter]=useState("all");
  const filtered=filter==="all"?quotes:quotes.filter(q=>q.status===filter);

  const sendWA=(q)=>{
    setQuotes(prev=>prev.map(x=>x.id===q.id?{...x,sentWA:true}:x));
    toast(`COT ${q.id} enviada por WhatsApp`,"wa");
  };
  const approve=(q)=>{
    setQuotes(prev=>prev.map(x=>x.id===q.id?{...x,status:"aprobada"}:x));
    toast(`${q.id} aprobada — lista para generar factura`,"ok");
    setSel(null);
  };
  const reject=(q)=>{
    setQuotes(prev=>prev.map(x=>x.id===q.id?{...x,status:"rechazada"}:x));
    setSel(null);
  };

  const totals={all:quotes.length,...Object.fromEntries(Object.keys(Q_STATUS).map(s=>[s,quotes.filter(q=>q.status===s).length]))};

  if(sel){
    const c=CLIENTS.find(x=>x.id===sel.clientId);
    const v=VEHICLES.find(x=>x.id===sel.vehicleId);
    const st=Q_STATUS[sel.status];
    return(
      <div className="fp">
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <button className="btn btn-s" onClick={()=>setSel(null)}><ArrowLeft size={12}/>Volver</button>
          <div style={{flex:1}}/>
          {sel.status==="borrador"&&<button className="btn btn-in" onClick={()=>sendWA(sel)}><Send size={12}/>Enviar por WhatsApp</button>}
          {sel.status==="pendiente"&&!sel.sentWA&&<button className="btn btn-in" onClick={()=>sendWA(sel)}><Send size={12}/>Reenviar</button>}
          {sel.status==="aprobada"&&<button className="btn btn-p"><Receipt size={12}/>Generar Factura</button>}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
          <div style={{background:"var(--surf)",border:"2px solid var(--bdr)",borderRadius:13,padding:20,boxShadow:"var(--sh)"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
              <div><div style={{fontFamily:"var(--mono)",fontSize:22,fontWeight:900}}>{sel.id}</div><div style={{fontSize:11,color:"var(--txt3)"}}>Emitida {sel.created} · Válida hasta {sel.validUntil}</div></div>
              <span className="pill" style={{background:st.bg,color:st.c}}>● {st.label}</span>
            </div>
            <div className="blk" style={{marginBottom:10}}><div className="blk-t">CLIENTE</div><div className="ir"><span className="ik">Nombre</span><span style={{fontWeight:700}}>{c?.name}</span></div><div className="ir"><span className="ik">RUT</span><span className="iv">{c?.rut}</span></div><div className="ir"><span className="ik">Teléfono</span><span className="iv">{c?.phone}</span></div></div>
            <div className="blk"><div className="blk-t">VEHÍCULO</div><div className="ir"><span className="ik">Patente</span><span style={{fontFamily:"var(--mono)",fontWeight:800,fontSize:14,letterSpacing:1.5}}>{v?.plate}</span></div><div className="ir"><span className="ik">Vehículo</span><span style={{fontWeight:600}}>{v?.brand} {v?.model} {v?.year}</span></div></div>
          </div>
          <div style={{background:"var(--surf)",border:"1.5px solid var(--bdr)",borderRadius:13,padding:20,boxShadow:"var(--sh)"}}>
            <div className="sec-t"><ClipboardList size={13}/> Ítems de la Cotización</div>
            {sel.items.map((it,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid var(--bdr2)",fontSize:13}}>
                <span>{it.desc} <span style={{color:"var(--txt3)"}}>×{it.qty}</span></span>
                <span style={{fontFamily:"var(--mono)",fontWeight:700}}>{clp(it.price*it.qty)}</span>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0 0",fontFamily:"var(--mono)",fontWeight:900,fontSize:18}}>
              <span>Total</span><span style={{color:"var(--or)"}}>{clp(sel.total)}</span>
            </div>
            {sel.notes&&<div style={{marginTop:12,padding:"9px 11px",background:"var(--surf2)",borderRadius:8,fontSize:12,color:"var(--txt3)"}}>{sel.notes}</div>}
          </div>
        </div>
        {sel.status==="pendiente"&&(
          <div style={{background:"var(--surf)",border:"1.5px solid var(--bdr)",borderRadius:13,padding:20,boxShadow:"var(--sh)",marginBottom:16}}>
            <div className="sec-t"><MessageSquare size={13} style={{color:"#25D366"}}/> Mensaje enviado al cliente</div>
            <div className="wa-bub">
              Hola {c?.name?.split(" ")[0]}, te enviamos la cotización *{sel.id}* por el vehículo *{v?.plate}*.<br/><br/>
              Total a pagar: *{clp(sel.total)}*<br/>
              Válida hasta: {sel.validUntil}<br/><br/>
              Responde *1* para aprobar o *2* para rechazar. 🔧
            </div>
            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button className="btn btn-g" onClick={()=>approve(sel)}><CheckCircle size={12}/>Marcar como Aprobada</button>
              <button className="btn btn-d" onClick={()=>reject(sel)}><X size={12}/>Marcar Rechazada</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return(
    <div className="fp">
      <div className="pg-hd"><div className="pg-t">Cotizaciones</div><button className="btn btn-p"><Plus size={13}/>Nueva Cotización</button></div>
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        {[["all","Todas",totals.all],["borrador","Borrador",totals.borrador],["pendiente","Pendiente",totals.pendiente],["aprobada","Aprobada",totals.aprobada],["rechazada","Rechazada",totals.rechazada]].map(([k,l,n])=>(
          <button key={k} className={`btn ${filter===k?"btn-p":"btn-s"}`} onClick={()=>setFilter(k)}>{l} <span style={{fontFamily:"var(--mono)",fontSize:11,fontWeight:600,marginLeft:2,opacity:.7}}>{n}</span></button>
        ))}
      </div>
      <div style={{background:"var(--surf)",border:"1.5px solid var(--bdr)",borderRadius:13,overflow:"hidden",boxShadow:"var(--sh)"}}>
        <table className="tbl">
          <thead><tr><th>N° COT.</th><th>CLIENTE</th><th>VEHÍCULO</th><th>TOTAL</th><th>ESTADO</th><th>FECHA</th><th>VÁLIDA</th><th/></tr></thead>
          <tbody>
            {filtered.map(q=>{
              const c=CLIENTS.find(x=>x.id===q.clientId);
              const v=VEHICLES.find(x=>x.id===q.vehicleId);
              const st=Q_STATUS[q.status];
              return(
                <tr key={q.id} style={{cursor:"pointer"}} onClick={()=>setSel(q)}>
                  <td><span style={{fontFamily:"var(--mono)",fontWeight:800}}>{q.id}</span></td>
                  <td style={{fontWeight:600}}>{c?.name}</td>
                  <td><span style={{fontFamily:"var(--mono)",fontWeight:700,fontSize:13,letterSpacing:1}}>{v?.plate}</span></td>
                  <td><span style={{fontFamily:"var(--mono)",fontWeight:800,color:"var(--or)"}}>{clp(q.total)}</span></td>
                  <td><span className="pill" style={{background:st.bg,color:st.c,fontSize:11,padding:"3px 10px"}}>● {st.label}</span></td>
                  <td style={{color:"var(--txt3)"}}>{q.created}</td>
                  <td style={{color:"var(--txt3)"}}>{q.validUntil}</td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div style={{display:"flex",gap:6,justifyContent:"flex-end"}}>
                      {q.status==="borrador"&&<button className="btn btn-in" style={{fontSize:11}} onClick={e=>{e.stopPropagation();toast(`${q.id} enviada`,"wa")}}><Send size={10}/>Enviar</button>}
                      {q.status==="aprobada"&&<button className="btn btn-p" style={{fontSize:11}} onClick={e=>e.stopPropagation()}><Receipt size={10}/>Facturar</button>}
                      {q.status==="pendiente"&&<button className="btn btn-g" style={{fontSize:11}} onClick={e=>{e.stopPropagation();approve(q)}}><CheckCircle size={10}/>Aprobar</button>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── FACTURACIÓN ─────────────────────────────────────────────────
function FacturacionView({invoices,setInvoices,toast}){
  const [sel,setSel]=useState(null);
  const [filter,setFilter]=useState("all");
  const filtered=filter==="all"?invoices:invoices.filter(i=>i.status===filter);

  const totPagado=invoices.filter(i=>i.status==="pagada").reduce((a,b)=>a+b.total,0);
  const totPendiente=invoices.filter(i=>["emitida","pendiente"].includes(i.status)).reduce((a,b)=>a+b.total,0);
  const totVencido=invoices.filter(i=>i.status==="vencida").reduce((a,b)=>a+b.total,0);

  const marcarPagada=(inv)=>{
    setInvoices(prev=>prev.map(x=>x.id===inv.id?{...x,status:"pagada",paidDate:new Date().toLocaleDateString("es-CL").slice(0,5)}:x));
    toast(`${inv.id} marcada como pagada`,"ok");
    setSel(null);
  };

  if(sel){
    const c=CLIENTS.find(x=>x.id===sel.clientId);
    const st=I_STATUS[sel.status];
    const isFactura=sel.type==="factura";
    return(
      <div className="fp">
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <button className="btn btn-s" onClick={()=>setSel(null)}><ArrowLeft size={12}/>Volver</button>
          <div style={{flex:1}}/>
          {["emitida","pendiente"].includes(sel.status)&&<button className="btn btn-g" onClick={()=>marcarPagada(sel)}><CheckCircle size={12}/>Registrar Pago</button>}
          <button className="btn btn-s"><MessageSquare size={12}/>Enviar por WA</button>
          <button className="btn btn-s"><FileText size={12}/>PDF</button>
        </div>
        <div style={{background:"var(--surf)",border:"2px solid var(--bdr)",borderRadius:13,padding:28,maxWidth:680,margin:"0 auto",boxShadow:"var(--sh2)"}}>
          {/* HEADER DOC */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20,paddingBottom:16,borderBottom:"2px solid var(--bdr)"}}>
            <div>
              <div style={{fontWeight:900,fontSize:22,marginBottom:2}}>TALLER<span style={{color:"var(--or)"}}>OS</span></div>
              <div style={{fontSize:12,color:"var(--txt3)"}}>RUT: 76.543.210-K<br/>Av. Industrial 456, Santiago<br/>+56 2 2234 5678</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{display:"inline-block",background:st.bg,border:`2px solid ${st.c}`,borderRadius:10,padding:"8px 18px",marginBottom:8}}>
                <div style={{fontFamily:"var(--mono)",fontWeight:900,fontSize:18,color:st.c}}>{sel.id}</div>
                <div style={{fontSize:10,fontWeight:700,color:st.c,letterSpacing:.5}}>{isFactura?"FACTURA ELECTRÓNICA":"BOLETA ELECTRÓNICA"} · DTE</div>
              </div>
              <div style={{fontSize:12,color:"var(--txt3)"}}>Emitida: {sel.issued}<br/>Vence: {sel.due}</div>
            </div>
          </div>
          <div className="g2" style={{marginBottom:18}}>
            <div className="blk"><div className="blk-t">RECEPTOR</div><div className="ir"><span className="ik">Razón social</span><span style={{fontWeight:700}}>{c?.name}</span></div>{isFactura&&<><div className="ir"><span className="ik">RUT</span><span className="iv">{c?.rut}</span></div><div className="ir"><span className="ik">Dirección</span><span style={{fontSize:11,color:"var(--txt3)"}}>{c?.address}</span></div></>}<div className="ir"><span className="ik">Teléfono</span><span className="iv">{c?.phone}</span></div></div>
            <div className="blk"><div className="blk-t">DATOS PAGO</div><div className="ir"><span className="ik">Estado</span><span className="pill" style={{background:st.bg,color:st.c,fontSize:10,padding:"2px 8px"}}>● {st.label}</span></div>{sel.payMethod&&<div className="ir"><span className="ik">Método</span><span className="iv">{sel.payMethod}</span></div>}{sel.paidDate&&<div className="ir"><span className="ik">Fecha pago</span><span className="iv">{sel.paidDate}</span></div>}{sel.orderId&&<div className="ir"><span className="ik">Orden ref.</span><span className="iv">{sel.orderId}</span></div>}</div>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse",marginBottom:16}}>
            <thead><tr>{["DESCRIPCIÓN","CANT.","PRECIO UNIT.","TOTAL"].map(h=><th key={h} style={{textAlign:"left",padding:"8px 12px",fontSize:10,fontWeight:800,color:"var(--txt3)",borderBottom:"2px solid var(--bdr)",letterSpacing:.8,fontFamily:"var(--mono)"}}>{h}</th>)}</tr></thead>
            <tbody>
              {sel.items.map((it,i)=>(
                <tr key={i}><td style={{padding:"10px 12px",fontSize:13,fontWeight:500}}>{it.desc}</td><td style={{padding:"10px 12px",fontFamily:"var(--mono)",fontWeight:600}}>{it.qty}</td><td style={{padding:"10px 12px",fontFamily:"var(--mono)",fontWeight:600}}>{clp(it.price)}</td><td style={{padding:"10px 12px",fontFamily:"var(--mono)",fontWeight:800}}>{clp(it.price*it.qty)}</td></tr>
              ))}
            </tbody>
          </table>
          <div style={{display:"flex",justifyContent:"flex-end"}}>
            <div style={{minWidth:220}}>
              <div className="ir"><span style={{fontWeight:500,color:"var(--txt2)"}}>Subtotal</span><span style={{fontFamily:"var(--mono)",fontWeight:700}}>{clp(sel.subtotal)}</span></div>
              {isFactura&&<div className="ir"><span style={{fontWeight:500,color:"var(--txt2)"}}>IVA (19%)</span><span style={{fontFamily:"var(--mono)",fontWeight:700}}>{clp(sel.iva)}</span></div>}
              <div style={{borderTop:"2px solid var(--bdr)",marginTop:6,paddingTop:6,display:"flex",justifyContent:"space-between"}}>
                <span style={{fontWeight:900,fontSize:15}}>TOTAL</span>
                <span style={{fontFamily:"var(--mono)",fontWeight:900,fontSize:20,color:"var(--or)"}}>{clp(sel.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return(
    <div className="fp">
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:13,marginBottom:16}}>
        {[
          {lbl:"RECAUDADO",val:clp(totPagado),c:"var(--gr)"},
          {lbl:"POR COBRAR",val:clp(totPendiente),c:"var(--yl)"},
          {lbl:"VENCIDO",val:clp(totVencido),c:"var(--re)"},
        ].map((s,i)=>(
          <div key={i} className="stat"><div className="stat-lbl">{s.lbl}</div><div className="stat-val" style={{color:s.c,fontSize:20}}>{s.val}</div><div className="stat-bar" style={{background:s.c}}/></div>
        ))}
      </div>
      <div className="pg-hd"><div className="pg-t">Facturación</div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-s"><Receipt size={13}/>Nueva Boleta</button>
          <button className="btn btn-p"><FileText size={13}/>Nueva Factura</button>
        </div>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
        {[["all","Todas"],["emitida","Emitidas"],["pendiente","Pendientes"],["pagada","Pagadas"],["vencida","Vencidas"]].map(([k,l])=>(
          <button key={k} className={`btn ${filter===k?"btn-p":"btn-s"}`} onClick={()=>setFilter(k)}>{l}</button>
        ))}
      </div>
      <div style={{background:"var(--surf)",border:"1.5px solid var(--bdr)",borderRadius:13,overflow:"hidden",boxShadow:"var(--sh)"}}>
        <table className="tbl">
          <thead><tr><th>N° DOC.</th><th>TIPO</th><th>CLIENTE</th><th>ORDEN</th><th>SUBTOTAL</th><th>IVA</th><th>TOTAL</th><th>ESTADO</th><th>EMISIÓN</th><th/></tr></thead>
          <tbody>
            {filtered.map(inv=>{
              const c=CLIENTS.find(x=>x.id===inv.clientId);
              const st=I_STATUS[inv.status];
              return(
                <tr key={inv.id} style={{cursor:"pointer"}} onClick={()=>setSel(inv)}>
                  <td><span style={{fontFamily:"var(--mono)",fontWeight:800}}>{inv.id}</span></td>
                  <td><span className={`badge ${inv.type==="factura"?"b-in":"b-mu"}`}>{inv.type==="factura"?"FACTURA":"BOLETA"}</span></td>
                  <td style={{fontWeight:600}}>{c?.name}</td>
                  <td>{inv.orderId?<span style={{fontFamily:"var(--mono)",fontSize:12,color:"var(--txt2)"}}>{inv.orderId}</span>:<span style={{color:"var(--txt3)"}}>—</span>}</td>
                  <td><span style={{fontFamily:"var(--mono)",fontSize:12}}>{clp(inv.subtotal)}</span></td>
                  <td><span style={{fontFamily:"var(--mono)",fontSize:12,color:inv.iva>0?"var(--txt2)":"var(--txt3)"}}>{inv.iva>0?clp(inv.iva):"—"}</span></td>
                  <td><span style={{fontFamily:"var(--mono)",fontWeight:800,color:"var(--or)"}}>{clp(inv.total)}</span></td>
                  <td><span className="pill" style={{background:st.bg,color:st.c,fontSize:11,padding:"3px 9px"}}>● {st.label}</span></td>
                  <td style={{color:"var(--txt3)",fontSize:12}}>{inv.issued}</td>
                  <td onClick={e=>e.stopPropagation()}>
                    {["emitida","pendiente"].includes(inv.status)&&<button className="btn btn-g" style={{fontSize:11}} onClick={e=>{e.stopPropagation();marcarPagada(inv);}}><CheckCircle size={10}/>Cobrar</button>}
                    {inv.status==="vencida"&&<button className="btn btn-d" style={{fontSize:11}}><AlertTriangle size={10}/>Cobrar</button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── INVENTARIO ──────────────────────────────────────────────────
function InventoryView({toast}){
  const [exp,setExp]=useState(null);
  const low=PARTS.filter(p=>p.stock<=p.min).length;
  return(
    <div className="fp">
      <div className="pg-hd"><div className="pg-t">Inventario</div><button className="btn btn-p"><Plus size={13}/>Agregar Repuesto</button></div>
      {low>0&&(
        <div style={{display:"flex",alignItems:"center",gap:9,padding:"11px 15px",background:"var(--re-l)",border:"2px solid #FECACA",borderRadius:10,marginBottom:13,fontSize:13,fontWeight:500}}>
          <AlertTriangle size={15} style={{color:"var(--re)",flexShrink:0}}/><span style={{flex:1}}><strong style={{color:"var(--re)"}}>{low} repuesto{low>1?"s":""}</strong> bajo stock mínimo.</span>
          <button className="btn btn-d" style={{fontSize:11}} onClick={()=>toast("Alerta enviada","ok")}><Truck size={10}/>Notificar</button>
        </div>
      )}
      <div style={{background:"var(--surf)",border:"1.5px solid var(--bdr)",borderRadius:13,overflow:"hidden",boxShadow:"var(--sh)"}}>
        <table className="tbl">
          <thead><tr><th>SKU</th><th>REPUESTO</th><th>STOCK</th><th>MÍN.</th><th>MEJOR PRECIO</th><th>PROVEEDOR</th><th/></tr></thead>
          <tbody>
            {PARTS.map(p=>{
              const best=p.suppliers.reduce((a,b)=>a.price<b.price?a:b);
              const isLow=p.stock<=p.min;
              const isExp=exp===p.id;
              return(
                <Fragment key={p.id}>
                  <tr style={{cursor:"pointer"}} onClick={()=>setExp(isExp?null:p.id)}>
                    <td><span style={{fontFamily:"var(--mono)",fontSize:11,color:"var(--txt3)",fontWeight:500}}>{p.sku}</span></td>
                    <td style={{fontWeight:700}}>{p.name}</td>
                    <td><div style={{display:"flex",alignItems:"center",gap:7}}><span style={{fontFamily:"var(--mono)",fontSize:17,fontWeight:900,color:isLow?"var(--re)":"var(--gr)"}}>{p.stock}</span>{isLow&&<span className="badge b-re"><AlertTriangle size={7}/>BAJO</span>}</div></td>
                    <td><span style={{fontFamily:"var(--mono)",fontWeight:700,color:"var(--txt3)"}}>{p.min}</span></td>
                    <td><span style={{fontFamily:"var(--mono)",fontWeight:900,color:"var(--gr)",fontSize:14}}>${best.price.toLocaleString("es-CL")}</span><span style={{fontSize:11,color:"var(--txt3)",marginLeft:5}}>{best.name}</span></td>
                    <td><span className="badge b-mu">{p.suppliers.length} prov.</span></td>
                    <td style={{textAlign:"right"}}><div style={{display:"flex",alignItems:"center",gap:6,justifyContent:"flex-end"}}>{isLow&&<button className="btn btn-g" style={{fontSize:11}} onClick={e=>{e.stopPropagation();toast(`Cotización: ${p.sku}`,"ok");}}><Truck size={9}/>Cotizar</button>}{isExp?<ChevronUp size={14} style={{color:"var(--txt3)"}}/>:<ChevronDown size={14} style={{color:"var(--txt3)"}}/>}</div></td>
                  </tr>
                  {isExp&&(
                    <tr><td colSpan={7} style={{padding:0,background:"var(--surf2)"}}>
                      <div style={{padding:"12px 20px"}}>
                        <div style={{fontSize:10,fontWeight:800,color:"var(--txt3)",letterSpacing:.8,marginBottom:9,fontFamily:"var(--mono)"}}>PROVEEDORES DISPONIBLES</div>
                        <table style={{width:"100%",borderCollapse:"collapse"}}>
                          <thead><tr>{["PROVEEDOR","PRECIO","ENTREGA",""].map(h=><th key={h} style={{textAlign:"left",padding:"3px 9px",fontSize:10,fontWeight:800,color:"var(--txt3)",letterSpacing:.5}}>{h}</th>)}</tr></thead>
                          <tbody>{[...p.suppliers].sort((a,b)=>a.price-b.price).map((s,i)=>(
                            <tr key={i}><td style={{padding:"6px 9px",fontWeight:700}}>{i===0&&<Star size={10} style={{color:"var(--yl)",marginRight:4,verticalAlign:"middle"}}/>}{s.name}</td><td style={{padding:"6px 9px",fontFamily:"var(--mono)",fontWeight:800,color:i===0?"var(--gr)":"var(--txt)",fontSize:14}}>${s.price.toLocaleString("es-CL")}</td><td style={{padding:"6px 9px"}}><span className={`badge ${s.days===0?"b-gr":"b-mu"}`}>{s.days===0?"Inmediata":`${s.days} días`}</span></td><td style={{padding:"6px 9px"}}><button className="btn btn-gh" style={{fontSize:11}} onClick={()=>toast(`Cotización → ${s.name}`,"ok")}>Solicitar</button></td></tr>
                          ))}</tbody>
                        </table>
                      </div>
                    </td></tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── PROVEEDORES ─────────────────────────────────────────────────
function ProveedoresView({toast}){
  const [sel,setSel]=useState(null);
  const [tab,setTab]=useState("info");

  if(sel){
    const partsForSup=PARTS.filter(p=>p.supplierId===sel.id);
    const orders=INIT_PURCHASE_ORDERS.filter(o=>o.supplierId===sel.id);
    return(
      <div className="fp">
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <button className="btn btn-s" onClick={()=>setSel(null)}><ArrowLeft size={12}/>Volver</button>
          <div style={{flex:1}}/>
          <button className="btn btn-p"><Plus size={12}/>Nueva Orden de Compra</button>
          <button className="btn btn-g" onClick={()=>toast(`WhatsApp → ${sel.phone}`,"wa")}><MessageSquare size={12}/>WhatsApp</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:16}}>
          <div>
            <div style={{background:"var(--surf)",border:"1.5px solid var(--bdr)",borderRadius:13,padding:20,boxShadow:"var(--sh)",marginBottom:13}}>
              <div style={{width:52,height:52,borderRadius:12,background:sel.active?"var(--or-l)":"var(--bdr2)",border:`2px solid ${sel.active?"var(--or)":"var(--bdr)"}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><Building2 size={24} style={{color:sel.active?"var(--or)":"var(--txt3)"}}/></div>
              <div style={{fontWeight:900,fontSize:17,marginBottom:2}}>{sel.name}</div>
              <div style={{fontSize:11,color:"var(--txt3)",marginBottom:12}}>{sel.category}</div>
              <div style={{display:"flex",gap:5,marginBottom:14}}>{[...Array(5)].map((_,i)=><Star key={i} size={14} style={{color:i<sel.rating?"var(--yl)":"var(--bdr)",fill:i<sel.rating?"var(--yl)":"transparent"}}/>)}</div>
              <div style={{fontSize:12,color:"var(--txt2)",display:"flex",flexDirection:"column",gap:7}}>
                <div style={{display:"flex",gap:7,alignItems:"center"}}><Hash size={11} style={{color:"var(--txt3)"}}/>{sel.rut}</div>
                <div style={{display:"flex",gap:7,alignItems:"center"}}><Phone size={11} style={{color:"var(--txt3)"}}/>{sel.phone}</div>
                <div style={{display:"flex",gap:7,alignItems:"center"}}><Mail size={11} style={{color:"var(--txt3)"}}/>{sel.email}</div>
                <div style={{display:"flex",gap:7,alignItems:"flex-start"}}><MapPin size={11} style={{color:"var(--txt3)",marginTop:2,flexShrink:0}}/>{sel.address}</div>
                <div style={{display:"flex",gap:7,alignItems:"center"}}><User size={11} style={{color:"var(--txt3)"}}/><span style={{color:"var(--txt3)"}}>Contacto:</span> {sel.contact}</div>
                <div style={{display:"flex",gap:7,alignItems:"center"}}><CreditCard size={11} style={{color:"var(--txt3)"}}/><span style={{color:"var(--txt3)"}}>Pago a</span> {sel.payDays} días</div>
              </div>
              {!sel.active&&<div style={{marginTop:12,padding:"7px 10px",background:"var(--re-l)",border:"1px solid #FECACA",borderRadius:7,fontSize:11,color:"#991B1B",fontWeight:700}}>⚠ Proveedor inactivo</div>}
            </div>
            <div style={{background:"var(--surf)",border:"1.5px solid var(--bdr)",borderRadius:13,padding:16,boxShadow:"var(--sh)"}}>
              <div className="sec-t"><Package size={12}/> Productos</div>
              {sel.products.map((p,i)=><div key={i} style={{padding:"5px 0",borderBottom:"1px solid var(--bdr2)",fontSize:12,color:"var(--txt2)"}}>{p}</div>)}
            </div>
          </div>
          <div style={{background:"var(--surf)",border:"1.5px solid var(--bdr)",borderRadius:13,overflow:"hidden",boxShadow:"var(--sh)"}}>
            <div style={{padding:"0 20px",borderBottom:"2px solid var(--bdr2)"}}>
              <div className="tabs" style={{margin:0}}>
                {[["info","Repuestos en Catálogo"],["oc","Órdenes de Compra"]].map(([t,l])=>(
                  <div key={t} className={`tab${tab===t?" active":""}`} onClick={()=>setTab(t)}>{l}</div>
                ))}
              </div>
            </div>
            <div style={{padding:20}}>
              {tab==="info"&&(
                partsForSup.length===0?<div style={{textAlign:"center",padding:32,color:"var(--txt3)"}}>Sin repuestos asociados</div>:
                <table className="tbl"><thead><tr><th>SKU</th><th>REPUESTO</th><th>STOCK ACTUAL</th><th>PRECIO UNITARIO</th></tr></thead>
                <tbody>{partsForSup.map(p=>{const supData=p.suppliers.find(s=>s.name===sel.name);return(<tr key={p.id}><td><span style={{fontFamily:"var(--mono)",fontSize:11,color:"var(--txt3)"}}>{p.sku}</span></td><td style={{fontWeight:600}}>{p.name}</td><td><span style={{fontFamily:"var(--mono)",fontWeight:800,fontSize:15,color:p.stock<=p.min?"var(--re)":"var(--gr)"}}>{p.stock}</span></td><td><span style={{fontFamily:"var(--mono)",fontWeight:800,color:"var(--or)"}}>{supData?clp(supData.price):"—"}</span></td></tr>);})}</tbody></table>
              )}
              {tab==="oc"&&(
                orders.length===0?<div style={{textAlign:"center",padding:32,color:"var(--txt3)"}}>Sin órdenes de compra</div>:
                <table className="tbl"><thead><tr><th>N° OC</th><th>REPUESTO</th><th>CANTIDAD</th><th>TOTAL</th><th>ESTADO</th><th>FECHA EXP.</th></tr></thead>
                <tbody>{orders.map(o=>{const itm=o.items[0];const p=PARTS.find(x=>x.id===itm?.partId);return(<tr key={o.id}><td><span style={{fontFamily:"var(--mono)",fontWeight:800}}>{o.id}</span></td><td style={{fontWeight:600}}>{p?.name||"—"}</td><td><span style={{fontFamily:"var(--mono)",fontWeight:700}}>{itm?.qty}</span></td><td><span style={{fontFamily:"var(--mono)",fontWeight:800,color:"var(--or)"}}>{clp(o.total)}</span></td><td><span className={`badge ${o.status==="recibida"?"b-gr":"b-yl"}`}>{o.status==="recibida"?"Recibida":"Pendiente"}</span></td><td style={{color:"var(--txt3)"}}>{o.expectedDate}</td></tr>);})}</tbody></table>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return(
    <div className="fp">
      <div className="pg-hd"><div className="pg-t">Proveedores</div><button className="btn btn-p"><Plus size={13}/>Nuevo Proveedor</button></div>
      <div style={{background:"var(--surf)",border:"1.5px solid var(--bdr)",borderRadius:13,overflow:"hidden",boxShadow:"var(--sh)"}}>
        {SUPPLIERS.map(s=>(
          <div key={s.id} className="sup-row" onClick={()=>setSel(s)}>
            <div style={{width:44,height:44,borderRadius:11,background:s.active?"var(--or-l)":"var(--bdr2)",border:`1.5px solid ${s.active?"var(--or)":"var(--bdr)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Building2 size={20} style={{color:s.active?"var(--or)":"var(--txt3)"}}/></div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                <span style={{fontWeight:800,fontSize:14}}>{s.name}</span>
                <span style={{fontSize:11,color:"var(--txt3)",fontFamily:"var(--mono)"}}>{s.rut}</span>
                {!s.active&&<span className="badge b-re">INACTIVO</span>}
                <span style={{fontSize:11,background:"var(--surf2)",border:"1px solid var(--bdr)",borderRadius:5,padding:"2px 7px",color:"var(--txt3)"}}>{s.category}</span>
              </div>
              <div style={{fontSize:12,color:"var(--txt2)",display:"flex",gap:16}}>
                <span style={{display:"flex",alignItems:"center",gap:4}}><Phone size={10} style={{color:"var(--txt3)"}}/>{s.phone}</span>
                <span style={{display:"flex",alignItems:"center",gap:4}}><User size={10} style={{color:"var(--txt3)"}}/>{s.contact}</span>
                <span style={{display:"flex",alignItems:"center",gap:4}}><CreditCard size={10} style={{color:"var(--txt3)"}}/>Pago {s.payDays}d</span>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5}}>
              <div style={{display:"flex",gap:3}}>{[...Array(5)].map((_,i)=><Star key={i} size={12} style={{color:i<s.rating?"var(--yl)":"var(--bdr)",fill:i<s.rating?"var(--yl)":"transparent"}}/>)}</div>
              <span style={{fontSize:11,color:"var(--txt3)"}}>{PARTS.filter(p=>p.supplierId===s.id).length} repuesto(s)</span>
            </div>
            <ChevronRight size={15} style={{color:"var(--txt3)",marginLeft:8}}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ORDER MODAL ─────────────────────────────────────────────────
function OrderModal({order,close,moveOrder,toast}){
  const [tab,setTab]=useState("info");
  const v=getV(order.vehicleId),c=getC(order.vehicleId);
  const col=COLS.find(x=>x.id===order.status);
  const nextId=COL_NEXT[order.status],nextCol=COLS.find(x=>x.id===nextId);
  const svcs=getSvcs(order.serviceIds);
  return(
    <div className="modal-bg" onClick={close}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="m-head">
          <div style={{width:44,height:44,borderRadius:10,background:col?.light,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Car size={20} style={{color:col?.color}}/></div>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:3}}>
              <span style={{fontFamily:"var(--mono)",fontWeight:900,fontSize:16}}>{order.id}</span>
              <span style={{background:col?.light,color:col?.color,fontSize:11,fontWeight:800,padding:"3px 9px",borderRadius:20}}>● {col?.label}</span>
              {order.urgent&&<span className="badge b-re">URGENTE</span>}
            </div>
            <div style={{fontSize:12,color:"var(--txt2)",fontWeight:500}}><span style={{fontFamily:"var(--mono)",fontWeight:900}}>{v?.plate}</span>{" · "}{v?.brand} {v?.model} {v?.year}{" · "}{c?.name}</div>
          </div>
          <button className="ib" onClick={close}><X size={15}/></button>
        </div>
        <div style={{padding:"0 20px",borderBottom:"2px solid var(--bdr2)"}}>
          <div className="tabs" style={{margin:0}}>
            {[["info","Expediente"],["servicios","Servicios"],["fotos","Fotos"],["auto","Automatización"]].map(([t,l])=>(
              <div key={t} className={`tab${tab===t?" active":""}`} onClick={()=>setTab(t)}>{l}</div>
            ))}
          </div>
        </div>
        <div className="m-body">
          {tab==="info"&&(
            <div>
              <div className="g2" style={{marginBottom:13}}>
                <div className="blk"><div className="blk-t">VEHÍCULO</div><div className="ir"><span className="ik">Patente</span><span style={{fontFamily:"var(--mono)",fontWeight:900,fontSize:15,letterSpacing:1.5}}>{v?.plate}</span></div><div className="ir"><span className="ik">Vehículo</span><span style={{fontWeight:700}}>{v?.brand} {v?.model}</span></div><div className="ir"><span className="ik">Año</span><span className="iv">{v?.year}</span></div><div className="ir"><span className="ik">KM ingreso</span><span className="iv">{order.km?.toLocaleString("es-CL")} km</span></div><div className="ir"><span className="ik">VIN</span><span style={{fontFamily:"var(--mono)",fontSize:10,color:"var(--txt3)"}}>{v?.vin}</span></div></div>
                <div className="blk"><div className="blk-t">PROPIETARIO</div><div className="ir"><span className="ik">Nombre</span><span style={{fontWeight:800}}>{c?.name}</span></div><div className="ir"><span className="ik">Teléfono</span><span className="iv">{c?.phone}</span></div><div className="ir"><span className="ik">Email</span><span style={{fontSize:11,color:"var(--txt3)"}}>{c?.email}</span></div><div style={{marginTop:9,display:"flex",gap:6}}><button className="btn btn-g" style={{fontSize:11}} onClick={()=>toast(`WhatsApp → ${c?.phone}`,"wa")}><MessageSquare size={10}/>WA</button><button className="btn btn-s" style={{fontSize:11}}><Phone size={10}/>Llamar</button></div></div>
              </div>
              <div className="blk" style={{marginBottom:13}}><div className="blk-t">FALLA REPORTADA</div><div style={{fontSize:13,color:"var(--txt2)",lineHeight:1.7}}>{order.fault}</div></div>
              <div className="g2">
                <div className="blk"><div className="blk-t">MECÁNICO</div><div style={{display:"flex",alignItems:"center",gap:9}}><div style={{width:38,height:38,borderRadius:"50%",background:order.mechanic?"var(--or-l)":"var(--bdr2)",border:`2px solid ${order.mechanic?"var(--or)":"var(--bdr)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,color:order.mechanic?"var(--or)":"var(--txt3)"}}>{order.mechanic?order.mechanic.split(" ").map(n=>n[0]).join(""):"–"}</div><div><div style={{fontWeight:800,fontSize:13}}>{order.mechanic||"Sin asignar"}</div></div></div></div>
                <div className="blk"><div className="blk-t">PRESUPUESTO</div><div style={{fontFamily:"var(--mono)",fontSize:24,fontWeight:900,color:order.total>0?"var(--or)":"var(--txt3)",marginBottom:7}}>{order.total>0?clp(order.total):"Sin cotizar"}</div>{order.approved?<span className="badge b-gr"><CheckCircle size={9}/>Aprobado</span>:order.total>0?<div style={{display:"flex",gap:6}}><button className="btn btn-g" style={{fontSize:11}} onClick={()=>toast(`Aprobado ${order.id}`,"ok")}><CheckCircle size={9}/>Aprobar</button><button className="btn btn-d" style={{fontSize:11}}>Rechazar</button></div>:null}</div>
              </div>
            </div>
          )}
          {tab==="servicios"&&(
            <div>
              {svcs.length===0?<div style={{textAlign:"center",padding:28,color:"var(--txt3)"}}>Sin servicios</div>:svcs.map(s=>(
                <div key={s.id} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 0",borderBottom:"1px solid var(--bdr2)"}}>
                  <div style={{width:36,height:36,background:"var(--or-l)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Wrench size={15} style={{color:"var(--or)"}}/></div>
                  <div style={{flex:1}}><div style={{fontWeight:800,fontSize:13}}>{s.name}</div><div style={{fontSize:11,color:"var(--txt3)",marginTop:2}}>{s.hrs}h · {s.cat}</div></div>
                  <span style={{fontFamily:"var(--mono)",fontWeight:900,fontSize:15,color:"var(--or)"}}>{clp(s.price)}</span>
                </div>
              ))}
              {svcs.length>0&&<div style={{display:"flex",justifyContent:"flex-end",paddingTop:12}}><span style={{fontFamily:"var(--mono)",fontSize:18,fontWeight:900}}>Total: <span style={{color:"var(--or)"}}>{clp(order.total)}</span></span></div>}
            </div>
          )}
          {tab==="fotos"&&(
            <div>
              <div className="sec-t"><Camera size={13}/> Registro de Daños</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9,marginBottom:16}}>
                {[...Array(order.photos)].map((_,i)=>(
                  <div key={i} style={{aspectRatio:"4/3",background:"var(--surf2)",border:"1.5px solid var(--bdr)",borderRadius:9,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,cursor:"pointer"}}><Camera size={20} style={{color:"var(--txt3)"}}/><span style={{fontSize:10,fontFamily:"var(--mono)",color:"var(--txt3)"}}>daño_0{i+1}.jpg</span></div>
                ))}
                <div style={{aspectRatio:"4/3",background:"var(--or-l)",border:"2px dashed var(--or)",borderRadius:9,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,cursor:"pointer"}}><Camera size={20} style={{color:"var(--or)"}}/><span style={{fontSize:11,color:"var(--or)",fontWeight:800}}>+ Agregar</span></div>
              </div>
              <div className="sec-t"><QrCode size={13}/> Código QR</div>
              <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                <div style={{width:88,height:88,background:"var(--surf2)",border:"2px solid var(--or)",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><QrCode size={48} style={{color:"var(--or)"}}/></div>
                <div><div style={{fontWeight:800,fontSize:14,marginBottom:5}}>{order.id} — Etiqueta QR</div><div style={{fontSize:12,color:"var(--txt2)",lineHeight:1.8}}>Se imprime al ingreso y va en el parabrisas.<br/>Mecánico escanea → hoja de ruta completa.<br/>Cliente escanea → estado en tiempo real.</div></div>
              </div>
            </div>
          )}
          {tab==="auto"&&(
            <div>
              <div style={{marginBottom:14}}>
                <div className="sec-t"><MessageSquare size={13} style={{color:"#25D366"}}/> Mensaje WhatsApp</div>
                <div className="wa-bub">Tu vehículo <strong>{v?.plate}</strong>{nextId?" avanzó a ":" está listo."}{nextId&&<strong>{nextCol?.label}</strong>}{nextId&&"."} Te notificamos en cada paso. 🔧<br/><br/>Orden: {order.id} · {v?.brand} {v?.model}</div>
                <button className="btn btn-g" style={{marginTop:9}} onClick={()=>toast(`WhatsApp → ${c?.phone}`,"wa")}><MessageSquare size={11}/>Enviar</button>
              </div>
              <div className="divider"/>
              <div className="sec-t"><Zap size={13} style={{color:"var(--or)"}}/> Automatizaciones</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
                {[{label:"Notificación de estado",on:true},{label:"Aprobación presupuesto",on:true},{label:"Recordatorio mantención",on:false},{label:"Alerta stock bajo",on:true}].map((a,i)=>(
                  <div key={i} style={{padding:"11px 13px",background:a.on?"var(--gr-l)":"var(--surf2)",border:`1.5px solid ${a.on?"#A7F3D0":"var(--bdr)"}`,borderRadius:9}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontWeight:700,fontSize:12}}>{a.label}</span><span className={`badge ${a.on?"b-gr":"b-mu"}`}>{a.on?"ON":"OFF"}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="m-foot">
          <button className="btn btn-gh" onClick={close}>Cerrar</button>
          {nextId&&<button className="btn btn-p" onClick={()=>{moveOrder(order.id,nextId);close();}}><ArrowRight size={12}/>→ {nextCol?.label}</button>}
        </div>
      </div>
    </div>
  );
}

// ─── TOASTS ──────────────────────────────────────────────────────
function Toasts({toasts}){
  return(
    <div className="tz">
      {toasts.map(t=>(
        <div key={t.id} className={`toast${t.type==="wa"?" toast-wa":t.type==="ok"?" toast-ok":t.type==="in"?" toast-in":""}`}>
          {t.type==="wa"?<MessageSquare size={12} style={{color:"#25D366"}}/>:t.type==="ok"?<CheckCircle size={12} style={{color:"var(--gr)"}}/>:t.type==="in"?<Receipt size={12} style={{color:"var(--in)"}}/>:<Zap size={12} style={{color:"var(--or)"}}/>}
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────
const TITLES={dashboard:"Panel Principal",kanban:"Tablero de Trabajo",clientes:"Clientes",vehicles:"Vehículos",catalog:"Catálogo",cotizaciones:"Cotizaciones",facturacion:"Facturación",inventory:"Inventario",proveedores:"Proveedores"};

export default function App(){
  const [view,     setView]     = useState("kanban");
  const [orders,   setOrders]   = useState(INIT_ORDERS);
  const [quotes,   setQuotes]   = useState(INIT_QUOTES);
  const [invoices, setInvoices] = useState(INIT_INVOICES);
  const [modal,    setModal]    = useState(null);
  const [checkin,  setCheckin]  = useState(false);
  const [toasts,   setToasts]   = useState([]);

  const addToast=(msg,type="auto")=>{
    const id=Date.now()+Math.random();
    setToasts(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),4000);
  };
  const moveOrder=(orderId,newStatus)=>{
    setOrders(p=>p.map(o=>o.id===orderId?{...o,status:newStatus}:o));
    addToast(`${orderId} → ${newStatus}`,"ok");
  };
  const addOrder=order=>{
    setOrders(p=>[...p,order]);
    addToast(`Orden ${order.id} creada`,"ok");
    setCheckin(false);
  };

  return(
    <div className="app">
      <style>{CSS}</style>
      <Sidebar view={view} setView={setView}/>
      <div className="main">
        <div className="topbar">
          <span className="tb-title">{TITLES[view]}</span>
          <div className="srch"><Search size={13} style={{flexShrink:0,color:"var(--txt3)"}}/><input placeholder="Buscar patente, cliente, orden..."/></div>
          <div className="ib"><Bell size={14}/><span style={{position:"absolute",top:6,right:6,width:6,height:6,borderRadius:"50%",background:"var(--re)",border:"2px solid white"}}/></div>
          <button className="btn btn-p" onClick={()=>setCheckin(true)}><Plus size={13}/>Ingresar Vehículo</button>
          <div className="av">A</div>
        </div>
        <div className="content">
          {view==="dashboard"   &&<Dashboard    orders={orders} quotes={quotes} invoices={invoices}/>}
          {view==="kanban"      &&<KanbanView   orders={orders} moveOrder={moveOrder} openOrder={o=>setModal(o)}/>}
          {view==="clientes"    &&<ClientesView orders={orders} toast={addToast}/>}
          {view==="vehicles"    &&<VehiclesView/>}
          {view==="catalog"     &&<CatalogView/>}
          {view==="cotizaciones"&&<CotizacionesView quotes={quotes} setQuotes={setQuotes} toast={addToast}/>}
          {view==="facturacion" &&<FacturacionView  invoices={invoices} setInvoices={setInvoices} toast={addToast}/>}
          {view==="inventory"   &&<InventoryView    toast={addToast}/>}
          {view==="proveedores" &&<ProveedoresView  toast={addToast}/>}
        </div>
      </div>
      {checkin&&<CheckInWizard orders={orders} addOrder={addOrder} close={()=>setCheckin(false)}/>}
      {modal&&<OrderModal order={modal} close={()=>setModal(null)} moveOrder={moveOrder} toast={addToast}/>}
      <Toasts toasts={toasts}/>
    </div>
  );
}
