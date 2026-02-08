//HUOM MOKKIDATA ON POISTETTU MODELISTA

// TODO ALEMPANA   lisätietoa user-model.js


// importtaus oikeasta nyt poistettu


//TODO: redaktoroi tietokanta funktiolle
import {findUserByUserName,getUsers,getUserById, addUser} from '../models/user-model.js'//TODO: lisää tietokanta funktiot user modeliin 
// ja käytä niitä täällä!!!!!!!!!!!!!!!!!!!!



//TODO: redaktoroi tietokanta funktiolle
const getUsersController = async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getUSerByIdController = async (req,res) => {
  const entry = await getUserById(req.params.id);
  if (entry){
    res.json(entry);
  } else {
    res.sendstatus(404)
  }

  };

  const postUser = async (req,res) => {
    const {username,password,email} = req.body;
    if (username&&password&&email){
    const result = await addUser(username,password,email);
   if (result.user_id) {
      res.status(201);
      res.json({message: 'New user added.', ...result}); // tulostetaan viesti onnistumisesta
    } else {
      res.status(500); //jos tietokanta ongelma
      res.json(result);
    }
  } else {
    res.sendStatus(400); //muissa tapauksissa (asiakkaan tapauksissa)
  }
};








// Käyttäjän lisäys (rekisteröityminen)
//const postUser = (pyynto, vastaus) => {
  //const newUser = pyynto.body;
  // Uusilla käyttäjillä pitää olla kaikki vaaditut ominaisuudet tai palautetaan virhe
  // itse koodattu erittäin yksinkertainen syötteen validointi
 // if (!(newUser.username && newUser.password && newUser.email)) {
   // return vastaus.status(400).json({error: 'required fields missing'});
 // }

  // HUOM: ÄLÄ ikinä loggaa käyttäjätietoja ensimmäisten pakollisten testien jälkeen!!! (tietosuoja)
  //console.log('registering new user', newUser);
  //const newId = users[users.length - 1].id + 1;
  // luodaan uusi objekti, joka sisältää id-ominaisuuden ja kaikki newUserObjektin
  // ominaisuudet ja lisätään users-taulukon loppuun
 // users.push({id: newId, ...newUser});
  //delete newUser.password;
  // console.log('users', users);
  //vastaus.status(201).json({message: 'new user added', user_id: newId});
//};


// Tietokantaversio!!!!!!!!!!!!!! Tästä esimerkki TODO listalle::::

const postLogin = async (req, res) => {
  const {username, password} = req.body;
  
  const user = await findUserByUserName(username);
  console.log(user)

  // haetaan käyttäjä-objekti käyttäjän nimen perusteella
  
  if (user) {
    if (user.password === password) {
      delete user.password;
      return res.json({message: 'login ok', user: user});
    }
    return res.status(403).json({error: 'invalid password'});
  }
  res.status(404).json({error: 'user not found'});
};

export {getUsersController, postUser, postLogin, getUSerByIdController};
