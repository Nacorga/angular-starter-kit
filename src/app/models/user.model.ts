export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public plan: string,
    public createdAt: Date,
    public updatedAt: Date,
    public isVerified = false,
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      plan: this.plan,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isVerified: this.isVerified,
    };
  }
}
