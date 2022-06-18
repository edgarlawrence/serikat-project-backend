const db = require('../config/index');
const Sequelize = require('sequelize');

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

const Users = db.define('users',{
    username:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});


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

db.sync()

module.exports = { Tables, CategoryTables, MemberTable, Users }