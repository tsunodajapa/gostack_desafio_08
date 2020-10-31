# GOStack desafio 08

[![node version](https://img.shields.io/node/v/react-native)](https://img.shields.io/node/v/react-native)
![npm](https://img.shields.io/npm/v/react-navigation?label=react-native-navigation)
![npm](https://img.shields.io/npm/v/react-native?label=react-native)
<img src="https://img.shields.io/github/languages/top/tsunodajapa/gostack_desafio_08">

Uma aplicação marktplace Mobile, onde é possível inserir produtos no carrinho, vizualisar tudo que foi adicionado e o valor total.

Este desafio tem como objetivo utilizar alguns apredizados do Gostack da Rocktseat.

## Conceitos estudados

- Context API;
- useMemo no cálculo do total, para não necessitar toda hora que renderizar a tela calcular novamente;
- Reduce para cálculo do valor total
- Async Storage para armazenamento no storage do celular

## Requisitos de instalação

- React >= 16.13.1
- React-Native >= 0.63.2
- npm >= 6.0.0
- node >= 10.0

## Iniciando o aplicativo Mobile

#### Execute o comando para instalações de dependências do Mobile:

```
yarn

ou

npm install
```

#### Execute o comando para iniciar o aplicativo:
> Certifique de configurar o emulador ou plugar o celular no computador

```
yarn android

ou

npm run android
```

ou

```
yarn ios

ou

npm run ios
```


#### Iniciar o servidor:
> É necessário que a SERVER FAKE esteje rodando para que o aplicativo funcione corretamente

```
yarn json-server server.json -p 3333
```




