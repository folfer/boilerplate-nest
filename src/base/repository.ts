export abstract class Repository<T> {
  abstract create(data: Omit<T, 'id' | 'createdAt' | 'updateAt'>): Promise<T>;
  abstract update(id: string, data: Omit<Partial<T>, 'id'>): Promise<T>;
  abstract findById(id: string): Promise<T>;
  abstract findAll(filter: Partial<T>): Promise<T[]>;
  abstract delete(id: string): Promise<void>;
}
