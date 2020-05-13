<template>
    <div>
        <v-text-field
            label="Article Name"
            v-model="name"
            outlined
        ></v-text-field>
        <v-card ref="stupidFuckingComponent" outlined>
            <v-card-text
                v-on:focus.stop
                v-on:click.stop
                id="scroll-target"
                style="max-height: 500px"
                class="overflow-y-auto"
            >
                <editor-content height="500px" class="editorOutline" ref="content" :autofocus="true" :editor="editor" />
            </v-card-text>
        </v-card>
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <v-toolbar>
                <v-btn
                    icon
                    class="menubar__button"
                    :class="{ 'is-active': isActive.bold() }"
                    @click="commands.bold"
                >
                    <v-icon>mdi-format-bold</v-icon>
                </v-btn>

                <v-btn
                    icon
                    class="menubar__button"
                    :class="{ 'is-active': isActive.italic() }"
                    @click="commands.italic"
                >
                    <v-icon>mdi-format-italic</v-icon>
                </v-btn>

                <v-btn
                    icon
                    class="menubar__button"
                    :class="{ 'is-active': isActive.strike() }"
                    @click="commands.strike"
                >
                    <v-icon>mdi-format-strikethrough</v-icon>
                </v-btn>

                <v-btn
                    icon
                    class="menubar__button"
                    :class="{ 'is-active': isActive.underline() }"
                    @click="commands.underline"
                >
                    <v-icon>mdi-format-underline</v-icon>
                </v-btn>

                <v-btn
                    icon
                    class="menubar__button"
                    :class="{ 'is-active': isActive.code() }"
                    @click="commands.code"
                >
                    <v-icon>mdi-code-tags</v-icon>
                </v-btn>

                <v-btn
                    icon
                    class="menubar__button"
                    :class="{ 'is-active': isActive.paragraph() }"
                    @click="commands.paragraph"
                >
                    <v-icon>mdi-format-paragraph</v-icon>
                </v-btn>

                <v-btn icon
                class="menubar__button"
                :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                @click="commands.heading({ level: 1 })"
                >
                    <v-icon>mdi-format-header-1</v-icon>
                </v-btn>

                <v-btn icon
                class="menubar__button"
                :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                @click="commands.heading({ level: 2 })"
                >
                <v-icon>mdi-format-header-2</v-icon>
                </v-btn>

                <v-btn icon
                class="menubar__button"
                :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                @click="commands.heading({ level: 3 })"
                >
                <v-icon>mdi-format-header-3</v-icon>
                </v-btn>

                <v-btn icon
                class="menubar__button"
                :class="{ 'is-active': isActive.bullet_list() }"
                @click="commands.bullet_list"
                >
                <v-icon>mdi-format-list-bulleted</v-icon>
                </v-btn>

                <v-btn
                    icon
                    class="menubar__button"
                    :class="{ 'is-active': isActive.ordered_list() }"
                    @click="commands.ordered_list"
                >
                <v-icon>mdi-format-list-numbered</v-icon>
                </v-btn>

                <v-btn
                    icon
                    class="menubar__button"
                    :class="{ 'is-active': isActive.blockquote() }"
                    @click="commands.blockquote"
                >
                <v-icon>mdi-format-quote-open</v-icon>
                </v-btn>

                <v-btn
                    icon
                    class="menubar__button"
                    :class="{ 'is-active': isActive.code_block() }"
                    @click="commands.code_block"
                >
                    <v-icon>mdi-code-array</v-icon>
                </v-btn>

                <v-btn
                    icon
                    class="menubar__button"
                    @click="commands.horizontal_rule"
                >
                    <v-icon>mdi-minus</v-icon>
                </v-btn>

                <v-btn
                    icon
                    class="menubar__button"
                    @click="commands.undo"
                >
                <v-icon>mdi-undo</v-icon>
                </v-btn>

                <v-btn
                    icon
                    class="menubar__button"
                    @click="commands.redo"
                >
                <v-icon>mdi-redo</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn @click="submitForm()">Submit</v-btn>
            </v-toolbar>
        </editor-menu-bar>
        <br>
    </div>
</template>

<script>
// import Icon from 'Components/Icon'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    HorizontalRule,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Strike,
    Underline,
    History,
} from 'tiptap-extensions'

export default {
    components: {
    EditorContent,
    EditorMenuBar,
  },
    data: () => ({
        name: "",
        editor: new Editor({
            onInit: ({ state, view }) => {
                state;
                var elem = view.docView.contentDOM;
                elem.style.height = "468px"
            },
            extensions: [
                new Blockquote(),
                new BulletList(),
                new CodeBlock(),
                new HardBreak(),
                new Heading({ levels: [1, 2, 3] }),
                new HorizontalRule(),
                new ListItem(),
                new OrderedList(),
                new TodoItem(),
                new TodoList(),
                new Link(),
                new Bold(),
                new Code(),
                new Italic(),
                new Strike(),
                new Underline(),
                new History(),
            ],
            content: ``,
        }),
    }),
    methods: {
        submitForm() {
            this.$store.dispatch("accessResource", {
                method: "POST",
                route: "/api/blogposts",
                data: {
                    name: this.name,
                    body: this.editor.getHTML(),
                    date: new Date(),
                },
                callback: (result) => {
                    console.log("Result", result);
                }
            });
        },
    },
    mounted() {
        // this.$store.dispatch("accessResource", {
        //     method: "GET",
        //     route: "/api/projects/",
        //     callback: (result) => {
        //         console.log("Result", result);
        //         this.projects = result;
        //         for (let i = 0; i < this.projects.length; i++) {
        //             this.options.push(this.projects[i].header);
        //         }
        //     }
        // });
    },
    beforeDestroy() {
        this.editor.destroy()
    },
}
</script>

<style>
    *:focus {
        outline: none;
    }

</style>