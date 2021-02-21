export class RateLimiter {

  private store: { [key: string]: number } = {};

  constructor(private timeoutMs: number) { }

  tryEnter(key: string): boolean {
    const now = Date.now();
    const lastUpdate = this.store[key];
    if (lastUpdate && now - lastUpdate < this.timeoutMs)
      return false;
    this.store[key] = now;
    return true;
  }
}
