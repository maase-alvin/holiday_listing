const express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
const bodyParser = require('body-parser');

const { getStoredHolidays, storeHolidays } = require('./data/holidays');

var schema = buildSchema(`
type Offer{
  id: String!
  name: String!
  imageUrl: String!
  dateAdded: String!
  description: String!
  value: Float!
  currency: String!
  visitedCount: Int!
  }
  enum SortBy {
  NAME
  DATE_ADDED
  PRICE
  }
  
  enum OrderBy {
  ASC
  DESC
  }
  
  input Sort {
  by: SortBy!
  order: OrderBy!
  }
  
  type Query {
  offers(limit: Int, sort: Sort): [Offer!]!
  }
  type Mutation {
  markedVisited(offerId: String!): Offer
  }
  
`);

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('', async (req, res) => {
  const storedHolidays = await getStoredHolidays();
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
  res.json({ holidays: storedHolidays });
});

app.get('/posts/:id', async (req, res) => {
  const storedPosts = await getStoredPosts();
  const post = storedPosts.find((post) => post.id === req.params.id);
  res.json({ post });
});

app.post('/posts', async (req, res) => {
  const existingPosts = await getStoredPosts();
  const postData = req.body;
  const newPost = {
    ...postData,
    id: Math.random().toString(),
  };
  const updatedPosts = [newPost, ...existingPosts];
  await storePosts(updatedPosts);
  res.status(201).json({ message: 'Stored new post.', post: newPost });
});

app.listen(8080);
