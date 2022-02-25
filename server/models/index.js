const db = require('../config/index');
const Sequelize = require('sequelize');
const { v4: uuidv4 } = require("uuid");
require('dotenv').config()
console.log(process.env)

const DataTypes = Sequelize;

const Tables = db.define('news', {
    title: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    images: {
        type: DataTypes.STRING
    },
    newsCategoryId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    freezeTableName: true
  });

const CategoryTables = db.define('news_category', {
    category_name: {
        type: DataTypes.STRING,
        allowNull: false
    },  
},{
    freezeTableName: true
})

const MemberTable = db.define('member_table', {
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    men: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    women: {
        type: DataTypes.INTEGER,
    },
    // total: {
    //    type: DataTypes.VIRTUAL,
    //    get() {
    //        let mens = this.men
    //        let womens = this.women
    //        return (this.men + this.women)
    //    },
    //    set(value) {
    //     this.setDataValue(value);
    //    }
    // }
},{
    freezeTableName: true
})

const ComplainTables = db.define('complain', {
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    social_security: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    reason_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    complaint_text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    freezeTableName: true
})

const ReasonCategory = db.define('reason_category', {
    reason_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
})

const Contribution = db.define('contributions', {
    dpc: {
        type: DataTypes.STRING,
        allowNull: null
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    regions: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

const User = db.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  const RefreshToken = db.define("refreshToken", {
    token: {
      type: Sequelize.STRING,
    },
    expiryDate: {
      type: Sequelize.DATE,
    },
  });  

  RefreshToken.createToken = async function (user) {
    let expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + "60");

    let _token = uuidv4();

    let refreshToken = await this.create({
      token: _token,
      userId: user.id,
      expiryDate: expiredAt.getTime(),
    });

    return refreshToken.token;
  };

  RefreshToken.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  };

// Tables.hasOne(CategoryTables, {
//     foreignKey: {
//         name: 'category_id',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//     }
// });
// CategoryTables.belongsTo(Tables)

// Tables.hasOne(CategoryTables);
// CategoryTables.belongsTo(Tables);

CategoryTables.hasMany(Tables);
Tables.belongsTo(CategoryTables), {
    foreignKey: {
        name: 'newsCategoryId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
};

ComplainTables.hasOne(ReasonCategory);
ReasonCategory.belongsTo(ComplainTables, {
    foreignKey: {
        type: DataTypes.UUID,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
})

RefreshToken.belongsTo(User, {
    foreignKey: 'userId', targetKey: 'id'
  });

User.hasOne(RefreshToken, {
    foreignKey: 'userId', targetKey: 'id'
  });

db.sync()

module.exports = { Tables, CategoryTables, MemberTable, User, RefreshToken }