export class BaseEntity<T> {
  constructor(properties?: Partial<T>) {
    if (properties) {
      Object.assign(this, properties);
    }
  }
}
