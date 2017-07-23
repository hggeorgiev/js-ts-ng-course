import { Person } from './person';
describe('Person', () => {
  it('has last name', () => {
    let person: Person = { id: 5, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" };
    expect(person.lastName).toEqual('Doe');
  });
  it('has id', () => {
    let person: Person = { id: 3, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" };
    expect(person.id).toEqual(3);
  });
});