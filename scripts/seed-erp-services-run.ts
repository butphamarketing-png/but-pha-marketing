import { seedErpServicesFromMarketing } from "../lib/cms-services";

const result = await seedErpServicesFromMarketing();
console.log(`Seeded ERP services: ${result.created} created, ${result.total} total catalog entries.`);
