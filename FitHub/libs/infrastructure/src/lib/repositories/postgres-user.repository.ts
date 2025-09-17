import { Pool } from 'pg';
import { UserRepository, User } from '@fithub/domain';

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly pool: Pool) {}

  async findById(id: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return new User(
      row.id,
      row.email,
      row.username,
      row.password,
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await this.pool.query(query, [email]);
    
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return new User(
      row.id,
      row.email,
      row.username,
      row.password,
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await this.pool.query(query, [username]);
    
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return new User(
      row.id,
      row.email,
      row.username,
      row.password,
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async create(user: User): Promise<User> {
    const query = `
      INSERT INTO users (id, email, username, password, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const values = [
      user.id,
      user.email,
      user.username,
      user.password,
      user.createdAt,
      user.updatedAt
    ];

    const result = await this.pool.query(query, values);
    const row = result.rows[0];
    
    return new User(
      row.id,
      row.email,
      row.username,
      row.password,
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async update(user: User): Promise<User> {
    const query = `
      UPDATE users 
      SET email = $2, username = $3, password = $4, updated_at = $5
      WHERE id = $1
      RETURNING *
    `;
    
    const values = [
      user.id,
      user.email,
      user.username,
      user.password,
      new Date()
    ];

    const result = await this.pool.query(query, values);
    const row = result.rows[0];
    
    return new User(
      row.id,
      row.email,
      row.username,
      row.password,
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async delete(id: string): Promise<void> {
    const query = 'DELETE FROM users WHERE id = $1';
    await this.pool.query(query, [id]);
  }
}