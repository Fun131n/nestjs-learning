import { mongoose } from "@app/transformers/mongoose.transformer"
import { DB_CONNECTION_TOKEN } from "@app/common/constants/system.constant";
import * as APP_CONFIG from '@app/app.config'

export const databaseProvider = {
  provide: DB_CONNECTION_TOKEN,

  useFactory: async() => {
    let reConnectionTask = null;
    const RECONNET_INTERVAL = 6000;

    function connection() {
      return mongoose.connect(APP_CONFIG.MONGODB.uri, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        promiseLibrary: global.Promise
      })
    }

    mongoose.connection.on('connecting', () => {
      console.log('数据库连接中')
    })

    mongoose.connection.on('open', () => {
      console.info('数据库连接成功！');
      clearTimeout(reConnectionTask);
      reConnectionTask = null;
    });

    mongoose.connection.on('disconnected', () => {
      console.error(`数据库失去连接！尝试 ${RECONNET_INTERVAL / 1000}s 后重连`);
      reConnectionTask = setTimeout(connection, RECONNET_INTERVAL);
    });

    mongoose.connection.on('error', error => {
      console.error('数据库发生异常！', error);
      mongoose.disconnect();
    });

    return await connection();
  }
}