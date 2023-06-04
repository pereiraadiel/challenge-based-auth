export class Entity {
  id: string;
  createdAt: Date;
  updatedAt?: Date;

  constructor(entity: Omit<Entity, 'createdAt' | 'id'>, id?: string) {
    Object.assign(this, entity);

    if (id) {
      this.id = id;
    }
  }
}
