const CATEGORY_MAP = {
  ALL: 'ALL',
  WEDDINGS: 'WEDDING',
  WEDDING: 'WEDDING',
  CATERING: 'CATERING',
  EVENT: 'EVENTS',
  EVENTS: 'EVENTS',
  DECOR: 'DECORATION',
  DECORATION: 'DECORATION',
  CORPORATE: 'EVENTS',
  FOOD: 'CATERING',
};

const ALLOWED_CATEGORIES = ['ALL', 'WEDDING', 'CATERING', 'EVENTS', 'DECORATION'];

function normalizeCategory(value) {
  const raw = String(value || '').trim();
  if (!raw) return 'ALL';
  const normalized = raw.toUpperCase().replace(/[^A-Z]+/g, '');
  return CATEGORY_MAP[normalized] || 'ALL';
}

module.exports = { ALLOWED_CATEGORIES, normalizeCategory };
