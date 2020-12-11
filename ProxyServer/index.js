const express = require('express');
const request = require('request');
const mysql =  require('mysql');

const Proxy = express();



const Reddit = 'https://www.reddit.com/';
const RedditAuth = 'https://oauth.reddit.com';
const NewsMedia = 'https://newsapi.org/v2/everything'
const CivicAPI=  'https://www.googleapis.com/civicinfo/v2/representatives'
const GoogleImages = 'https://serpapi.com/search.json'
const APP_ID = process.env.APP_ID;
const APP_SECRET =process.env.APP_SECRET; 
const REDDIT_USER = process.env.REDDIT_USER;
const REDDIT_PASSWORD = process.env.REDDIT_PASSWORD;
const MYSQL_PASS = process.env.MYSQL_ROOT_PASSWORD;
const NEWSAPI_KEY = process.env.NEWSAPI_KEY;
const CIVICAPI_KEY = process.env.CIVICAPI_KEY;

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
        return res.status(500).json({ type: 'error', message: error.message});
      }

      //res.json(JSON.parse(body));
      console.log(`making request to https://www.reddit.com/r/subreddit/search/?q=${req.params.search}`)
      res.send({body: body, token: RequestToken()});

      
    }
  )
});
/*
  *** Google Civic data API ***
*/
Proxy.get('/civicapi/:search', (req, res) => {
  request(
    {url: `${CivicAPI}?address=${req.params.search}&key=${CIVICAPI_KEY}`},
    (error, response, body) => {
      console.log(`${CivicAPI}?address${req.params.search}&key=${CIVICAPI_KEY}`);
      if(error || response.statusCode !== 200) {
        return res.status(500).json({type: 'error', message: "failure"});
      }

      console.log(body);
      res.send(JSON.parse(body));
    }
  )
});


/*
  *** News media API Logic ***
*/
Proxy.get('/newsmedia/:search', (req, res) => {
  request(
    {url: `${NewsMedia}?q=${req.params.search}&apikey=${NEWSAPI_KEY}`},
    (error, response, body) => {
      console.log(`${NewsMedia}?q=${req.params.search}&apikey=${NEWSAPI_KEY}`);
      if(error || response.statusCode !== 200) {
        return res.status(500).json({type: 'error', message: "failure"});
      }

      console.log(body);
      res.send(JSON.parse(body));
    }
  )
});

/*
  *** Database Logic***
*/

let pool = mysql.createPool({
  connectionLimit:5,
  host: 'database',
  user: 'root',
  password: MYSQL_PASS,
  database: 'Poli'
});


Proxy.get('/politicians/:filter', (req,res) => {
  pool.getConnection((err,con)=>{
    if (err) {
      return console.error('error: ' + err.message);
    }

    // TODO place query filter logic in front end to make more flexible
    var query = ``;
    if (req.params.filter !== 'init') {
      query = `SELECT * FROM politicians
                ${req.params.filter}`;
    }
    else { 
      query = `SELECT * FROM politicians`;
    }
    
    con.query(query, (err, result, fields) => {
      if (err) throw err;
      res.send(result);
      console.log(result);
      con.release();
    })
    console.log('connected to the MySQL');
  })
});

Proxy.get('/positions/', (req,res) => {
  pool.getConnection((err,con)=>{
    if (err) {
      return console.error('error: ' + err.message);
    }

    var query = `SELECT DISTINCT Running_Position FROM politicians`;
    
    con.query(query, (err, result, fields) => {
      if (err) throw err;
      res.send(result);
      console.log(result);
      con.release();
    })
    console.log('connected to the MySQL');
  })
});
  
const PORT = process.env.PORT || 4000;
Proxy.listen(PORT, () => console.log(`listening on ${PORT}`));
