# QN-Assessment
## Erik Lopez


This is a quick solution to the engineering skill Assessment provided by QuickNode.

Stack used:

- NextJS
- Typescript
- Redux-toolkit
- Blocknative API for web3
- TailwindCSS
- Apollo for Graphql query

## To run:
In root folder: 

`yarn`
`yarn dev`

## Technical Question:
Going in to as much detail as you want, describe how you would build a system that meets the following requirements:
### #1 Handles user authentication
- Would you need a database?    
  As far as I know there would need to be some kind of data store to save user data / credentials. I've heard of (but havent explored) some new web3 login solutions that let users sign in with their wallets, but I assume that it still requires saving some data somewhere.

- Which one and what might the schema look like?
  It depends on a lot of factors, but I feel like a relational db will always be the "safe" choice over nosql document stores, especially if the data model is complex and has a lot of associations. That said there are plenty of times when nosql is a good solution; it all depends on the problem domain. I have used Prisma ORM backed by postgres in the past for a nodejs app. Typically a users table will have fields for id, email, pw hash, created/updated timestamps, etc. I imagine for a web3 app we might have a users table with not much in it, but a wallets table with public addresses, and a user id foreign key?

### #2 Serves data to the client via an API

- What kind of API would you use?
  I have been impressed by GraphQL the few times I have been exposed to it; I like the fact that it lets the client choose what data it wants without any additional backend changes. Alternatively, I would set up rest-like http endpoints using express

### #3 Scales to handle thousands of requests per second
  Scaling up can sometimes be harder than getting off the ground in the first place, but with the right setup it can be done smoothly. Some things I'd look to implement:
    - For data that comes from an external source, use a caching layer so that we can serve requests for the same data much faster, and at first expire the cache naively based on TTL. Redis is my go-to solution for this
    - For data in our db, make sure everything is configured for efficiency, like ensuring the appropriate indexes are set up to improve lookup times, and setting up read replication and only read from replicas

### #4 Provides real-time updates to clients as new data is available
For real time updates I'd use websockets, so we can push messages to the client instructing it to fetch new data or just push new data directly
# QN-Assessment




