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
      <button @click="clearFilters()" class ="clear-button">Clear</button>
    </div>

    <div class = "prompt-container">
      <h2 v-if="filteredPrompts.length == 0">There doesn't seem to be anything here...</h2>
      <div v-else class="prompt-card" v-for="prompt in filteredPrompts" :key="prompt.id">
        <input class="selection-box" type="checkbox" :id="prompt.id" :value="prompt.id" v-model="selectedPrompts"/>

        <p>Title: {{prompt.title}}</p> <!-- this is a placeholder for prompt summary-->
        <p>Summary: {{prompt.summary}}</p>
        <p>LLM: {{prompt.llmName}}</p>
        <div v-if="prompt.hasTag.length != 0">Tags:
          <div class="tagText" v-for="tag in prompt.hasTag" :key="tagId">{{tag.tag.name}}&nbsp;</div>
        </div>
        <div v-else>Tags: none</div>
        <div>
          <router-link :to="'/database/prompt/' + prompt.id">
            <form>
              <button class="details-button">Details</button>
            </form>
          </router-link>
        </div>
      </div>
    </div>
    <div class="interaction-buttons-container">
    <router-link to="/submit" style="">
      <button class="submit-button">Submit a prompt</button>
    </router-link>
      <button class="export-button" @click="exportPrompts()">Export selected</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import downloadjs from "downloadjs";
export default {
  data() {
    const selectedPrompts = ref([]);
    const toSearch = ref("");
    const selectedTags = ref("");
    return {
      filteredPrompts: [],
      readyToExport: [],
      selectedPrompts,
      selectedTags,
      toSearch,
    };
  },
  methods: {
    async fetchPromptsApproved() {
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
    async exportPrompts() {
      //https://jasonwatmore.com/post/2020/04/30/vue-fetch-http-post-request-examples
      try {
        const bodyJSON = {ids: this.selectedPrompts};
        const requestOptions = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyJSON)
        }

        console.log("trying to export");
        const response = await fetch("http://localhost:8080/export", requestOptions);
        this.readyToExport = await response.json();
        if (!response.ok) {
          throw new Error('Failed to fetch prompts to export');
        }
        else {
          downloadjs(JSON.stringify(this.readyToExport), "Exported_Prompts_JSON", "application/json");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async clearFilters() {
      try {
        await this.fetchPromptsApproved()
      } catch (error) {
        console.error(error);
      }
    },
    async filter() {
      try {
        //Empty
        if (this.selectedTags === "" && this.toSearch === "") {
          alert("Both search fields cannot be empty!")
          await this.fetchPromptsApproved()
        }
        //Full
        else if (this.selectedTags !== "" && this.toSearch !== "") {
          const response = await fetch("http://localhost:8080/search/fullsearch?q="
              + this.toSearch
              + "&tags="
              + this.selectedTags.toLowerCase());
          if (!response.ok) {
            throw new Error("Failed to search");
          }
          this.filteredPrompts = await response.json();
        }
        //Text only
        else if (this.toSearch !== "") {
          const response = await fetch("http://localhost:8080/search/textsearch?q="
              + this.toSearch);
          if (!response.ok) {
            throw new Error("Failed to search");
          }
          this.filteredPrompts = await response.json();
        }
        // Tag only
        else {
          const response = await fetch("http://localhost:8080/search/tagSearch?tags="
              + this.selectedTags.toLowerCase());
          if (!response.ok) {
            throw new Error("Failed to search");
          }
          this.filteredPrompts = await response.json();
        }
      } catch (error) {
          console.error(error);
      }
    },
  },
  mounted() {
    this.fetchPromptsApproved();
  },
};
</script>

<style scoped>
#prompt-library {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers the filters container */
  justify-content: center;
  min-height: calc(100vh - 133px); /* Ensures the library takes full height of the viewport */
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
  width: 120px; /* Adjust as needed */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: var(--black-text);
  cursor: pointer;
}

.clear-button {
  position: relative;
  left: 1%;
  width: 120px; /* Adjust as needed */
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
  min-width: 25%; /* Adjust this as necessary to control the width of the filters area */
  min-height: 20%;
  margin: auto; /* Centers the filters area horizontally */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional shadow for some depth */
  border-radius: 10px; /* Optional border radius for rounded corners */
  background-color: #fff; /* Optional background color */
}

.selection-box {
  position: relative;
  cursor: pointer;
}

.interaction-buttons-container {
  position: absolute;
  left: 2%;
  bottom: 5%;
  width: 25%; /* Adjust this as necessary to control the width of the filters area */
  min-height: 20%;
  margin: auto; /* Centers the filters area horizontally */
  padding: 20px;
}

.details-button {
  position: absolute;
  margin: 10px;
  left: 75%;
  bottom: 5%;
  width: 18%; /* Adjust as needed */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: #000000;
  cursor: pointer;

}

.submit-button {
  position: relative;
  overflow: clip;
  margin: 10px;
  left: 10%;
  bottom: 17%;
  width: 75%; /* Adjust as needed */
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
  position: relative;
  overflow: clip;
  margin: 10px;
  left: 10%;
  bottom: 10%;
  width: 75%; /* Adjust as needed */
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
  overflow: auto;
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
  float: left;
  margin: 0.5%;
  margin-bottom: 1%;
  width: 32.33%; /* Adjust this as necessary to control the width of the filters area */
  height: 40%;
  padding: 1%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional shadow for some depth */
  border-radius: 10px; /* Optional border radius for rounded corners */
  background-color: #ccc; /* Optional background color */
  overflow: auto;
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
