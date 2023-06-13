const mongoose = require('mongoose');

const connectDB = (url) => {
  // 设置为true时，Mongoose在执行查询时会执行一些额外的验证和限制
  // 例如验证查询的字段名是否有效  
  mongoose.set('strictQuery', true);

  mongoose.connect(url)
    .then(() => console.log('connected to mongo'))
    .catch((err) => {
      console.error('failed to connect with mongo');
      console.error(err);
    });
};
module.exports =  connectDB;