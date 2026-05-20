"use strict";

const DEMO_USERS = [
  {
    name: "Avery Patel",
    email: "avery.patel@example.com",
    accounts: [
      {
        name: "Salary",
        description: "Primary paycheck from BrightPath Labs",
        type: "income",
      },
      {
        name: "Freelance",
        description: "Occasional consulting and project work",
        type: "income",
      },
      {
        name: "Rent",
        description: "Monthly apartment rent",
        type: "expense",
      },
      {
        name: "Groceries",
        description: "Weekly groceries and household basics",
        type: "expense",
      },
      {
        name: "Utilities",
        description: "Electricity, internet, and mobile service",
        type: "expense",
      },
    ],
    transactions: [
      ["Salary", "5200.00", "May salary deposit", 2],
      ["Rent", "1850.00", "May rent payment", 3],
      ["Groceries", "146.38", "Trader Joe's weekly shop", 7],
      ["Utilities", "212.64", "Electric and internet bill", 10],
      ["Freelance", "875.00", "Landing page build for local studio", 13],
      ["Groceries", "88.41", "Farmers market and pantry restock", 18],
    ],
  },
  {
    name: "Maya Thompson",
    email: "maya.thompson@example.com",
    accounts: [
      {
        name: "Salary",
        description: "Biweekly payroll from Northstar Health",
        type: "income",
      },
      {
        name: "Dividends",
        description: "Quarterly dividend payouts",
        type: "income",
      },
      {
        name: "Mortgage",
        description: "Home mortgage payment",
        type: "expense",
      },
      {
        name: "Childcare",
        description: "After-school care and activities",
        type: "expense",
      },
      {
        name: "Dining",
        description: "Restaurants, coffee, and takeout",
        type: "expense",
      },
    ],
    transactions: [
      ["Salary", "3420.00", "First May paycheck", 4],
      ["Mortgage", "2425.00", "May mortgage payment", 5],
      ["Childcare", "640.00", "After-school program tuition", 8],
      ["Dining", "74.25", "Friday family dinner", 12],
      ["Dividends", "118.72", "Index fund dividend payout", 15],
      ["Salary", "3420.00", "Second May paycheck", 19],
    ],
  },
  {
    name: "Jordan Kim",
    email: "jordan.kim@example.com",
    accounts: [
      {
        name: "Contracting",
        description: "Product design contract income",
        type: "income",
      },
      {
        name: "Marketplace Sales",
        description: "Digital templates and design assets",
        type: "income",
      },
      {
        name: "Studio Rent",
        description: "Shared studio workspace",
        type: "expense",
      },
      {
        name: "Software",
        description: "Design and productivity subscriptions",
        type: "expense",
      },
      {
        name: "Travel",
        description: "Client meetings and conferences",
        type: "expense",
      },
    ],
    transactions: [
      ["Contracting", "4100.00", "Retainer invoice from Atlas Apps", 1],
      ["Studio Rent", "725.00", "Shared studio desk membership", 6],
      ["Software", "96.98", "Figma, Notion, and storage renewals", 9],
      ["Marketplace Sales", "312.44", "Template marketplace payout", 11],
      ["Travel", "438.20", "Train and hotel for client workshop", 16],
      ["Contracting", "1350.00", "Prototype milestone payment", 20],
    ],
  },
  {
    name: "Sofia Garcia",
    email: "sofia.garcia@example.com",
    accounts: [
      {
        name: "Salary",
        description: "Monthly payroll from Greenline Foods",
        type: "income",
      },
      {
        name: "Bonus",
        description: "Performance and referral bonuses",
        type: "income",
      },
      {
        name: "Auto Loan",
        description: "Car loan payment",
        type: "expense",
      },
      {
        name: "Insurance",
        description: "Auto, renters, and health premiums",
        type: "expense",
      },
      {
        name: "Fitness",
        description: "Gym, classes, and wellness costs",
        type: "expense",
      },
    ],
    transactions: [
      ["Salary", "4650.00", "May payroll deposit", 2],
      ["Auto Loan", "389.77", "Monthly car payment", 4],
      ["Insurance", "284.15", "Combined insurance premiums", 6],
      ["Fitness", "59.00", "Gym membership", 9],
      ["Bonus", "500.00", "Employee referral bonus", 14],
      ["Fitness", "42.50", "Yoga class pack", 17],
    ],
  },
  {
    name: "Noah Williams",
    email: "noah.williams@example.com",
    accounts: [
      {
        name: "Salary",
        description: "Engineering salary from Cedar Cloud",
        type: "income",
      },
      {
        name: "Interest",
        description: "High-yield savings interest",
        type: "income",
      },
      {
        name: "Rent",
        description: "Townhouse rent",
        type: "expense",
      },
      {
        name: "Student Loan",
        description: "Monthly student loan repayment",
        type: "expense",
      },
      {
        name: "Transportation",
        description: "Fuel, rideshare, transit, and parking",
        type: "expense",
      },
    ],
    transactions: [
      ["Salary", "6100.00", "May salary deposit", 1],
      ["Rent", "2100.00", "Townhouse rent", 3],
      ["Student Loan", "318.62", "Student loan autopay", 5],
      ["Transportation", "68.14", "Transit pass reload", 8],
      ["Interest", "43.29", "Savings account monthly interest", 12],
      ["Transportation", "54.80", "Fuel and parking", 18],
    ],
  },
];

