// src/graphql/schema.js
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const UserQuery = require('./queries/UserQuery');
const PostQuery = require('./queries/PostQuery');
const CommentQuery = require('./queries/CommentQuery');

const UserMutation = require('./mutations/UserMutation');
const PostMutation = require('./mutations/PostMutation');
const CommentMutation = require('./mutations/CommentMutation');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...UserQuery,
    ...PostQuery, 
    ...CommentQuery
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    ...UserMutation,
    ...PostMutation, 
    ...CommentMutation
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
