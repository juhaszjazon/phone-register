console.clear();
const { table } = require('table');
const readLine = require('readline-sync');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'toor',
    database: 'phone'
  }
});

const cols = {
  id: 'id',
  name: 'name',
  number: 'number'
};

const menu = () => {
  console.log('');
  console.log('[ 1 ] Telefonszámok listázása');
  console.log('[ 2 ] Telefonszám keresése név szerint');
  console.log('[ 3 ] Telefonszám bejegyzése');
  console.log('[ 4 ] Telefonszám módosítása');
  console.log('[ 5 ] Telefonszám törlése');
  console.log('[ 6 ] Kilépés');
  console.log('');
};

const list = async () => {
  const items = [
    [
      cols.id,
      cols.name,
      cols.number
    ]
  ];
  const records = await knex('data').select();
  for (let record of records) {
    items.push([
      record.id,
      record.name,
      record.number
    ]);
  }
  console.log(table(items));
};

const insertPlease = () => {
  const name2 = readLine.question('Név: ');
  const num = readLine.question('Szám: ');
  const num2 = parseInt(num);
  knex('data').insert({ name: name2, number: num2 }).then();
};

const updatePlease = () => {
  const id = readLine.question('Id: ');
  const newName = readLine.question('Név: ');
  const newNumber = readLine.question('Szám: ');
  const newNumberInt = parseInt(newNumber);

  knex('data')
    .where({ id: id })
    .update({ name: newName, number: newNumberInt }).then();
  console.clear();
  console.log(id + '. tétel frissítve');
};

const deletePlease = () => {
  const id = readLine.question('Id: ');
  knex('data')
    .where({ id: id })
    .del().then();
  console.clear();
  console.log(id + '. tétel törölve');
};

const findThis = async () => {
  console.clear();
  const search = readLine.question('Név: ');

  const items = [
    [
      cols.id,
      cols.name,
      cols.number
    ]
  ];
  const records = await knex('data').where({ name: search }).select();
  for (let record of records) {
    items.push([
      record.id,
      record.name,
      record.number
    ]);
  }
  console.log(table(items));

};

const choice = async () => {
  const num = readLine.question('');

  switch (num) {
    case '1':
      console.clear();
      await list();
      break;
    case '2':
      await findThis();
      break;
    case '3':
      insertPlease();
      break;
    case '4':
      updatePlease();
      break;
    case '5':
      deletePlease();
      break;
    case '6':
      process.exit(0);
  }
};

const main = async () => {
  menu();
  await choice();
  main();
};

main();
