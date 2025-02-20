import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoryService {
  private categoriesFilePath = path.join(__dirname, './categories.json');

  getCategories() {
    return JSON.parse(fs.readFileSync(this.categoriesFilePath, 'utf-8'));
  }

  addCategory(name: string) {
    const categories = this.getCategories();
    if (
      categories.some(
        (cat: any) => cat.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      throw new BadRequestException('Cette catégorie existe déjà.');
    }
    const newCategory = { id: uuidv4(), name };
    categories.push(newCategory);

    // Réécrire le fichier JSON
    fs.writeFileSync(
      this.categoriesFilePath,
      JSON.stringify(categories, null, 2),
      'utf-8',
    );
    return {
      message: 'Catégorie ajoutée avec succès !',
      category: newCategory,
    };
  }
}
