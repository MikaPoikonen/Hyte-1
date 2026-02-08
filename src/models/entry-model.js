// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../utils/database.js'; //importataan yhteys databaseen

const listAllEntries = async () => {
  try {
    //const [rows] = await promisePool.query('SELECT * FROM DiaryEntries');//kysely. await odottaa vastausta
    const result = await promisePool.query('SELECT * FROM DiaryEntries'); //vaihtoehtoinen
    const rows = result[0]; //vaihtoehtoinnen
    //console.log('rows', rows);
    return rows; //palautetaan muuttujan arvo
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findEntryById = async (id) => {
  try {
    const [result] = await promisePool.execute(
      'SELECT * FROM DiaryEntries WHERE entry_id = ?',[id]); //käytetään execute kun halutaan ?(muuttuva parametri) tilalle laittaa  [id](listatut arvot) haetaan id:llä //sama promisebool/

    //tai const [rows] = await promisePool.query('SELECT * FROM DiaryEntries WHERE entry_id =' + id); Tässä on haavoittovuus älä käytä "SQL INJEKTIO"
    //console.log('rows', rows);
    return result[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addEntry = async (entry) => { //controlleriin entry  objekti
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = entry; //Pilkotaan muuttujiksi
  const sql = `INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes) 
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, entry_date, mood, weight, sleep_hours, notes]; //ylempänä minne insert ja arvot on kysymysmerkkejä jotka haetaan //
  
  try {
    const rows = await promisePool.execute(sql, params);
    //console.log('rows', rows);
    return {entry_id: rows[0].insertId}; //ollaan kiinnostuneita mikä on uusimman entrt_id numero. Eli juoksevan päiväkirjamerkinnän id
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

export {listAllEntries, findEntryById, addEntry};
