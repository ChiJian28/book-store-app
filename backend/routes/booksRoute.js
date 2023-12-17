import express from 'express';
import {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
} from '../controllers/booksController.js';


const router = express.Router();

// 创建新书籍
router.post('/', createBook);

// 获取所有书籍
router.get('/', getAllBooks);

// 获取特定 ID 的书籍（使用冒号语法为 Express 中的router定义 参数）
router.get('/:id', getBookById);

// 更新书籍信息
router.put('/:id', updateBook);

// 删除书籍
router.delete('/:id', deleteBook);

export default router;
