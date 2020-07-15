import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome') {
      if (total < value) {
        throw new Error('Você não possui saldo suficiente para esta transação');
      }
    }

    const transaction = new Transaction({ title, value, type });

    const newTransaction = this.transactionsRepository.create(transaction);

    return newTransaction;
  }
}

export default CreateTransactionService;
