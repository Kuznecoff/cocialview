export const makeRestUrl = (user: any, timestamp_from: any, timestamp_to: any) => `https://casino-zond-debug-api-production.k8s.n3.2gis.io/api/1.1/user/${user}/control/history?from=${timestamp_from}&to=${timestamp_to}&limit=5000`;