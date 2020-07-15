import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(transactionId: string): Promise<void> {
    const transactionRepository = getRepository(Transaction);

    const deleted = await transactionRepository.delete(transactionId);

    if (deleted.affected === 0) {
      throw new AppError('Esta transação não existe.', 404);
    }
  }
}

export default DeleteTransactionService;
