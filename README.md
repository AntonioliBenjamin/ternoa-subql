# SubQuery - Starter Package


The Starter Package is an example that you can use as a starting point for developing your SubQuery project.
A SubQuery package defines which data The SubQuery will index from the Substrate blockchain, and how it will store it. 

## Preparation

#### Environment

- [Typescript](https://www.typescriptlang.org/) are required to compile project and define types.  

- Both SubQuery CLI and generated Project have dependencies and require [Node](https://nodejs.org/en/).
     

#### Install the SubQuery CLI

Install SubQuery CLI globally on your terminal by using NPM:

```
npm install -g @subql/cli
```

Run help to see available commands and usage provide by CLI
```
subql help
```

## Initialize the starter package

Inside the directory in which you want to create the SubQuery project, simply replace `project-name` with your project name and run the command:
```
subql init --starter project-name
```
Then you should see a folder with your project name has been created inside the directory, you can use this as the start point of your project. And the files should be identical as in the [Directory Structure](https://doc.subquery.network/directory_structure.html).

Last, under the project directory, run following command to install all the dependency.
```
yarn install
```


## Configure your project

In the starter package, we have provided a simple example of project configuration. You will be mainly working on the following files:

- The Manifest in `project.yaml`
- The GraphQL Schema in `schema.graphql`
- The Mapping functions in `src/mappings/` directory

For more information on how to write the SubQuery, 
check out our doc section on [Define the SubQuery](https://doc.subquery.network/define_a_subquery.html) 

#### Code generation

In order to index your SubQuery project, it is mandatory to build your project first.
Run this command under the project directory.

````
yarn codegen
````

## Build the project

In order to deploy your SubQuery project to our hosted service, it is mandatory to pack your configuration before upload.
Run pack command from root directory of your project will automatically generate a `your-project-name.tgz` file.

```
yarn build
```

## Indexing and Query

Recommended way is to do it without Docker.

### Indexer (subql/node)

Be sure that your postgresql database is installed, and export the configuration

```bash
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=ternoa
export DB_HOST=postgres
export DB_PORT=5432
```

Then,

```bash
npm install -g @subql/node
yarn
yarn build
subql-node -f . --db-schema=subql_ternoa --network-endpoint wss://dev.chaos.ternoa.com
```

On the last line, you can Obviously switch from dev.chaos, to any other network endpoint.

### Running a Query Service (subql/query)

Same as the previous step, be sure that your postgresql database is installed, and export the configuration

```bash
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=ternoa
export DB_HOST=postgres
export DB_PORT=5432
```

Then,

```bash
npm install -g @subql/query
yarn
yarn build
subql-query --name subql_ternoa --playground
```

#### Run required systems in docker

First open `docker-compose.yml`, in the `graphql-engine` section and make sure the project name is identical to you have provided previously .
````yaml
command:
  - '--name'
  - 'subql-starter' #Same as your project name
  - '--playground'
````

Then, under the project directory run following command:

```
docker-compose up
```

#### Query the project

Open your browser and head to `http://localhost:3000`.

Finally, you should see a GraphQL playground is showing in the explorer and the schemas that ready to query.

For the `subql-starter` project, you can try to query with the following code to get a taste of how it works.

````graphql
{
  query{
    starterEntities(first:10){
      nodes{
        field1,
        field2,
        field3
      }
    }
  }
}
````
