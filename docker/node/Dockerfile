FROM node:20-alpine
LABEL image-name=form-builder

EXPOSE 3003

WORKDIR /src

# Prisma needs OpenSSL on Alpine
RUN apk add --no-cache openssl

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN --mount=type=secret,id=database_url \
    --mount=type=secret,id=resend_api_key \
    sh -c 'export DATABASE_URL="$(cat /run/secrets/database_url)" \
    && export RESEND_API_KEY="$(cat /run/secrets/resend_api_key)" \
    && npx prisma generate \
    && npm run build'

CMD ["npm", "run", "start"]
