const express = require('express');
const request = require('request');
const mysql =  require('mysql');

const Proxy = express();



const Reddit = 'https://www.reddit.com/';
const RedditAuth = 'https://oauth.reddit.com';
const APP_ID = process.env.APP_ID;
const APP_SECRET =process.env.APP_SECRET; 
const REDDIT_USER = process.env.REDDIT_USER;
const REDDIT_PASSWORD = process.env.REDDIT_PASSWORD;
const MYSQL_PASS = process.env.MYSQL_ROOT_PASSWORD;

Proxy.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


const RequestToken = () => {
  const data = {
    'grant_type': 'password',
    'username': REDDIT_USER, 
    'password': REDDIT_PASSWORD
  }
  const auth = Buffer.from(APP_ID + ':' + APP_SECRET).toString('base64');

  request(
    {
      url: Reddit + 'api/v1/access_token',
      form: data,
      method: 'POST',
      headers: {
        'User-Agent': 'poli by '+REDDIT_USER,
        'Access-Control-Allow-Origin':'*',
        'Authorization': 'Basic ' + auth
      }
    },
    (error,response,body) => {
      if (error) {
        console.log({error: error});
        console.log({auth: auth});
        console.log({data: data});
        console.log(Reddit + 'api/v1/access_token');
        console.log(REDDIT_USER);
        return
      }

      console.log('Requesting Reddit Token');
      console.log({auth: auth});
      console.log({data: data});
      console.log(Reddit + 'api/v1/access_token');
      console.log(REDDIT_USER);
      console.log(body);

      return body;

      
    }
  )
}

RequestToken()

Proxy.get('/reddit/:search', (req, res) => {
  request(
    {url: `https://www.reddit.com/r/subreddit/search/?q=${req.params.search}`}, 
    (error, response, body) => {
      if(error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message});
      }

      //res.json(JSON.parse(body));
      console.log(`making request to https://www.reddit.com/r/subreddit/search/?q=${req.params.search}`)
      res.send({body: body, token: RequestToken()});

      
    }
  )
});

/*
  *** Database Logic ***
*/

let con = mysql.createConnection({
  host: 'database',
  user: 'root',
  password: MYSQL_PASS,
  database: 'Poli'
});


Proxy.get('/politicians', (req,res) => {
  console.log("mysql pass: " + MYSQL_PASS);
  con.connect(err=>{
    if (err) {
      return console.error('error: ' + err.message);
    }
    con.query(`SELECT * FROM politicians`, (err, result, fields) => {
      if (err) throw err;
      console.log(result);
    })

    
    console.log('connected to the MySQL');

  })

  res.send('connected to the mySQL server');
})
  
const PORT = process.env.PORT || 4000;
Proxy.listen(PORT, () => console.log(`listening on ${PORT}`));
