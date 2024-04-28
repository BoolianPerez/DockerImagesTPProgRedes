/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Tenistas: {
    Base: '/tenistas',
    Get: '', // GET
    Add: '', // POST
    Update: '', // PATCH
    Delete: '', // DELETE
  },
  Partidos: {
    Base: '/partidos',
    Get: '', // GET
    Add: '', // POST
    Update: '', // PATCH
    Delete: '', // DELETE
  },
} as const;