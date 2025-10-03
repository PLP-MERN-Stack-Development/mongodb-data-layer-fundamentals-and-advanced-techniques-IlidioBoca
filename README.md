# PLP Bookstore - MongoDB Week 1 (Manual no Compass)

## Descrição
Este projeto tem como objetivo praticar os fundamentos do MongoDB usando **MongoDB Compass** de forma manual.  
Inclui:
- Criação de banco de dados e coleções
- Inserção de documentos manualmente
- Operações CRUD (Criar, Ler, Atualizar, Excluir)
- Consultas avançadas com filtros, projeção, ordenação e paginação
- Pipelines de agregação
- Visualização de índices e explicação de desempenho

Todos os livros adicionados são **literatura moçambicana**.

---

## Pré-requisitos
- MongoDB Community Edition ou MongoDB Atlas
- MongoDB Compass
- Conhecimentos básicos de bancos de dados NoSQL

---

## Estrutura do Projeto

plp_bookstore_manual/
│
├─ README.md # Este arquivo
├─ screenshots/ # (Opcional) Capturas do Compass mostrando os livros e coleções


### 1️⃣ Criar Banco de Dados e Coleção
1. Abrir o **MongoDB Compass** e conectar:
   - Local: `mongodb://127.0.0.1:27017`
   - Atlas: usar a URI fornecida
2. Criar banco de dados: `plp_bookstore`
3. Criar coleção: `books`

---

### 2️⃣ Inserir Livros Manualmente
1. Acessar a coleção `books`.
2. Clicar em **Insert Document**.
3. Inserir livros moçambicanos, exemplo:

json
{
  "title": "Ualalapi",
  "author": "Ungulani Ba Ka Khosa",
  "genre": "Romance histórico",
  "published_year": 1987,
  "price": 500,
  "in_stock": true,
  "pages": 210,
  "publisher": "Caminho"
}
Repetir para pelo menos 10 livros, como:

Niketche: Uma História de Poligamia – Paulina Chiziane

Balada de Amor ao Vento – Paulina Chiziane

Terra Sonâmbula – Mia Couto

O Alegre Canto da Perdiz – Paulina Chiziane

O Outro Pé da Sereia – Mia Couto

Choriro – Ungulani Ba Ka Khosa

Ventos do Apocalipse – Paulina Chiziane

O Fio das Missangas – Mia Couto

As Andorinhas – Nelson Saúte

3️⃣ Operações CRUD
Consultar livros por gênero, autor ou ano: usar Filter do Compass

Atualizar preço de um livro: clicar no lápis 🖉 do documento e alterar o campo price

Excluir um livro: clicar na lixeira 🗑️ ao lado do documento

Exemplos de filtros:

json
Copiar código
{ "genre": "Romance" }
{ "published_year": { "$gt": 2010 } }
{ "author": "Mia Couto" }

4️⃣ Consultas Avançadas
Livros em estoque e publicados após 2010:

json

{ "in_stock": true, "published_year": { "$gt": 2010 } }
Projeção: mostrar apenas title, author e price

Ordenação: pelo campo price (crescente e decrescente)

Paginação: 5 livros por página usando Skip e Limit

5️⃣ Pipelines de Agregação
Preço médio por gênero

Autor com mais livros

Livros agrupados por década de publicação

Todos esses pipelines foram construídos manualmente na aba Aggregations do Compass.

6️⃣ Indexação
Criar índice simples em title

Criar índice composto em author + published_year

Testar melhoria de desempenho usando Explain Plan

📌 Observações
Todo o projeto foi feito manual e visualmente no MongoDB Compass.

O objetivo foi praticar fundamentos do MongoDB sem escrever scripts Node.js.

Capturas de tela do Compass podem ser adicionadas na pasta screenshots/ para comprovar a execução.

