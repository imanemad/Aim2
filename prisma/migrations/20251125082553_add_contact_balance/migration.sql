/*
  Warnings:

  - Added the required column `balance` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "balance" INTEGER NOT NULL;
