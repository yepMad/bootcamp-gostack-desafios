import { getCustomRepository } from 'typeorm';

import Category from '../models/Category';
import CategoriesRepository from '../repositories/CategoriesRepository';

class CreateCategoryService {
  public async execute(title: string): Promise<Category> {
    const categoryRepository = getCustomRepository(CategoriesRepository);

    const categoryObject = await categoryRepository.findByTitle(title);

    if (categoryObject) {
      return categoryObject;
    }

    const category = categoryRepository.create({
      title,
    });

    await categoryRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
