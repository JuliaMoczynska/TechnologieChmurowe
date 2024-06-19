db = db.getSiblingDB('testdb');
db.documents.insertMany([
  { name: "John Doe", age: 30 },
  { name: "Jane Smith", age: 25 }
]);
