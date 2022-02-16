import { getCommonExtrinsicData, updateAccount } from '../helpers'
import { ExtrinsicHandler } from './types'
import { AssociatedAccountEntity } from '../types';
import { formatString } from '../utils';

export const addAssociatedAccountHandler: ExtrinsicHandler = async (call, extrinsic): Promise<void> => {
  const date = new Date()
  const { extrinsic: _extrinsic, events } = extrinsic
  const commonExtrinsicData = getCommonExtrinsicData(call, extrinsic)
  const [key, value] = call.args
  if (commonExtrinsicData.isSuccess === 1){
    try {
        const signer = _extrinsic.signer.toString()
        let record = await AssociatedAccountEntity.get(signer)
        if (!record){
            record = new AssociatedAccountEntity(signer)
            record.accountName = []
            record.accountValue = []
            record.createdAt = date
        }
        const indexesToDelete:number[] = record.accountName.reduce(function(arr, element, index) {
          if (element === formatString(key.toString())) arr.push(index);
          return arr;
        }, []);
        record.accountName = record.accountName.filter((_x,i) => !indexesToDelete.includes(i))
        record.accountValue = record.accountValue.filter((_x,i) => !indexesToDelete.includes(i))
        record.accountName.push(formatString(value.toString()))
        record.accountValue.push(formatString(key.toString()))
        record.updatedAt = date
        await record.save()
        // Update concerned accounts
        await updateAccount(signer);
    } catch (e) {
        logger.error('add associated account error at block: ' + commonExtrinsicData.blockId);
        logger.error('add associated account error detail: ' + e);
    }
  }else{
    logger.error('add associated account error at block: ' + commonExtrinsicData.blockId);
    logger.error('add associated account error detail: isExtrinsicSuccess ' + commonExtrinsicData.isSuccess);
  }
}