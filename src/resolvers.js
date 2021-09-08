
const {GraphQLUpload}=require("graphql-upload");
const {extname}=require("path");
const {v4:uuid}=require("uuid");
const s3=require("./s3");

module.exports = {
    Upload: GraphQLUpload,
    Mutation: {
      uploadAvatar: async (_, { file }) => {
          console.log(file);    
        const { createReadStream, filename, mimetype, encoding } = await file;
  
        const {Location}=await s3.upload({
            Body:createReadStream(),
            Key:`myaccount/${uuid()}${extname(filename)}`,
            ContentType:mimetype,
            
        }).promise();
        console.log(Location);
        return {    
          filename,
          mimetype,
          encoding,
          uri: Location,
        };
      },
    },
  };