<template>
    <div>


  <v-container fluid>
    <v-layout row>
      <v-flex xs6>

    <v-text-field
          name="title"
          label="Title"
          id="title"
          v-model="title"
        ></v-text-field>

    <v-text-field
          name="content"
          label="Content"
          id="content"
          v-model="content"
        ></v-text-field>


            <v-btn color="success" @click="addNote">Add</v-btn>

<v-data-table
      :headers="headers"
      :items="notes"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        
         <td class="text-xs-center">{{ props.item.content }}</td>

            <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>



            <ul class="notes_items">
                <li v-for="note in notes" :key="note.id">
                    {{ note.title }} | 
                    <button @click="showNote(note.id)">Edit</button>
                    <button @click="editNote(note.id)">Save</button>
                    <button @click="deleteNote(note.id)">Delete</button>
                </li>
            </ul>
      </v-flex>
    </v-layout>
  </v-container>
    </div>
</template>

<script>
import { db } from "@/plugins/firebase";
import uuidv4 from "uuid/v4";
     
export default {
  data() {
    return {
      title: "",
      content: "",
      headers: [
        {
          text: "Title",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "Content",
          align: "center",
          sortable: false,
          value: "content"
        },
        { text: "Actions", value: "name", sortable: false, align: "center" }
      ]
    };
  },
  firebase: {
    notes: {
      source: db.ref("notes"),
      // Optional, allows you to handle any errors.
      cancelCallback(err) {
        console.error(err);
      }
    }
  },
  methods: {
    addNote() {
      this.$firebaseRefs.notes.push({
        id: uuidv4(),
        title: this.title,
        content: this.content
      });
    },
    showNote(id) {
      let note = this.notes.find(n => n.id === id);
      this.title = note.title;
      this.content = note.content;
    },
    editNote(id) {
      let note = this.$firebaseRefs.notes.child(id);
      note.child("title").set(this.title);
      note.child("content").set(this.content);
      alert("Update Successfully!");
    },
    deleteNote(id) {
      let note = this.notes.find(n => n.id === id);
      this.$firebaseRefs.notes.child(note[".key"]).remove();
    }
  }
};
</script>

<style lang="scss" scoped>
.notes_items {
  li {
    display: block;
    float: left;
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>