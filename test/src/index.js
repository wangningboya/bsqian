import dva from 'dva';
import './index.css';
import { hashHistory } from 'dva/router'
import createLoading from 'dva-loading'
import 'babel-polyfill'

// 1. Initialize
const app = dva({
    ...createLoading({
      effects: true,
    }),
    history: hashHistory,
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/app').default)
// app.model(require('./models/demand').default)

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
