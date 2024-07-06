## Sample .env

### This is only for this assignment that's why I am exposing it
```js
NODE_ENV="dev"
DATABASE_URL="postgresql://postgres.kohtgeoxondeicivcvzf:Demolution1!@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"
GMAIL_USER="demoemailnoreply107@gmail.com"
GMAIL_PASS="amsa sstx pdvy rsfs"
```

### Migration
```sql
-- CreateTable
CREATE TABLE "Referral" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

```
