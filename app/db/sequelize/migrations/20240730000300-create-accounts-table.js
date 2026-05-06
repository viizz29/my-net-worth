"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(
        `CREATE TYPE "account_type" AS ENUM ('income', 'expense');`,
      );

      // 1. Create accounts table
      await queryInterface.createTable(
        "accounts",
        {
          user_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
              model: "users",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          sn: {
            type: Sequelize.BIGINT,
            allowNull: false,
          },

          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },

          description: {
            type: Sequelize.STRING,
            allowNull: false,
          },

          type: {
            type: "account_type",
            allowNull: false,
          },

          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
          },

          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        },
        {
          transaction,
        },
      );

      await queryInterface.addConstraint("accounts", {
        type: "primary key",
        fields: ["user_id", "sn"],
        name: "pk_accounts",
        transaction,
      });

      await queryInterface.addIndex("accounts", ["name"], {
        name: "index_on_name_of_accounts", // optional but recommended
        unique: false, // set to true for unique index
        transaction,
      });

      await queryInterface.addColumn(
        "users",
        "next_account_sn",
        {
          allowNull: false,
          type: Sequelize.BIGINT,
          defaultValue: 1,
        },
        { transaction },
      );

      // create trigger for generating ids, sequentially
      await queryInterface.sequelize.query(
        `
        CREATE OR REPLACE FUNCTION generate_next_account_sn() RETURNS TRIGGER AS $$
        DECLARE
          next_sn BIGINT;
        BEGIN
          -- Fetch the next_sn from the users table where id = NEW.user_id
          SELECT next_account_sn INTO next_sn FROM users WHERE id = NEW.user_id FOR UPDATE;
    
          NEW.sn := next_sn;
    
          UPDATE users SET next_account_sn = next_account_sn + 1 where id = NEW.user_id;
    
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `,
        { transaction },
      );

      // Create the trigger
      await queryInterface.sequelize.query(
        `
        CREATE TRIGGER accounts_before_insert_generate_sn
        BEFORE INSERT ON "accounts"
        FOR EACH ROW
        EXECUTE FUNCTION generate_next_account_sn();
      `,
        { transaction },
      );
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Drop the trigger
      await queryInterface.sequelize.query(
        `
    DROP TRIGGER IF EXISTS accounts_before_insert_generate_sn ON "accounts";
  `,
        { transaction },
      );

      // Drop the trigger function
      await queryInterface.sequelize.query(
        `
    DROP FUNCTION IF EXISTS generate_next_account_sn();
  `,
        { transaction },
      );

      await queryInterface.removeColumn("users", "next_account_sn", {
        transaction,
      });

      // Drop the table (this automatically removes constraints)
      await queryInterface.dropTable("accounts", { transaction });
    });
  },
};
