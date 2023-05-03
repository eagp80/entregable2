const fs = require('fs');
class ProductManager {
  constructor(path) {

    this.products = [];
    this.path = path;
  }
  static contador = 0;

  addProduct(title, description, price, thumbnail, code, stock) {
    let faltanDatos = false;
    const arr = [title, description, price, thumbnail, code, stock];//para verificar con forEach
    arr.forEach(e => {
      if (e === undefined) {
        faltanDatos = true;
      }
    });
    if (faltanDatos === true) {
      console.log("Faltan datos, no se agregó el producto");
      return
    } else {
      const verificarCode = this.products.findIndex(p => p.code === code);
      if (verificarCode !== -1) {
        console.log(`Code ${code} ya existente debe asignarle un código diferente.`, "No se agregó el producto.");
        return;
      }
      const newProduct = {
        id: ProductManager.contador,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      };

      this.products.push(newProduct);
      ProductManager.contador++;

      if (!this.path) {
        return console.error("Debe dar Ud. la ruta del archivo.");
      }
      fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf8');
    }
  }


  getProducts() {
    const data = fs.readFileSync(this.path, 'utf-8');
    const products = JSON.parse(data);
    console.log("Lista de productos:", products);

    return products;
  }

  getProductById(Id) {
    const products =this.getProducts();
    const product = products.find((p) => p.code === Id);
        if (product) {
            return product;
        } else {
            console.log(`Producto ${Id} no encontrado.`);
            return false;
        }
    // const indexProduct = this.products.findIndex(p => p.id === Id);
    // if (indexProduct === -1) {
    //   console.log("Not found");
    //   return "Not found";
    // }
    // console.log("El productos es:", this.products[indexProduct]);
    // return this.products[indexProduct];
  }
}

const productManager = new ProductManager("./products.txt");

productManager.addProduct("Producto 1", "Descripción del producto 1", 100, "imagen/logo1.jpg", 1, 5);
productManager.addProduct("Producto 2", "Descripción del producto 2", 200, "imagen/logo2.jpg", 2, 12);
productManager.getProducts();
productManager.getProductById(1);
productManager.getProductById(0);
productManager.getProductById(3);
productManager.addProduct("Producto 3", "Descripción del producto 3", 500, "imagen/logo3.jpg", 1, 5);
productManager.addProduct("Producto 3", "Descripción del producto 3", 500, "imagen/logo3.jpg");
productManager.getProducts();



