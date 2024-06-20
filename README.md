Börja med att köra npm init -y, nedb-promises, joi, nodemon, express, uuid

Individuella uppgift:
Först så skriver du in http://localhost:8020/menu därefter går du till headers för att lägga in Authorization och value ska vara tomt, sen lägger du till en ny och skriver Content-Type - application/json och så lägger du till så att du har tillgång till admin och då skriver du x-admin-token - secret-admin-token. då bör ha tillgång till allt

För att lägga till en produkt så behöver du vara admin och genom att du lagt till där uppe så kommer det gå bra. när du väll ska lägga till en product så behöver du ange göra en POST-request på http://localhost:8020/menu och skriva in det här på json filen t.ex 

{
id: "kaffe", 
title: "Svartkaffe", 
desc: "Godaste svarta kaffet",
price: "20"
} 

för att ändra på produkten så gör du en PUT-request och ändrar på det du har viljat ändra på men du behöver då skriva http://localhost:8020/menu/kaffe, och sen göra ändringen 
{id: "kaffe",
title: "Svartkaffe",
desc: "Godaste svarta kaffet",
price: "15"} 
nu ändrade jag priset.

För att ta bort produkten så kommer behöver du göra en DELETE-request och där skriver du in http://localhost:8020/menu/kaffe, så tar du bort kaffet.

Med alla request du gör behöver du vara inloggad som admin och då lägger du till på headers: du x-admin-token, value: secret-admin-token.

"bryggkaffe" och "gustav_adolfsbakelse" finns redan i data basen så för att fixa en kampanj så gör du en Post-förfrågan och skriver in koden under i json för att få kampanjen att funka

{
  "products": ["bryggkaffe", "gustav_adolfsbakelse"],
  "campaignPrice": 60
}

http://localhost:8020/campaigns så ser du om kampanjen finns där



Menyn:
För att kolla menyn : http://localhost:8020/menu
För att kolla efter specifikt id: http://localhost:8020/menu/  (här skriver du in det långa id som du hittar i airbean.db t.ex. Az3b6aeCng6rbrET)

Varukorgen:
För att kolla innehållet i varukorgen : http://localhost:8020/cart
För att lägga till i varukorgen så sätt ett POST anrop och skickar med all data från det kaffet du vill ha som ligger i airbean.db. Detta görs till http://localhost:8020/cart
För att ta bort i varukorgen så sätt ett POST anrop och skickar med all data från det kaffet du vill ha som ligger i airbean.db. Detta görs till http://localhost:8020/cart/ (här skriver du det långa id:et. T.ex. http://localhost:8020/cart/XFMyYITYP52LXcYq)

Om oss:
Endpoint för om oss: http://localhost:8020/about


För registrering:
http://localhost:8020/auth/register
Gör POST-anrop. Skicka med { "username" : "ditt användarnamn", "password" : "ditt lösenord"}

För login : 
http://localhost:8020/auth/login
Gör POST-anrop. Skicka med { "username" : "ditt användarnamn", "password" : "ditt lösenord"}

För att lägga en beställning som gäst:
Gå till http://localhost:8020/checkout och gör ett POST-anrop
Gå sedan till http://localhost:8020/status för att se när ditt kaffe levereras

För att lägga en beställning som användare
Gå till http://localhost:8020/checkout därefter skriver du i headers key : Content-Type, Value : application.json
Raden under i headers. Key : user-id, Value : (här skriver du in ditt unika id som du hittar i users.db)
Sen gör du ett POST-anrop.

För att se orderhistory:
http://localhost:8020/orderhistory/ (här skriver du in din användares unika id)

# Airbean
# Airbean
