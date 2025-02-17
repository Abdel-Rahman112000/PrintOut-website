export async function fetchFrom<T = any>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T | null> {
  try {
    const res = await fetch(input, { next: { revalidate: 3600 }, ...init });
    if (res.ok) {
      return (await res.json()) as T;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
