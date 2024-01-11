#### CHAT APPLICATION

# Scallable using Avian Redis 

1. Install Prisma
2. Setup Prisma
	- Primsa folder with schema.prisma will be created.
3. Setup Database url (ssl) in .env  also, download certificate and place inside prisma folder.
	- DATABASE_URL
4. Create Table with fields 
5. Finally, migrate using command.
	```shell
	npx prisma migrate dev --name init
	```
	- Migrations folder will be created inside primsa package.
	- Prisma Client will be installed


6. npx primsa studio serves an interface at 5555 port where we can see all the messages.

