// src/users.js
// Dummy user data



const users = [
  {
    id: 1,
    username: "johndoe",
    password: "password1",
    email: "johndoe@example.com"
  },
  {
    id: 2,
    username: "janedoe",
    password: "password2",
    email: "janedoe@example.com"
  },
  {
    id: 3,
    username: "bobsmith",
    password: "password3",
    email: "bobsmith@example.com"
  }
];

//Todo: add users mock data and endpoints
const getUsers = (request, response) => {
    //älä ikinä paljasta salasanoja API vastauksessa
    for (let i=0;  i<users.length; i++) // käydään käyttäjät läpi
{
//delete users[i].password;
delete users[i].password;   //poistetaan salasana user objektista ennen kuin lähetetään response

//users[i].email = 'sensored'; //voidaan sensuroida muitakin tietoja tarvittaessa

}    response.json(users);
};


//TODO: get user by id
// User add ( Rekister )

const postUser = (req,res) => {
    // uusilla käyttäjillä tulee olla username, password ja email tai palautetaan virhe
    // itse koodattu erittäin yksinkertainen tarkistus ja validointi virheestä
    if (!(req.body.username && req.body.password && req.body.email)) {
       return res.status(400).json({message: 'required fields missing'});
        
    }

    // Huom. Älä ikinä loggaa käyttäjätietoja ensimmäisten pakollisten testien jälkeen!!!

    const newUser = req.body;
    console.log("register new user",newUser); //tarkistetaan konsolista mitä dataa tulee
    const newId = users[users.length-1].id +1; // otetaan viimeisen käyttäjän id ja lisätään 1
    // luodaan uusi objekti joka sisältää uuden id:n ja kopioi loput newUserObjektin oliosta(ominaisduuset)
    // ominaisuudet lisätään users taulun loppuun
    users.push({id: newId, ...newUser}) //kopioidaan newUser olio ja pushataan users taulukkoon räjäytyksen ... kautta
    delete newUser.password; //poistetaan salasana ennen vastausta
    res.status(201).json({message:"käyttäjä lisätty",user_id: newId }); // lähetetään vastaus   
    console.log("users array",users);
}

//FAILED register attempt handling


const postLogin= (req, res) => {

const {username, password} = req.body;// otetaan bodystä username ja password
// haetaan käyttäjä-objekti käyttäjänimen perusteella
const userFound = users.find(user => username === user.username);// etsitään käyttäjää users taulukosta
if (userFound) {
    if (userFound.password === password){
        delete userFound.password; //poistetaan salasana ennen vastausta
        res.json({message: ' loging ok', user: userFound})//  
        return res.status(403).json({message: 'Login successful', user: userFound});//jos salasana täsmää
    }
    return res.json({error: 'invalid password'});//jos salasana ei täsmää
}
return res.status(404).json({message: 'Login failed: invalid username or password'});//






}




export {getUsers, postUser, postLogin}