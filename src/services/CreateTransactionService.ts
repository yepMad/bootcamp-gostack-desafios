import { getCustomRepository } from 'typeorm';

import CreateCategoryService from './CreateCategoryService';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const categoryService = new CreateCategoryService();
    const categoryObject = await categoryService.execute(category);

    const transactionRepository = getCustomRepository(TransactionRepository);

    const { total } = await transactionRepository.getBalance();

    if (total < value && type === 'outcome') {
      throw new AppError(
        'Você não possui o valor suficiente para esta operação.',
      );
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: categoryObject.id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
