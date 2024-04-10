<template>
  <div id="prompt-library">
    <div class="filters">
      Search:
      <form class="search-bar">
        <input type="text" placeholder="Enter key words to search" v-model.trim="toSearch"/>
      </form>
      Tags:
      <form class="search-bar">
        <input type="text" placeholder="Enter tags to search" v-model.trim="selectedTags"/>
        example: code+vue_js+real
      </form>

      <button @click="filter()" class ="filter-button">Filter</button>
    </div>

    <div class = "prompt-container">
      <h1 v-for="item in readyToExport"> {{item.prompt}} </h1>
      <h2 v-if="filteredPrompts.length == 0">There doesn't seem to be anything here...</h2>
      <div v-else class="prompt-card" v-for="prompt in filteredPrompts" :key="prompt.id">
        <input type="checkbox" :id="prompt.id" :value="prompt.id" v-model="selectedPrompts"/>

        <p>Prompt: {{prompt.prompt}}</p> <!-- this is a placeholder for prompt summary-->
        <p>Response: {{prompt.response}}</p>
        <p>LLM: {{prompt.llmName}}</p>
        <div v-if="prompt.hasTag.length != 0">Tags:
          <div class="tagText" v-for="tag in prompt.hasTag" :key="tagId">{{tag.tag.name}}&nbsp;</div>
        </div>
        <div v-else>Tags: None</div>
        <div>
          <router-link :to="'/database/prompt/' + prompt.id">
            <form>
              <button>Details</button>
            </form>
          </router-link>
        </div>
      </div>
    </div>
    <div>

      <router-link to="/submit" style="">
        <button class="submit-button">Submit a prompt</button>
      </router-link>
      <button class="export-button" @click="exportPrompts()">Export selected as JSON</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  data() {
    const selectedPrompts = ref([]);
    const toSearch = ref("");
    const selectedTags = ref([]);
    return {
      filteredPrompts: [],
      readyToExport: [],
      selectedPrompts,
      selectedTags,
      toSearch,
    };
  },
  methods: {
    async fetchPrompts() {
      try {
        console.log("trying to fetch");
        const response = await fetch('http://localhost:8080/prompt/');
        if (!response.ok) {
          throw new Error('Failed to fetch prompts');
        }
        const prompts = await response.json();
        this.filteredPrompts = prompts;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPromptsApproved() {
      try {
        console.log("trying to fetch");
        const response = await fetch('http://localhost:8080/prompt/all');
        if (!response.ok) {
          throw new Error('Failed to fetch prompts');
        }
        const prompts = await response.json();
        this.filteredPrompts = prompts;
      } catch (error) {
        console.error(error);
      }
    },
    async exportPrompts() {
      //https://jasonwatmore.com/post/2020/04/30/vue-fetch-http-post-request-examples
      try {
        const bodyJSON = {ids: this.selectedPrompts};
        const requestOptions = {
          method: "POST",
          body: bodyJSON
        }

        console.log("trying to export");
        console.log(bodyJSON);
        const response = await fetch("http://localhost:8080/export", requestOptions);
        if (!response.ok) {
          throw new Error('Failed to fetch prompts to export');
        }

        //Actual downloading





        // TODO: need to download file
      } catch (error) {
        console.error(error);
      }
    },
    async filter() {
      /*
      selectedTags,
      toSearch,
       */
      try {
        if (this.selectedTags === "" && this.toSearch === "") {
          await this.fetchPrompts();
        }
        if (this.selectedTags !== "" && this.toSearch !== "") {
          const response = fetch("http://localhost:8080/search/fullsearch?q="
              + this.toSearch
              + "&tags=" + this.selectedTags.toLowerCase());
          if (!response.ok) {
            throw new Error("Failed to search");
          }
          this.filteredPrompts = response;
        } else if (this.toSearch !== "") {
          const response = fetch("http://localhost:8080/search/textsearch?q="
              + this.toSearch);
          if (!response.ok) {
            throw new Error("Failed to search");
          }
          this.filteredPrompts = response;
        } else {
          const response = fetch("http://localhost:8080/search/tagSearch?q="
              + "tags=" + this.selectedTags);
          if (!response.ok) {
            throw new Error("Failed to search");
          }
          this.filteredPrompts = response;
        }
      } catch (error) {
        console.error(error);
      }
    },

    /*
    if only search,
    use search
    if only tag,
    use tag
    if both
    use both
     */
  },
  mounted() {
    this.fetchPrompts();
  },
};
</script>

<style scoped>
#prompt-library {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers the filters container */
  justify-content: center;
  min-height: 75vh; /* Ensures the library takes full height of the viewport */
  padding: 20px;
  box-sizing: border-box; /* Ensures padding does not add to the width */
}