const DEMO_USER_EMAILS = DEMO_USERS.map((user) => user.email);
const DEMO_PASSWORD_HASH =
  "$2b$10$KiAcpDEwGrA9eZoqouDRz.do8oWxu7brPs.Py7WbQl9cX/CDTtWD6"; // password123

function daysAgo(days) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  date.setUTCHours(12, 0, 0, 0);
  return date;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.sequelize.transaction(async (transaction) => {
      const users = DEMO_USERS.map((user) => ({
        name: user.name,
        email: user.email,
        password: DEMO_PASSWORD_HASH,
        created_at: now,
        updated_at: now,
      }));

      await queryInterface.bulkInsert("users", users, { transaction });

      const insertedUsers = await queryInterface.sequelize.query(
        `SELECT id, email FROM "users" WHERE email IN (:emails);`,
        {
          replacements: { emails: DEMO_USER_EMAILS },
          type: Sequelize.QueryTypes.SELECT,
          transaction,
        },
      );

      const usersByEmail = new Map(
        insertedUsers.map((user) => [user.email, user.id]),
      );

      const accounts = DEMO_USERS.flatMap((user) => {
        const userId = usersByEmail.get(user.email);

        return user.accounts.map((account) => ({
          user_id: userId,
          name: account.name,
          description: account.description,
          type: account.type,
          created_at: now,
          updated_at: now,
        }));
      });

      await queryInterface.bulkInsert("accounts", accounts, { transaction });

      const insertedAccounts = await queryInterface.sequelize.query(
        `
          SELECT user_id, sn, name
          FROM "accounts"
          WHERE user_id IN (:userIds);
        `,
        {
          replacements: { userIds: insertedUsers.map((user) => user.id) },
          type: Sequelize.QueryTypes.SELECT,
          transaction,
        },
      );

      const accountSnByUserAndName = new Map(
        insertedAccounts.map((account) => [
          `${account.user_id}:${account.name}`,
          account.sn,
        ]),
      );

      const transactions = DEMO_USERS.flatMap((user) => {
        const userId = usersByEmail.get(user.email);

        return user.transactions.map(
          ([accountName, amount, comment, daysBack]) => ({
            user_id: userId,
            account_sn: accountSnByUserAndName.get(`${userId}:${accountName}`),
            amount,
            comment,
            created_at: daysAgo(daysBack),
            updated_at: now,
          }),
        );
      });

      await queryInterface.bulkInsert("transactions", transactions, {
        transaction,
      });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const insertedUsers = await queryInterface.sequelize.query(
        `SELECT id FROM "users" WHERE email IN (:emails);`,
        {
          replacements: { emails: DEMO_USER_EMAILS },
          type: Sequelize.QueryTypes.SELECT,
          transaction,
        },
      );

      const userIds = insertedUsers.map((user) => user.id);

      if (userIds.length > 0) {
        await queryInterface.bulkDelete(
          "transactions",
          { user_id: { [Sequelize.Op.in]: userIds } },
          { transaction },
        );
        await queryInterface.bulkDelete(
          "accounts",
          { user_id: { [Sequelize.Op.in]: userIds } },
          { transaction },
        );
      }

      await queryInterface.bulkDelete(
        "users",
        { email: { [Sequelize.Op.in]: DEMO_USER_EMAILS } },
        { transaction },
      );
    });
  },
};
