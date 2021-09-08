
const { gql } = require('apollo-server-express');

module.exports = gql`
scalar Upload
  type File {
    uri: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    uploads: [File]
  }

  type Mutation {
    uploadAvatar(file: Upload!): File
  }
`;