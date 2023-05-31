<template>
  <div>
    <Navbar />
    <nuxt />
    
    <!-- Carousel Images as Header -->
      <div>
      <figure class="carousel">
        <div class="overlay">Travel & Adventure</div>
        <img class="myslide w-screen object-cover object-center image-margin" src="img1.jpg">
        <img class="myslide w-screen object-cover object-center image-margin" src="img2.jpg">
        <img class="myslide w-screen object-cover object-center image-margin" src="img.jpg">
        <img class="myslide w-screen object-cover object-center image-margin" src="img3.jpg">
      </figure>
        <div class="container mx-auto py-8 px-4">
          <h2 class="text-3xl font-bold text-gray-800 mb-4 text-center">Tourist Spots</h2>

          <!-- Static Image Gallery -->
          <div class="flex flex-wrap -mx-2">
        <div class="w-full md:w-1/3 px-2">
          <div class="bg-white rounded-lg shadow-lg">
            <img class="w-full h-64 object-cover object-center rounded-t-lg" src="gg3.jpeg">
          </div>
        </div>
        <div class="w-full md:w-1/3 px-2">
          <div class="bg-white rounded-lg shadow-lg">
            <img class="w-full h-64 object-cover object-center rounded-t-lg" src="gg2.jpg">
          </div>
        </div>
        <div class="w-full md:w-1/3 px-2">
          <div class="bg-white rounded-lg shadow-lg">
            <img class="w-full h-64 object-cover object-center rounded-t-lg" src="gg.jpg">
          </div>
        </div>
      </div>
      
    <!-- Add tourist spots or places -->
      <div class="flex justify-center">
        <h1 class="text-3xl font-extrabold mb-4">Add a Place</h1>
      </div>
      
      <form @submit.prevent="handleSubmit">
        <div class="mb-6 flex justify-center">
          <input
            v-model="place"
            type="text"
            class="
              border border-gray-300
            "
            placeholder="Place"
            required
          />
        </div>
        <div class="mb-6 flex justify-center">
          <input
            v-model="location"
            type="text"
            class="
              border border-gray-300
            "
            placeholder="Location"
            required
          />
        </div>
        <div class="mb-6 flex justify-center">
          <input
            v-model="description"
            type="text"
            class="
              border border-gray-300
            "
            placeholder="About"
            required
          />
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
              class="border border-gray-300"
              placeholder="Place"
              required
              @input="selectedArticle.place = $event.target.value"
            />
          </div>
          <div class="mb-6 flex justify-center">
            <input
              v-model="selectedArticle.location"
              required
              placeholder="Location"
              class="border border-gray-300"
              type="text"
              @input="selectedArticle.location = $event.target.value"
            />
          </div>
          <div class="mb-6 flex justify-center">
            <input
              v-model="selectedArticle.description"
              type="text"
              class="border border-gray-300"
              placeholder="Description"
              required
              @input="selectedArticle.description = $event.target.value"
            />
          </div>
          <div class="update-button">
            <button type="submit" class="border border-gray-300">Update</button>
          </div>
        </form>
      </div>

      <!-- Display the tourist spots and places added -->
    <div v-else>
      <div class="grid grid-cols-3 gap-4">
        <div v-for="article in sortedArticles" :key="article.id" class="border rounded-lg p-4 relative shadow-lg">
          <div>
            <h2 class="text-xl font-bold text-gray-800 mb-2">{{ article.attributes.place }}</h2>
            <h2 class="text-gray-600 mb-2">{{ article.attributes.location }}</h2>
            <p class="text-gray-700">{{ article.attributes.description }}</p>
          </div>
          <div class="absolute bottom-4 right-4">
            <button class="delete-button" @click="deleteArticle(article.id)">Delete</button>
            <button class="edit-button" @click="editArticle(article)">Edit</button>
          </div>
        </div>
      </div>
    
    </div>
  </div> 
  </div> 
  <Footer />
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
      selectedArticle: null // Added selectedArticle property
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
    this.fetchArticles();
    
    let myIndex = 0;
    carousel();

    function carousel() {
      let i;
      const x = document.getElementsByClassName("myslide");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      myIndex++;
      if (myIndex > x.length) {myIndex = 1}
      x[myIndex-1].style.display = "block";
      setTimeout(carousel, 3000);
    }
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
            window.location.href = 'http://localhost:3000/';
          }, 500);
        // eslint-disable-next-line no-console
        console.log('Data added successfully:', response.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error adding data:', error);
      }
    },
    editArticle(article) {
    this.selectedArticle = { ...article }; // Create a copy of the selected article
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

<style>
.carousel {
  position: relative;
  height: 50vh;
  width: 100%;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px #000;
  z-index: 1;
}

.myslide {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

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
</style>