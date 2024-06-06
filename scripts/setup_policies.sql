-- Enable row level security
ALTER TABLE "Dealerships" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Vehicles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Customers" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Sales" ENABLE ROW LEVEL SECURITY;

-- Create policies for Dealerships
CREATE POLICY dealership_policy ON "Dealerships"
  USING ("apiKey" = current_setting('my.app.api_key'));

-- Create policies for Vehicles
CREATE POLICY vehicle_policy ON "Vehicles"
  USING ("dealershipId" IN (SELECT "id" FROM "Dealerships" WHERE "apiKey" = current_setting('my.app.api_key')));

-- Create policies for Customers
CREATE POLICY customer_policy ON "Customers"
  USING (EXISTS (SELECT 1 FROM "Sales" JOIN "Vehicles" ON "Sales"."vehicleId" = "Vehicles"."id" WHERE "Sales"."customerId" = "Customers"."id" AND "Vehicles"."dealershipId" IN (SELECT "id" FROM "Dealerships" WHERE "apiKey" = current_setting('my.app.api_key'))));

-- Create policies for Sales
CREATE POLICY sales_policy ON "Sales"
  USING ("vehicleId" IN (SELECT "id" FROM "Vehicles" WHERE "dealershipId" IN (SELECT "id" FROM "Dealerships" WHERE "apiKey" = current_setting('my.app.api_key'))));
