export default function tokenize(displayName = '') {
  return displayName.trim().replace(/[^a-zA-Z0-9_-]/g, '');
}
