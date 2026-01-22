// src/users.js
// Dummy user data

const users = [
  {
    id: 1,
    username: 'johndoe',
    password: 'password1',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    username: 'janedoe',
    password: 'password2',
    email: 'janedoe@example.com',
  },
  {
    id: 3,
    username: 'bobsmith',
    password: 'password3',
    email: 'bobsmith@example.com',
  },
];

//Todo: add users mock data and endpoints
const getUsers = (request, response) => {
  //älä ikinä paljasta salasanoja API vastauksessa
  for (
    let i = 0;
    i < users.length;
    i++ // käydään käyttäjät läpi
  ) {
    //delete users[i].password;
    delete users[i].password; //poistetaan salasana user objektista ennen kuin lähetetään response

    //users[i].email = 'sensored'; //voidaan sensuroida muitakin tietoja tarvittaessa
  }
  response.json(users);
};

//TODO: get user by id
// User add ( Rekister )

const postUser = (req, res) => {
  // uusilla käyttäjillä tulee olla username, password ja email tai palautetaan virhe
  // itse koodattu erittäin yksinkertainen tarkistus ja validointi virheestä
  if (!(req.body.username && req.body.password && req.body.email)) {
    return res.status(400).json({message: 'required fields missing'});
  }

  // Huom. Älä ikinä loggaa käyttäjätietoja ensimmäisten pakollisten testien jälkeen!!!

  const newUser = req.body;
  console.log('register new user', newUser); //tarkistetaan konsolista mitä dataa tulee
  const newId = users[users.length - 1].id + 1; // otetaan viimeisen käyttäjän id ja lisätään 1
  // luodaan uusi objekti joka sisältää uuden id:n ja kopioi loput newUserObjektin oliosta(ominaisduuset)
  // ominaisuudet lisätään users taulun loppuun
  users.push({id: newId, ...newUser}); //kopioidaan newUser olio ja pushataan users taulukkoon räjäytyksen ... kautta
  delete newUser.password; //poistetaan salasana ennen vastausta
  res.status(201).json({message: 'käyttäjä lisätty', user_id: newId}); // lähetetään vastaus
  console.log('users array', users);
};

//FAILED register attempt handling

const postLogin = (req, res) => {
  const {username, password} = req.body; // otetaan bodystä username ja password
  // haetaan käyttäjä-objekti käyttäjänimen perusteella
  const userFound = users.find((user) => username === user.username); // etsitään käyttäjää users taulukosta
  if (userFound) {
    if (userFound.password === password) {
      delete userFound.password; //poistetaan salasana ennen vastausta
      res.json({message: ' loging ok', user: userFound}); //
      return res
        .status(403)
        .json({message: 'Login successful', user: userFound}); //jos salasana täsmää
    }
    return res.json({error: 'invalid password'}); //jos salasana ei täsmää
  }
  return res
    .status(404)
    .json({message: 'Login failed: invalid username or password'}); //
};

const getUserid = (req, res) => { //haetaan käyttäjä id:n perusteella
  
  const userIfFound = users.find(users => users.id == req.params.id); //etsitään käyttäjä id:n perusteella

  if (userIfFound) {
    delete userIfFound.password; //poistetaan salasana ennen vastausta
    return res.json(userIfFound);
  } else {
    return res.status(404).json({message: 'User id not found'});
  }
};

const putUserById = (req, res) => {
  const userFound = users.find((users) => users.id == req.params.id); //etsitään käyttäjä id:n perusteella
  if (userFound) { 
    userFound.email = req.body.email;//päivitetään email bodystä
    res.json({message: 'Email updated'});
  } else { //jos käyttäjää ei löydy
    return res.status(404).json({message: 'email update failed'});
  }
};

const deleteUserById = (req, res) => {

  //Haetaan id URL-parametrista
  const id = Number(req.params.id);

  //Etsitään käyttäjän indeksi taulukosta
  const index = users.findIndex(user => user.id === id);

  //Jos indeksi löytyy (ei -1)
  if (index !== -1) {

    //Poistetaan 1 alkio siitä indeksistä
    users.splice(index, 1);

    //Vastataan onnistuneesti
    return res.json({ message: 'User deleted' });

  } else {

    //Käyttäjää ei löytynyt
    return res.status(404).json({ message: 'User delete failed' });
  }
};


export {deleteUserById, getUsers, postUser, postLogin, getUserid, putUserById};