.search-bar input[type="text"] {
  width: 90%; /* Adjust the width as needed */
  height: 5%;
  padding: 0.5em; /* Makes the input taller and the text inside it larger */
  font-size: 1em; /* Increase the font size for better readability */
  border: 2px solid #aaa; /* Solid border with a light grey color */
  border-radius: 25px; /* Rounded corners for the border */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  transition: border-color 0.3s, box-shadow 0.3s; /* Transition for effects on focus */
  text-align: left;
  margin-bottom: 10px;
}

.filter-button {
  width: 160px; /* Adjust as needed */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: var(--black-text);
  cursor: pointer;
}

.tagText {
  display: inline;
}

.filters {
  position: absolute;
  left: 2%;
  top: 15%;
  max-width: 25%; /* Adjust this as necessary to control the width of the filters area */
  min-height: 20%;
  margin: auto; /* Centers the filters area horizontally */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional shadow for some depth */
  border-radius: 10px; /* Optional border radius for rounded corners */
  background-color: #fff; /* Optional background color */
}

.submit-button {
  position: absolute;
  flex-shrink: 1;
  /*font-size-adjust: ;*/
  left: 4%;
  bottom: 17%;
  width: 20%; /* Adjust as needed */
  height: 3rem;
  padding: 0.5em;
  font-size: 1.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: black;
  cursor: pointer;
}

.export-button {
  position: absolute;
  flex-shrink: 1;
  /*font-size-adjust: ;*/
  left: 4%;
  bottom: 10%;
  width: 20%; /* Adjust as needed */
  height: 3rem;
  padding: 0.5em;
  font-size: 1.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: black;
  cursor: pointer;
}

.prompt-container {
  position: absolute;
  display: table-row;
  overflow: scroll;
  left: 28.5%;
  top: 15%;
  width: 70%; /* Adjust this as necessary to control the width of the filters area */
  height: 75%;
  padding: 20px;
  margin:auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional shadow for some depth */
  border-radius: 10px; /* Optional border radius for rounded corners */
  background-color: #fff; /* Optional background color */
}

.prompt-card {
  position: relative;
  display: inline-block;
  overflow-wrap: break-word;
  overflow: scroll;
  float: left;
  margin: 0.5%;
  margin-bottom: 1%;
  width: 32.33%; /* Adjust this as necessary to control the width of the filters area */
  height: 30%;
  padding: 1%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional shadow for some depth */
  border-radius: 10px; /* Optional border radius for rounded corners */
  background-color: #ccc; /* Optional background color */
  cursor: pointer;
}

.filters button {
  padding: 10px;
  margin: 5px 0; /* Adds margin to the top and bottom for spacing */
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
}

.filters button {
  background-color: var(--button-color);
  color: var(--white-text);
  border: none;
  cursor: pointer;
}

.filters button:hover {
  background-color: var(--button-highlight);
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    width: 95%; /* Allows for a small margin on small screens */
  }

  .filters button {
    width: auto; /* Allows the elements to fit the content on small screens */
  }
}
</style>