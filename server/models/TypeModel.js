const Sequelize = require('sequelize');
const sequelize = require('../config/sequelizeBase');

const TypeModel = sequelize.define('type',{
	id:{
		type:Sequelize.BIGINT,
		primaryKey:true,
		allowNull:false,
		autoIncrement:true
	},
	name:{
		type:Sequelize.STRING(255),
		allowNull:false
	},
},{
	timestamps:false,
});

// 反向生成数据库
// sequelize.sync()

module.exports = TypeModel;