export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly username: string,
    private _password: string,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}

  get password(): string {
    return this._password;
  }

  updatePassword(newPassword: string): void {
    this._password = newPassword;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}