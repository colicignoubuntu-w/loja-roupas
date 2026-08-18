#!/usr/bin/env bash

set -e

BASE_URL="http://localhost:3000"

GROUP_ID=1
PACKAGE_ID=1

COOKIE_FILE="/tmp/evershop-admin-cookie.txt"
LOGIN_BODY="/tmp/evershop-login-response.json"
PRODUCT_BODY="/tmp/evershop-product-response.json"

cleanup() {
  rm -f "$COOKIE_FILE" "$LOGIN_BODY" "$PRODUCT_BODY"
}

trap cleanup EXIT

echo "========================================"
echo "   CADASTRAR PRODUTO NO EVERSHOP"
echo "========================================"
echo

read -p "Email do administrador: " ADMIN_EMAIL

read -s -p "Senha do administrador: " ADMIN_PASSWORD
echo
echo

read -p "Nome do produto: " PRODUCT_NAME
read -p "SKU: " PRODUCT_SKU
read -p "Preço (ex: 89.90): " PRODUCT_PRICE
read -p "Quantidade em estoque: " PRODUCT_QTY
read -p "URL amigável (ex: camiseta-oversized-branca): " PRODUCT_URL
read -p "Peso em kg (ex: 0.30): " PRODUCT_WEIGHT
read -p "Imagem (ex: /images/produtos/camiseta-branca.jpg): " PRODUCT_IMAGE

echo
echo "Fazendo login no EverShop..."

LOGIN_STATUS=$(curl -sS \
  -o "$LOGIN_BODY" \
  -w "%{http_code}" \
  -c "$COOKIE_FILE" \
  -b "$COOKIE_FILE" \
  -X POST "$BASE_URL/user/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$ADMIN_EMAIL\",
    \"password\": \"$ADMIN_PASSWORD\"
  }"
)

echo "HTTP login: $LOGIN_STATUS"
cat "$LOGIN_BODY"
echo

if [ "$LOGIN_STATUS" != "200" ]; then
  echo
  echo "ERRO: Login administrativo falhou."
  exit 1
fi

if ! grep -q '"data"' "$LOGIN_BODY"; then
  echo
  echo "ERRO: O login não retornou uma sessão válida."
  exit 1
fi

echo
echo "Login realizado com sucesso."
echo
echo "Criando produto..."

PRODUCT_STATUS=$(curl -sS \
  -o "$PRODUCT_BODY" \
  -w "%{http_code}" \
  -c "$COOKIE_FILE" \
  -b "$COOKIE_FILE" \
  -X POST "$BASE_URL/products" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"$PRODUCT_NAME\",
    \"url_key\": \"$PRODUCT_URL\",
    \"status\": \"1\",
    \"sku\": \"$PRODUCT_SKU\",
    \"price\": $PRODUCT_PRICE,
    \"qty\": $PRODUCT_QTY,
    \"group_id\": $GROUP_ID,
    \"visibility\": \"1\",
    \"manage_stock\": true,
    \"stock_availability\": true,
    \"weight\": $PRODUCT_WEIGHT,
    \"package_id\": $PACKAGE_ID,
    \"no_shipping_required\": false,
    \"images\": [\"$PRODUCT_IMAGE\"],
    \"attributes\": [],
    \"description\": []
  }"
)

echo "HTTP produto: $PRODUCT_STATUS"
cat "$PRODUCT_BODY"
echo

if [ "$PRODUCT_STATUS" != "200" ]; then
  echo
  echo "ERRO: A API não criou o produto."
  exit 1
fi

if ! grep -q '"data"' "$PRODUCT_BODY"; then
  echo
  echo "ERRO: A API respondeu sem os dados do produto."
  exit 1
fi

if ! grep -q '"product_id"' "$PRODUCT_BODY"; then
  echo
  echo "ERRO: A resposta não contém product_id."
  exit 1
fi

echo
echo "========================================"
echo "PRODUTO CRIADO COM SUCESSO"
echo "========================================"