const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Post = require('./Post');
const User = require('./User');

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                len: [5]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            },
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Post,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;