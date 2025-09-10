-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Board" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "creatAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Lists" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "boardId" INTEGER NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "creatAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Carts" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "order" INTEGER NOT NULL,
    "listId" INTEGER NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "creatAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Carts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Board" ADD CONSTRAINT "Board_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Lists" ADD CONSTRAINT "Lists_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "public"."Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Carts" ADD CONSTRAINT "Carts_listId_fkey" FOREIGN KEY ("listId") REFERENCES "public"."Lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
