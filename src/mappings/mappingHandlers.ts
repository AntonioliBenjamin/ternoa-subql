import {SubstrateExtrinsic} from "@subql/types";
import { ExtrinsicDispatcher } from '../dispatchers'
import {
    transferHandler,
    listHandler,
    unlistHandler,
    createHandler,
    burnHandler,
    buyHandler,
    NFTtransferHandler,
    createMarketplaceHandler,
    setMarketplaceOwnerHandler,
    setMarketplaceNameHandler,
    setMarketplaceTypeHandler,
    setMarketplaceCommissionFeeHandler,
    setMarketplaceUriHandler,
    setMarketplaceLogoUriHandler,
    addAccountToAllowListHandler,
    addAccountToDisallowListHandler,
    removeAccountFromAllowListHandler,
    removeAccountFromDisallowListHandler,
    lockSerieHandler,
    createFromNftHandler,
    createCapsuleHandler,
    removeCapsuleHandler,
    addFundsHandler,
    setCapsuleIpfsHandler,
    addAssociatedAccountHandler,
    lendNFTHandler,
} from '../handlers'

// init and populate extrinsicDispatcher for specific extrinsic to record
const extrinsicDispatcher = new ExtrinsicDispatcher()
extrinsicDispatcher.add('balances', 'transfer', transferHandler)
extrinsicDispatcher.add('balances', 'transferKeepAlive', transferHandler)
extrinsicDispatcher.add('nfts', 'create', createHandler)
extrinsicDispatcher.add('nfts', 'burn', burnHandler)
extrinsicDispatcher.add('nfts', 'transfer', NFTtransferHandler)
extrinsicDispatcher.add('nfts', 'finishSeries', lockSerieHandler)
extrinsicDispatcher.add('nfts', 'lend', lendNFTHandler)
extrinsicDispatcher.add('capsules', 'create', createCapsuleHandler)// removed in this chain version
extrinsicDispatcher.add('capsules', 'createFromNft', createFromNftHandler)// removed in this chain version
extrinsicDispatcher.add('capsules', 'remove', removeCapsuleHandler)// removed in this chain version
extrinsicDispatcher.add('capsules', 'addFunds', addFundsHandler)// removed in this chain version
extrinsicDispatcher.add('capsules', 'setIpfsReference', setCapsuleIpfsHandler)// removed in this chain version
extrinsicDispatcher.add('marketplace', 'buy', buyHandler)// removed in this chain version
extrinsicDispatcher.add('marketplace', 'addAccountToAllowList', addAccountToAllowListHandler)// removed in this chain version
extrinsicDispatcher.add('marketplace', 'addAccountToDisallowList', addAccountToDisallowListHandler)// removed in this chain version
extrinsicDispatcher.add('marketplace', 'removeAccountFromAllowList', removeAccountFromAllowListHandler)// removed in this chain version
extrinsicDispatcher.add('marketplace', 'removeAccountFromDisallowList', removeAccountFromDisallowListHandler)// removed in this chain version
extrinsicDispatcher.add('marketplace', 'create', createMarketplaceHandler)// removed in this chain version
extrinsicDispatcher.add('marketplace', 'list', listHandler)// removed in this chain version
extrinsicDispatcher.add('marketplace', 'unlist', unlistHandler)// removed in this chain version
extrinsicDispatcher.add('marketplace', 'setCommissionFee', setMarketplaceCommissionFeeHandler)// removed in this chain version
extrinsicDispatcher.add('marketplace', 'setLogoUri', setMarketplaceLogoUriHandler)// removed in this chain version
extrinsicDispatcher.add('marketplace', 'setMarketType', setMarketplaceTypeHandler)// removed in this chain version
extrinsicDispatcher.add('marketplace', 'setName', setMarketplaceNameHandler)// removed in this chain version
extrinsicDispatcher.add('marketplace', 'setOwner', setMarketplaceOwnerHandler)// removed in this chain version
extrinsicDispatcher.add('marketplace', 'setUri', setMarketplaceUriHandler)// removed in this chain version
extrinsicDispatcher.add('associatedAccounts', 'setAccount', addAssociatedAccountHandler)

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    logger.info(`${extrinsic.extrinsic.method.section}_${extrinsic.extrinsic.method.method}`)
    await extrinsicDispatcher.emit(extrinsic)
}