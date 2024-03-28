#variavel =
curl -X POST \
             'http://localhost:8085/realms/treino-app/protocol/openid-connect/token' \
             -H 'Content-Type: application/x-www-form-urlencoded' \
             -d 'grant_type=password' \
             -d 'client_id=treino-backend' \
             -d 'username=user' \
             -d 'password=12'
#echo $variavel
