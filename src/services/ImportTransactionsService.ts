import csv from 'csvtojson';
import fs from 'fs';

import Transaction from '../models/Transaction';

import CreateTransactionService from './CreateTransactionService';

class ImportTransactionsService {
  async execute(path: string): Promise<Transaction[]> {
    const filePath = path;

    const createTransaction = new CreateTransactionService();

    const transactions: Transaction[] = [];
    const array = await csv().fromFile(filePath);

    const promises = array.map(async element => {
      const transactionItem = await createTransaction.execute(element);
      transactions.push(transactionItem);
    });

    await Promise.all(promises);

    fs.unlinkSync(filePath);

    return transactions;
  }
}

export default ImportTransactionsService;
