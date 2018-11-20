import uuid from 'uuid';

export type TUserInput = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(input: TUserInput = { id: '', name: '', email: '', createdAt: new Date(), updatedAt: new Date() }) {
    this._id = input.id || this.getUuid();
    this._name = input.name;
    this._email = input.email;
    this._createdAt = input.createdAt;
    this._updatedAt = input.updatedAt;
  }

  private getUuid(): string {
    return uuid.v1();
  }

  greet(): string {
    let message: string;
    if (this._name) {
      message = `Hello! My name is ${this._name}! My ID is ${this._id}`;
    } else {
      message = `Hi! Who am I? Please give me a name. My ID is ${this._id}`;
    }
    return message;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }
}
