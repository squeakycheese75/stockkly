define HELP

Usage:

make create-local-env           - Create skeleton .env file.

endef

export HELP

create-local-env:
	echo "REACT_APP_PRICES_API=***your api url***" >> .env
	echo "REACT_APP_AUTH0_RETURN_TO=***your api url return address***" >> .env
	echo "REACT_APP_AUTH0_DOMAIN=***your autho0 domain credentials***" >> .env
	echo "REACT_APP_AUTH0_CLIENT_ID=***your autho0 domain credentials***" >> .env
	echo "REACT_APP_AUTH0_CALLBACK_URL=***your autho0 domain credentials***" >> .env
	echo "REACT_APP_AUTH0_AUDIENCE=***your autho0 domain credentials***" >> .env
	echo "REACT_APP_API_URL=***your autho0 domain credentials***" >> .env
