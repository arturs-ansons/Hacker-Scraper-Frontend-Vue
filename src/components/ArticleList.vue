<template>
  <div class="article-list">
    <!-- Display articles -->
    <div v-for="(article, index) in paginatedArticles" :key="index" class="article-box">
      <h2>{{ article.title }}</h2>
      <p>Link: <a :href="article.link" target="_blank">{{ article.link }}</a></p>
      <p>Points: {{ article.points }}</p>
      <button @click="deleteArticle(article.id)" class="btn btn-danger">Delete</button>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-primary">Previous</button>
    Page {{ currentPage }} of {{ totalPages }}
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-primary">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      currentPage: 1,
      articlesPerPage: 10
    };
  },
  computed: {
    paginatedArticles() {
      const startIndex = (this.currentPage - 1) * this.articlesPerPage;
      const endIndex = startIndex + this.articlesPerPage;
      return this.articles.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.articles.length / this.articlesPerPage);
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/articles');
        const data = await response.json();
        this.articles = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async deleteArticle(id) {
      try {
        await fetch(`http://127.0.0.1:8000/api/articles/${id}`, {
          method: 'DELETE'
        });
        // Remove the deleted article from the list
        this.articles = this.articles.filter(article => article.id !== id);
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
};
</script>

<style>
.article-list {
  display: flex;
  flex-direction: column;
}

.article-box {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.pagination button {
  width: 70px;
  margin: 0 10px;
}
</style>
