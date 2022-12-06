const conn = require('./conn');
const { STRING, UUID, UUIDV4, VIRTUAL, TEXT, BOOLEAN } = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const JWT = process.env.JWT;

const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  facebookId: {
    type: STRING,
  },
  firstName: {
    type: STRING,
  },

  lastName: {
    type: STRING,
  },
  fullName: {
    type: VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
  address: {
    type: STRING,
  },

  phone: {
    type: STRING,
  },
  avatar: {
    type: TEXT,
    get: function () {
      const prefixPNG = 'data:image/png;base64,';
      const prefixJPG = 'data:image/jpeg;base64,';
      const data = this.getDataValue('avatar') || '';
      if (data.startsWith(prefixPNG)) {
        return data;
      } else if (data.startsWith(prefixJPG)) {
        return data;
      } else if (!data) {
        return null;
      }
      return `${prefixPNG}${data}`;
    },
  },
  isAdmin: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

User.prototype.createOrder = async function ({ orderTotal }) {
  const cart = await this.getCart();
  cart.isCart = false;
  cart.orderTotal = orderTotal;
  await cart.save();
  return cart;
};

User.prototype.getOrders = async function () {
  const orders = await conn.models.order.findAll({
    where: {
      userId: this.id,
      isCart: false,
    },
    include: [
      {
        model: conn.models.lineItem,
        include: { model: conn.models.product },
      },
    ],
  });
  return orders;
};

User.prototype.getCart = async function () {
  let cart = await conn.models.order.findOne({
    where: {
      userId: this.id,
      isCart: true,
    },
  });
  if (!cart) {
    cart = await conn.models.order.create({
      userId: this.id,
    });
  }
  cart = await conn.models.order.findByPk(cart.id, {
    include: [
      {
        model: conn.models.lineItem,
        include: { model: conn.models.product },
      },
    ],
  });
  return cart;
};

User.prototype.addToCart = async function ({ product, quantity }) {
  const cart = await this.getCart();
  let lineItem = cart.lineItems.find((lineItem) => {
    return lineItem.productId === product.id;
  });
  if (lineItem) {
    lineItem.quantity += quantity;
    await lineItem.save();
  } else {
    await conn.models.lineItem.create({
      orderId: cart.id,
      productId: product.id,
      quantity,
    });
  }
  return this.getCart();
};

User.prototype.removeFromCart = async function ({ product, quantityToRemove }) {
  const cart = await this.getCart();
  const lineItem = cart.lineItems.find((lineItem) => {
    return lineItem.productId === product.id;
  });
  lineItem.quantity = lineItem.quantity - quantityToRemove;
  if (lineItem.quantity > 0) {
    await lineItem.save();
  } else {
    await lineItem.destroy();
  }
  return this.getCart();
};

User.addHook('beforeSave', async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw 'user not found';
  } catch (ex) {
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

User.fetchresetURL = async function (email) {
  try {
    const user = await this.findOne({
      where: {
        email: email,
      },
    });
    let resetinfo = {
      link: '',
      message: '',
      getUser: false,
    };
    if (user) {
      const payload = {
        email: user.email,
        id: user.id,
      };
      const token = jwt.sign(payload, JWT, { expiresIn: '15min' });
      resetinfo.link = `http://localhost:3000/#/reset-password/${user.id}/${token}`;
      resetinfo.getUser = true;
      resetinfo.message =
        'An email has been sent to your login email. If you do not reeive the email in 15 minutes, please check your spam folder or try again with another emial address you may use.';
      // return link;
    } else {
      resetinfo.message = `No user register with this email (${email}), please double check your email and try again!`;
    }
    return resetinfo;
  } catch (ex) {
    const error = new Error(ex);
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ email, password }) {
  var msg = ''
  var token = ''
  const user = await this.findOne({
    where: {
      email,
    },
  });
  if(!user) msg = 'No user registered with this email'
  if (user && !(await bcrypt.compare(password, user.password))) {
    msg = 'Wrong password'
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    token = jwt.sign({ id: user.id }, JWT);
  }
  return {msg, token}
  // const error = new Error('bad credentials');
  // error.status = 401;
  // throw error;
};

const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_URL = 'https://api.github.com/user';
User.authgithub = async function (code) {
  let response = await axios.post(
    GITHUB_TOKEN_URL,
    {
      code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
    },
    {
      headers: {
        accept: 'application/json',
      },
    }
  );
  const { access_token } = response.data;
  if (!access_token) {
    return response.data;
  }
  response = await axios.get(GITHUB_USER_URL, {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  });
  const { login, node_id } = response.data;
  // return response.data
  let user = await User.findOne({
    where: {
      username: login,
    },
  });
  if (!user) {
    user = await User.create({
      username: login,
      password: node_id,
      email: 'fake@email.com',
    });
  }
  return { token: jwt.sign({ id: user.id }, JWT), id: user.id };
};

User.authgoogle = async function (credentials) {
  // console.log(credentials)
  let user = await User.findOne({
    where: {
      username: credentials.username,
    },
  });
  if (!user) {
    user = await User.create({
      username: credentials.username,
      password: credentials.password,
      email: credentials.email,
    });
  }
  // console.log(jwt.sign({id: user.id}, JWT))
  return jwt.sign({ id: user.id }, JWT);
};

module.exports = User;
