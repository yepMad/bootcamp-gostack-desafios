import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Transactions {
  id: string;
  title: string;
  value: number;
  category: {
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
}

interface Invoice {
  transactions: Transactions[] | {};
  balance: Balance;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactionsRepository = getRepository(Transaction);
    const transactions = await transactionsRepository.find();

    let income = 0;
    let outcome = 0;
    let total = 0;

    transactions.forEach(element => {
      const { value, type } = element;

      const parsedValue = value;
      const isOutcome = type === 'outcome';

      income += isOutcome ? 0 : parsedValue;
      outcome += isOutcome ? parsedValue : 0;
      total += isOutcome ? -parsedValue : parsedValue;
    });

    return {
      income,
      outcome,
      total,
    };
  }

  public async getInvoice(): Promise<Invoice> {
    const transactionsRepository = getRepository(Transaction);
    const transactions = await transactionsRepository.find();

    const balance = await this.getBalance();

    return {
      transactions,
      balance,
    };
  }
}

export default TransactionsRepository;
