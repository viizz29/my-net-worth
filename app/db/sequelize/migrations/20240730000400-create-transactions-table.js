"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // 1. Create transactions table
      await queryInterface.createTable(
        "transactions",
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

          account_sn: {
            type: Sequelize.BIGINT,
            allowNull: false,
          },

          amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
          },

          comment: {
            type: Sequelize.STRING,
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

      await queryInterface.addConstraint("transactions", {
        type: "primary key",
        fields: ["user_id", "sn"],
        name: "pk_transactions",
        transaction,
      });

      await queryInterface.addConstraint("transactions", {
        fields: ["user_id", "account_sn"], // Composite key
        type: "foreign key",
        name: "fk_account_of_transactions", // Name for the constraint
        references: {
          table: "accounts",
          fields: ["user_id", "sn"], // You can reference different fields from another table
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        transaction,
      });

      await queryInterface.addColumn(
        "users",
        "next_transaction_sn",
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
        CREATE OR REPLACE FUNCTION generate_next_transaction_sn() RETURNS TRIGGER AS $$
        DECLARE
          next_sn BIGINT;
        BEGIN
          -- Fetch the next_sn from the users table where id = NEW.user_id
          SELECT next_transaction_sn INTO next_sn FROM users WHERE id = NEW.user_id FOR UPDATE;
    
          NEW.sn := next_sn;
    
          UPDATE users SET next_transaction_sn = next_transaction_sn + 1 where id = NEW.user_id;
    
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `,
        { transaction },
      );

      // Create the trigger
      await queryInterface.sequelize.query(
        `
        CREATE TRIGGER transactions_before_insert_generate_sn
        BEFORE INSERT ON "transactions"
        FOR EACH ROW
        EXECUTE FUNCTION generate_next_transaction_sn();
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
    DROP TRIGGER IF EXISTS transactions_before_insert_generate_sn ON "transactions";
  `,
        { transaction },
      );

      // Drop the trigger function
      await queryInterface.sequelize.query(
        `
    DROP FUNCTION IF EXISTS generate_next_transaction_sn();
  `,
        { transaction },
      );

      await queryInterface.removeColumn("users", "next_transaction_sn", {
        transaction,
      });

      // Drop the table (this automatically removes constraints)
      await queryInterface.dropTable("transactions", { transaction });
    });
  },
};
