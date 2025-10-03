// queries.js
// Autor: [Seu Nome]
// Projeto: PLP Bookstore - MongoDB Week 1
// Descrição: Todas as consultas CRUD, avançadas e agregações

const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function runQueries() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // ======================
    // 1️⃣ CRUD - Operações Básicas
    // ======================

    // a) Encontrar todos os livros de um gênero específico
    const romanceBooks = await books.find({ genre: "Romance" }).toArray();
    console.log("📖 Livros do gênero Romance:", romanceBooks);

    // b) Encontrar livros publicados após 2010
    const booksAfter2010 = await books.find({ published_year: { $gt: 2010 } }).toArray();
    console.log("📖 Livros publicados após 2010:", booksAfter2010);

    // c) Encontrar livros de um autor específico
    const miaCoutoBooks = await books.find({ author: "Mia Couto" }).toArray();
    console.log("📖 Livros de Mia Couto:", miaCoutoBooks);

    // d) Atualizar o preço de um livro específico
    await books.updateOne(
      { title: "Terra Sonâmbula" },
      { $set: { price: 600 } }
    );
    console.log("💰 Preço atualizado para 'Terra Sonâmbula'");

    // e) Excluir um livro pelo título
    await books.deleteOne({ title: "As Andorinhas" });
    console.log("🗑️ Livro 'As Andorinhas' removido");

    // ======================
    // 2️⃣ Consultas Avançadas
    // ======================

    // Livros em estoque e publicados após 2010
    const inStockAfter2010 = await books.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    }).project({ title: 1, author: 1, price: 1, _id: 0 }).toArray();
    console.log("✅ Livros em estoque após 2010:", inStockAfter2010);

    // Ordenar por preço crescente
    const sortedByPriceAsc = await books.find().sort({ price: 1 }).toArray();
    console.log("📈 Livros ordenados por preço crescente:", sortedByPriceAsc);

    // Ordenar por preço decrescente
    const sortedByPriceDesc = await books.find().sort({ price: -1 }).toArray();
    console.log("📉 Livros ordenados por preço decrescente:", sortedByPriceDesc);

    // Paginação (5 livros por página)
    const page1 = await books.find().skip(0).limit(5).toArray();
    const page2 = await books.find().skip(5).limit(5).toArray();
    console.log("📄 Página 1:", page1);
    console.log("📄 Página 2:", page2);

    // ======================
    // 3️⃣ Pipelines de Agregação
    // ======================

    // a) Preço médio por gênero
    const avgPriceByGenre = await books.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray();
    console.log("💵 Preço médio por gênero:", avgPriceByGenre);

    // b) Autor com mais livros
    const topAuthor = await books.aggregate([
      { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
      { $sort: { totalBooks: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log("🏆 Autor com mais livros:", topAuthor);

    // c) Livros por década
    const booksByDecade = await books.aggregate([
      {
        $group: {
          _id: { $subtract: [ { $divide: ["$published_year", 10] }, { $mod: [ { $divide: ["$published_year", 10] }, 1 ] } ] },
          count: { $sum: 1 }
        }
      },
      {
        $project: { decade: { $multiply: ["$_id", 10] }, count: 1, _id: 0 }
      }
    ]).toArray();
    console.log("📊 Livros por década:", booksByDecade);

    // ======================
    // 4️⃣ Índices
    // ======================

    // Criar índice no título
    await books.createIndex({ title: 1 });
    console.log("🔖 Índice criado no campo 'title'");

    // Criar índice composto author + published_year
    await books.createIndex({ author: 1, published_year: 1 });
    console.log("🔖 Índice composto criado em 'author' e 'published_year'");

  } catch (err) {
    console.error("❌ Erro:", err);
  } finally {
    await client.close();
  }
}

runQueries();
