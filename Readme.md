#### Automotive Backend System
This project is a backend system to manage operations for automotive dealerships. The system accommodates multiple dealerships, each with their own vehicle inventory, sales records, and customer interactions. It includes a GraphQL API for querying and mutating data.

#### Features
- Manage multiple dealerships with hierarchical structures
- Handle vehicle inventory
- Record and retrieve sales transactions
- Manage customer information
- GraphQL API with queries and mutations for all operations
#### Requirements
- Node.js (>= 12.x)
- PostgreSQL (>= 9.x)
- Yarn
#### Setup Instructions
 1. Clone the Repository  ```git clone git@github.com:edogbosunny/automotive-backend.git``` then cd into the automotive-backend directory 

2. Install Dependencies
yarn install
3. Configure Environment Variables
Create a .env file in the root directory and add your database configuration:

##### env sample

     ```DB_HOST=localhost
        DB_USERNAME=your_db_username
        DB_PASSWORD=your_db_password
        DB_DATABASE=automotive_db
        DB_TEST_DATABASE=automotive_test_db

4. Initialize the Database
Ensure you have PostgreSQL installed and running. Create the development and test databases:
run ```yarn run create-databases``` to create the databases needed automatically

5. Run Migrations and Seeds
Run the migrations to create the necessary tables and then seed the database with initial data:

    ```yarn migrate```
    ```yarn seed```
6. Setup Policies
Run the policy setup script to configure row-level security policies:
    ```yarn run setupPolicies```

7. Start the Server
     ```yarn start```
The server will start at http://localhost:4000/.

8. Access GraphQL Playground
Open your browser and navigate to http://localhost:4000/playground to access the GraphQL playground.

#### GraphQL API
##### Queries
- Get all vehicles
graphql

    ``` query {
  vehicles {
    id
    make
    model
    year
    price
    vin
  }
}

- Get vehicles by make
graphql

    ``` query {
      vehicles(make: "Toyota") {
        id
        make
        model
        year
        price
        vin
      }
    }```
- Get vehicles by model
graphql

    ```query {
      vehicles(model: "Camry") {
        id
        make
        model
        year
        price
        vin
      }
    }```
- Get vehicles by year
graphql
    ```
    query {
      vehicles(year: 2021) {
        id
        make
        model
        year
        price
        vin
      }
}```
- Get vehicles by dealership
graphql

    ```query {
      vehicles(dealershipId: 1) {
        id
        make
        model
        year
        price
        vin
      }
    }
- Get all customers
graphql

    ```query {
      customers {
        id
        firstName
        lastName
        email
        phone
      }
    }
- Get customers by last name
graphql

`
- Get all sales
graphql

    ```query {
      sales {
        id
        date
        price
        customer {
          id
          firstName
          lastName
        }
        vehicle {
          id
          make
          model
        }
      }
    }
    
- Get sales by customer
graphql

    ```query {
      sales(customerId: 1) {
        id
        date
        price
        customer {
          id
          firstName
          lastName
        }
        vehicle {
          id
          make
          model
        }
      }
    }

- Get sales by vehicle
graphql

    ```query {
      sales(vehicleId: 1) {
        id
        date
        price
        customer {
          id
          firstName
          lastName
        }
        vehicle {
          id
          make
          model
        }
      }
    }
- Get all dealerships
graphql

    ``` query {
      dealerships {
        id
        name
        parentId
      }
    }
- Get dealership by ID
graphql

    ```query {
      dealership(id: 1) {
        id
        name
        parentId
      }
    }
##### Mutations
- Add a new vehicle
graphql

    ```mutation {
      addVehicle(dealershipId: 1, make: "Toyota", model: "Corolla", year: 2023, price: 20000, vin: "12345VIN") {
        id
        make
        model
        year
        price
        vin
      }
    }
- Update an existing vehicle
graphql

    ```mutation {
      updateVehicle(id: 1, make: "Toyota", model: "Camry", year: 2021, price: 25000, vin: "VIN12345") {
        id
        make
        model
        year
        price
        vin
      }
    }
- Add a new customer
graphql

    ```mutation {
      addCustomer(firstName: "John", lastName: "Doe", email: "john.doe@example.com", phone: "123-456-7890") {
        id
        firstName
        lastName
        email
        phone
      }
    }
- Update an existing customer
graphql

    ```mutation {
      updateCustomer(id: 1, firstName: "Jane", lastName: "Doe", email: "jane.doe@example.com", phone: "987-654-3210") {
        id
        firstName
        lastName
        email
        phone
      }
    }


- Record a sale
graphql

    ```mutation {
      recordSale(customerId: 1, vehicleId: 1, date: "2023-06-01", price: 25000) {
        id
        customer {
          id
          firstName
          lastName
        }
        vehicle {
          id
          make
          model
        }
        date
        price
      }
    }
- Update a sale
graphql

    ```mutation {
      updateSale(id: 1, customerId: 1, vehicleId: 1, date: "2023-06-02", price: 26000) {
        id
        customer {
          id
          firstName
          lastName
        }
        vehicle {
          id
          make
          model
        }
        date
        price
      }
    }

- Add a new dealership
graphql

    ``` mutation {
      addDealership(name: "New Dealership", apiKey: "new-api-key", parentId: null) {
        id
        name
        parentId
      }
    } 
- Update an existing dealership
graphql

    ``` mutation {
      updateDealership(id: 1, name: "Updated Dealership", apiKey: "updated-api-key", parentId: null) {
        id
        name
        parentId
      }
    } 
- Delete a dealership
    graphql
    ```
    mutation {
      deleteDealership(id: 1)
    }
#### Running Tests
To run the unit tests, use the following command:
```yarn test```