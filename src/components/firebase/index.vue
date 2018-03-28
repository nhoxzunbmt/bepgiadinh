<template>
  <div>

    <v-container fluid>
      <v-layout row>
        <v-flex xs12>

          <v-alert type="success" :value="isSuccess">
            {{ message }}
          </v-alert>

          <v-alert type="error" :value="isError">
            {{ message }}
          </v-alert>

          <v-text-field name="title" label="Title" id="title" v-model="title"></v-text-field>

          <v-text-field name="content" label="Content" id="content" v-model="content"></v-text-field>

          <v-btn color="success" class="btnAdd" @click="addNote" v-if="note == null">Add</v-btn>
          <v-btn color="success" @click="editNote" v-if="note != null">Save</v-btn>

          <br>
          <v-data-table :headers="headers" :items="notes" :search="search" :pagination.sync="pagination" :total-items="totalItems" :loading="loading" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.title }}</td>

              <td class="text-xs-center">{{ props.item.content }}</td>

              <td class="justify-center layout px-0">
                <v-btn icon class="mx-0" @click="showNote(props.item.id)">
                  <v-icon color="teal">edit</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="deleteNote(props.item.id)">
                  <v-icon color="pink">delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>

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
      search: "",
      pagination: {},
      totalItems: 0,
      loading: false,
      title: "",
      content: "",
      message: "",
      todo: [],
      isSuccess: false,
      isError: false,
      note: false,
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
      source: db.ref("notes").limitToLast(10),
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

      this.note = note;
    },
    editNote() {
      let note = this.$firebaseRefs.notes.child(this.note[".key"]);
      note.child("title").set(this.title);
      note.child("content").set(this.content);
      this.message = "Update Successfully!";

      this.isSuccess = true;
      this.isError = false;
    },
    deleteNote() {
      this.$firebaseRefs.notes.child(this.note[".key"]).remove();
    }
  }
};
</script>

<style lang="scss" scoped>
.btnAdd {
  margin-left: 0;
}
</style>