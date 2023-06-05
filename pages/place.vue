<template>
  <div class="bg-blue-300">
  <Navbar />
  <ImgCarousel />

<!-- Add tourist spots or places -->
<div class="flex justify-center">
  <h1 class="text-3xl font-extrabold mb-4">Add a Place</h1>
</div>

<form @submit.prevent="handleSubmit">
  <div class="mb-6 flex justify-center">
    <input
      v-model="place"
      type="text"
      class="border border-gray-300 w-64"
      placeholder="Place"
      required
    />
  </div>
  <div class="mb-6 flex justify-center">
    <input
      v-model="location"
      type="text"
      class="border border-gray-300 w-64"
      placeholder="Location"
      required
    />
  </div>
  <div class="mb-6 flex justify-center">
    <textarea
      v-model="description"
      class="border border-gray-300 resize-none h-32 w-64 p-2"
      placeholder="About"
      required
    ></textarea>
  </div>
  <div class="mb-6 flex justify-center">
    <button
      type="submit"
      class="
        text-white
        bg-blue-700
        hover:bg-blue-800
        focus:ring-4 focus:outline-none focus:ring-blue-300
        font-medium
        rounded-lg
        text-sm
        px-5
        py-2.5
        text-center
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
      "
    >
      Add
    </button>
  </div>
</form>

<!-- Conditionally render the edit form or the blog list -->
<div v-if="selectedArticle">
  <h1 class="text-3xl font-bold text-gray-800 mb-4 text-center">Edit Blog</h1>
  <form @submit.prevent="updateArticle">
    <div class="mb-6 flex justify-center">
      <input
        v-model="selectedArticle.place"
        type="text"
        class="border border-gray-300 w-64"
        placeholder="Place"
        required
      />
    </div>
    <div class="mb-6 flex justify-center">
      <input
        v-model="selectedArticle.location"
        required
        placeholder="Location"
        class="border border-gray-300 w-64"
        type="text"
      />
    </div>
    <div class="mb-6 flex justify-center">
      <textarea
        v-model="selectedArticle.description"
        class="border border-gray-300 resize-none h-32 w-64 p-2"
        placeholder="Description"
        required
      ></textarea>
    </div>
    <div class="update-button">
      <button type="submit" class="border border-gray-300">Update</button>
    </div>
  </form>
</div>


    <!-- Display the tourist spots and places added -->
    <div
v-for="article in sortedArticles"
  :key="article.id"
  class="bg-blue-100 border rounded-lg p-4 relative shadow-lg mb-4"
>
  <div>
    <h2 class="text-xl font-bold text-gray-800 mb-2">{{ article.attributes.place }}</h2>
    <h2 class="text-gray-600 mb-2">{{ article.attributes.location }}</h2>
    <p class="text-gray-700">{{ article.attributes.description }}</p>
  </div>
  <div class="flex justify-end mt-4">
    <button class="delete-button mr-2" @click="deleteArticle(article.id)">Delete</button>
    <button class="edit-button" @click="editArticle(article)">Edit</button>
  </div>
</div>

  <!--End of Tourist spots or places -->
  <MyFooter />
</div> 
</template>

<script>
import axios from 'axios';

export default {
data() {
  return {
    articles: {
      data: []
    },
    place: '',
    location: '',
    description: '',
    selectedArticle: null
  };
},
computed: {
  sortedArticles() {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    return this.articles.data.sort((a, b) => {
      return new Date(a.attributes.place) - new Date(b.attributes.place);
    });
  },
},
mounted() {
  this.fetchArticles(); // Call the fetchArticles method when the component is mounted
},
methods: {
  fetchArticles() {
    axios.get('http://localhost:1337/api/articles')
      .then(response => {
        this.articles = response.data;
        // eslint-disable-next-line no-console
        console.log(response);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  },
  deleteArticle(id) {
    axios.delete(`http://localhost:1337/api/articles/${id}`)
      .then(response => {
        // eslint-disable-next-line no-console
        console.log(response);
        this.articles.data = this.articles.data.filter(article => article.id !== id);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  },
  async handleSubmit() {
    try {
      const response = await axios.post('http://localhost:1337/api/articles', {
      data: {
        place: this.place,
        location: this.location,
        description: this.description,
      }});
      setTimeout(() => {
          window.location.href = 'http://localhost:3000/place';
        }, 500);
      // eslint-disable-next-line no-console
      console.log('Data added successfully:', response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding data:', error);
    }
  },
  editArticle(article) {
    // Create a copy of the selected article
    this.selectedArticle = {
      id: article.id,
      place: article.attributes.place,
      location: article.attributes.location,
      description: article.attributes.description,
    };
  },
  updateArticle() { 
    axios.put(`http://localhost:1337/api/articles/${this.selectedArticle.id}`, {
      data: {
        place: this.selectedArticle.place,
        location: this.selectedArticle.location,
        description: this.selectedArticle.description,
      },
    })
  .then(response => {
    // Update the article in the articles data
    const updatedArticle = response.data.data;
    const index = this.articles.data.findIndex(article => article.id === updatedArticle.id);
    if (index !== -1) {
      this.articles.data.splice(index, 1, updatedArticle);
    }
    this.selectedArticle = null; // Clear the selected article after update
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.error('Error updating article:', error);
  });
  }
},
};
</script>

<style scoped>
.delete-button {
background-color: #f56565;
color: white;
padding: 0.5rem 1rem;
border-radius: 0.25rem;
cursor: pointer;
transition: background-color 0.3s ease;
}


.delete-button:hover {
background-color: #e53e3e;
}

.edit-button {
background-color: #4299e1;
color: white;
padding: 0.5rem 1rem;
border-radius: 0.25rem;
cursor: pointer;
transition: background-color 0.3s ease;
}

.edit-button:hover {
background-color: #3182ce;
}

.update-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.update-button button {
  background-color: #e53e3e;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-container {
display: flex;
justify-content: flex-end;
margin-top: 1rem;
}

</style>