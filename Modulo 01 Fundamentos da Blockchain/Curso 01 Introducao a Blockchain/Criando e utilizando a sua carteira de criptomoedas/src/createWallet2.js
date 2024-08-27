//Importando dependências
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
//const netword = bitcoin.networks.bitcoin //.bitcoin para mainet
const network = bitcoin.networks.testnet //.testnet para testes

//Derivação de endereços e carteiras HD (Hierarchical Deterministic)
const path = `m/49'/1'/0'/0`

//Criando palavras
let mnemonic = bip39.generateMnemonic()
//Criando a seed
const seed = bip39.mnemonicToSeedSync(mnemonic)

//Raiz da carteira
let root = bip32.fromSeed(seed, network)

//Criando conta (par PVP e PUB Keys)
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

//Criando endereço
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira Gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave Privada: ", node.toWIF()) //node.toWif() Wallet Import Format - Formata a chave para que seja possível importar para um software de geranciamento de carteiras
console.log("Seed: ", mnemonic)
