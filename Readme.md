# Tech Surface Backend
This repository contains the backend codebase for an Exam Portal with Institute Management system. It's developed using TypeScript, ExpressJS, and Mongoose.

## Getting Started

First, clone the repository
```bash
git clone https://github.com/pathak404/tech-surface-backend.git
```

then, install the dependencies:

```bash
npm install
```
then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`FRONTEND_URL` - URL of frontend application

`MONGODB_URL` - Your mongoDB url

`PORT` - Port Number

`SECRET_KEYPHRASE` - Used for hashing/encryption (JWT secret)


## Features
JWT Authentication,\
Management: Students, Courses, Batches, Payments, Exams, Questions, Results, Admins,\
Online Exam Portal



## Other References

[Property 'X' does not exist on type Request in TypeScript](https://bobbyhadz.com/blog/typescript-property-does-not-exist-on-type-request)



## Related
[Tech Surface Frontend](https://github.com/pathak404/tech-surface-frontend)

