const { PrismaClient } = require("@prisma/client");

// Explicitly provide the direct local file path parameters mapping to clear Prisma 7 standalone constructor blocks
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./dev.db"
    }
  }
});

async function main() {
  console.log("Purging old records from the database cluster...");
  await prisma.customer.deleteMany({});
  
  console.log("Injecting fresh enterprise customer profiles...");
  await prisma.customer.createMany({
    data: [
      { accountNode: "ACME_ENTERPRISE_NODE", industry: "SAAS", monthlySpending: 2400.00, inactivityDays: 14, complaintCount: 4, usageFrequency: 2 },
      { accountNode: "GLOBEX_TELCO_NODE", industry: "TELECOM", monthlySpending: 1150.00, inactivityDays: 25, complaintCount: 6, usageFrequency: 1 },
      { accountNode: "APEX_ALPHA_FINANCIAL", industry: "BANKING", monthlySpending: 5900.00, inactivityDays: 2, complaintCount: 0, usageFrequency: 45 },
      { accountNode: "VIRTUAL_MARKET_CORP", industry: "COMMERCE", monthlySpending: 850.00, inactivityDays: 18, complaintCount: 3, usageFrequency: 5 }
    ]
  });
  console.log("Data layer hydration complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
