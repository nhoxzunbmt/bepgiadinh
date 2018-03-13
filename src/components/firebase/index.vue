<template>
    <div>

    <input type="text" v-model="title" placeholder="Title">

        <input type="text" v-model="content" placeholder="Content">

            <button @click="addNote">Add</button>

            <ul class="notes_items">
                <li v-for="note in notes" :key="note.id">
                    {{ note.title }} | 
                    <button @click="showNote(note.id)">Edit</button>
                    <button @click="editNote(note.id)">Save</button>
                    <button @click="deleteNote(note.id)">Delete</button>
                </li>
            </ul>
    </div>
</template>

<script>
import { db } from "@/plugins/firebase";
import uuidv4 from "uuid/v4";

export default {
  data() {
    return {
      title: "",
      content: ""
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
        let note = this.notes.find(n => n.id === id)
        this.title = note.title;
        this.content = note.content
    },
    editNote(id) {
        let note = this.$firebaseRefs.notes.child(id);
        note.child("title").set(this.title);
        note.child("content").set(this.content);
        alert('Update Successfully!')
    },
    deleteNote(id) {
            let note = this.notes.find(n => n.id === id)
        this.$firebaseRefs.notes.child(note['.key']).remove()
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