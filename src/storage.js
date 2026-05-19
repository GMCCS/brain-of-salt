const STORAGE_KEY = "bos_progress_v1";

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveProgress(patch) {
  try {
    const current = loadProgress() ?? {};
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...patch }));
  } catch {}
}

export function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
