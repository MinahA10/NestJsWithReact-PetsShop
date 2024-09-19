import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./entities/Product";
import { ProductWithImageUrl } from "./entities/ProductWithImageUrl";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    const products = await this.productService.findAll();

    const baseUrl = "http://localhost:3001";
    return products.map((product) => ({
      ...product,
      imageUrl: `${baseUrl}${product.picture}`,
    }));
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<ProductWithImageUrl> {
    const product = await this.productService.findOne(id);
    const baseUrl = "http://localhost:3001";
    return { ...product, imageUrl: `${baseUrl}${product.picture}` };
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads/products",
        filename: (req, file, callback) => {
          const uniqueSuffix = uuidv4() + extname(file.originalname); // Conserve l'extension d'origine
          callback(null, uniqueSuffix);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error("Only image files are allowed!"), false);
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @Body() productData: Partial<Product>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Product> {
    if (file) {
      productData.picture = `/uploads/products/${file.filename}`;
    }
    return this.productService.create(productData);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() productData: Partial<Product>,
  ): Promise<Product> {
    return this.productService.update(id, productData);
  }

  @Delete(":id")
  delete(@Param("id") id: string): Promise<void> {
    return this.productService.delete(id);
  }
}
